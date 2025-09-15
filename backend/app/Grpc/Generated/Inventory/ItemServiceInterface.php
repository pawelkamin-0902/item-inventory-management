<?php
namespace Inventory;

use Spiral\RoadRunner\GRPC\Context;

interface ItemServiceInterface
{
    public const NAME = 'inventory.ItemService';
    
    public function GetItemById(Context $ctx, GetItemRequest $in): Item;
}
