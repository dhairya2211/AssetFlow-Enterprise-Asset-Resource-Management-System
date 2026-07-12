import { useState } from 'react'
import { Card, Button, DataTable, Drawer, Badge } from '@/components'
import { LuPlus, LuArrowRightLeft, LuArrowDown, LuArrowUp, LuHistory } from 'react-icons/lu'

export function AllocationPage() {
  const [isAllocateDrawerOpen, setIsAllocateDrawerOpen] = useState(false)
  const [isTransferDrawerOpen, setIsTransferDrawerOpen] = useState(false)
  const [isReturnDrawerOpen, setIsReturnDrawerOpen] = useState(false)
  const [isHistoryDrawerOpen, setIsHistoryDrawerOpen] = useState(false)

  const allocations = [
    { id: 1, assetName: 'MacBook Pro 16"', employee: 'John Smith', department: 'Engineering', status: 'Active', allocatedDate: '2023-06-01', returnDate: null },
    { id: 2, assetName: 'Dell XPS 15', employee: 'Sarah Johnson', department: 'Design', status: 'Active', allocatedDate: '2023-08-10', returnDate: null },
    { id: 3, assetName: 'iPad Pro 12.9"', employee: 'Mike Chen', department: 'Sales', status: 'Returned', allocatedDate: '2023-09-15', returnDate: '2024-01-20' },
    { id: 4, assetName: 'iPhone 15 Pro', employee: 'Emily Davis', department: 'Marketing', status: 'Active', allocatedDate: '2023-11-01', returnDate: null }
  ]

  const history = [
    { id: 1, action: 'Allocated', assetName: 'MacBook Pro 16"', user: 'John Smith', date: '2023-06-01', notes: 'For new project' },
    { id: 2, action: 'Transferred', assetName: 'Dell XPS 15', user: 'Sarah Johnson', date: '2023-10-15', notes: 'From IT to Design' },
    { id: 3, action: 'Returned', assetName: 'iPad Pro 12.9"', user: 'Mike Chen', date: '2024-01-20', notes: 'Project completed' },
    { id: 4, action: 'Allocated', assetName: 'iPhone 15 Pro', user: 'Emily Davis', date: '2023-11-01', notes: 'For remote work' }
  ]

  const columns = [
    { key: 'assetName', header: 'Asset', sortable: true },
    { key: 'employee', header: 'Employee', sortable: true },
    { key: 'department', header: 'Department', sortable: true },
    { 
      key: 'status', 
      header: 'Status',
      render: (value) => (
        <Badge variant={value === 'Active' ? 'primary' : 'secondary'}>
          {value}
        </Badge>
      )
    },
    { key: 'allocatedDate', header: 'Allocated On', sortable: true },
    {
      key: 'actions',
      header: 'Actions',
      render: (_, row) => (
        <div className="flex gap-2">
          {row.status === 'Active' && (
            <>
              <Button variant="outline" size="sm" onClick={() => setIsTransferDrawerOpen(true)} className="gap-1">
                <LuArrowRightLeft className="h-4 w-4" />
                Transfer
              </Button>
              <Button variant="outline" size="sm" onClick={() => setIsReturnDrawerOpen(true)} className="gap-1">
                <LuArrowDown className="h-4 w-4" />
                Return
              </Button>
            </>
          )}
        </div>
      )
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Allocation Management</h1>
              <p className="text-slate-600">Manage asset allocations and transfers</p>
            </div>
            <div className="flex gap-3">
              <Button onClick={() => setIsHistoryDrawerOpen(true)} variant="outline" className="gap-2">
                <LuHistory className="h-5 w-5" />
                History
              </Button>
              <Button onClick={() => setIsAllocateDrawerOpen(true)} size="lg" className="gap-2">
                <LuPlus className="h-5 w-5" />
                Allocate Asset
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-blue-100">
                <LuPlus className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">4</p>
                <p className="text-sm text-slate-600">Total Allocations</p>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-green-100">
                <LuArrowUp className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">3</p>
                <p className="text-sm text-slate-600">Active</p>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-purple-100">
                <LuArrowRightLeft className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">1</p>
                <p className="text-sm text-slate-600">Transferred</p>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-yellow-100">
                <LuArrowDown className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">1</p>
                <p className="text-sm text-slate-600">Returned</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Allocation Table */}
        <Card className="p-6">
          <DataTable
            columns={columns}
            data={allocations}
            pagination={{
              currentPage: 1,
              totalPages: 1,
              onPageChange: () => {},
              totalItems: allocations.length
            }}
          />
        </Card>

        {/* Allocate Drawer */}
        <Drawer
          isOpen={isAllocateDrawerOpen}
          onClose={() => setIsAllocateDrawerOpen(false)}
          title="Allocate New Asset"
          position="right"
          size="lg"
          footer={
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setIsAllocateDrawerOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsAllocateDrawerOpen(false)}>
                Allocate Asset
              </Button>
            </div>
          }
        >
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Asset</label>
              <select className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Select Asset</option>
                <option value="macbook">MacBook Pro 16"</option>
                <option value="iphone">iPhone 15 Pro</option>
                <option value="samsung">Samsung Monitor</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Employee</label>
              <select className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Select Employee</option>
                <option value="john">John Smith</option>
                <option value="sarah">Sarah Johnson</option>
                <option value="mike">Mike Chen</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Notes</label>
              <textarea
                rows={3}
                placeholder="Enter notes..."
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
          </div>
        </Drawer>

        {/* Transfer Drawer */}
        <Drawer
          isOpen={isTransferDrawerOpen}
          onClose={() => setIsTransferDrawerOpen(false)}
          title="Transfer Asset"
          position="right"
          size="lg"
          footer={
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setIsTransferDrawerOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsTransferDrawerOpen(false)}>
                Transfer Asset
              </Button>
            </div>
          }
        >
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">To Employee</label>
              <select className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Select Employee</option>
                <option value="john">John Smith</option>
                <option value="sarah">Sarah Johnson</option>
                <option value="mike">Mike Chen</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Notes</label>
              <textarea
                rows={3}
                placeholder="Enter notes..."
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
          </div>
        </Drawer>

        {/* Return Drawer */}
        <Drawer
          isOpen={isReturnDrawerOpen}
          onClose={() => setIsReturnDrawerOpen(false)}
          title="Return Asset"
          position="right"
          size="lg"
          footer={
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setIsReturnDrawerOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsReturnDrawerOpen(false)}>
                Return Asset
              </Button>
            </div>
          }
        >
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Condition</label>
              <select className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Select Condition</option>
                <option value="excellent">Excellent</option>
                <option value="good">Good</option>
                <option value="fair">Fair</option>
                <option value="needs-repair">Needs Repair</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Notes</label>
              <textarea
                rows={3}
                placeholder="Enter notes..."
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
          </div>
        </Drawer>

        {/* History Timeline Drawer */}
        <Drawer
          isOpen={isHistoryDrawerOpen}
          onClose={() => setIsHistoryDrawerOpen(false)}
          title="Allocation History"
          position="right"
          size="xl"
        >
          <div className="space-y-6">
            {history.map((item, index) => (
              <div key={item.id} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                    {item.action.charAt(0)}
                  </div>
                  {index < history.length - 1 && (
                    <div className="w-0.5 flex-1 bg-slate-200 my-2" />
                  )}
                </div>
                <div className="flex-1 pb-8">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-lg font-semibold text-slate-900">{item.assetName}</h3>
                    <Badge variant={
                      item.action === 'Allocated' ? 'primary' : 
                      item.action === 'Transferred' ? 'warning' : 
                      'secondary'
                    }>
                      {item.action}
                    </Badge>
                  </div>
                  <p className="text-slate-600 mb-1">{item.user} • {item.date}</p>
                  <p className="text-sm text-slate-500">{item.notes}</p>
                </div>
              </div>
            ))}
          </div>
        </Drawer>

      </div>
    </div>
  )
}

export default AllocationPage
