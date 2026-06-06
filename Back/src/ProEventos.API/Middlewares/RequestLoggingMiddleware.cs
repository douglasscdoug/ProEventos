using System.Diagnostics;

namespace ProEventos.API.Middlewares
{
    public class RequestLoggingMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<RequestLoggingMiddleware> _logger;

        public RequestLoggingMiddleware(RequestDelegate next, ILogger<RequestLoggingMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            var stopwatch = Stopwatch.StartNew();
            var traceId = Guid.NewGuid();

            using (_logger.BeginScope(new Dictionary<string, object>
            {
                ["TraceId"] = traceId,
                ["Path"] = context.Request.Path,
                ["Method"] = context.Request.Method
            }))
            {
                try
                {
                    _logger.LogInformation("Request iniciada");

                    await _next(context);

                    stopwatch.Stop();

                    _logger.LogInformation(
                        "Request finalizada. StatusCode: {StatusCode} Tempo: {ElapsedMilliseconds}ms",
                        context.Response.StatusCode,
                        stopwatch.ElapsedMilliseconds
                    );
                }
                catch (Exception ex)
                {
                    stopwatch.Stop();
                    _logger.LogError(
                        ex,
                        "Erro durante request. Tempo: {ElapsedMilliseconds}ms",
                        stopwatch.ElapsedMilliseconds
                    );

                    throw;
                }
            }
        }
    }
}