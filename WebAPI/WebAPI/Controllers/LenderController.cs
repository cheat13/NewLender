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
        }


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

        [HttpGet("[action]")]
        public IEnumerable<Item> GetAllItem()
        {
            var items = Item.Find(x => true).ToList();
            return items;
        }

        [HttpGet("[action]/{lenderID}")]
        public IEnumerable<Item> ListItemsLender(string lenderID)
        {
            var items = GetAllItem();
            var seletedItems = items.Where(x =>  x.Lenders?.Any(it => it.Id == lenderID && it.Borrow != 0) ?? false);

            return seletedItems;
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

        [HttpPost("[action]")]
        public void Borrow([FromBody]Lender lender)
        {
            Lender.ReplaceOne(x => x.Id == lender.Id, lender);


        }



    }
}
