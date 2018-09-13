using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
    public class ReturnList
    {
        public string Id { get; set; }
        public string BorrowListId { get; set; }
        public string LockerId { get; set; }
        public string LockerName { get; set; }
        public string LockerCate { get; set; }
        public string ReturnerId { get; set; }
        public string ReturnerName { get; set; }
        public string BuddyId { get; set; }
        public string BuddyName { get; set; }
        public DateTime? Date { get; set; }
        public List<Item> Items { get; set; }
    }
}
