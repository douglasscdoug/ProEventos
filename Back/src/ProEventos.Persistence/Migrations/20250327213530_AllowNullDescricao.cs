﻿using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ProEventos.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AllowNullDescricao : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
            name: "Descricao",
            table: "AspNetUsers",
            nullable: true,  // Permitir nulos
            oldClrType: typeof(string),
            oldNullable: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
            name: "Descricao",
            table: "AspNetUsers",
            nullable: false,  // Retornar para não permitir nulos
            oldClrType: typeof(string),
            oldNullable: true);
        }
    }
}
