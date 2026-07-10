namespace ProEventos.Application.Common.Utils
{
    public static class StringUtils
    {
        public static string SomenteNumeros(string valor)
        {
            if (string.IsNullOrWhiteSpace(valor)) return valor;

            return new string(valor.Where(char.IsDigit).ToArray());
        }
    }
}