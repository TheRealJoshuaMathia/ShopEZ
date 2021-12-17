using ShopEZAPI.Models;
using ShopEZAPI.Services;

var builder = WebApplication.CreateBuilder(args);


//Cors
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "CorsPolicy",
        builder =>
        {
            builder.WithOrigins("https://localhost");
        });
});

// Add services to the container.
builder.Services.Configure<ShopEZDatabaseSettings>(
    builder.Configuration.GetSection("ShopEZDatabase"));
builder.Services.AddSingleton<ItemsService>();
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors();
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
