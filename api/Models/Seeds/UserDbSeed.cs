﻿using Microsoft.EntityFrameworkCore;
using api.Controllers.Crypto;


namespace api.Models.Seeds
{
    public static class UserDbSeed
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using (var context = new AutoworksDBContext(
                serviceProvider.GetRequiredService<
                    DbContextOptions<AutoworksDBContext>>()))
            {
                if (context == null || context.Users == null)
                {
                    throw new ArgumentNullException("Null Context for Seed");
                }

                if (context.Users.Any())
                {
                    return;
                }

                EncrypterManager encrypterManager = new EncrypterManager(new SHA());
                context.Users.AddRange(
                    new User()
                    {
                        FirstName = "Admin",
                        LastName = "istrator",
                        Password = encrypterManager.Encrypt("admin"),
                        Type = UserType.ADMIN,
                        Username = "admin"
                    },
                    new User()
                    {
                        FirstName = "Emp",
                        LastName = "loyee",
                        Password = encrypterManager.Encrypt("employee"),
                        Type = UserType.EMPLOYEE,
                        Username = "employee"
                    }
               );

                context.SaveChanges();
            }
        }

    }
}