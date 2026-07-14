using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ProEventos.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AdicionaRelacionamentoComUserNaEntidadeParceiro : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "Parceiros",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Parceiros_UserId",
                table: "Parceiros",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Parceiros_AspNetUsers_UserId",
                table: "Parceiros",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Parceiros_AspNetUsers_UserId",
                table: "Parceiros");

            migrationBuilder.DropIndex(
                name: "IX_Parceiros_UserId",
                table: "Parceiros");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Parceiros");
        }
    }
}
