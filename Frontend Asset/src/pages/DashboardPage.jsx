import { useState, useEffect } from 'react'
import { Card, Badge, Avatar, Button } from '@/components'
import { LuTrendingUp, LuTrendingDown, LuUsers, LuPackage, LuDollarSign, LuCircleAlert, LuCheckCircle, LuClock, LuArrowRight, LuEllipsis, LuBell, LuSettings, LuPlus } from 'react-icons/lu'

/**
 * Premium Dashboard with modern analytics layout
 * Features: KPI Cards, Charts, Quick Actions, Activity Feed, Notifications, Welcome Section
 */
export function DashboardPage() {
  const [darkMode, setDarkMode] = useState(false)
  const [timeRange, setTimeRange] = useState('7d')

  useEffect(() => {
    // Check system preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true)
    }
  }, [])

  const kpiData = [
    {
      title: 'Total Assets',
      value: '2,847',
      change: '+12.5%',
      trend: 'up',
      icon: <LuPackage className="h-6 w-6" />,
      color: 'blue'
    },
    {
      title: 'Active Users',
      value: '1,234',
      change: '+8.2%',
      trend: 'up',
      icon: <LuUsers className="h-6 w-6" />,
      color: 'purple'
    },
    {
      title: 'Revenue',
      value: '$84,230',
      change: '+23.1%',
      trend: 'up',
      icon: <LuDollarSign className="h-6 w-6" />,
      color: 'green'
    },
    {
      title: 'Alerts',
      value: '23',
      change: '-5.4%',
      trend: 'down',
      icon: <LuCircleAlert className="h-6 w-6" />,
      color: 'red'
    }
  ]

  const quickActions = [
    { label: 'Add Asset', icon: <LuPlus className="h-5 w-5" />, color: 'blue' },
    { label: 'New Booking', icon: <LuClock className="h-5 w-5" />, color: 'purple' },
    { label: 'Generate Report', icon: <LuSettings className="h-5 w-5" />, color: 'green' },
    { label: 'View Alerts', icon: <LuCircleAlert className="h-5 w-5" />, color: 'red' }
  ]

  const activityFeed = [
    { user: 'John Doe', action: 'added new asset', target: 'MacBook Pro 16"', time: '2 min ago', avatar: 'JD' },
    { user: 'Sarah Smith', action: 'updated inventory', target: 'Warehouse A', time: '15 min ago', avatar: 'SS' },
    { user: 'Mike Johnson', action: 'completed booking', target: '#BK-2024-001', time: '1 hour ago', avatar: 'MJ' },
    { user: 'Emily Brown', action: 'created report', target: 'Monthly Asset Summary', time: '2 hours ago', avatar: 'EB' },
    { user: 'Alex Wilson', action: 'resolved alert', target: 'Server Room Temperature', time: '3 hours ago', avatar: 'AW' }
  ]

  const notifications = [
    { title: 'System Update', message: 'Maintenance scheduled for tonight', type: 'info', time: '5 min ago' },
    { title: 'New Asset Added', message: 'Dell XPS 15 added to inventory', type: 'success', time: '1 hour ago' },
    { title: 'Low Stock Alert', message: 'Office supplies running low', type: 'warning', time: '2 hours ago' },
    { title: 'Booking Reminder', message: 'Equipment pickup at 3 PM', type: 'info', time: '3 hours ago' }
  ]

  const recentAssets = [
    { name: 'MacBook Pro 16"', category: 'Laptops', status: 'Available', location: 'Office A' },
    { name: 'Dell XPS 15', category: 'Laptops', status: 'In Use', location: 'Office B' },
    { name: 'iPhone 15 Pro', category: 'Mobile Devices', status: 'Available', location: 'Storage' },
    { name: 'iPad Pro 12.9"', category: 'Tablets', status: 'In Use', location: 'Conference Room' },
    { name: 'Samsung Monitor', category: 'Displays', status: 'Maintenance', location: 'IT Room' }
  ]

  const upcomingBookings = [
    { id: 'BK-001', asset: 'MacBook Pro 16"', user: 'John Doe', date: 'Today, 3:00 PM', status: 'Confirmed' },
    { id: 'BK-002', asset: 'Conference Room A', user: 'Team Meeting', date: 'Tomorrow, 9:00 AM', status: 'Pending' },
    { id: 'BK-003', asset: 'Projector 4K', user: 'Sarah Smith', date: 'Jul 15, 2:00 PM', status: 'Confirmed' },
    { id: 'BK-004', asset: 'iPad Pro 12.9"', user: 'Mike Johnson', date: 'Jul 16, 10:00 AM', status: 'Pending' }
  ]

  const performanceData = [
    { label: 'Asset Utilization', value: 78, color: 'blue' },
    { label: 'User Satisfaction', value: 92, color: 'green' },
    { label: 'Response Time', value: 85, color: 'purple' },
    { label: 'System Uptime', value: 99, color: 'emerald' }
  ]

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Welcome Section */}
          <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                  Welcome back, Alex! 👋
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                  Here's what's happening with your assets today.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="7d">Last 7 days</option>
                  <option value="30d">Last 30 days</option>
                  <option value="90d">Last 90 days</option>
                </select>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                >
                  {darkMode ? '☀️' : '🌙'}
                </button>
              </div>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {kpiData.map((kpi, index) => (
              <Card
                key={index}
                className={`p-6 animate-in fade-in slide-in-from-bottom-4 duration-700 hover:shadow-lg transition-shadow cursor-pointer`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start justify-between">
                  <div className={`p-3 rounded-xl bg-${kpi.color}-100 dark:bg-${kpi.color}-900/30`}>
                    <div className={`text-${kpi.color}-600 dark:text-${kpi.color}-400`}>
                      {kpi.icon}
                    </div>
                  </div>
                  <Badge
                    variant={kpi.trend === 'up' ? 'success' : 'warning'}
                    className="text-xs"
                  >
                    {kpi.change}
                  </Badge>
                </div>
                <div className="mt-4">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                    {kpi.value}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                    {kpi.title}
                  </p>
                </div>
                <div className="mt-4 flex items-center gap-1 text-sm">
                  {kpi.trend === 'up' ? (
                    <LuTrendingUp className="h-4 w-4 text-green-500" />
                  ) : (
                    <LuTrendingDown className="h-4 w-4 text-red-500" />
                  )}
                  <span className={kpi.trend === 'up' ? 'text-green-500' : 'text-red-500'}>
                    vs last period
                  </span>
                </div>
              </Card>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: '400ms' }}>
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                Quick Actions
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    className={`flex flex-col items-center gap-3 p-4 rounded-xl border-2 border-${action.color}-200 dark:border-${action.color}-800 bg-${action.color}-50 dark:bg-${action.color}-900/20 hover:bg-${action.color}-100 dark:hover:bg-${action.color}-900/30 transition-all duration-200 group`}
                  >
                    <div className={`text-${action.color}-600 dark:text-${action.color}-400 group-hover:scale-110 transition-transform`}>
                      {action.icon}
                    </div>
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      {action.label}
                    </span>
                  </button>
                ))}
              </div>
            </Card>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            
            {/* Charts Section */}
            <div className="lg:col-span-2 animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: '500ms' }}>
              <Card className="p-6 h-full">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                    Asset Analytics
                  </h2>
                  <Button variant="outline" size="sm">
                    <LuEllipsis className="h-4 w-4" />
                  </Button>
                </div>
                
                {/* Chart Placeholder - Replace with actual chart library */}
                <div className="h-64 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700 rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="flex items-end justify-center gap-2 h-40 mb-4">
                      {[40, 65, 45, 80, 55, 70, 60].map((height, index) => (
                        <div
                          key={index}
                          className="w-8 bg-gradient-to-t from-blue-500 to-indigo-500 rounded-t-lg transition-all duration-300 hover:from-blue-600 hover:to-indigo-600"
                          style={{ height: `${height}%` }}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Weekly Asset Activity
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Activity Feed */}
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: '600ms' }}>
              <Card className="p-6 h-full">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                    Activity Feed
                  </h2>
                  <Button variant="ghost" size="sm">
                    View All
                  </Button>
                </div>
                <div className="space-y-4">
                  {activityFeed.map((activity, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Avatar name={activity.avatar} size="sm" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-slate-900 dark:text-white">
                          <span className="font-medium">{activity.user}</span>{' '}
                          {activity.action}{' '}
                          <span className="font-medium text-blue-600 dark:text-blue-400">
                            {activity.target}
                          </span>
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>

          {/* Performance Cards */}
          <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: '700ms' }}>
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">
                Performance Metrics
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {performanceData.map((metric, index) => (
                  <div key={index} className="text-center">
                    <div className="relative w-24 h-24 mx-auto mb-3">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle
                          cx="48"
                          cy="48"
                          r="40"
                          stroke="currentColor"
                          strokeWidth="8"
                          fill="none"
                          className="text-slate-200 dark:text-slate-700"
                        />
                        <circle
                          cx="48"
                          cy="48"
                          r="40"
                          stroke="currentColor"
                          strokeWidth="8"
                          fill="none"
                          strokeDasharray={`${metric.value * 2.51} 251`}
                          className={`text-${metric.color}-500`}
                          style={{ strokeLinecap: 'round' }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-lg font-bold text-slate-900 dark:text-white">
                          {metric.value}%
                        </span>
                      </div>
                    </div>
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      {metric.label}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Recent Assets & Upcoming Bookings */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            
            {/* Recent Assets */}
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: '800ms' }}>
              <Card className="p-6 h-full">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                    Recent Assets
                  </h2>
                  <Button variant="ghost" size="sm">
                    View All <LuArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
                <div className="space-y-3">
                  {recentAssets.map((asset, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold">
                          {asset.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-900 dark:text-white">
                            {asset.name}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            {asset.category}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge
                          variant={
                            asset.status === 'Available'
                              ? 'success'
                              : asset.status === 'In Use'
                              ? 'primary'
                              : 'warning'
                          }
                          size="sm"
                        >
                          {asset.status}
                        </Badge>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                          {asset.location}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Upcoming Bookings */}
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: '900ms' }}>
              <Card className="p-6 h-full">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                    Upcoming Bookings
                  </h2>
                  <Button variant="ghost" size="sm">
                    View All <LuArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
                <div className="space-y-3">
                  {upcomingBookings.map((booking, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white">
                          <LuClock className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-900 dark:text-white">
                            {booking.asset}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            {booking.user}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge
                          variant={booking.status === 'Confirmed' ? 'success' : 'warning'}
                          size="sm"
                        >
                          {booking.status}
                        </Badge>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                          {booking.date}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>

          {/* Notification Widget */}
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: '1000ms' }}>
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                    <LuBell className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                    Notifications
                  </h2>
                  <Badge variant="primary" size="sm">4 New</Badge>
                </div>
                <Button variant="ghost" size="sm">
                  Mark all as read
                </Button>
              </div>
              <div className="space-y-3">
                {notifications.map((notification, index) => (
                  <div
                    key={index}
                    className={`flex items-start gap-4 p-4 rounded-lg border-l-4 ${
                      notification.type === 'success'
                        ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                        : notification.type === 'warning'
                        ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20'
                        : 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    }`}
                  >
                    <div>
                      <p className="text-sm font-medium text-slate-900 dark:text-white">
                        {notification.title}
                      </p>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                        {notification.message}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                        {notification.time}
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

export default DashboardPage
