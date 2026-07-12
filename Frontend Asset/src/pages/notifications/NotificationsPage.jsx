import { useState } from 'react'
import { Card, Button, Search, Filter, Badge, Avatar } from '@/components'
import { LuBell, LuCheck, LuClock, LuUserPlus, LuPackage, LuWrench, LuTrendingUp } from 'react-icons/lu'

export function NotificationsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilters, setActiveFilters] = useState({ type: '', read: '' })
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'info', title: 'New user added', message: 'Sarah Johnson has been added to the team', read: false, time: '2 minutes ago', icon: LuUserPlus },
    { id: 2, type: 'success', title: 'Asset allocated', message: 'Laptop #123 has been allocated to Mike Chen', read: false, time: '15 minutes ago', icon: LuPackage },
    { id: 3, type: 'warning', title: 'Maintenance due', message: 'Printer maintenance is scheduled for tomorrow', read: true, time: '1 hour ago', icon: LuWrench },
    { id: 4, type: 'info', title: 'Report generated', message: 'Monthly asset report is ready for download', read: true, time: '2 hours ago', icon: LuTrendingUp },
    { id: 5, type: 'danger', title: 'Low stock alert', message: 'Stationery items are running low', read: false, time: '3 hours ago', icon: LuWrench },
  ])

  const activityTimeline = [
    { id: 1, action: 'Asset Allocated', user: 'John Smith', time: '2 minutes ago', details: 'Laptop allocated to Mike Chen' },
    { id: 2, action: 'Maintenance Request', user: 'Emily Davis', time: '15 minutes ago', details: 'New request for printer repair' },
    { id: 3, action: 'Audit Completed', user: 'Sarah Johnson', time: '1 hour ago', details: 'Asset inventory audit finished' },
    { id: 4, action: 'Report Generated', user: 'Mike Chen', time: '2 hours ago', details: 'Monthly utilization report' },
  ]

  const filters = [
    { key: 'type', label: 'Type', type: 'select', options: [
      { value: '', label: 'All Types' },
      { value: 'info', label: 'Info' },
      { value: 'success', label: 'Success' },
      { value: 'warning', label: 'Warning' },
      { value: 'danger', label: 'Danger' },
    ]},
    { key: 'read', label: 'Read Status', type: 'select', options: [
      { value: '', label: 'All' },
      { value: 'unread', label: 'Unread' },
      { value: 'read', label: 'Read' },
    ]},
  ]

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  const markRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
  }

  const filteredNotifications = notifications.filter(n => {
    const matchesSearch = n.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          n.message.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = !activeFilters.type || n.type === activeFilters.type
    const matchesRead = !activeFilters.read || 
                        (activeFilters.read === 'unread' && !n.read) ||
                        (activeFilters.read === 'read' && n.read)
    return matchesSearch && matchesType && matchesRead
  })

  const getTypeColor = (type) => {
    switch(type) {
      case 'success': return 'success'
      case 'warning': return 'warning'
      case 'danger': return 'danger'
      default: return 'secondary'
    }
  }

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-blue-100">
                <LuBell className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-900 mb-1">Notifications</h1>
                <p className="text-slate-600">{unreadCount} unread notifications</p>
              </div>
            </div>
            <Button onClick={markAllRead} disabled={unreadCount === 0} className="gap-2">
              <LuCheck className="h-5 w-5" />
              Mark All Read
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Notifications List */}
          <div className="lg:col-span-2 space-y-4">
            {/* Search and Filter */}
            <Card className="p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <Search
                  placeholder="Search notifications..."
                  value={searchQuery}
                  onChange={setSearchQuery}
                  className="flex-1"
                />
                <Filter
                  filters={filters}
                  activeFilters={activeFilters}
                  onFilterChange={setActiveFilters}
                />
              </div>
            </Card>

            {/* Notifications */}
            {filteredNotifications.length > 0 ? (
              <div className="space-y-3">
                {filteredNotifications.map(notification => {
                  const Icon = notification.icon
                  return (
                    <Card 
                      key={notification.id} 
                      className={`p-4 cursor-pointer transition-all hover:shadow-md ${!notification.read ? 'border-l-4 border-l-blue-500' : ''}`}
                      onClick={() => markRead(notification.id)}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`p-2 rounded-full ${
                          notification.type === 'success' ? 'bg-green-100 text-green-600' :
                          notification.type === 'warning' ? 'bg-yellow-100 text-yellow-600' :
                          notification.type === 'danger' ? 'bg-red-100 text-red-600' :
                          'bg-blue-100 text-blue-600'
                        }`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="font-medium text-slate-900">{notification.title}</h4>
                            <span className="text-xs text-slate-500 flex items-center gap-1">
                              <LuClock className="h-3 w-3" />
                              {notification.time}
                            </span>
                          </div>
                          <p className="text-sm text-slate-600 mt-1">{notification.message}</p>
                        </div>
                        {!notification.read && (
                          <Badge variant="primary" size="sm">New</Badge>
                        )}
                      </div>
                    </Card>
                  )
                })}
              </div>
            ) : (
              <Card className="p-8 text-center">
                <div className="text-slate-400 mb-4">
                  <LuBell className="h-12 w-12 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-slate-900 mb-1">No notifications</h3>
                <p className="text-slate-600">No notifications match your search or filters</p>
              </Card>
            )}
          </div>

          {/* Activity Timeline */}
          <div>
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-slate-900 mb-6">Activity Timeline</h2>
              <div className="space-y-6">
                {activityTimeline.map((item, index) => (
                  <div key={item.id} className="relative pl-8">
                    {index < activityTimeline.length - 1 && (
                      <div className="absolute left-3 top-6 bottom-0 w-0.5 bg-slate-200" />
                    )}
                    <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900">{item.action}</h4>
                      <p className="text-sm text-slate-600 mt-1">{item.details}</p>
                      <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
                        <LuClock className="h-3 w-3" />
                        {item.time} by {item.user}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotificationsPage
