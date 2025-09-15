<?php
namespace Inventory;

use Spiral\GRPC\Context;

interface ItemServiceInterface
{
    public const NAME = 'inventory.ItemService';
    
    public function GetItemById(Context $ctx, GetItemRequest $in): Item;
}
