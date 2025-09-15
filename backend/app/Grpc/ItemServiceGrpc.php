<?php
namespace App\Grpc;

use App\Services\ItemService;
use Inventory\ItemServiceInterface; // from generated stubs (adjust namespace)
use Inventory\GetItemRequest;
use Inventory\Item;
use Spiral\RoadRunner\GRPC\Context;
use Spiral\RoadRunner\GRPC\ServiceInterface;

class ItemServiceGrpc implements ItemServiceInterface, ServiceInterface
{
    public function __construct(private \Illuminate\Contracts\Foundation\Application $laravel) {}


    public function GetItemById(Context $ctx, GetItemRequest $in): Item
    {
        try {
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
        } catch (\Exception $e) {
            // Log the error for debugging
            error_log("gRPC GetItemById error: " . $e->getMessage());
            throw $e;
        }
    }
}
