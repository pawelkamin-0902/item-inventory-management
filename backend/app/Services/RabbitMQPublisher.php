<?php
namespace App\Services;

use PhpAmqpLib\Connection\AMQPStreamConnection;
use PhpAmqpLib\Message\AMQPMessage;

class RabbitMQPublisher
{
    protected \PhpAmqpLib\Channel\AMQPChannel $channel;

    public function __construct()
    {
        $conn = new AMQPStreamConnection(
            config('queue.connections.rabbitmq.hosts.0.host', env('RABBITMQ_HOST')),
            (int)config('queue.connections.rabbitmq.hosts.0.port', env('RABBITMQ_PORT', 5672)),
            config('queue.connections.rabbitmq.hosts.0.user', env('RABBITMQ_USER')),
            config('queue.connections.rabbitmq.hosts.0.password', env('RABBITMQ_PASSWORD')),
            config('queue.connections.rabbitmq.hosts.0.vhost', env('RABBITMQ_VHOST', '/')),
        );
        $this->channel = $conn->channel();
    }

    public function publish(string $queue, array $data): void
    {
        $this->channel->queue_declare($queue, false, true, false, false);
        $msg = new AMQPMessage(json_encode($data), [
            'content_type' => 'application/json',
            'delivery_mode' => 2,
        ]);
        $this->channel->basic_publish($msg, '', $queue);
    }

    public function __destruct()
    {
        try { $this->channel->close(); } catch (\Throwable) {}
    }
}
