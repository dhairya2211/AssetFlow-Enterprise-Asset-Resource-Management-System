
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, Button, DataTable, Search, Filter, Badge } from '@/components'
import { LuShoppingCart, LuPlus, LuFileText, LuUsers, LuPackage } from 'react-icons/lu'

export function ProcurementPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilters, setActiveFilters] = useState({})

  const recentOrders = [
    { id: 1, orderNumber: 'PO-2024-001', vendor: 'Tech Supplies Inc.', total: '$1,250.00', status: 'Delivered', date: '2024-07-08' },
    { id: 2, orderNumber: 'PO-2024-002', vendor: 'Office World', total: '$450.00', status: 'Pending', date: '2024-07-10' },
    { id: 3, orderNumber: 'PO-2024-003', vendor: 'IT Solutions Co.', total: '$3,200.00', status: 'Shipped', date: '2024-07-09' },
  ]

  const columns = [
    { key: 'orderNumber', header: 'Order #', sortable: true },
    { key: 'vendor', header: 'Vendor', sortable: true },
    { key: 'total', header: 'Total', sortable: true },
    { key: 'status', header: 'Status', render: (value) => (
      <Badge variant={
        value === 'Delivered' ? 'success' :
        value === 'Shipped' ? 'primary' :
        'warning'
      }>
        {value}
      </Badge>
    )},
    { key: 'date', header: 'Date', sortable: true },
  ]

  const filters = [
    { key: 'status', label: 'Status', type: 'select', options: [
      { value: '', label: 'All Statuses' },
      { value: 'Pending', label: 'Pending' },
      { value: 'Shipped', label: 'Shipped' },
      { value: 'Delivered', label: 'Delivered' },
    ]},
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Procurement</h1>
              <p className="text-slate-600">Manage purchase orders, vendors, and requests</p>
            </div>
            <Button size="lg" className="gap-2">
              <LuPlus className="h-5 w-5" /> New Order
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Link to="/procurement/orders" className="no-underline">
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-blue-100">
                  <LuShoppingCart className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">{recentOrders.length}</p>
                  <p className="text-sm text-slate-600">Total Orders</p>
                </div>
              </div>
            </Card>
          </Link>
          <Link to="/procurement/orders" className="no-underline">
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-yellow-100">
                  <LuShoppingCart className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">{recentOrders.filter(o => o.status === 'Pending').length}</p>
                  <p className="text-sm text-slate-600">Pending Orders</p>
                </div>
              </div>
            </Card>
          </Link>
          <Link to="/procurement/vendors" className="no-underline">
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-green-100">
                  <LuUsers className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">3</p>
                  <p className="text-sm text-slate-600">Vendors</p>
                </div>
              </div>
            </Card>
          </Link>
          <Link to="/procurement/requests" className="no-underline">
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-purple-100">
                  <LuFileText className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">5</p>
                  <p className="text-sm text-slate-600">Requests</p>
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
              placeholder="Search orders..."
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
            data={recentOrders}
            pagination={{
              currentPage: 1,
              totalPages: 1,
              onPageChange: () => {},
              totalItems: recentOrders.length
            }}
          />
        </Card>
      </div>
    </div>
  )
}

export default ProcurementPage
