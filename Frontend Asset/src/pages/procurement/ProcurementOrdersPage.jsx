
import { useState } from 'react'
import { Card, Button, DataTable, Search, Filter, Drawer, Badge } from '@/components'
import { LuPlus, LuArrowLeft, LuEye, LuEdit, LuShoppingCart } from 'react-icons/lu'
import { useNavigate } from 'react-router-dom'

export function ProcurementOrdersPage() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilters, setActiveFilters] = useState({})
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState(null)

  const orders = [
    { id: 1, orderNumber: 'PO-2024-001', vendor: 'Tech Supplies Inc.', items: 5, total: '$1,250.00', status: 'Delivered', date: '2024-07-08', deliveryDate: '2024-07-10' },
    { id: 2, orderNumber: 'PO-2024-002', vendor: 'Office World', items: 3, total: '$450.00', status: 'Pending', date: '2024-07-10', deliveryDate: '2024-07-15' },
    { id: 3, orderNumber: 'PO-2024-003', vendor: 'IT Solutions Co.', items: 8, total: '$3,200.00', status: 'Shipped', date: '2024-07-09', deliveryDate: '2024-07-12' },
  ]

  const columns = [
    { key: 'orderNumber', header: 'Order #', sortable: true },
    { key: 'vendor', header: 'Vendor', sortable: true },
    { key: 'items', header: 'Items', sortable: true },
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
    { key: 'date', header: 'Order Date', sortable: true },
    { key: 'actions', header: 'Actions', render: (_, row) => (
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={() => { setSelectedOrder(row); setIsDrawerOpen(true) }} className="gap-1">
          <LuEye className="h-4 w-4" /> View
        </Button>
        <Button variant="outline" size="sm" className="gap-1">
          <LuEdit className="h-4 w-4" /> Edit
        </Button>
      </div>
    )},
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
          <Button variant="ghost" onClick={() => navigate('/procurement')} className="gap-2 mb-4">
            <LuArrowLeft className="h-5 w-5" /> Back to Procurement
          </Button>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Purchase Orders</h1>
              <p className="text-slate-600">Manage all purchase orders</p>
            </div>
            <Button onClick={() => { setSelectedOrder(null); setIsDrawerOpen(true) }} size="lg" className="gap-2">
              <LuPlus className="h-5 w-5" /> New Order
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-blue-100">
                <LuShoppingCart className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{orders.length}</p>
                <p className="text-sm text-slate-600">Total Orders</p>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-green-100">
                <LuShoppingCart className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{orders.filter(o => o.status === 'Delivered').length}</p>
                <p className="text-sm text-slate-600">Delivered</p>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-purple-100">
                <LuShoppingCart className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{orders.filter(o => o.status === 'Shipped').length}</p>
                <p className="text-sm text-slate-600">Shipped</p>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-yellow-100">
                <LuShoppingCart className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{orders.filter(o => o.status === 'Pending').length}</p>
                <p className="text-sm text-slate-600">Pending</p>
              </div>
            </div>
          </Card>
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
            data={orders}
            pagination={{
              currentPage: 1,
              totalPages: 1,
              onPageChange: () => {},
              totalItems: orders.length
            }}
          />
        </Card>

        <Drawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          title={selectedOrder ? 'Order Details' : 'Create Order'}
          position="right"
          size="xl"
          footer={
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setIsDrawerOpen(false)}>Cancel</Button>
              <Button onClick={() => setIsDrawerOpen(false)}>
                {selectedOrder ? 'Update' : 'Create'} Order
              </Button>
            </div>
          }
        >
          {selectedOrder ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
              <p className="text-sm text-slate-600">Order Number</p>
              <p className="text-lg font-semibold">{selectedOrder.orderNumber}</p>
            </div>
            <div>
              <p className="text-sm text-slate-600">Vendor</p>
              <p className="text-lg font-semibold">{selectedOrder.vendor}</p>
            </div>
            <div>
              <p className="text-sm text-slate-600">Total</p>
              <p className="text-lg font-semibold">{selectedOrder.total}</p>
            </div>
            <div>
              <p className="text-sm text-slate-600">Status</p>
              <Badge variant={
                selectedOrder.status === 'Delivered' ? 'success' :
                selectedOrder.status === 'Shipped' ? 'primary' :
                'warning'
              }>
                {selectedOrder.status}
              </Badge>
            </div>
          </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Vendor</label>
                <select className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Select vendor</option>
                  <option value="Tech Supplies Inc.">Tech Supplies Inc.</option>
                  <option value="Office World">Office World</option>
                  <option value="IT Solutions Co.">IT Solutions Co.</option>
                </select>
              </div>
            </div>
          )}
        </Drawer>
      </div>
    </div>
  )
}

export default ProcurementOrdersPage
