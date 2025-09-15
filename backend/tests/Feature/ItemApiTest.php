<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ItemApiTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();
        
        // Force use of PostgreSQL connection for tests
        config(['database.default' => 'pgsql']);
        config(['database.connections.pgsql.database' => 'inventory_db']);
    }
    /**
     * A basic feature test example.
     */
    public function test_example(): void
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }

    public function test_can_add_item(): void
    {
        // Test adding an item
        $response = $this->postJson('/api/items', [
            'name' => 'Test Potion', 
            'type' => 'consumable', 
            'rarity' => 'common', 
            'quantity' => 2,
        ]);
        
        $response->assertStatus(201);
        $response->assertJsonStructure([
            'id',
            'name',
            'type', 
            'rarity',
            'quantity',
            'created_at',
            'updated_at'
        ]);
    }

    public function test_can_list_items(): void
    {
        // Test listing items
        $response = $this->getJson('/api/items');
        $response->assertStatus(200);
        $response->assertJsonStructure([
            '*' => [
                'id',
                'name',
                'type',
                'rarity', 
                'quantity',
                'created_at',
                'updated_at'
            ]
        ]);
    }

    public function test_can_update_item_quantity(): void
    {
        // First create an item
        $createResponse = $this->postJson('/api/items', [
            'name' => 'Test Sword', 
            'type' => 'weapon', 
            'rarity' => 'rare', 
            'quantity' => 1,
        ]);
        
        $createResponse->assertStatus(201);
        $itemId = $createResponse->json('id');

        // Test updating quantity
        $updateResponse = $this->patchJson("/api/items/{$itemId}/quantity", [
            'quantity' => 5
        ]);
        
        $updateResponse->assertStatus(200);
        $updateResponse->assertJsonStructure([
            'id',
            'name',
            'type',
            'rarity',
            'quantity',
            'created_at',
            'updated_at'
        ]);
        
        $updateResponse->assertJson([
            'id' => $itemId,
            'name' => 'Test Sword',
            'quantity' => 5
        ]);
    }

    public function test_can_delete_item(): void
    {
        // First create an item
        $createResponse = $this->postJson('/api/items', [
            'name' => 'Test Shield', 
            'type' => 'armor', 
            'rarity' => 'epic', 
            'quantity' => 1,
        ]);
        
        $createResponse->assertStatus(201);
        $itemId = $createResponse->json('id');

        // Test deleting the item
        $deleteResponse = $this->deleteJson("/api/items/{$itemId}");
        $deleteResponse->assertStatus(204);

        // Verify item is deleted by checking it's not in the list
        $listResponse = $this->getJson('/api/items');
        $listResponse->assertStatus(200);
        
        // Check that the deleted item is not in the list
        $items = $listResponse->json();
        $deletedItem = collect($items)->firstWhere('id', $itemId);
        $this->assertNull($deletedItem, 'Deleted item should not be in the list');
    }

    public function test_can_find_item_in_list(): void
    {
        // First create an item
        $createResponse = $this->postJson('/api/items', [
            'name' => 'Test Bow', 
            'type' => 'weapon', 
            'rarity' => 'legendary', 
            'quantity' => 1,
        ]);
        
        $createResponse->assertStatus(201);
        $itemId = $createResponse->json('id');

        // Test finding the item in the list
        $listResponse = $this->getJson('/api/items');
        $listResponse->assertStatus(200);
        $listResponse->assertJsonStructure([
            '*' => [
                'id',
                'name',
                'type',
                'rarity',
                'quantity',
                'created_at',
                'updated_at'
            ]
        ]);
        
        // Find the specific item in the list
        $items = $listResponse->json();
        $foundItem = collect($items)->firstWhere('id', $itemId);
        
        $this->assertNotNull($foundItem, 'Created item should be found in the list');
        $this->assertEquals('Test Bow', $foundItem['name']);
        $this->assertEquals('weapon', $foundItem['type']);
        $this->assertEquals(4, $foundItem['rarity']); // legendary = 4
        $this->assertEquals(1, $foundItem['quantity']);
    }
}
