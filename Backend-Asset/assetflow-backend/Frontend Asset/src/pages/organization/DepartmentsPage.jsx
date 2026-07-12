import { useState } from 'react'
import { Card, Button, DataTable, Search, Filter, Drawer, Badge, Avatar } from '@/components'
import { LuPlus, LuPen, LuTrash2, LuUsers, LuBuilding2 } from 'react-icons/lu'

/**
 * Departments page with modern enterprise UI
 * Features: Search, Filter, Data Table, Add/Edit Drawer
 */
export function DepartmentsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [editingDepartment, setEditingDepartment] = useState(null)
  const [selectedRows, setSelectedRows] = useState([])

  const departments = [
    { id: 1, name: 'Engineering', head: 'John Smith', employees: 45, budget: '$500,000', status: 'Active' },
    { id: 2, name: 'Marketing', head: 'Sarah Johnson', employees: 28, budget: '$350,000', status: 'Active' },
    { id: 3, name: 'Sales', head: 'Mike Davis', employees: 35, budget: '$400,000', status: 'Active' },
    { id: 4, name: 'Human Resources', head: 'Emily Brown', employees: 12, budget: '$200,000', status: 'Active' },
    { id: 5, name: 'Finance', head: 'Alex Wilson', employees: 18, budget: '$300,000', status: 'Active' },
    { id: 6, name: 'Operations', head: 'Chris Taylor', employees: 22, budget: '$280,000', status: 'Inactive' }
  ]

  const columns = [
    { key: 'name', header: 'Department Name', sortable: true },
    { key: 'head', header: 'Department Head', sortable: true },
    { key: 'employees', header: 'Employees', sortable: true },
    { key: 'budget', header: 'Budget', sortable: true },
    { 
      key: 'status', 
      header: 'Status',
      render: (value) => (
        <Badge variant={value === 'Active' ? 'success' : 'secondary'}>{value}</Badge>
      )
    }
  ]

  const filters = [
    { key: 'status', label: 'Status', type: 'select', options: [
      { value: '', label: 'All Status' },
      { value: 'Active', label: 'Active' },
      { value: 'Inactive', label: 'Inactive' }
    ]}
  ]

  const handleAddDepartment = () => {
    setEditingDepartment(null)
    setIsDrawerOpen(true)
  }

  const handleEditDepartment = (department) => {
    setEditingDepartment(department)
    setIsDrawerOpen(true)
  }

  const handleDeleteDepartment = (department) => {
    // Implement delete logic
    console.log('Delete department:', department)
  }

  const handleSaveDepartment = (data) => {
    // Implement save logic
    console.log('Save department:', data)
    setIsDrawerOpen(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Departments</h1>
              <p className="text-slate-600">Manage your organization's departments</p>
            </div>
            <Button onClick={handleAddDepartment} size="lg" className="gap-2">
              <LuPlus className="h-5 w-5" />
              Add Department
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-blue-100">
                <LuBuilding2 className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">6</p>
                <p className="text-sm text-slate-600">Total Departments</p>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-green-100">
                <LuUsers className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">160</p>
                <p className="text-sm text-slate-600">Total Employees</p>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-purple-100">
                <LuBuilding2 className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">$2.03M</p>
                <p className="text-sm text-slate-600">Total Budget</p>
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
              placeholder="Search departments..."
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
            data={departments}
            selectable
            onSelectionChange={setSelectedRows}
            onRowClick={handleEditDepartment}
            pagination={{
              currentPage: 1,
              totalPages: 1,
              onPageChange: () => {},
              totalItems: departments.length
            }}
          />
        </Card>

        {/* Add/Edit Drawer */}
        <Drawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          title={editingDepartment ? 'Edit Department' : 'Add Department'}
          position="right"
          size="lg"
          footer={
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setIsDrawerOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveDepartment}>
                {editingDepartment ? 'Update' : 'Create'} Department
              </Button>
            </div>
          }
        >
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Department Name
              </label>
              <input
                type="text"
                defaultValue={editingDepartment?.name || ''}
                placeholder="Enter department name"
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Department Head
              </label>
              <input
                type="text"
                defaultValue={editingDepartment?.head || ''}
                placeholder="Enter department head"
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Budget
              </label>
              <input
                type="text"
                defaultValue={editingDepartment?.budget || ''}
                placeholder="Enter budget"
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Status
              </label>
              <select
                defaultValue={editingDepartment?.status || 'Active'}
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

export default DepartmentsPage
