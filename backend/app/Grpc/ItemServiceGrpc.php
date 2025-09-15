<?php
namespace App\Grpc;

use App\Services\ItemService;
use Inventory\ItemServiceInterface; // from generated stubs (adjust namespace)
use Inventory\GetItemRequest;
use Inventory\Item;
use Spiral\GRPC\Context;
use Spiral\RoadRunner\GRPC\ServiceInterface;

class ItemServiceGrpc implements ItemServiceInterface, ServiceInterface
{
    public function __construct(private \Illuminate\Contracts\Foundation\Application $laravel) {}

    public static function serviceName(): string
    {
        return ItemServiceInterface::NAME;
    }

    public function GetItemById(Context $ctx, GetItemRequest $in): Item
    {
        /** @var ItemService $svc */
        $svc = $this->laravel->make(ItemService::class);
        $model = $svc->getById($in->getId());

        $out = new Item();
        $out->setId($model->id);
        $out->setName($model->name);
        $out->setType($model->type);
        $out->setRarity($model->rarity->label());
        $out->setQuantity($model->quantity);
        return $out;
    }
}
