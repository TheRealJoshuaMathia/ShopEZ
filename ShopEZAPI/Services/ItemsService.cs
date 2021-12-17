using ShopEZAPI.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace ShopEZAPI.Services;
public class ItemsService
{

    private readonly IMongoCollection<Item> _itemsCollection;
    public ItemsService(
        IOptions<ShopEZDatabaseSettings> shopEZDatabaseSettings)
    {
        var mongoClient = new MongoClient(
            shopEZDatabaseSettings.Value.ConnectionString);

        var mongoDatabase = mongoClient.GetDatabase(
            shopEZDatabaseSettings.Value.DatabaseName);
        _itemsCollection = mongoDatabase.GetCollection<Item>(
            shopEZDatabaseSettings.Value.ItemsCollectionName);
    }
    public async Task<List<Item>> GetItemsAsync() =>
        await _itemsCollection.Find(_ => true).ToListAsync();

    public async Task<Item?> GetItemAsync(string id) =>
        await _itemsCollection.Find(x => x.ItemId == id).FirstOrDefaultAsync();

    public async Task CreateItemAsync(Item newItem) =>
        await _itemsCollection.InsertOneAsync(newItem);

    public async Task UpdateAsync(string id, Item updatedItem) =>
        await _itemsCollection.ReplaceOneAsync(x => x.ItemId == id, updatedItem);

    public async Task RemoveItemAsync(string id) =>
        await _itemsCollection.DeleteOneAsync(x => x.ItemId == id);
}