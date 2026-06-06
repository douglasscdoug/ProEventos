using ProEventos.Application.Exceptions;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Text.Json;

namespace ProEventos.API.Middlewares;
public class ExceptionMiddleware
{
    private readonly RequestDelegate _next;
    private readonly IWebHostEnvironment _env;
    private readonly ILogger<ExceptionMiddleware> _logger;

    public ExceptionMiddleware(
        RequestDelegate next,
        IWebHostEnvironment env,
        ILogger<ExceptionMiddleware> logger
    )
    {
        _next = next;
        _env = env;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (BusinessException ex)
        {
            _logger.LogWarning(
                ex,
                "Erro de regra de negócio: {Message}",
                ex.Message
            );

            await HandleExceptionAsync(context, HttpStatusCode.BadRequest, ex.Message, ex);
        }
        catch (UnauthorizedException ex)
        {
            _logger.LogWarning(
                ex,
                "Erro de autenticação/autorização: {Message}",
                ex.Message
            );

            await HandleExceptionAsync(context, HttpStatusCode.Unauthorized, ex.Message, ex);
        }
        catch (Exception ex)
        {
            _logger.LogError(
                ex,
                "Erro interno não tratado."
            );
            
            await HandleExceptionAsync(context, HttpStatusCode.InternalServerError, "Erro interno no servidor", ex);
        }
    }

    private async Task HandleExceptionAsync(
        HttpContext context,
        HttpStatusCode statusCode,
        string message,
        Exception? exception = null
    )
    {
        context.Response.ContentType = "application/json";
        context.Response.StatusCode = (int)statusCode;

        var problem = new ValidationProblemDetails
        {
            Type = "https://tools.ietf.org/html/rfc9110#section-15.5.1",
            Title = "One or more validation errors occurred.",
            Status = (int)statusCode
        };

        if (exception is BusinessException businessEx)
        {
            problem.Errors.Add(businessEx.Field, new[] { businessEx.Message });
        }
        else
        {
            problem.Errors.Add("Erro", new[] { message });
        }

        // (opcional) detalhes em dev
        if (_env.IsDevelopment() && exception != null)
        {
            problem.Extensions["trace"] = exception.Message;
        }

        var json = JsonSerializer.Serialize(problem);
        await context.Response.WriteAsync(json);
    }
}