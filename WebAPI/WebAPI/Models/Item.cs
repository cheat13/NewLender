﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
    public class Item
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Locker { get; set; }
        public string LockerName { get; set; }
        public int Amount { get; set; }
        public int TotalAmount { get; set; }
        public int BorrowAmount { get; set; }
        public int ReturnAmount { get; set; }
        public string Img { get; set; }
    }
}
