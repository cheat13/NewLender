using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Authentication;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using WebAPI.Models;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebAPI.Controllers
{
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    [Route("api/[controller]")]

    public class LenderController : Controller
    {
        IMongoCollection<Locker> Locker { get; set; }
        IMongoCollection<Item> Item { get; set; }
        IMongoCollection<Lender> Lender { get; set; }
        IMongoCollection<Borrow> Borrow { get; set; }

        public LenderController()
        {
            var settings = MongoClientSettings.FromUrl(new MongoUrl("mongodb://krit_NA:thegigclubna2522@ds125322.mlab.com:25322/kritna"));
            settings.SslSettings = new SslSettings()
            {
                EnabledSslProtocols = SslProtocols.Tls12
            };
            var mongoClient = new MongoClient(settings);
            var database = mongoClient.GetDatabase("kritna");
            Locker = database.GetCollection<Locker>("Lender_Locker");
            Item = database.GetCollection<Item>("Lender_Item");
            Lender = database.GetCollection<Lender>("Lender_Lender");
            Borrow = database.GetCollection<Borrow>("Lender_Borrow");
        }

        /// Locker

        [HttpGet("[action]")]
        public IEnumerable<Locker> ListLockers()
        {
            var lockers = Locker.Find(x => true).ToList();
            return lockers;
        }

        [HttpGet("[action]/{id}")]
        public Locker GetLocker(string id)
        {
            var locker = Locker.Find(x => x.Id == id).FirstOrDefault();
            return locker;
        }

        [HttpPost("[action]")]
        public void CreateLocker([FromBody]Locker locker)
        {
            locker.Id = Guid.NewGuid().ToString();
            Locker.InsertOne(locker);
        }

        [HttpPost("[action]")]
        public void EditLocker([FromBody]Locker locker)
        {
            Locker.ReplaceOne(x => x.Id == locker.Id, locker);
        }

        [HttpPost("[action]/{id}")]
        public void DeleteLocker(string id)
        {
            Locker.DeleteOne(x => x.Id == id);
        }

        /// Item

        [HttpGet("[action]")]
        public IEnumerable<Item> GetAllItem()
        {
            var items = Item.Find(x => true).ToList();
            return items;
        }


        [HttpGet("[action]/{Locker}")]
        public IEnumerable<Item> ListItems(string Locker)
        {
            var items = Item.Find(x => x.Locker == Locker).ToList();
            return items;
        }

        [HttpGet("[action]/{id}")]
        public Item GetItem(string id)
        {
            var item = Item.Find(x => x.Id == id).FirstOrDefault();
            return item;
        }

        [HttpPost("[action]")]
        public void CreateItem([FromBody]Item item)
        {
            item.Id = Guid.NewGuid().ToString();
            item.Amount = item.TotalAmount;
            item.Borrow = 0;
            Item.InsertOne(item);
        }

        [HttpPost("[action]")]
        public void EditItem([FromBody]Item item)
        {

            Item.ReplaceOne(x => x.Id == item.Id, item);
        }

        [HttpPost("[action]/{id}")]
        public void DeleteItem(string id)
        {
            Item.DeleteOne(x => x.Id == id);
        }

        /// User

        [HttpGet("[action]/{name}")]
        public Lender GetUser(string name)
        {
            var lender = Lender.Find(x => x.Name == name).FirstOrDefault();
            return lender;
        }

        [HttpPost("[action]")]
        public void CreateUser([FromBody]Lender lender)
        {
            lender.Id = Guid.NewGuid().ToString();
            Lender.InsertOne(lender);
        }

        /// Borrow


        [HttpGet("[action]")]
        public IEnumerable<Borrow> GetAllBorrow()
        {
            var borrows = Borrow.Find(x => true).ToList();
            return borrows;
        }
        
        [HttpGet("[action]/{lockerId}")]
        public IEnumerable<Borrow> ListBorrow(string lockerId)
        {
            var borrows = Borrow.Find(x => x.LockerId == lockerId).ToList();
            return borrows;
        }

        [HttpGet("[action]/{lenderId}")]
        public IEnumerable<Borrow> GetBorrowLender(string lenderId)
        {
            var borrows = Borrow.Find(x => (x.LenderId == lenderId || x.BuddyId == lenderId)).ToList();
            return borrows;
        }

        [HttpGet("[action]/{id}")]
        public Borrow GetBorrow(string id)
        {
            var borrow = Borrow.Find(x => x.Id == id).FirstOrDefault();
            return borrow;
        }

        [HttpPost("[action]")]
        public void CreateBorrow([FromBody]Borrow borrowDetail)
        {
            var borrowItems = borrowDetail.Items.Where(x => x.Borrow != 0).ToArray();

            Borrow borrow = borrowDetail;
            borrow.Id = Guid.NewGuid().ToString();
            borrow.Items = borrowItems.ToList();
            borrow.Date = DateTime.UtcNow;

            Borrow.InsertOne(borrow);

            var items = ListItems(borrow.LockerId).ToArray();
            
            for (int i = 0; i < items.Length; i++)
            {
                for (int j = 0; j < borrowItems.Length; j++)
                {
                    if (items[i].Id== borrowItems[j].Id)
                    {
                        items[i].Amount -= borrowItems[i].Borrow;
                        break;
                    }
                }
            }

            foreach (var item in items)
            {
                Item.ReplaceOne(x => x.Id == item.Id, item);
            }
        }

        [HttpPost("[action]")]
        public void ConfirmBorrow([FromBody]Borrow borrow)
        {
            Borrow.ReplaceOne(x => x.Id == borrow.Id, borrow);
        }

        [HttpPost("[action]")]
        public void CancelBorrow([FromBody]Borrow borrow)
        {
            Borrow.DeleteOne(x => x.Id == borrow.Id);
        }

        //[HttpGet("[action]/{lenderID}")]
        //public IEnumerable<Item> ListItemsLender(string lenderID)
        //{

        //    var borrows = GetBorrowLender(lenderID).ToArray();
        //    List<Item> itemsBorrow = null;
        //    foreach (var borrow in borrows)
        //    {
        //        itemsBorrow = borrow.Items.Where(x => x.Borrow != 0).ToList();
        //    }

        //    return itemsBorrow;
        //}



        //[HttpGet("[action]/{lenderID}")]
        //public IEnumerable<Item> ListItemsLender(string lenderID)
        //{
        //    var items = GetAllItem();
        //    var seletedItems = items.Where(x =>  x.Lenders?.Any(it => it.Id == lenderID && it.Borrow != 0) ?? false);

        //    return seletedItems;
        //}


    }
}
