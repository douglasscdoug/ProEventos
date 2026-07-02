using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.Extensions.Options;
using ProEventos.Domain.Configurations;
using ProEventos.Domain.Models;
using ProEventos.Persistence.Contratos;

namespace ProEventos.Persistence.Services
{
    public class CloudinaryService : IPhotoService
    {
        private Cloudinary _cloudinary;

        public CloudinaryService(IOptions<CloudinarySettings> config)
        {
            var account = new Account(
            config.Value.CloudName,
            config.Value.ApiKey,
            config.Value.ApiSecret
        );

            _cloudinary = new Cloudinary(account);
        }

        public async Task<PhotoUploadResult?> UploadImageAsync(Stream fileStream, string fileName, string folder)
        {
            var uploadParams = new ImageUploadParams
            {
                File = new FileDescription(fileName, fileStream),
                Folder = folder
            };

            var result = await _cloudinary.UploadAsync(uploadParams);

            if(result.Error != null) return null;

            return new PhotoUploadResult
            {
                Url = result.SecureUrl.ToString(),
                PublicId = result.PublicId
            };
        }

        public async Task<bool> DeleteImageAsync(string publicId)
        {
            var deleteparams = new DeletionParams(publicId);

            var result = await _cloudinary.DestroyAsync(deleteparams);

            return result.Result == "ok";
        }
    }
}