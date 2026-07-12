
import { useState } from 'react'
import { Card, Button, DataTable, Search, Drawer, Badge } from '@/components'
import { LuPlus, LuEdit, LuTrash, LuMapPin, LuArrowLeft } from 'react-icons/lu'
import { useNavigate } from 'react-router-dom'

export function InventoryLocationsPage() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState(null)

  const locations = [
    { id: 1, name: 'Storage A', address: '123 Main St, Floor 1', capacity: 500, currentItems: 320, status: 'Active' },
    { id: 2, name: 'Storage B', address: '123 Main St, Floor 2', capacity: 300, currentItems: 180, status: 'Active' },
    { id: 3, name: 'IT Room', address: '123 Main St, Floor 3', capacity: 100, currentItems: 45, status: 'Active' },
  ]

  const columns = [
    { key: 'name', header: 'Location Name', sortable: true },
    { key: 'address', header: 'Address', sortable: true },
    { key: 'capacity', header: 'Capacity', sortable: true },
    { key: 'currentItems', header: 'Current Items', sortable: true },
    { key: 'status', header: 'Status', render: (value) => (
      <Badge variant={value === 'Active' ? 'success' : 'secondary'}>
        {value}
      </Badge>
    )},
    { key: 'actions', header: 'Actions', render: (_, row) => (
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={() => { setSelectedLocation(row); setIsDrawerOpen(true) }} className="gap-1">
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
          <Button variant="ghost" onClick={() => navigate('/inventory')} className="gap-2 mb-4">
            <LuArrowLeft className="h-5 w-5" /> Back to Inventory
          </Button>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Storage Locations</h1>
              <p className="text-slate-600">Manage inventory storage locations</p>
            </div>
            <Button onClick={() => { setSelectedLocation(null); setIsDrawerOpen(true) }} size="lg" className="gap-2">
              <LuPlus className="h-5 w-5" /> Add Location
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-blue-100">
                <LuMapPin className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{locations.length}</p>
                <p className="text-sm text-slate-600">Total Locations</p>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-green-100">
                <LuMapPin className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{locations.reduce((sum, l) => sum + l.capacity, 0)}</p>
                <p className="text-sm text-slate-600">Total Capacity</p>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-purple-100">
                <LuMapPin className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{locations.reduce((sum, l) => sum + l.currentItems, 0)}</p>
                <p className="text-sm text-slate-600">Total Stored Items</p>
              </div>
            </div>
          </Card>
        </div>

        <Card className="p-6 mb-6">
          <Search
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search locations..."
          />
        </Card>

        <Card className="p-6">
          <DataTable
            columns={columns}
            data={locations}
            pagination={{
              currentPage: 1,
              totalPages: 1,
              onPageChange: () => {},
              totalItems: locations.length
            }}
          />
        </Card>

        <Drawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          title={selectedLocation ? 'Edit Location' : 'Add Location'}
          position="right"
          size="lg"
          footer={
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setIsDrawerOpen(false)}>Cancel</Button>
              <Button onClick={() => setIsDrawerOpen(false)}>
                {selectedLocation ? 'Update' : 'Create'} Location
              </Button>
            </div>
          }
        >
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Location Name</label>
              <input
                type="text"
                defaultValue={selectedLocation?.name || ''}
                placeholder="Enter location name"
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Address</label>
              <textarea
                defaultValue={selectedLocation?.address || ''}
                placeholder="Enter address"
                rows={3}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Capacity</label>
              <input
                type="number"
                defaultValue={selectedLocation?.capacity || ''}
                placeholder="Enter capacity"
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Status</label>
              <select
                defaultValue={selectedLocation?.status || 'Active'}
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

export default InventoryLocationsPage
