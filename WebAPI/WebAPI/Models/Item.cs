using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
    public class Item
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public int Amount { get; set; }
        public int BAmount { get; set; }
        public int TotalAmount { get; set; }
        public string Locker { get; set; }
        public bool Status { get; set; }
        public bool Borrow { get; set; }
    }
}
