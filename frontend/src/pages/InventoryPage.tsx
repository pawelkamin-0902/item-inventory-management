import ItemList from "../components/ItemList";

export default function InventoryPage() {
  return (
    <div className="main-content">
      {/* Header */}
      <header className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Inventory Manager</h1>
        <p className="text-gray-600 text-lg">Manage your items with ease</p>
      </header>

      {/* Main Content */}
      <div>
        <ItemList />
      </div>
    </div>
  );
}
