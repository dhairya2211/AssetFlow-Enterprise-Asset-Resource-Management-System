
import { useState } from 'react'
import { Card, Button, DataTable, Drawer } from '@/components'
import { LuPlus, LuEdit, LuTrash, LuShield } from 'react-icons/lu'

export function UsersRolesPage() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [selectedRole, setSelectedRole] = useState(null)

  const roles = [
    { id: 1, name: 'Admin', description: 'Full system access', userCount: 2 },
    { id: 2, name: 'Manager', description: 'Department management access', userCount: 3 },
    { id: 3, name: 'User', description: 'Basic user access', userCount: 15 },
    { id: 4, name: 'Viewer', description: 'Read-only access', userCount: 5 },
  ]

  const columns = [
    { key: 'name', header: 'Role', sortable: true },
    { key: 'description', header: 'Description', sortable: true },
    { key: 'userCount', header: 'Users', sortable: true },
    { key: 'actions', header: 'Actions', render: (_, row) => (
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={() => { setSelectedRole(row); setIsDrawerOpen(true) }} className="gap-1">
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
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">User Roles</h1>
              <p className="text-slate-600">Manage user roles and permissions</p>
            </div>
            <Button onClick={() => { setSelectedRole(null); setIsDrawerOpen(true) } size="lg" className="gap-2">
              <LuPlus className="h-5 w-5" /> Add Role
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-blue-100">
                <LuShield className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{roles.length}</p>
                <p className="text-sm text-slate-600">Total Roles</p>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-green-100">
                <LuShield className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{roles.reduce((sum, r) => sum + r.userCount, 0)}</p>
                <p className="text-sm text-slate-600">Total Users</p>
              </div>
            </div>
          </Card>
        </div>

        <Card className="p-6">
          <DataTable
            columns={columns}
            data={roles}
            pagination={{
              currentPage: 1,
              totalPages: 1,
              onPageChange: () => {},
              totalItems: roles.length
            }}
          />
        </Card>

        <Drawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          title={selectedRole ? 'Edit Role' : 'Add Role'}
          position="right"
          size="lg"
          footer={
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setIsDrawerOpen(false)}>Cancel</Button>
              <Button onClick={() => setIsDrawerOpen(false)}>
                {selectedRole ? 'Update' : 'Create'} Role
              </Button>
            </div>
          }
        >
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Role Name</label>
              <input
                type="text"
                defaultValue={selectedRole?.name || ''}
                placeholder="Enter role name"
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
              <textarea
                defaultValue={selectedRole?.description || ''}
                placeholder="Enter description"
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

export default UsersRolesPage
