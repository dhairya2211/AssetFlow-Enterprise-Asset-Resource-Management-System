
import { useState } from 'react'
import { Card, Button, DataTable, Search, Filter, Drawer, Badge } from '@/components'
import { LuPlus, LuArrowLeft, LuCheck, LuX, LuFileText } from 'react-icons/lu'
import { useNavigate } from 'react-router-dom'

export function ProcurementRequestsPage() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilters, setActiveFilters] = useState({})
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [selectedRequest, setSelectedRequest] = useState(null)

  const requests = [
    { id: 1, requestNumber: 'PR-2024-001', requester: 'Sarah Johnson', item: 'Wireless Mouse', quantity: 10, reason: 'New team members', status: 'Pending', date: '2024-07-10' },
    { id: 2, requestNumber: 'PR-2024-002', requester: 'Mike Chen', item: 'Monitor Stand', quantity: 5, reason: 'Office rearrangement', status: 'Approved', date: '2024-07-09' },
    { id: 3, requestNumber: 'PR-2024-003', requester: 'Emily Davis', item: 'HDMI Cable', quantity: 20, reason: 'Stock replenishment', status: 'Rejected', date: '2024-07-08' },
  ]

  const columns = [
    { key: 'requestNumber', header: 'Request #', sortable: true },
    { key: 'requester', header: 'Requester', sortable: true },
    { key: 'item', header: 'Item', sortable: true },
    { key: 'quantity', header: 'Quantity', sortable: true },
    { key: 'status', header: 'Status', render: (value) => (
      <Badge variant={
        value === 'Approved' ? 'success' :
        value === 'Pending' ? 'warning' :
        'danger'
      }>
        {value}
      </Badge>
    )},
    { key: 'date', header: 'Date', sortable: true },
    { key: 'actions', header: 'Actions', render: (_, row) => row.status === 'Pending' && (
      <div className="flex gap-2">
        <Button variant="outline" size="sm" className="gap-1">
          <LuCheck className="h-4 w-4" /> Approve
        </Button>
        <Button variant="danger" size="sm" className="gap-1">
          <LuX className="h-4 w-4" /> Reject
        </Button>
      </div>
    )},
  ]

  const filters = [
    { key: 'status', label: 'Status', type: 'select', options: [
      { value: '', label: 'All Statuses' },
      { value: 'Pending', label: 'Pending' },
      { value: 'Approved', label: 'Approved' },
      { value: 'Rejected', label: 'Rejected' },
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
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Purchase Requests</h1>
              <p className="text-slate-600">Manage procurement requests</p>
            </div>
            <Button onClick={() => { setSelectedRequest(null); setIsDrawerOpen(true) }} size="lg" className="gap-2">
              <LuPlus className="h-5 w-5" /> New Request
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-blue-100">
                <LuFileText className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{requests.length}</p>
                <p className="text-sm text-slate-600">Total Requests</p>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-yellow-100">
                <LuFileText className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{requests.filter(r => r.status === 'Pending').length}</p>
                <p className="text-sm text-slate-600">Pending</p>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-green-100">
                <LuFileText className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{requests.filter(r => r.status === 'Approved').length}</p>
                <p className="text-sm text-slate-600">Approved</p>
              </div>
            </div>
          </Card>
        </div>

        <Card className="p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <Search
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search requests..."
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
            data={requests}
            pagination={{
              currentPage: 1,
              totalPages: 1,
              onPageChange: () => {},
              totalItems: requests.length
            }}
          />
        </Card>

        <Drawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          title={selectedRequest ? 'Request Details' : 'New Request'}
          position="right"
          size="lg"
          footer={
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setIsDrawerOpen(false)}>Cancel</Button>
              <Button onClick={() => setIsDrawerOpen(false)}>
                {selectedRequest ? 'Update' : 'Submit'} Request
              </Button>
            </div>
          }
        >
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Item</label>
              <input
                type="text"
                defaultValue={selectedRequest?.item || ''}
                placeholder="Enter item name"
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Quantity</label>
              <input
                type="number"
                defaultValue={selectedRequest?.quantity || ''}
                placeholder="Enter quantity"
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Reason</label>
              <textarea
                defaultValue={selectedRequest?.reason || ''}
                placeholder="Enter reason"
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

export default ProcurementRequestsPage
