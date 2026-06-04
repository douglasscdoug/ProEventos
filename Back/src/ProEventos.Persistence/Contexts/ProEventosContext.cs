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
            palestranteEvento.HasOne(pe =>pe.Evento)
                .WithMany(e => e.PalestrantesEventos)
                .HasForeignKey(pe => pe.EventoId)
                .OnDelete(DeleteBehavior.Restrict);
            palestranteEvento.HasOne(pe => pe.Palestrante)
                .WithMany(p => p.PalestrantesEventos)
                .HasForeignKey(pe => pe.PalestranteId)
                .OnDelete(DeleteBehavior.Restrict);
        });

        modelBuilder.Entity<Lote>()
            .HasOne(l => l.Evento)
            .WithMany(e => e.Lotes)
            .HasForeignKey(l => l.EventoId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Lote>().Property(l => l.Preco).HasPrecision(18, 2);

        modelBuilder.Entity<RedeSocial>()
            .HasOne(rs => rs.Evento)
            .WithMany(e => e.RedesSociais)
            .HasForeignKey(rs => rs.EventoId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<RedeSocial>()
            .HasOne(rs => rs.Palestrante)
            .WithMany(p => p.RedesSociais)
            .HasForeignKey(rs => rs.PalestranteId)
            .OnDelete(DeleteBehavior.Restrict);

    }
}
