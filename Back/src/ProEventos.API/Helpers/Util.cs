namespace ProEventos.API.Helpers;

public class Util(IWebHostEnvironment _hostEnvironment) : IUtil
{
    public IWebHostEnvironment HostEnvironment { get; } = _hostEnvironment;

    public async Task<string> SaveImage(IFormFile imageFile, string destino)
    {
        string imageName = new string(Path.GetFileNameWithoutExtension(imageFile.FileName).Take(10).ToArray()).Replace(" ", "-");

        imageName = $"{imageName}{DateTime.UtcNow.ToString("yymmssfff")}{Path.GetExtension(imageFile.FileName)}";

        var imagePath = Path.Combine(HostEnvironment.ContentRootPath, @$"Resources/{destino}", imageName);

        using (var fileStream = new FileStream(imagePath, FileMode.Create))
        {
            await imageFile.CopyToAsync(fileStream);
        }

        return imageName;
    }

    public void DeleteImage(string imageName, string destino)
    {
        var imagePath = Path.Combine(HostEnvironment.ContentRootPath, @$"Resources/{destino}", imageName);

        if (System.IO.File.Exists(imagePath))
            System.IO.File.Delete(imagePath);
    }
}
