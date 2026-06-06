namespace ProEventos.Application.Exceptions;

public class BusinessException : Exception
{
    public string Field { get; }

    public BusinessException(string field, string message) : base(message)
    {
        Field = field;
    }
}