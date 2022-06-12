using Microsoft.EntityFrameworkCore.Migrations;

namespace Entities.Data.Migrations
{
    public partial class AddOccupation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "SI_Occupation",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Occupation = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: true),
                    Descr = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SI_Occupation", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
           migrationBuilder.DropTable(
                name: "SI_Occupation");
        }
    }
}
