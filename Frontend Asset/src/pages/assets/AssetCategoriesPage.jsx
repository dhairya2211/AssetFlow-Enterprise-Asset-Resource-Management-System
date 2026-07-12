
import { useState } from 'react'
import { Card, Button, DataTable, Search, Drawer, Badge } from '@/components'
import { LuPlus, LuLayers, LuEdit, LuTrash } from 'react-icons/lu'

export function AssetCategoriesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)

  const categories = [
    { id: 1, name: 'Laptops', assetsCount: 4, description: 'Portable computers', status: 'Active' },
    { id: 2, name: 'Mobile Devices', assetsCount: 3, description: 'Smartphones, tablets, etc.', status: 'Active' },
    { id: 3, name: 'Tablets', assetsCount: 2, description: 'iPad, Android tablets', status: 'Active' },
    { id: 4, name: 'Displays', assetsCount: 5, description: 'Monitors, projectors', status: 'Active' },
    { id: 5, name: 'Printers', assetsCount: 2, description: 'Laser, inkjet printers', status: 'Inactive' },
  ]

  const columns = [
    { key: 'name', header: 'Category Name', sortable: true },
    { key: 'assetsCount', header: 'Assets', sortable: true },
    { key: 'description', header: 'Description', sortable: true },
    { key: 'status', header: 'Status', render: (value) => (
      <Badge variant={value === 'Active' ? 'success' : 'secondary'}>
        {value}
      </Badge>
    )},
    { key: 'actions', header: 'Actions', render: (_, row) => (
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={() => { setSelectedCategory(row); setIsDrawerOpen(true) }} className="gap-1">
          <LuEdit className="h-4 w-4" /> Edit
        </Button>
        <Button variant="danger" size="sm" className="gap-1">
          <LuTrash className="h-4 w-4" /> Delete
        </Button>
      </div>
    )}
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Asset Categories</h1>
              <p className="text-slate-600">Organize your assets into categories</p>
            </div>
            <Button onClick={() => { setSelectedCategory(null); setIsDrawerOpen(true) }} size="lg" className="gap-2">
              <LuPlus className="h-5 w-5" /> Add Category
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-blue-100">
                <LuLayers className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{categories.length}</p>
                <p className="text-sm text-slate-600">Total Categories</p>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-green-100">
                <LuLayers className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{categories.filter(c => c.status === 'Active').length}</p>
                <p className="text-sm text-slate-600">Active Categories</p>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-purple-100">
                <LuLayers className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{categories.reduce((sum, c) => sum + c.assetsCount, 0)}</p>
                <p className="text-sm text-slate-600">Total Assets</p>
              </div>
            </div>
          </Card>
        </div>

        <Card className="p-6 mb-6">
          <Search
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search categories..."
          />
        </Card>

        <Card className="p-6">
          <DataTable
            columns={columns}
            data={categories}
            pagination={{
              currentPage: 1,
              totalPages: 1,
              onPageChange: () => {},
              totalItems: categories.length
            }}
          />
        </Card>

        <Drawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          title={selectedCategory ? 'Edit Category' : 'Add Category'}
          position="right"
          size="lg"
          footer={
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setIsDrawerOpen(false)}>Cancel</Button>
              <Button onClick={() => setIsDrawerOpen(false)}>
                {selectedCategory ? 'Update' : 'Create'} Category
              </Button>
            </div>
          }
        >
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Category Name</label>
              <input
                type="text"
                defaultValue={selectedCategory?.name || ''}
                placeholder="Enter category name"
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
              <textarea
                defaultValue={selectedCategory?.description || ''}
                placeholder="Enter category description"
                rows={4}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Status</label>
              <select
                defaultValue={selectedCategory?.status || 'Active'}
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

export default AssetCategoriesPage
