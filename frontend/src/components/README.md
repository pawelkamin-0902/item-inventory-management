# Components

This folder contains reusable React components for the inventory management system.

## Components

### ConfirmModal
A beautiful, accessible confirmation modal for destructive actions.

**Features:**
- **Keyboard Support**: ESC key to close
- **Backdrop Click**: Click outside to close
- **Loading States**: Shows loading spinner during async operations
- **Multiple Types**: Danger, warning, and info variants
- **Accessibility**: Proper focus management and ARIA attributes

**Usage:**
```tsx
<ConfirmModal
  isOpen={showModal}
  onClose={() => setShowModal(false)}
  onConfirm={handleDelete}
  title="Delete Item"
  message="Are you sure you want to delete this item?"
  confirmText="Delete"
  cancelText="Cancel"
  type="danger"
  loading={isDeleting}
/>
```

**Props:**
- `isOpen`: boolean - Controls modal visibility
- `onClose`: () => void - Called when modal should close
- `onConfirm`: () => void - Called when user confirms action
- `title`: string - Modal title
- `message`: string - Modal message/description
- `confirmText`: string - Text for confirm button (default: "Confirm")
- `cancelText`: string - Text for cancel button (default: "Cancel")
- `type`: 'danger' | 'warning' | 'info' - Modal type (default: 'danger')
- `loading`: boolean - Shows loading state (default: false)

### ItemCard
Displays individual inventory items with quantity controls and delete functionality.

**Features:**
- **Optimistic Updates**: Instant UI feedback
- **Delete Confirmation**: Prevents accidental deletions
- **Rarity Display**: Color-coded rarity badges with icons
- **Loading States**: Visual feedback during operations
- **Responsive Design**: Works on all screen sizes

### ItemForm
Form for adding new inventory items.

**Features:**
- **Validation**: Required fields and proper input types
- **Rarity Selection**: Dropdown with all available rarities
- **Loading States**: Shows progress during submission
- **Form Reset**: Clears form after successful submission

### ItemList
Main container for displaying all inventory items.

**Features:**
- **Grid Layout**: Responsive grid (1-3 columns)
- **Empty State**: Helpful message when no items exist
- **Statistics**: Shows total items, quantities, and rarity types
- **Loading State**: Skeleton loading animation
- **Optimistic Updates**: Efficient state management
