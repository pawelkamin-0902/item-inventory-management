<?php

namespace App\Listeners;

use App\Events\ItemRemoved;
use App\Services\RabbitMQPublisher;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class PublishItemRemoved
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
    public function handle(ItemRemoved $event): void
    {
        app(RabbitMQPublisher::class)->publish('item.removed', [
            'id' => $event->item->id,
            'name' => $event->item->name,
            'timestamp' => now()->toIso8601String(),
        ]);
    }
}
