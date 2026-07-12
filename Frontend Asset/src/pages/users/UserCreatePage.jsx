
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Button, Input, Select } from '@/components'
import { LuArrowLeft, LuSave } from 'react-icons/lu'

export function UserCreatePage() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '', email: '', role: 'User', department: '', status: 'Active' })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Creating user:', formData)
    navigate('/users')
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Button variant="ghost" onClick={() => navigate('/users')} className="gap-2 mb-4">
            <LuArrowLeft className="h-5 w-5" /> Back to Users
          </Button>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Create User</h1>
          <p className="text-slate-600">Add a new user to the system</p>
        </div>

        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Name</label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Role</label>
                <Select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                >
                  <option value="Admin">Admin</option>
                  <option value="Manager">Manager</option>
                  <option value="User">User</option>
                  <option value="Viewer">Viewer</option>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Department</label>
                <Select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select department</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Design">Design</option>
                  <option value="Sales">Sales</option>
                  <option value="Marketing">Marketing</option>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Status</label>
                <Select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  required
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </Select>
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-6 border-t border-slate-200">
              <Button type="button" variant="outline" onClick={() => navigate('/users')}>
                Cancel
              </Button>
              <Button type="submit" className="gap-2">
                <LuSave className="h-5 w-5" /> Create User
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  )
}

export default UserCreatePage
