using ProEventos.Domain.Models;

namespace ProEventos.Persistence.Contratos
{
    public interface IPhotoService
    {
        Task<PhotoUploadResult?> UploadImageAsync(Stream fileStream, string fileName, string folder);
        Task<bool> DeleteImageAsync(string publicId);
    }
}