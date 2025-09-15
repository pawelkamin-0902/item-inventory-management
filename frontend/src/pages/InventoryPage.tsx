import ItemList from "../components/ItemList";

export default function InventoryPage() {
  return (
    <div className="main-content">
      {/* Header */}
      <header className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
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
