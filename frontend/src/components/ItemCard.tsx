import { useState } from "react";
import { updateQuantity } from "../api/items";
import type { Item } from "../api/items";
import { getRarityConfig, getRarityDisplay } from "../config";

interface ItemCardProps {
  item: Item;
  onQuantityUpdate: (itemId: number, newQuantity: number) => void;
  onDeleteClick: (item: Item) => void;
}

export default function ItemCard({ item, onQuantityUpdate, onDeleteClick }: ItemCardProps) {
  const [loading, setLoading] = useState<string | null>(null);
  const rarity = getRarityConfig(item.rarity);

  const handleQuantityUpdate = async (newQuantity: number, actionType: string) => {
    try {
      setLoading(actionType);
      onQuantityUpdate(item.id, newQuantity);
      await updateQuantity(item.id, newQuantity);
    } catch (error) {
      console.error(`Failed to ${actionType}:`, error);
      onQuantityUpdate(item.id, item.quantity);
    } finally {
      setLoading(null);
    }
  };

  const inc = () => handleQuantityUpdate(item.quantity + 1, 'increment');
  const dec = () => {
    if (item.quantity > 0) {
      handleQuantityUpdate(item.quantity - 1, 'decrement');
    }
  };
  const del = () => onDeleteClick(item);

  return (
    <div className="card group hover:shadow-lg hover-lift transition-all duration-200">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-1">
            {item.name}
          </h3>
          <p className="text-sm text-gray-600 mb-2">{item.type}</p>
          <div className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${rarity.bgColor} ${rarity.color} ${rarity.borderColor}`}>
            <span className="mr-1">{rarity.icon}</span>
            {getRarityDisplay(item.rarity)}
          </div>
        </div>
        
        {/* Quantity Badge */}
        <div className="flex items-center justify-center w-12 h-12 bg-blue-50 rounded-xl border-2 border-blue-100 transition-all duration-200">
          <span className="text-lg font-bold text-blue-600 transition-all duration-200">
            {item.quantity}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center space-x-2">
          <button
            onClick={dec}
            disabled={loading === 'decrement' || item.quantity <= 0}
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading === 'decrement' ? (
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
            )}
          </button>
          
          <span className="text-sm font-medium text-gray-700 min-w-[2rem] text-center transition-all duration-200">
            {item.quantity}
          </span>
          
          <button
            onClick={inc}
            disabled={loading === 'increment'}
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading === 'increment' ? (
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            )}
          </button>
        </div>

        <button
          onClick={del}
          disabled={loading === 'delete'}
          className="btn btn-danger text-xs px-3 py-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading === 'delete' ? (
            <>
              <svg className="animate-spin -ml-1 mr-1 h-3 w-3" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Deleting...
            </>
          ) : (
            <>
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Delete
            </>
          )}
        </button>
      </div>
    </div>
  );
}
