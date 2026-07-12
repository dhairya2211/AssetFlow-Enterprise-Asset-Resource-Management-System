
import { useState } from 'react'
import { Card, Button, DataTable, Search, Filter, Drawer, Badge } from '@/components'
import { LuPlus, LuEdit, LuBox, LuArrowLeft } from 'react-icons/lu'
import { useNavigate } from 'react-router-dom'

export function InventoryStockPage() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilters, setActiveFilters] = useState({})
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)

  const stockItems = [
    { id: 1, name: 'Wireless Mouse', sku: 'ACC-001', category: 'Accessories', quantity: 45, minStock: 10, maxStock: 100, status: 'In Stock', location: 'Storage A', lastRestocked: '2024-07-05' },
    { id: 2, name: 'USB-C Cable', sku: 'ACC-002', category: 'Cables', quantity: 120, minStock: 50, maxStock: 200, status: 'In Stock', location: 'Storage A', lastRestocked: '2024-07-10' },
    { id: 3, name: 'Laptop Charger', sku: 'ACC-003', category: 'Chargers', quantity: 8, minStock: 15, maxStock: 50, status: 'Low Stock', location: 'Storage B', lastRestocked: '2024-06-20' },
    { id: 4, name: 'HDMI Cable', sku: 'ACC-004', category: 'Cables', quantity: 0, minStock: 20, maxStock: 100, status: 'Out of Stock', location: 'Storage A', lastRestocked: '2024-05-15' },
    { id: 5, name: 'Monitor Stand', sku: 'ACC-005', category: 'Accessories', quantity: 30, minStock: 10, maxStock: 60, status: 'In Stock', location: 'Storage B', lastRestocked: '2024-07-08' },
  ]

  const columns = [
    { key: 'name', header: 'Item Name', sortable: true },
    { key: 'sku', header: 'SKU', sortable: true },
    { key: 'quantity', header: 'Quantity', sortable: true },
    { key: 'minStock', header: 'Min Stock', sortable: true },
    { key: 'maxStock', header: 'Max Stock', sortable: true },
    { key: 'status', header: 'Status', render: (value) => (
      <Badge variant={
        value === 'In Stock' ? 'success' :
        value === 'Low Stock' ? 'warning' :
        'danger'
      }>
        {value}
      </Badge>
    )},
    { key: 'location', header: 'Location', sortable: true },
    { key: 'lastRestocked', header: 'Last Restocked', sortable: true },
    { key: 'actions', header: 'Actions', render: (_, row) => (
      <Button variant="outline" size="sm" onClick={() => { setSelectedItem(row); setIsDrawerOpen(true) }} className="gap-1">
        <LuEdit className="h-4 w-4" /> Adjust
      </Button>
    )},
  ]

  const filters = [
    { key: 'category', label: 'Category', type: 'select', options: [
      { value: '', label: 'All Categories' },
      { value: 'Accessories', label: 'Accessories' },
      { value: 'Cables', label: 'Cables' },
      { value: 'Chargers', label: 'Chargers' },
    ]},
    { key: 'status', label: 'Status', type: 'select', options: [
      { value: '', label: 'All Status' },
      { value: 'In Stock', label: 'In Stock' },
      { value: 'Low Stock', label: 'Low Stock' },
      { value: 'Out of Stock', label: 'Out of Stock' },
    ]},
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Button variant="ghost" onClick={() => navigate('/inventory')} className="gap-2 mb-4">
            <LuArrowLeft className="h-5 w-5" /> Back to Inventory
          </Button>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Stock Levels</h1>
              <p className="text-slate-600">Monitor and adjust inventory stock levels</p>
            </div>
            <Button onClick={() => { setSelectedItem(null); setIsDrawerOpen(true) }} size="lg" className="gap-2">
              <LuPlus className="h-5 w-5" /> Add Stock
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-blue-100">
                <LuBox className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{stockItems.length}</p>
                <p className="text-sm text-slate-600">Total Items</p>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-green-100">
                <LuBox className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{stockItems.filter(i => i.status === 'In Stock').length}</p>
                <p className="text-sm text-slate-600">In Stock</p>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-yellow-100">
                <LuBox className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{stockItems.filter(i => i.status === 'Low Stock').length}</p>
                <p className="text-sm text-slate-600">Low Stock</p>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-red-100">
                <LuBox className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{stockItems.filter(i => i.status === 'Out of Stock').length}</p>
                <p className="text-sm text-slate-600">Out of Stock</p>
              </div>
            </div>
          </Card>
        </div>

        <Card className="p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <Search
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search items..."
              className="flex-1"
            />
            <Filter
              filters={filters}
              activeFilters={activeFilters}
              onFilterChange={setActiveFilters}
              variant="dropdown"
            />
          </div>
        </Card>

        <Card className="p-6">
          <DataTable
            columns={columns}
            data={stockItems}
            pagination={{
              currentPage: 1,
              totalPages: 1,
              onPageChange: () => {},
              totalItems: stockItems.length
            }}
          />
        </Card>

        <Drawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          title={selectedItem ? 'Adjust Stock' : 'Add Stock'}
          position="right"
          size="lg"
          footer={
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setIsDrawerOpen(false)}>Cancel</Button>
              <Button onClick={() => setIsDrawerOpen(false)}>
                {selectedItem ? 'Update' : 'Add'} Stock
              </Button>
            </div>
          }
        >
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Item Name</label>
              <input
                type="text"
                defaultValue={selectedItem?.name || ''}
                placeholder="Enter item name"
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Quantity Change</label>
              <input
                type="number"
                placeholder="Enter quantity (positive to add, negative to remove)"
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Notes</label>
              <textarea
                placeholder="Enter notes about this stock adjustment"
                rows={4}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </Drawer>
      </div>
    </div>
  )
}

export default InventoryStockPage
