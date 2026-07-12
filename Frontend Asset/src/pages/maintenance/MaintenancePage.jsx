import { useState } from 'react'
import { Card, Button, Drawer, Badge } from '@/components'
import { LuPlus, LuWrench, LuCheck, LuClock } from 'react-icons/lu'

export function MaintenancePage() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const columns = [
    { id: 'todo', title: 'To Do', color: 'bg-slate-100' },
    { id: 'inProgress', title: 'In Progress', color: 'bg-blue-100' },
    { id: 'review', title: 'Review', color: 'bg-yellow-100' },
    { id: 'done', title: 'Done', color: 'bg-green-100' }
  ]

  const requests = {
    todo: [
      { id: 1, title: 'Fix broken printer', priority: 'High', asset: 'HP LaserJet', created: '2024-07-10' },
      { id: 2, title: 'Replace laptop battery', priority: 'Medium', asset: 'MacBook Pro', created: '2024-07-11' }
    ],
    inProgress: [
      { id: 3, title: 'Calibrate monitor', priority: 'Low', asset: 'Samsung Display', created: '2024-07-12' }
    ],
    review: [
      { id: 4, title: 'Test network switch', priority: 'Medium', asset: 'Cisco Switch', created: '2024-07-09' }
    ],
    done: [
      { id: 5, title: 'Replace desk lamp', priority: 'Low', asset: 'Office Lamp', created: '2024-07-08' }
    ]
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'danger'
      case 'Medium': return 'warning'
      case 'Low': return 'success'
      default: return 'secondary'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Maintenance Management</h1>
              <p className="text-slate-600">Manage maintenance requests and work orders</p>
            </div>
            <Button onClick={() => setIsDrawerOpen(true)} size="lg" className="gap-2">
              <LuPlus className="h-5 w-5" />
              Create Request
            </Button>
          </div>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-slate-100">
                <LuWrench className="h-6 w-6 text-slate-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">2</p>
                <p className="text-sm text-slate-600">To Do</p>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-blue-100">
                <LuClock className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">1</p>
                <p className="text-sm text-slate-600">In Progress</p>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-yellow-100">
                <LuWrench className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">1</p>
                <p className="text-sm text-slate-600">Review</p>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-green-100">
                <LuCheck className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">1</p>
                <p className="text-sm text-slate-600">Done</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Kanban Board */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {columns.map(col => (
            <div key={col.id} className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-900">{col.title}</h3>
                <Badge variant="secondary">{requests[col.id].length}</Badge>
              </div>
              <div className="space-y-3">
                {requests[col.id].map(req => (
                  <Card key={req.id} className="p-4 cursor-pointer hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <Badge variant={getPriorityColor(req.priority)} className="mb-2">{req.priority}</Badge>
                    </div>
                    <h4 className="font-medium text-slate-900 mb-2">{req.title}</h4>
                    <p className="text-sm text-slate-600 mb-2">Asset: {req.asset}</p>
                    <p className="text-xs text-slate-500">Created: {req.created}</p>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Create Request Drawer */}
        <Drawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          title="Create Maintenance Request"
          position="right"
          size="lg"
          footer={
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setIsDrawerOpen(false)}>Cancel</Button>
              <Button onClick={() => setIsDrawerOpen(false)}>Create Request</Button>
            </div>
          }
        >
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Asset</label>
              <select className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Select Asset</option>
                <option value="printer">HP LaserJet</option>
                <option value="macbook">MacBook Pro</option>
                <option value="monitor">Samsung Display</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Title</label>
              <input
                type="text"
                placeholder="Describe the issue"
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Priority</label>
              <select className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
              <textarea
                rows={4}
                placeholder="Describe the maintenance issue"
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
          </div>
        </Drawer>
      </div>
    </div>
  )
}

export default MaintenancePage
