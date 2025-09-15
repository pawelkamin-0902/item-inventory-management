<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Enums\ItemRarity;

class Item extends Model
{
    protected $fillable = ['name','type','rarity','quantity'];
    protected $casts = [
        'rarity' => ItemRarity:: class
    ];
}
