import { useState } from 'react'
import { Card, Button, DataTable, Search, Filter, Drawer, Badge } from '@/components'
import { LuPlus, LuPackage, LuDollarSign, LuCalendar, LuMapPin } from 'react-icons/lu'

export function AssetsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [selectedAsset, setSelectedAsset] = useState(null)

  const assets = [
    { id: 1, name: 'MacBook Pro 16"', category: 'Laptops', status: 'Available', location: 'Office A', value: '$2,499', purchaseDate: '2023-05-15' },
    { id: 2, name: 'Dell XPS 15', category: 'Laptops', status: 'In Use', location: 'Office B', value: '$1,999', purchaseDate: '2023-07-20' },
    { id: 3, name: 'iPhone 15 Pro', category: 'Mobile Devices', status: 'Available', location: 'Storage', value: '$1,199', purchaseDate: '2023-10-01' },
    { id: 4, name: 'iPad Pro 12.9"', category: 'Tablets', status: 'In Use', location: 'Conference Room', value: '$1,099', purchaseDate: '2023-09-12' },
    { id: 5, name: 'Samsung Monitor', category: 'Displays', status: 'Maintenance', location: 'IT Room', value: '$499', purchaseDate: '2023-03-25' },
    { id: 6, name: 'HP LaserJet Printer', category: 'Printers', status: 'Available', location: 'Storage', value: '$299', purchaseDate: '2023-01-10' }
  ]

  const columns = [
    { key: 'name', header: 'Asset Name', sortable: true },
    { key: 'category', header: 'Category', sortable: true },
    { 
      key: 'status', 
      header: 'Status',
      render: (value) => (
        <Badge 
          variant={
            value === 'Available' ? 'success' : 
            value === 'In Use' ? 'primary' : 
            'warning'
          }
        >
          {value}
        </Badge>
      )
    },
    { key: 'location', header: 'Location', sortable: true },
    { key: 'value', header: 'Value', sortable: true },
    { key: 'purchaseDate', header: 'Purchase Date', sortable: true }
  ]

  const filters = [
    { key: 'category', label: 'Category', type: 'select', options: [
      { value: '', label: 'All Categories' },
      { value: 'Laptops', label: 'Laptops' },
      { value: 'Mobile Devices', label: 'Mobile Devices' },
      { value: 'Tablets', label: 'Tablets' },
      { value: 'Displays', label: 'Displays' },
      { value: 'Printers', label: 'Printers' }
    ]},
    { key: 'status', label: 'Status', type: 'select', options: [
      { value: '', label: 'All Status' },
      { value: 'Available', label: 'Available' },
      { value: 'In Use', label: 'In Use' },
      { value: 'Maintenance', label: 'Maintenance' }
    ]}
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Asset Management</h1>
              <p className="text-slate-600">Manage your company's assets</p>
            </div>
            <Button onClick={() => { setSelectedAsset(null); setIsDrawerOpen(true) }} size="lg" className="gap-2">
              <LuPlus className="h-5 w-5" />
              Add Asset
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-blue-100">
                <LuPackage className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">6</p>
                <p className="text-sm text-slate-600">Total Assets</p>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-green-100">
                <LuPackage className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">3</p>
                <p className="text-sm text-slate-600">Available</p>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-purple-100">
                <LuPackage className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">2</p>
                <p className="text-sm text-slate-600">In Use</p>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-yellow-100">
                <LuDollarSign className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">$7,594</p>
                <p className="text-sm text-slate-600">Total Value</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Search and Filter */}
        <Card className="p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <Search
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search assets..."
              className="flex-1"
            />
            <Filter
              filters={filters}
              activeFilters={{}}
              onFilterChange={() => {}}
              variant="dropdown"
            />
          </div>
        </Card>

        {/* Data Table */}
        <Card className="p-6">
          <DataTable
            columns={columns}
            data={assets}
            onRowClick={(asset) => { setSelectedAsset(asset); setIsDrawerOpen(true) }}
            pagination={{
              currentPage: 1,
              totalPages: 1,
              onPageChange: () => {},
              totalItems: assets.length
            }}
          />
        </Card>

        {/* Asset Details Drawer */}
        <Drawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          title={selectedAsset ? 'Asset Details' : 'Add Asset'}
          position="right"
          size="lg"
          footer={
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setIsDrawerOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsDrawerOpen(false)}>
                {selectedAsset ? 'Update' : 'Create'} Asset
              </Button>
            </div>
          }
        >
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Asset Name
              </label>
              <input
                type="text"
                defaultValue={selectedAsset?.name || ''}
                placeholder="Enter asset name"
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Category
              </label>
              <select
                defaultValue={selectedAsset?.category || ''}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select category</option>
                <option value="Laptops">Laptops</option>
                <option value="Mobile Devices">Mobile Devices</option>
                <option value="Tablets">Tablets</option>
                <option value="Displays">Displays</option>
                <option value="Printers">Printers</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Status
              </label>
              <select
                defaultValue={selectedAsset?.status || 'Available'}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Available">Available</option>
                <option value="In Use">In Use</option>
                <option value="Maintenance">Maintenance</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Location
              </label>
              <input
                type="text"
                defaultValue={selectedAsset?.location || ''}
                placeholder="Enter location"
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Value
              </label>
              <input
                type="text"
                defaultValue={selectedAsset?.value || ''}
                placeholder="Enter value"
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Purchase Date
              </label>
              <input
                type="date"
                defaultValue={selectedAsset?.purchaseDate || ''}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </Drawer>

      </div>
    </div>
  )
}

export default AssetsPage
