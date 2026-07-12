
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, Button, DataTable, Search, Filter, Badge } from '@/components'
import { LuBox, LuPlus, LuLayers, LuArrowRightLeft, LuMapPin } from 'react-icons/lu'

export function InventoryPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilters, setActiveFilters] = useState({})

  const inventoryItems = [
    { id: 1, name: 'Wireless Mouse', sku: 'ACC-001', category: 'Accessories', quantity: 45, minStock: 10, status: 'In Stock', location: 'Storage A' },
    { id: 2, name: 'USB-C Cable', sku: 'ACC-002', category: 'Cables', quantity: 120, minStock: 50, status: 'In Stock', location: 'Storage A' },
    { id: 3, name: 'Laptop Charger', sku: 'ACC-003', category: 'Chargers', quantity: 8, minStock: 15, status: 'Low Stock', location: 'Storage B' },
    { id: 4, name: 'HDMI Cable', sku: 'ACC-004', category: 'Cables', quantity: 0, minStock: 20, status: 'Out of Stock', location: 'Storage A' },
    { id: 5, name: 'Monitor Stand', sku: 'ACC-005', category: 'Accessories', quantity: 30, minStock: 10, status: 'In Stock', location: 'Storage B' },
  ]

  const columns = [
    { key: 'name', header: 'Item Name', sortable: true },
    { key: 'sku', header: 'SKU', sortable: true },
    { key: 'category', header: 'Category', sortable: true },
    { key: 'quantity', header: 'Quantity', sortable: true },
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
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Inventory Management</h1>
              <p className="text-slate-600">Track and manage your inventory items</p>
            </div>
            <Button size="lg" className="gap-2">
              <LuPlus className="h-5 w-5" /> Add Item
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Link to="/inventory/stock" className="no-underline">
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-blue-100">
                  <LuBox className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">{inventoryItems.length}</p>
                  <p className="text-sm text-slate-600">Total Items</p>
                </div>
              </div>
            </Card>
          </Link>
          <Link to="/inventory/stock" className="no-underline">
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-green-100">
                  <LuBox className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">{inventoryItems.filter(i => i.status === 'In Stock').length}</p>
                  <p className="text-sm text-slate-600">In Stock</p>
                </div>
              </div>
            </Card>
          </Link>
          <Link to="/inventory/movements" className="no-underline">
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-purple-100">
                  <LuArrowRightLeft className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">120</p>
                  <p className="text-sm text-slate-600">Movements</p>
                </div>
              </div>
            </Card>
          </Link>
          <Link to="/inventory/locations" className="no-underline">
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-yellow-100">
                  <LuMapPin className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">2</p>
                  <p className="text-sm text-slate-600">Locations</p>
                </div>
              </div>
            </Card>
          </Link>
        </div>

        <Card className="p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <Search
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search inventory..."
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
            data={inventoryItems}
            pagination={{
              currentPage: 1,
              totalPages: 1,
              onPageChange: () => {},
              totalItems: inventoryItems.length
            }}
          />
        </Card>
      </div>
    </div>
  )
}

export default InventoryPage
