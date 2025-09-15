# Configuration Files

This folder contains configuration files for the application.

## Files

### `rarity.ts`
Contains the rarity configuration for items in the inventory system.

**Exports:**
- `RarityConfig` - TypeScript interface for rarity configuration
- `rarityConfig` - Object containing all rarity configurations
- `getRarityDisplay()` - Helper function to safely format rarity display text
- `getRarityConfig()` - Helper function to get rarity config with fallback

**Rarity Types:**
- **Common** (●) - Gray
- **Uncommon** (◆) - Green  
- **Rare** (♦) - Blue
- **Epic** (★) - Purple
- **Legendary** (✦) - Yellow

### `index.ts`
Barrel export file that re-exports all configuration modules for cleaner imports.

## Usage

```typescript
import { getRarityConfig, getRarityDisplay } from '../config';

// Get rarity configuration
const rarity = getRarityConfig(item.rarity);

// Safely format rarity display
const displayName = getRarityDisplay(item.rarity);
```

## Benefits

- **Centralized Configuration**: All rarity settings in one place
- **Type Safety**: TypeScript interfaces ensure correct usage
- **Error Handling**: Safe fallbacks for invalid rarity values
- **Maintainability**: Easy to add new rarities or modify existing ones
- **Reusability**: Can be used across multiple components
