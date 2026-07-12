
import { useState } from 'react'
import { Card, Button, DataTable, Search, Drawer, Badge } from '@/components'
import { LuPlus, LuArrowLeft, LuEdit, LuTrash, LuUsers } from 'react-icons/lu'
import { useNavigate } from 'react-router-dom'

export function ProcurementVendorsPage() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [selectedVendor, setSelectedVendor] = useState(null)

  const vendors = [
    { id: 1, name: 'Tech Supplies Inc.', contact: 'John Doe', email: 'john@techsupplies.com', phone: '+1 (555) 123-4567', status: 'Active', totalOrders: 15 },
    { id: 2, name: 'Office World', contact: 'Jane Smith', email: 'jane@officeworld.com', phone: '+1 (555) 234-5678', status: 'Active', totalOrders: 8 },
    { id: 3, name: 'IT Solutions Co.', contact: 'Mike Johnson', email: 'mike@itsolutions.com', phone: '+1 (555) 345-6789', status: 'Active', totalOrders: 12 },
  ]

  const columns = [
    { key: 'name', header: 'Vendor Name', sortable: true },
    { key: 'contact', header: 'Contact Person', sortable: true },
    { key: 'email', header: 'Email', sortable: true },
    { key: 'phone', header: 'Phone', sortable: true },
    { key: 'totalOrders', header: 'Total Orders', sortable: true },
    { key: 'status', header: 'Status', render: (value) => (
      <Badge variant={value === 'Active' ? 'success' : 'secondary'}>
        {value}
      </Badge>
    )},
    { key: 'actions', header: 'Actions', render: (_, row) => (
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={() => { setSelectedVendor(row); setIsDrawerOpen(true) }} className="gap-1">
          <LuEdit className="h-4 w-4" /> Edit
        </Button>
        <Button variant="danger" size="sm" className="gap-1">
          <LuTrash className="h-4 w-4" /> Delete
        </Button>
      </div>
    )},
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
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Vendors</h1>
              <p className="text-slate-600">Manage your procurement vendors</p>
            </div>
            <Button onClick={() => { setSelectedVendor(null); setIsDrawerOpen(true) }} size="lg" className="gap-2">
              <LuPlus className="h-5 w-5" /> Add Vendor
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-blue-100">
                <LuUsers className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{vendors.length}</p>
                <p className="text-sm text-slate-600">Total Vendors</p>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-green-100">
                <LuUsers className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{vendors.filter(v => v.status === 'Active').length}</p>
                <p className="text-sm text-slate-600">Active Vendors</p>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-purple-100">
                <LuUsers className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{vendors.reduce((sum, v) => sum + v.totalOrders, 0)}</p>
                <p className="text-sm text-slate-600">Total Orders</p>
              </div>
            </div>
          </Card>
        </div>

        <Card className="p-6 mb-6">
          <Search
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search vendors..."
          />
        </Card>

        <Card className="p-6">
          <DataTable
            columns={columns}
            data={vendors}
            pagination={{
              currentPage: 1,
              totalPages: 1,
              onPageChange: () => {},
              totalItems: vendors.length
            }}
          />
        </Card>

        <Drawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          title={selectedVendor ? 'Edit Vendor' : 'Add Vendor'}
          position="right"
          size="lg"
          footer={
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setIsDrawerOpen(false)}>Cancel</Button>
              <Button onClick={() => setIsDrawerOpen(false)}>
                {selectedVendor ? 'Update' : 'Create'} Vendor
              </Button>
            </div>
          }
        >
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Vendor Name</label>
              <input
                type="text"
                defaultValue={selectedVendor?.name || ''}
                placeholder="Enter vendor name"
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Contact Person</label>
              <input
                type="text"
                defaultValue={selectedVendor?.contact || ''}
                placeholder="Enter contact person"
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
              <input
                type="email"
                defaultValue={selectedVendor?.email || ''}
                placeholder="Enter email"
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Phone</label>
              <input
                type="tel"
                defaultValue={selectedVendor?.phone || ''}
                placeholder="Enter phone number"
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Status</label>
              <select
                defaultValue={selectedVendor?.status || 'Active'}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
        </Drawer>
      </div>
    </div>
  )
}

export default ProcurementVendorsPage
