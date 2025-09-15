<?php
require __DIR__ . '/vendor/autoload.php';

$app = require_once __DIR__ . '/bootstrap/app.php';
$app->make(\Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use Spiral\RoadRunner\GRPC\Server;
use App\Grpc\ItemServiceGrpc;

// Create server with default Invoker + options
$server = new Server();

// Register your service
$server->registerService(
    \Inventory\ItemServiceInterface::class,
    new ItemServiceGrpc($app)
);

// Start serving; Worker::create() is handled inside serve() if you pass nothing
$server->serve();
