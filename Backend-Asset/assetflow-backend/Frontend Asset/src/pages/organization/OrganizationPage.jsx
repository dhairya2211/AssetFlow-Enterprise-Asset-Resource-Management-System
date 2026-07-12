import { useState } from 'react'
import { Card, Button, DataTable, Search, Filter, Drawer, Badge, Avatar } from '@/components'
import { LuPlus, LuUsers, LuBuilding2, LuMail, LuPhone, LuPen } from 'react-icons/lu'

export function OrganizationPage() {
  const [activeTab, setActiveTab] = useState('departments')
  const [searchQuery, setSearchQuery] = useState('')
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)

  const departments = [
    { id: 1, name: 'Engineering', manager: 'John Smith', employeeCount: 12, location: 'Floor 3', status: 'Active' },
    { id: 2, name: 'Design', manager: 'Sarah Johnson', employeeCount: 6, location: 'Floor 2', status: 'Active' },
    { id: 3, name: 'Sales', manager: 'Mike Chen', employeeCount: 8, location: 'Floor 1', status: 'Active' },
    { id: 4, name: 'Marketing', manager: 'Emily Davis', employeeCount: 5, location: 'Floor 2', status: 'Active' }
  ]

  const employees = [
    { id: 1, name: 'John Smith', email: 'john@example.com', phone: '+1 (555) 123-4567', department: 'Engineering', role: 'Manager', status: 'Active' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah@example.com', phone: '+1 (555) 234-5678', department: 'Design', role: 'Manager', status: 'Active' },
    { id: 3, name: 'Mike Chen', email: 'mike@example.com', phone: '+1 (555) 345-6789', department: 'Sales', role: 'Manager', status: 'Active' },
    { id: 4, name: 'Emily Davis', email: 'emily@example.com', phone: '+1 (555) 456-7890', department: 'Marketing', role: 'Manager', status: 'Active' },
    { id: 5, name: 'David Wilson', email: 'david@example.com', phone: '+1 (555) 567-8901', department: 'Engineering', role: 'Developer', status: 'Active' }
  ]

  const departmentColumns = [
    { key: 'name', header: 'Department', sortable: true },
    { key: 'manager', header: 'Manager', sortable: true },
    { key: 'employeeCount', header: 'Employees', sortable: true },
    { key: 'location', header: 'Location', sortable: true },
    {
      key: 'status',
      header: 'Status',
      render: (value) => (
        <Badge variant={value === 'Active' ? 'success' : 'secondary'}>
          {value}
        </Badge>
      )
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (_, row) => (
        <Button variant="outline" size="sm" onClick={() => { setSelectedItem(row); setIsDrawerOpen(true) }} className="gap-1">
            <LuPen className="h-4 w-4" />
            Edit
          </Button>
      )
    }
  ]

  const employeeColumns = [
    {
      key: 'name',
      header: 'Name',
      sortable: true,
      render: (value, row) => (
        <div className="flex items-center gap-3">
          <Avatar name={value} size="sm" />
          <span>{value}</span>
        </div>
      )
    },
    {
      key: 'email',
      header: 'Email',
      sortable: true,
      render: (value) => (
        <div className="flex items-center gap-2 text-slate-600">
          <LuMail className="h-4 w-4" />
          <span className="truncate">{value}</span>
        </div>
      )
    },
    {
      key: 'phone',
      header: 'Phone',
      sortable: true,
      render: (value) => (
        <div className="flex items-center gap-2 text-slate-600">
          <LuPhone className="h-4 w-4" />
          <span>{value}</span>
        </div>
      )
    },
    { key: 'department', header: 'Department', sortable: true },
    { key: 'role', header: 'Role', sortable: true },
    {
      key: 'status',
      header: 'Status',
      render: (value) => (
        <Badge variant={value === 'Active' ? 'success' : 'secondary'}>
          {value}
        </Badge>
      )
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (_, row) => (
        <Button variant="outline" size="sm" onClick={() => { setSelectedItem(row); setIsDrawerOpen(true) }} className="gap-1">
            <LuPen className="h-4 w-4" />
            Edit
          </Button>
      )
    }
  ]

  const filters = activeTab === 'departments'
    ? [
        { key: 'location', label: 'Location', type: 'select', options: [
          { value: '', label: 'All Locations' },
          { value: 'Floor 1', label: 'Floor 1' },
          { value: 'Floor 2', label: 'Floor 2' },
          { value: 'Floor 3', label: 'Floor 3' }
        ]}
      ]
    : [
        { key: 'department', label: 'Department', type: 'select', options: [
          { value: '', label: 'All Departments' },
          { value: 'Engineering', label: 'Engineering' },
          { value: 'Design', label: 'Design' },
          { value: 'Sales', label: 'Sales' },
          { value: 'Marketing', label: 'Marketing' }
        ]},
        { key: 'status', label: 'Status', type: 'select', options: [
          { value: '', label: 'All Status' },
          { value: 'Active', label: 'Active' },
          { value: 'Inactive', label: 'Inactive' }
        ]}
      ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Organization</h1>
              <p className="text-slate-600">Manage departments and employees</p>
            </div>
            <Button onClick={() => { setSelectedItem(null); setIsDrawerOpen(true) }} size="lg" className="gap-2">
              <LuPlus className="h-5 w-5" />
              Add {activeTab === 'departments' ? 'Department' : 'Employee'}
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-blue-100">
                <LuBuilding2 className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{departments.length}</p>
                <p className="text-sm text-slate-600">Departments</p>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-green-100">
                <LuUsers className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{employees.length}</p>
                <p className="text-sm text-slate-600">Employees</p>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-purple-100">
                <LuUsers className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">
                  {departments.reduce((sum, d) => sum + d.employeeCount, 0)}
                </p>
                <p className="text-sm text-slate-600">Total Staff</p>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-yellow-100">
                <LuBuilding2 className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">3</p>
                <p className="text-sm text-slate-600">Floors</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 bg-white p-1 rounded-lg border border-slate-200">
          <button
            onClick={() => setActiveTab('departments')}
            className={`flex-1 py-3 px-4 rounded-md font-medium transition-all ${
              activeTab === 'departments'
                ? 'bg-blue-600 text-white shadow'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <LuBuilding2 className="h-5 w-5" />
              Departments
            </div>
          </button>
          <button
            onClick={() => setActiveTab('employees')}
            className={`flex-1 py-3 px-4 rounded-md font-medium transition-all ${
              activeTab === 'employees'
                ? 'bg-blue-600 text-white shadow'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <LuUsers className="h-5 w-5" />
              Employees
            </div>
          </button>
        </div>

        {/* Search and Filter */}
        <Card className="p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <Search
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder={`Search ${activeTab}...`}
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
            columns={activeTab === 'departments' ? departmentColumns : employeeColumns}
            data={activeTab === 'departments' ? departments : employees}
            pagination={{
              currentPage: 1,
              totalPages: 1,
              onPageChange: () => {},
              totalItems: (activeTab === 'departments' ? departments : employees).length
            }}
          />
        </Card>

        {/* Edit/Add Drawer */}
        <Drawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          title={
            selectedItem
              ? `Edit ${activeTab === 'departments' ? 'Department' : 'Employee'}`
              : `Add ${activeTab === 'departments' ? 'Department' : 'Employee'}`
          }
          position="right"
          size="lg"
          footer={
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setIsDrawerOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsDrawerOpen(false)}>
                {selectedItem ? 'Update' : 'Create'} {activeTab === 'departments' ? 'Department' : 'Employee'}
              </Button>
            </div>
          }
        >
          {activeTab === 'departments' ? (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Department Name</label>
                <input
                  type="text"
                  defaultValue={selectedItem?.name || ''}
                  placeholder="Enter department name"
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Manager</label>
                <select
                  defaultValue={selectedItem?.manager || ''}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select manager</option>
                  {employees.map(e => (
                    <option key={e.id} value={e.name}>{e.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Location</label>
                <select
                  defaultValue={selectedItem?.location || ''}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select location</option>
                  <option value="Floor 1">Floor 1</option>
                  <option value="Floor 2">Floor 2</option>
                  <option value="Floor 3">Floor 3</option>
                </select>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                <input
                  type="text"
                  defaultValue={selectedItem?.name || ''}
                  placeholder="Enter full name"
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                <input
                  type="email"
                  defaultValue={selectedItem?.email || ''}
                  placeholder="Enter email"
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Phone</label>
                <input
                  type="tel"
                  defaultValue={selectedItem?.phone || ''}
                  placeholder="Enter phone number"
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Department</label>
                <select
                  defaultValue={selectedItem?.department || ''}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select department</option>
                  {departments.map(d => (
                    <option key={d.id} value={d.name}>{d.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Role</label>
                <input
                  type="text"
                  defaultValue={selectedItem?.role || ''}
                  placeholder="Enter role"
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}
        </Drawer>

      </div>
    </div>
  )
}

export default OrganizationPage
