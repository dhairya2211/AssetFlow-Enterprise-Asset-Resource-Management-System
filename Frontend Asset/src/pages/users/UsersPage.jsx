
import { useState } from 'react'
import { Card, Button, DataTable, Search, Filter, Drawer, Badge, Avatar } from '@/components'
import { LuPlus, LuEdit, LuTrash, LuUsers, LuUser } from 'react-icons/lu'

export function UsersPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilters, setActiveFilters] = useState({})
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)

  const users = [
    { id: 1, name: 'John Smith', email: 'john@example.com', role: 'Admin', department: 'Engineering', status: 'Active' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah@example.com', role: 'Manager', department: 'Design', status: 'Active' },
    { id: 3, name: 'Mike Chen', email: 'mike@example.com', role: 'User', department: 'Sales', status: 'Active' },
    { id: 4, name: 'Emily Davis', email: 'emily@example.com', role: 'User', department: 'Marketing', status: 'Inactive' },
  ]

  const columns = [
    { key: 'name', header: 'Name', sortable: true, render: (value, row) => (
      <div className="flex items-center gap-3">
        <Avatar name={value} size="sm" />
        <span>{value}</span>
      </div>
    ) },
    { key: 'email', header: 'Email', sortable: true },
    { key: 'role', header: 'Role', sortable: true },
    { key: 'department', header: 'Department', sortable: true },
    { key: 'status', header: 'Status', render: (value) => (
      <Badge variant={value === 'Active' ? 'success' : 'secondary'}>
        {value}
      </Badge>
    )},
    { key: 'actions', header: 'Actions', render: (_, row) => (
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={() => { setSelectedUser(row); setIsDrawerOpen(true) }} className="gap-1">
          <LuEdit className="h-4 w-4" /> Edit
        </Button>
        <Button variant="danger" size="sm" className="gap-1">
          <LuTrash className="h-4 w-4" /> Delete
        </Button>
      </div>
    )},
  ]

  const filters = [
    { key: 'role', label: 'Role', type: 'select', options: [
      { value: '', label: 'All Roles' },
      { value: 'Admin', label: 'Admin' },
      { value: 'Manager', label: 'Manager' },
      { value: 'User', label: 'User' },
      { value: 'Viewer', label: 'Viewer' },
    ]},
    { key: 'status', label: 'Status', type: 'select', options: [
      { value: '', label: 'All Statuses' },
      { value: 'Active', label: 'Active' },
      { value: 'Inactive', label: 'Inactive' },
    ]},
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Users</h1>
              <p className="text-slate-600">Manage system users and their roles</p>
            </div>
            <Button onClick={() => { setSelectedUser(null); setIsDrawerOpen(true) } size="lg" className="gap-2">
              <LuPlus className="h-5 w-5" /> Add User
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-blue-100">
                <LuUsers className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{users.length}</p>
                <p className="text-sm text-slate-600">Total Users</p>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-green-100">
                <LuUsers className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{users.filter(u => u.status === 'Active').length}</p>
                <p className="text-sm text-slate-600">Active Users</p>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-purple-100">
                <LuUsers className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{users.filter(u => u.role === 'Admin').length}</p>
                <p className="text-sm text-slate-600">Admins</p>
              </div>
            </div>
          </Card>
        </div>

        <Card className="p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <Search
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search users..."
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
            data={users}
            pagination={{
              currentPage: 1,
              totalPages: 1,
              onPageChange: () => {},
              totalItems: users.length
            }}
          />
        </Card>

        <Drawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          title={selectedUser ? 'Edit User' : 'Add User'}
          position="right"
          size="lg"
          footer={
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setIsDrawerOpen(false)}>Cancel</Button>
              <Button onClick={() => setIsDrawerOpen(false)}>
                {selectedUser ? 'Update' : 'Create'} User
              </Button>
            </div>
          }
        >
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Name</label>
              <input
                type="text"
                defaultValue={selectedUser?.name || ''}
                placeholder="Enter name"
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
              <input
                type="email"
                defaultValue={selectedUser?.email || ''}
                placeholder="Enter email"
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Role</label>
              <select
                defaultValue={selectedUser?.role || 'User'}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Admin">Admin</option>
                <option value="Manager">Manager</option>
                <option value="User">User</option>
                <option value="Viewer">Viewer</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Department</label>
              <select
                defaultValue={selectedUser?.department || ''}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select department</option>
                <option value="Engineering">Engineering</option>
                <option value="Design">Design</option>
                <option value="Sales">Sales</option>
                <option value="Marketing">Marketing</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Status</label>
              <select
                defaultValue={selectedUser?.status || 'Active'}
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

export default UsersPage
