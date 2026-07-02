using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ProEventos.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddCloudinaryFields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ImagemPublicId",
                table: "Eventos",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ImagemPublicId",
                table: "AspNetUsers",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImagemPublicId",
                table: "Eventos");

            migrationBuilder.DropColumn(
                name: "ImagemPublicId",
                table: "AspNetUsers");
        }
    }
}
