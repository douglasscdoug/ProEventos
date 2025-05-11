using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using ProEventos.Domain;
using ProEventos.Domain.Identity;

namespace ProEventos.Persistence.Contexts;

public class ProEventosContext(DbContextOptions<ProEventosContext> options) : IdentityDbContext<User, Role, int, IdentityUserClaim<int>, UserRole, IdentityUserLogin<int>, IdentityRoleClaim<int>, IdentityUserToken<int>>(options)
{
    public DbSet<Evento> Eventos { get; set; }
    public DbSet<Lote> Lotes { get; set; }
    public DbSet<Palestrante> Palestrantes { get; set; }
    public DbSet<PalestranteEvento> PalestrantesEventos { get; set; }
    public DbSet<RedeSocial> RedesSociais { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<UserRole>(userRole =>
        {
            userRole.HasKey(ur => new{ur.UserId, ur.RoleId});

            userRole.HasOne(ur => ur.Role).WithMany(r => r.UserRoles).HasForeignKey(ur => ur.RoleId).IsRequired();

            userRole.HasOne(ur => ur.User).WithMany(r => r.UserRoles).HasForeignKey(ur => ur.UserId).IsRequired();
        });

        modelBuilder.Entity<PalestranteEvento>(palestranteEvento =>
        {
            palestranteEvento.HasKey(pe => new {pe.EventoId, pe.PalestranteId});
            palestranteEvento.HasOne(pe =>pe.Evento).WithMany(e => e.PalestrantesEventos).HasForeignKey(pe => pe.EventoId);
            palestranteEvento.HasOne(pe => pe.Palestrante).WithMany(p => p.PalestrantesEventos).HasForeignKey(pe => pe.PalestranteId);
        });

        modelBuilder.Entity<Evento>()
            .HasMany(e => e.RedesSociais)
            .WithOne(rs => rs.Evento)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Palestrante>()
            .HasMany(p => p.RedesSociais)
            .WithOne(rs => rs.Palestrante)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
