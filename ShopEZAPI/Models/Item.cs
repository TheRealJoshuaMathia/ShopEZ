using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ShopEZAPI.Models;
public class Item
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? ItemId { get; set; }

    [BsonElement("Title")]
    public string Title { get; set; } = null!;
    public string Type { get; set; } = null!;
    public string Catagory { get; set; } = null!;
    public string Store { get; set; } = null!;
    public int Quantity { get; set; }
}