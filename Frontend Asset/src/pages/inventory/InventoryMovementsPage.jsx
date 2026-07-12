
import { useState } from 'react'
import { Card, Button, DataTable, Search, Filter, Badge } from '@/components'
import { LuArrowLeft, LuArrowUp, LuArrowDown, LuPackage } from 'react-icons/lu'
import { useNavigate } from 'react-router-dom'

export function InventoryMovementsPage() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilters, setActiveFilters] = useState({})

  const movements = [
    { id: 1, item: 'Wireless Mouse', sku: 'ACC-001', type: 'Restock', quantity: 20, balance: 45, date: '2024-07-10 14:30', user: 'John Smith', reason: 'Regular restock' },
    { id: 2, item: 'USB-C Cable', sku: 'ACC-002', type: 'Restock', quantity: 50, balance: 120, date: '2024-07-10 10:15', user: 'Sarah Johnson', reason: 'Bulk order received' },
    { id: 3, item: 'Laptop Charger', sku: 'ACC-003', type: 'Issue', quantity: 5, balance: 8, date: '2024-07-09 16:45', user: 'Mike Chen', reason: 'Employee request' },
    { id: 4, item: 'HDMI Cable', sku: 'ACC-004', type: 'Issue', quantity: 10, balance: 0, date: '2024-07-08 11:20', user: 'Emily Davis', reason: 'Project requirement' },
    { id: 5, item: 'Monitor Stand', sku: 'ACC-005', type: 'Restock', quantity: 15, balance: 30, date: '2024-07-08 09:00', user: 'John Smith', reason: 'New shipment' },
  ]

  const columns = [
    { key: 'item', header: 'Item', sortable: true },
    { key: 'sku', header: 'SKU', sortable: true },
    { key: 'type', header: 'Type', render: (value) => (
      <Badge variant={value === 'Restock' ? 'success' : 'primary'} className="flex items-center gap-1">
        {value === 'Restock' ? <LuArrowUp className="h-3 w-3" /> : <LuArrowDown className="h-3 w-3" />}
        {value}
      </Badge>
    )},
    { key: 'quantity', header: 'Quantity', sortable: true },
    { key: 'balance', header: 'Balance', sortable: true },
    { key: 'date', header: 'Date & Time', sortable: true },
    { key: 'user', header: 'User', sortable: true },
    { key: 'reason', header: 'Reason', sortable: true },
  ]

  const filters = [
    { key: 'type', label: 'Type', type: 'select', options: [
      { value: '', label: 'All Types' },
      { value: 'Restock', label: 'Restock' },
      { value: 'Issue', label: 'Issue' },
    ]},
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Button variant="ghost" onClick={() => navigate('/inventory')} className="gap-2 mb-4">
            <LuArrowLeft className="h-5 w-5" /> Back to Inventory
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Stock Movements</h1>
            <p className="text-slate-600">Track all inventory stock in and out movements</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-blue-100">
                <LuPackage className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{movements.length}</p>
                <p className="text-sm text-slate-600">Total Movements</p>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-green-100">
                <LuArrowUp className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{movements.filter(m => m.type === 'Restock').length}</p>
                <p className="text-sm text-slate-600">Restocks</p>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-purple-100">
                <LuArrowDown className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{movements.filter(m => m.type === 'Issue').length}</p>
                <p className="text-sm text-slate-600">Issues</p>
              </div>
            </div>
          </Card>
        </div>

        <Card className="p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <Search
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search movements..."
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
            data={movements}
            pagination={{
              currentPage: 1,
              totalPages: 1,
              onPageChange: () => {},
              totalItems: movements.length
            }}
          />
        </Card>
      </div>
    </div>
  )
}

export default InventoryMovementsPage
