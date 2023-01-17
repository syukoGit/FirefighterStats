// -----------------------------------------------------------------------
//  <copyright project="FirefighterStats.Server" file="AccountController.cs" company="syuko">
//  Copyright (c) syuko. All rights reserved.
//  </copyright>
// -----------------------------------------------------------------------

namespace FirefighterStats.Server.Controllers;

using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using FirefighterStats.Server.Entities;
using FirefighterStats.Shared.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using JwtRegisteredClaimNames = Microsoft.IdentityModel.JsonWebTokens.JwtRegisteredClaimNames;
using SignInResult = Microsoft.AspNetCore.Identity.SignInResult;

[Route("api/[controller]")]
[ApiController]
public class AccountController : ControllerBase
{
    private readonly IConfiguration _configuration;

    private readonly SignInManager<Firefighter> _signInManager;

    private readonly UserManager<Firefighter> _userManager;

    public AccountController(IConfiguration configuration, UserManager<Firefighter> userManager, SignInManager<Firefighter> signInManager)
    {
        _configuration = configuration;
        _userManager = userManager;
        _signInManager = signInManager;
    }

    [HttpPost("login")]
    public async Task<ActionResult<LoginResultDTO>> Login([FromBody] LoginDTO login)
    {
        SignInResult result = await _signInManager.PasswordSignInAsync(login.UserName, login.Password, login.RememberMe, false);

        if (result.Succeeded)
        {
            JwtSecurityToken token = GenerateToken(login.UserName);

            return new LoginResultDTO
            {
                Token = new JwtSecurityTokenHandler().WriteToken(token),
                Expiration = token.ValidTo,
            };
        }

        return BadRequest("Username or password is invalid");
    }

    [HttpPost("register")]
    public async Task<ActionResult<RegisterResultDTO>> Register([FromBody] RegisterDTO register)
    {
        var user = new Firefighter
        {
            UserName = register.UserName,
            FirstName = register.FirstName,
            LastName = register.LastName,
            CareerStartDate = register.CareerStartDate,
            FireStation = register.FireStation,
            Rank = register.Rank,
            RegistrationNumber = register.RegistrationNumber,
        };

        IdentityResult result = await _userManager.CreateAsync(user, register.Password);

        if (result.Succeeded)
        {
            JwtSecurityToken token = GenerateToken(register.UserName);

            return new RegisterResultDTO
            {
                Token = new JwtSecurityTokenHandler().WriteToken(token),
                Expiration = token.ValidTo,
            };
        }

        return BadRequest(result.Errors);
    }

    private JwtSecurityToken GenerateToken(string userName)
    {
        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, userName),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"] ?? string.Empty));
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        return new JwtSecurityToken(_configuration["Jwt:Issuer"], _configuration["Jwt:Audience"], claims, expires: DateTime.Now.AddHours(2),
                                    signingCredentials: credentials);
    }
}