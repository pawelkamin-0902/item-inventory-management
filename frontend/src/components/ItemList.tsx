import { useEffect, useState, useCallback, useMemo } from "react";
import { getItems, removeItem } from "../api/items";
import type { Item } from "../api/items";
import ItemCard from "./ItemCard";
import ItemForm from "./ItemForm";
import ConfirmModal from "./ConfirmModal";
import { useNotification } from "../hooks/useNotification";
import { ANIMATION_CONFIG } from "../constants";

export default function ItemList() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; item: Item | null }>({
    isOpen: false,
    item: null
  });
  
  const { notification, showNotification, hideNotification } = useNotification();

  const load = useCallback(async () => {
    try {
      setLoading(true);
      const list = await getItems();
      setItems(list);
    } catch (error) {
      console.error('Failed to load items:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Optimistic update functions
  const updateItemQuantity = useCallback((itemId: number, newQuantity: number) => {
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  }, []);

  const removeItemFromList = useCallback((itemId: number) => {
    setItems(prevItems => prevItems.filter(item => item.id !== itemId));
  }, []);

  const addItemToList = useCallback((newItem: Item) => {
    setItems(prevItems => [newItem, ...prevItems]);
  }, []);

  const handleDeleteClick = useCallback((item: Item) => {
    setDeleteModal({ isOpen: true, item });
  }, []);

  const handleDeleteConfirm = useCallback(async () => {
    if (!deleteModal.item) return;
    
    const itemToDelete = deleteModal.item;
    setDeleteLoading(true);
    
    try {
      await removeItem(itemToDelete.id);
      removeItemFromList(itemToDelete.id);
      showNotification('success', `"${itemToDelete.name}" deleted successfully`);
    } catch (error) {
      console.error('Delete error:', error);
      showNotification('error', `Failed to delete "${itemToDelete.name}"`);
    } finally {
      setDeleteModal({ isOpen: false, item: null });
      setDeleteLoading(false);
    }
  }, [deleteModal.item, removeItemFromList]);

  const handleDeleteCancel = useCallback(() => {
    setDeleteModal({ isOpen: false, item: null });
  }, []);

  // Memoized stats calculation
  const stats = useMemo(() => ({
    totalQuantity: items.reduce((sum, item) => sum + item.quantity, 0),
    rarityTypes: new Set(items.map(item => item.rarity)).size
  }), [items]);

  useEffect(() => {
    load();
  }, [load]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Skeleton for Add Item Form */}
        <div className="card">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-gray-200 rounded-lg animate-pulse mr-3"></div>
            <div className="h-6 bg-gray-200 rounded animate-pulse w-32"></div>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="h-10 bg-gray-200 rounded-lg animate-pulse"></div>
              <div className="h-10 bg-gray-200 rounded-lg animate-pulse"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="h-10 bg-gray-200 rounded-lg animate-pulse"></div>
              <div className="h-10 bg-gray-200 rounded-lg animate-pulse"></div>
            </div>
            <div className="flex justify-end">
              <div className="h-10 bg-gray-200 rounded-lg animate-pulse w-24"></div>
            </div>
          </div>
        </div>

        {/* Skeleton for Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="card">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="h-5 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse mb-2 w-3/4"></div>
                  <div className="h-6 bg-gray-200 rounded-full animate-pulse w-16"></div>
                </div>
                <div className="w-12 h-12 bg-gray-200 rounded-xl animate-pulse"></div>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gray-200 rounded-lg animate-pulse"></div>
                  <div className="w-8 h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="w-8 h-8 bg-gray-200 rounded-lg animate-pulse"></div>
                </div>
                <div className="h-8 bg-gray-200 rounded animate-pulse w-16"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 px-4 py-2 rounded-lg shadow-lg ${
          notification.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        }`}>
          <div className="flex items-center justify-between">
            <span className="text-sm">{notification.message}</span>
            <button onClick={hideNotification} className="ml-2 text-white hover:text-gray-200">
              ×
            </button>
          </div>
        </div>
      )}

      {/* Add Item Form */}
      <div className="fade-in">
        <ItemForm onAdded={addItemToList} />
      </div>

      {/* Items Grid */}
      {items.length === 0 ? (
        <div className="card text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No items yet</h3>
          <p className="text-gray-500">Add your first item using the form above</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item, index) => (
            <div key={item.id} className="fade-in" style={{ animationDelay: `${index * ANIMATION_CONFIG.FADE_DELAY}s` }}>
              <ItemCard 
                item={item} 
                onQuantityUpdate={updateItemQuantity}
                onDeleteClick={handleDeleteClick}
              />
            </div>
          ))}
        </div>
      )}

      {/* Stats */}
      {items.length > 0 && (
        <div className="card">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">{items.length}</div>
              <div className="text-sm text-gray-600">Total Items</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">{stats.totalQuantity}</div>
              <div className="text-sm text-gray-600">Total Quantity</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">{stats.rarityTypes}</div>
              <div className="text-sm text-gray-600">Rarity Types</div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Delete Item"
        message={deleteModal.item ? `Are you sure you want to delete "${deleteModal.item.name}"? This action cannot be undone.` : ""}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
        loading={deleteLoading}
      />
    </div>
  );
}
