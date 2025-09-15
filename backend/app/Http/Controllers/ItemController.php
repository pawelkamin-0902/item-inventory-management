<?php

namespace App\Http\Controllers;

use App\Services\ItemService;
use Illuminate\Http\Request;

class ItemController extends Controller
{
    public function __construct(private ItemService $svc) {}

    public function index()
    {
        return response()->json($this->svc->list());
    }

    public function store(Request $req)
    {
        $data = $req->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|string|max:255',
            'rarity' => 'required', // accepts 0..4 or string label
            'quantity' => 'required|integer|min:0',
        ]);
        return response()->json($this->svc->add($data), 201);
    }

    public function updateQuantity(int $id, Request $req)
    {
        $data = $req->validate(['quantity' => 'required|integer|min:0']);
        return response()->json($this->svc->updateQuantity($id, $data['quantity']));
    }

    public function destroy(int $id)
    {
        $this->svc->remove($id);
        return response()->noContent();
    }
}
