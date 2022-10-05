﻿
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using api.Models;
using System.Runtime.CompilerServices;
using System.Collections;

namespace api.Data
{
    public class RecordRepository : Repository<Vehicle>
    {
        public RecordRepository(DbContext context) : base(context)
        {

        }
    }
}
