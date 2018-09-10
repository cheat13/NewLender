using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
    public class Lender
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public List<Item> Items { get; set; }
    }




}
