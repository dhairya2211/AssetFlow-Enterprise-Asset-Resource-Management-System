import { useState } from 'react'
import { Card, Button, DataTable, Search, Filter, Drawer, Badge, Avatar } from '@/components'
import { LuPlus, LuPen, LuTrash2, LuMail, LuPhone, LuMapPin } from 'react-icons/lu'

/**
 * Employees page with modern enterprise UI
 * Features: Search, Filter, Data Table, Add/Edit Drawer
 */
export function EmployeesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [editingEmployee, setEditingEmployee] = useState(null)
  const [selectedRows, setSelectedRows] = useState([])

  const employees = [
    { id: 1, name: 'John Smith', email: 'john.smith@company.com', department: 'Engineering', role: 'Senior Developer', location: 'New York', status: 'Active' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah.johnson@company.com', department: 'Marketing', role: 'Marketing Manager', location: 'San Francisco', status: 'Active' },
    { id: 3, name: 'Mike Davis', email: 'mike.davis@company.com', department: 'Sales', role: 'Sales Representative', location: 'Chicago', status: 'Active' },
    { id: 4, name: 'Emily Brown', email: 'emily.brown@company.com', department: 'Human Resources', role: 'HR Specialist', location: 'Boston', status: 'Active' },
    { id: 5, name: 'Alex Wilson', email: 'alex.wilson@company.com', department: 'Finance', role: 'Financial Analyst', location: 'Seattle', status: 'On Leave' },
    { id: 6, name: 'Chris Taylor', email: 'chris.taylor@company.com', department: 'Operations', role: 'Operations Manager', location: 'Austin', status: 'Active' },
    { id: 7, name: 'Jessica Martinez', email: 'jessica.martinez@company.com', department: 'Engineering', role: 'Junior Developer', location: 'Denver', status: 'Active' },
    { id: 8, name: 'David Lee', email: 'david.lee@company.com', department: 'Sales', role: 'Sales Lead', location: 'Miami', status: 'Inactive' }
  ]

  const columns = [
    { 
      key: 'name', 
      header: 'Employee',
      sortable: true,
      render: (value, row) => (
        <div className="flex items-center gap-3">
          <Avatar name={value} size="sm" />
          <div>
            <p className="font-medium text-slate-900">{value}</p>
            <p className="text-sm text-slate-500">{row.email}</p>
          </div>
        </div>
      )
    },
    { key: 'department', header: 'Department', sortable: true },
    { key: 'role', header: 'Role', sortable: true },
    { key: 'location', header: 'Location', sortable: true },
    { 
      key: 'status', 
      header: 'Status',
      render: (value) => (
        <Badge 
          variant={
            value === 'Active' ? 'success' : 
            value === 'On Leave' ? 'warning' : 
            'secondary'
          }
        >
          {value}
        </Badge>
      )
    }
  ]

  const filters = [
    { key: 'department', label: 'Department', type: 'select', options: [
      { value: '', label: 'All Departments' },
      { value: 'Engineering', label: 'Engineering' },
      { value: 'Marketing', label: 'Marketing' },
      { value: 'Sales', label: 'Sales' },
      { value: 'Human Resources', label: 'Human Resources' },
      { value: 'Finance', label: 'Finance' },
      { value: 'Operations', label: 'Operations' }
    ]},
    { key: 'status', label: 'Status', type: 'select', options: [
      { value: '', label: 'All Status' },
      { value: 'Active', label: 'Active' },
      { value: 'On Leave', label: 'On Leave' },
      { value: 'Inactive', label: 'Inactive' }
    ]}
  ]

  const handleAddEmployee = () => {
    setEditingEmployee(null)
    setIsDrawerOpen(true)
  }

  const handleEditEmployee = (employee) => {
    setEditingEmployee(employee)
    setIsDrawerOpen(true)
  }

  const handleDeleteEmployee = (employee) => {
    console.log('Delete employee:', employee)
  }

  const handleSaveEmployee = (data) => {
    console.log('Save employee:', data)
    setIsDrawerOpen(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Employees</h1>
              <p className="text-slate-600">Manage your organization's employees</p>
            </div>
            <Button onClick={handleAddEmployee} size="lg" className="gap-2">
              <LuPlus className="h-5 w-5" />
              Add Employee
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-blue-100">
                <LuUsers className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">8</p>
                <p className="text-sm text-slate-600">Total Employees</p>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-green-100">
                <LuUsers className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">6</p>
                <p className="text-sm text-slate-600">Active</p>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-yellow-100">
                <LuUsers className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">1</p>
                <p className="text-sm text-slate-600">On Leave</p>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-red-100">
                <LuUsers className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">1</p>
                <p className="text-sm text-slate-600">Inactive</p>
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
              placeholder="Search employees..."
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
            data={employees}
            selectable
            onSelectionChange={setSelectedRows}
            onRowClick={handleEditEmployee}
            pagination={{
              currentPage: 1,
              totalPages: 1,
              onPageChange: () => {},
              totalItems: employees.length
            }}
          />
        </Card>

        {/* Add/Edit Drawer */}
        <Drawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          title={editingEmployee ? 'Edit Employee' : 'Add Employee'}
          position="right"
          size="lg"
          footer={
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setIsDrawerOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveEmployee}>
                {editingEmployee ? 'Update' : 'Create'} Employee
              </Button>
            </div>
          }
        >
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                defaultValue={editingEmployee?.name || ''}
                placeholder="Enter full name"
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email
              </label>
              <div className="relative">
                <LuMail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type="email"
                  defaultValue={editingEmployee?.email || ''}
                  placeholder="Enter email"
                  className="w-full px-4 py-2 pl-10 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Department
              </label>
              <select
                defaultValue={editingEmployee?.department || ''}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select department</option>
                <option value="Engineering">Engineering</option>
                <option value="Marketing">Marketing</option>
                <option value="Sales">Sales</option>
                <option value="Human Resources">Human Resources</option>
                <option value="Finance">Finance</option>
                <option value="Operations">Operations</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Role
              </label>
              <input
                type="text"
                defaultValue={editingEmployee?.role || ''}
                placeholder="Enter role"
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Location
              </label>
              <div className="relative">
                <LuMapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type="text"
                  defaultValue={editingEmployee?.location || ''}
                  placeholder="Enter location"
                  className="w-full px-4 py-2 pl-10 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Status
              </label>
              <select
                defaultValue={editingEmployee?.status || 'Active'}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Active">Active</option>
                <option value="On Leave">On Leave</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
        </Drawer>

      </div>
    </div>
  )
}

export default EmployeesPage
