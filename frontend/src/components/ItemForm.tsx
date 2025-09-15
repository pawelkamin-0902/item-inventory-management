import { useState } from "react";
import { addItem } from "../api/items";
import { rarityConfig } from "../config";

const rarities = Object.entries(rarityConfig).map(([value, config]) => ({
  value,
  label: config.label,
  color: config.color
}));

interface ItemFormProps {
  onAdded: (newItem: any) => void;
}

export default function ItemForm({ onAdded }: ItemFormProps) {
  const [form, setForm] = useState({ name: "", type: "", rarity: "common", quantity: 1 });
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.type.trim()) return;
    
    try {
      setLoading(true);
      const newItem = await addItem(form);
      setForm({ name: "", type: "", rarity: "common", quantity: 1 });
      onAdded(newItem);
    } catch (error) {
      console.error('Failed to add item:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <div className="flex items-center mb-4">
        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-gray-800">Add New Item</h2>
      </div>

      <form onSubmit={submit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Item Name *
            </label>
            <input
              className="input"
              placeholder="Enter item name"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Item Type *
            </label>
            <input
              className="input"
              placeholder="Enter item type"
              value={form.type}
              onChange={e => setForm({ ...form, type: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rarity
            </label>
            <select
              className="input"
              value={form.rarity}
              onChange={e => setForm({ ...form, rarity: e.target.value })}
            >
              {rarities.map(r => (
                <option key={r.value} value={r.value}>
                  {r.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quantity
            </label>
            <input
              type="number"
              min={1}
              max={999}
              className="input"
              value={form.quantity}
              onChange={e => setForm({ ...form, quantity: +e.target.value })}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading || !form.name.trim() || !form.type.trim()}
            className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Adding...
              </>
            ) : (
              <>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Item
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
