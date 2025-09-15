<?php
namespace App\Enums;

enum ItemRarity: int
{
    case Common = 0;
    case Uncommon = 1;
    case Rare = 2;
    case Epic = 3;
    case Legendary = 4;

    public static function fromLabel(string $label): self
    {
        return match (strtolower($label)) {
            'common' => self::Common,
            'uncommon' => self::Uncommon,
            'rare' => self::Rare,
            'epic' => self::Epic,
            'legendary' => self::Legendary,
            default => throw new \InvalidArgumentException("Invalid rarity: $label"),
        };
    }

    public function label(): string
    {
        return ['common','uncommon','rare','epic','legendary'][$this->value];
    }
}
