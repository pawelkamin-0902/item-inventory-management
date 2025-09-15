export interface RarityConfig {
  color: string;
  bgColor: string;
  borderColor: string;
  icon: string;
  label: string;
}

export const rarityConfig: Record<string, RarityConfig> = {
  common: {
    color: "text-gray-700",
    bgColor: "bg-gray-100",
    borderColor: "border-gray-200",
    icon: "●",
    label: "Common"
  },
  uncommon: {
    color: "text-green-700",
    bgColor: "bg-green-100",
    borderColor: "border-green-200",
    icon: "◆",
    label: "Uncommon"
  },
  rare: {
    color: "text-blue-700",
    bgColor: "bg-blue-100",
    borderColor: "border-blue-200",
    icon: "♦",
    label: "Rare"
  },
  epic: {
    color: "text-purple-700",
    bgColor: "bg-purple-100",
    borderColor: "border-purple-200",
    icon: "★",
    label: "Epic"
  },
  legendary: {
    color: "text-yellow-700",
    bgColor: "bg-yellow-100",
    borderColor: "border-yellow-200",
    icon: "✦",
    label: "Legendary"
  },
};

// Helper function to safely format rarity display
export const getRarityDisplay = (rarity: unknown): string => {
  if (typeof rarity === 'string') {
    // If it's already a proper label, return it
    const config = getRarityConfig(rarity);
    if (config.label === rarity) {
      return rarity;
    }
    // Otherwise capitalize it
    return rarity.charAt(0).toUpperCase() + rarity.slice(1);
  }
  
  // Fallback if rarity is not a string
  return getRarityConfig(rarity).label;
};

// Helper function to get rarity config with fallback
export const getRarityConfig = (rarity: unknown): RarityConfig => {
  // Handle numeric rarity values (0-4 from backend enum)
  if (typeof rarity === 'number') {
    const rarityKeys = ['common', 'uncommon', 'rare', 'epic', 'legendary'];
    const rarityKey = rarityKeys[rarity];
    if (rarityKey && rarityConfig[rarityKey]) {
      return rarityConfig[rarityKey];
    }
  }
  
  const rarityStr = String(rarity).toLowerCase();
  
  // First try to find by key (common, uncommon, etc.)
  if (rarityConfig[rarityStr]) {
    return rarityConfig[rarityStr];
  }
  
  // Then try to find by label (Common, Uncommon, etc.)
  const configEntry = Object.entries(rarityConfig).find(
    ([_, config]) => config.label.toLowerCase() === rarityStr
  );
  
  if (configEntry) {
    return configEntry[1];
  }
  
  // Debug: Log unknown rarity values to help identify the issue
  if (process.env.NODE_ENV === 'development') {
    console.warn('Unknown rarity value:', rarity, 'Type:', typeof rarity);
  }
  
  // Fallback to common if nothing matches
  return rarityConfig.common;
};
