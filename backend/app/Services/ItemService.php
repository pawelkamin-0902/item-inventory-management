<?php
namespace App\Services;

use App\Enums\ItemRarity;
use App\Events\ItemAdded;
use App\Events\ItemRemoved;
use App\Models\Item;
use Illuminate\Support\Facades\Cache;

class ItemService
{
    private const LIST_CACHE_KEY = 'items_list';

    public function list(): \Illuminate\Support\Collection
    {
        return Cache::remember(self::LIST_CACHE_KEY, 60, fn() => Item::orderBy('id', 'desc')->get());
    }

    public function add(array $payload): Item
    {
        $rarity = is_numeric($payload['rarity'])
            ? ItemRarity::from($payload['rarity'])
            : ItemRarity::fromLabel($payload['rarity']);

        $item = Item::create([
            'name' => $payload['name'],
            'type' => $payload['type'],
            'rarity' => $rarity,
            'quantity' => (int)$payload['quantity'],
        ]);

        Cache::forget(self::LIST_CACHE_KEY);
        event(new ItemAdded($item));

        return $item;
    }

    public function updateQuantity(int $id, int $quantity): Item
    {
        $item = Item::findOrFail($id);
        $item->update(['quantity' => $quantity]);
        Cache::forget(self::LIST_CACHE_KEY);
        return $item;
    }

    public function remove(int $id): void
    {
        $item = Item::findOrFail($id);
        $item->delete();
        Cache::forget(self::LIST_CACHE_KEY);
        event(new ItemRemoved($item));
    }

    public function getById(int $id): Item
    {
        return Item::findOrFail($id);
    }
}
