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
        IMongoCollection<BorrowList> BorrowList { get; set; }
        IMongoCollection<ReturnList> ReturnList { get; set; }

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
            BorrowList = database.GetCollection<BorrowList>("Lender_BorrowList");
            ReturnList = database.GetCollection<ReturnList>("Lender_ReturnList");
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

        [HttpGet("[action]/{name}")]
        public Locker GetLockerByName(string name)
        {
            var locker = Locker.Find(x => x.Name == name).FirstOrDefault();
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

        [HttpGet("[action]/{name}")]
        public Item GetItemByName(string name)
        {
            var item = Item.Find(x => x.Name == name).FirstOrDefault();
            return item;
        }

        [HttpPost("[action]")]
        public void CreateItem([FromBody]Item item)
        {
            item.Id = Guid.NewGuid().ToString();
            item.Amount = item.TotalAmount;
            item.BorrowAmount = 0;
            item.ReturnAmount = 0;
            Item.InsertOne(item);
        }

        [HttpPost("[action]")]
        public void EditItem([FromBody]Item item)
        {
            var _item = GetItem(item.Id);
            item.TotalAmount += item.Amount - _item.Amount;
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

        /// BorrowList
        
        [HttpGet("[action]")]
        public IEnumerable<BorrowList> GetAllBorrow()
        {
            var borrows = BorrowList.Find(x => true).ToList();
            return borrows;
        }
        
        [HttpGet("[action]/{lockerId}")]
        public IEnumerable<BorrowList> ListBorrow(string lockerId)
        {
            var borrows = BorrowList.Find(x => x.LockerId == lockerId).ToList();
            return borrows;
        }

        [HttpGet("[action]/{lenderId}")]
        public IEnumerable<BorrowList> GetBorrowLender(string lenderId)
        {
            var borrows = BorrowList.Find(x => (x.LenderId == lenderId || x.BuddyId == lenderId)).ToList();
            return borrows;
        }

        [HttpGet("[action]/{id}")]
        public BorrowList GetBorrow(string id)
        {
            var borrow = BorrowList.Find(x => x.Id == id).FirstOrDefault();
            return borrow;
        }
        
        [HttpPost("[action]")]
        public BorrowList CreateBorrow([FromBody]BorrowList borrowDetail)
        {
            var borrowItems = borrowDetail.Items.Where(x => x.BorrowAmount != 0).ToArray();

            BorrowList borrow = borrowDetail;
            borrow.Id = Guid.NewGuid().ToString();
            borrow.Items = borrowItems.ToList();
            borrow.Date = DateTime.UtcNow;
            
            BorrowList.InsertOne(borrow);

            return borrow;
        }

        [HttpPost("[action]")]
        public void EditBorrowList([FromBody]BorrowList borrowList)
        {

            BorrowList.ReplaceOne(x => x.Id == borrowList.Id, borrowList);
        }

        [HttpPost("[action]")]
        public void ConfirmBorrow([FromBody]BorrowList borrow)
        {
            var borrowItems = borrow.Items.ToArray();
            borrow.Date = DateTime.UtcNow;

            var items = ListItems(borrow.LockerId).ToArray();

            for (int i = 0; i < items.Length; i++)
            {
                for (int j = 0; j < borrowItems.Length; j++)
                {
                    if (items[i].Id == borrowItems[j].Id)
                    {
                        items[i].Amount -= borrowItems[j].BorrowAmount;
                    }
                }
            }

            foreach (var item in items)
            {
                EditItem(item);
            }
            
            BorrowList.ReplaceOne(x => x.Id == borrow.Id, borrow);
        }

        [HttpPost("[action]")]
        public void CancelBorrow([FromBody]BorrowList borrow)
        {
            BorrowList.DeleteOne(x => x.Id == borrow.Id);
        }

        /// ReturnList
        
        [HttpGet("[action]")]
        public IEnumerable<ReturnList> GetAllReturn()
        {
            var returnList = ReturnList.Find(x => true).ToList();
            return returnList;
        }

        [HttpGet("[action]/{lockerId}")]
        public IEnumerable<ReturnList> ListReturn(string lockerId)
        {
            var returnList = ReturnList.Find(x => x.LockerId == lockerId).ToList();
            return returnList;
        }

        [HttpGet("[action]/{lenderId}")]
        public IEnumerable<ReturnList> GetReturnListReturner(string lenderId)
        {
            var returnList = ReturnList.Find(x => (x.ReturnerId == lenderId || x.BuddyId == lenderId)).ToList();
            return returnList;
        }

        [HttpGet("[action]/{id}")]
        public ReturnList GetReturnList(string id)
        {
            var returnList = ReturnList.Find(x => x.Id == id).FirstOrDefault();
            return returnList;
        }

        [HttpPost("[action]")]
        public ReturnList CreateReturn([FromBody]ReturnList returnDetail)
        {
            var returnItems = returnDetail.Items.Where(x => x.ReturnAmount != 0).ToArray();

            ReturnList returnList = returnDetail;
            returnList.Id = Guid.NewGuid().ToString();
            returnList.Items = returnItems.ToList();
            returnList.Date = DateTime.UtcNow;

            ReturnList.InsertOne(returnList);

            return returnList;
        }

        [HttpPost("[action]")]
        public void ConfirmReturn([FromBody]ReturnList returnList)
        {
            var returnItems = returnList.Items.ToArray();
            returnList.Date = DateTime.UtcNow;


            var items = ListItems(returnList.LockerId).ToArray();


            for (int i = 0; i < items.Length; i++)
            {
                for (int j = 0; j < returnItems.Length; j++)
                {
                    if (items[i].Id == returnItems[j].Id)
                    {
                        items[i].Amount += returnItems[j].ReturnAmount;
                    }
                }
            }

            foreach (var item in items)
            {
                EditItem(item);
            }

            BorrowList borrowList = GetBorrow(returnList.BorrowListId);

            for (int i = 0; i < borrowList.Items.ToArray().Length; i++)
            {
                for (int j = 0; j < returnItems.Length; j++)
                {
                    if (borrowList.Items[i].Id == returnItems[j].Id)
                    {
                        borrowList.Items[i].BorrowAmount -= returnItems[j].ReturnAmount;
                    }
                }
            }

            var borrowItems = borrowList.Items.Where(x => x.BorrowAmount != 0).ToArray();

            if (borrowItems.Length == 0)
            {
                CancelBorrow(borrowList);
            }
            else
            {
                EditBorrowList(borrowList);
            }
            
            CancelReturn(returnList);
        }

        [HttpPost("[action]")]
        public void CancelReturn([FromBody]ReturnList returnList)
        {
            ReturnList.DeleteOne(x => x.Id == returnList.Id);
        }



    }
}
