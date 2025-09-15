<?php

namespace App\Listeners;

use App\Events\ItemAdded;
use App\Services\RabbitMQPublisher;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class PublishItemAdded
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(ItemAdded $event): void
    {
        app(RabbitMQPublisher::class)->publish('item.added', [
            'id' => $event->item->id,
            'name' => $event->item->name,
            'type' => $event->item->type,
            'rarity' => $event->item->rarity->label(),
            'quantity' => $event->item->quantity,
            'timestamp' => now()->toIso8601String(),
        ]);
    }
}
