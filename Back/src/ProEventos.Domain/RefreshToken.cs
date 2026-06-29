using ProEventos.Domain.Identity;

namespace ProEventos.Domain;

public class RefreshToken
{
    public Guid Id { get; set; }
    public string Token { get; set; } = string.Empty;
    public DateTime ExpirationDate { get; set; }
    public bool Revoked { get; set; }
    public int UserId { get; set; }
    public User User { get; set; } = null!;
}