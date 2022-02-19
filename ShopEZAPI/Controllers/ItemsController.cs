using ShopEZAPI.Models;
using ShopEZAPI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;

namespace ShopEZAPI.Controllers;

[EnableCors("CorsPolicy")]
[ApiController]
[Route("api/[controller]")]
public class ItemsController : ControllerBase
{
    // Describe or do comments for comprehension
    private readonly ItemsService _itemsService;
    public ItemsController(ItemsService itemsService) =>
        _itemsService = itemsService;

    [HttpGet]
    public async Task<List<Item>> Get() =>
        await _itemsService.GetItemsAsync();

    [HttpGet("{id:length(24)}")]
    public async Task<ActionResult<Item>> GetItem(string id)
    {
        var item = await _itemsService.GetItemAsync(id);

        if (item is null)
        {
            return NotFound();
        }
        return item;
    }
    [HttpPost]
    public async Task<IActionResult> Post(Item newItem)
    {
        await _itemsService.CreateItemAsync(newItem);

        return CreatedAtAction(nameof(GetItem), new { id = newItem.ItemId }, newItem);
    }

    [HttpPut("{id:length(24)}")]
    public async Task<IActionResult> Update(string id, Item updatedItem)
    {
        var item = await _itemsService.GetItemAsync(id);

        if (item is null)
        {
            return NotFound();
        }

        updatedItem.ItemId = item.ItemId;

        await _itemsService.UpdateAsync(id, updatedItem);

        return NoContent();
    }

    [HttpDelete("{id:length(24)}")]
    public async Task<IActionResult> Delete(string id)
    {
        var item = await _itemsService.GetItemAsync(id);

        if (item is null)
        {
            return NotFound();
        }

        await _itemsService.RemoveItemAsync(id);

        return NoContent();
    }
}