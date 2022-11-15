// -----------------------------------------------------------------------
//  <copyright project="FirefighterStats.Server" file="Program.cs" company="syuko">
//  Copyright (c) syuko. All rights reserved.
//  </copyright>
// -----------------------------------------------------------------------

using FirefighterStats.Server.Data;
using FirefighterStats.Server.Entities;
using FirefighterStats.Server.Helpers;
using Microsoft.AspNetCore.Authentication;
using Microsoft.EntityFrameworkCore;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

builder.Services.AddAutoMapper(typeof(AutoMapperProfile));

builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("database")));
builder.Services.AddDatabaseDeveloperPageExceptionFilter();

builder.Services.AddDefaultIdentity<Firefighter>(static options => options.SignIn.RequireConfirmedAccount = true)
       .AddEntityFrameworkStores<ApplicationDbContext>();

builder.Services.AddIdentityServer().AddApiAuthorization<Firefighter, ApplicationDbContext>();

builder.Services.AddAuthentication().AddIdentityServerJwt();

builder.Services.AddControllersWithViews();
builder.Services.AddRazorPages();

WebApplication app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseMigrationsEndPoint();
    app.UseWebAssemblyDebugging();
}
else
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();

app.UseBlazorFrameworkFiles();
app.UseStaticFiles();

app.UseRouting();

app.UseIdentityServer();
app.UseAuthentication();
app.UseAuthorization();

app.MapRazorPages();
app.MapControllers();
app.MapFallbackToFile("index.html");

app.Run();