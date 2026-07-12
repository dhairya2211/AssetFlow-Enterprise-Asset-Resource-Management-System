
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Button, Input, Select } from '@/components'
import { LuArrowLeft, LuSave } from 'react-icons/lu'

export function AssetCreatePage() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    status: 'Available',
    location: '',
    value: '',
    purchaseDate: '',
    description: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Creating asset:', formData)
    navigate('/assets')
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Button variant="ghost" onClick={() => navigate('/assets')} className="gap-2 mb-4">
            <LuArrowLeft className="h-5 w-5" /> Back to Assets
          </Button>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Create New Asset</h1>
          <p className="text-slate-600">Add a new asset to the system</p>
        </div>

        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Asset Name</label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter asset name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
                <Select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select category</option>
                  <option value="Laptops">Laptops</option>
                  <option value="Mobile Devices">Mobile Devices</option>
                  <option value="Tablets">Tablets</option>
                  <option value="Displays">Displays</option>
                  <option value="Printers">Printers</option>
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
                  <option value="Available">Available</option>
                  <option value="In Use">In Use</option>
                  <option value="Maintenance">Maintenance</option>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Location</label>
                <Input
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Enter location"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Value ($)</label>
                <Input
                  name="value"
                  value={formData.value}
                  onChange={handleChange}
                  placeholder="Enter value"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Purchase Date</label>
                <Input
                  type="date"
                  name="purchaseDate"
                  value={formData.purchaseDate}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter asset description"
                rows={4}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex justify-end gap-3 pt-6 border-t border-slate-200">
              <Button type="button" variant="outline" onClick={() => navigate('/assets')}>
                Cancel
              </Button>
              <Button type="submit" className="gap-2">
                <LuSave className="h-5 w-5" /> Create Asset
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  )
}

export default AssetCreatePage
