import { useState } from 'react'
import { Card, Badge, Avatar, Button } from '@/components'
import { LuTrendingUp, LuTrendingDown, LuUsers, LuPackage, LuDollarSign, LuCircleAlert, LuClock, LuPlus, LuEllipsis } from 'react-icons/lu'

/**
 * Dashboard Page
 * Features: Welcome Section, 4 KPI Cards, Quick Actions, Placeholder Chart, Recent Activity, Responsive Layout
 */
export function DashboardPage() {
  const [timeRange, setTimeRange] = useState('7d')

  // Mock Data
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
    { label: 'Generate Report', icon: <LuEllipsis className="h-5 w-5" />, color: 'green' },
    { label: 'View Alerts', icon: <LuCircleAlert className="h-5 w-5" />, color: 'red' }
  ]

  const activityFeed = [
    { user: 'John Doe', action: 'added new asset', target: 'MacBook Pro 16"', time: '2 min ago', avatar: 'JD' },
    { user: 'Sarah Smith', action: 'updated inventory', target: 'Warehouse A', time: '15 min ago', avatar: 'SS' },
    { user: 'Mike Johnson', action: 'completed booking', target: '#BK-2024-001', time: '1 hour ago', avatar: 'MJ' },
    { user: 'Emily Brown', action: 'created report', target: 'Monthly Asset Summary', time: '2 hours ago', avatar: 'EB' },
    { user: 'Alex Wilson', action: 'resolved alert', target: 'Server Room Temperature', time: '3 hours ago', avatar: 'AW' }
  ]

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">
                Welcome back, Alex! 👋
              </h1>
              <p className="text-slate-600">
                Here's what's happening with your assets today.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-4 py-2 rounded-lg border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
              </select>
            </div>
          </div>
        </div>

        {/* KPI Cards (4 cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {kpiData.map((kpi, index) => (
            <Card
              key={index}
              className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="flex items-start justify-between">
                <div className={`p-3 rounded-xl bg-${kpi.color}-100`}>
                  <div className={`text-${kpi.color}-600`}>
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
                <h3 className="text-2xl font-bold text-slate-900">
                  {kpi.value}
                </h3>
                <p className="text-sm text-slate-600 mt-1">
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

        {/* Quick Actions Card */}
        <div className="mb-8">
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">
              Quick Actions
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  className={`flex flex-col items-center gap-3 p-4 rounded-xl border-2 border-${action.color}-200 bg-${action.color}-50 hover:bg-${action.color}-100 transition-all duration-200 group`}
                >
                  <div className={`text-${action.color}-600 group-hover:scale-110 transition-transform`}>
                    {action.icon}
                  </div>
                  <span className="text-sm font-medium text-slate-700">
                    {action.label}
                  </span>
                </button>
              ))}
            </div>
          </Card>
        </div>

        {/* Main Content Grid (Chart + Recent Activity) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Placeholder Chart Section (2 columns) */}
          <div className="lg:col-span-2">
            <Card className="p-6 h-full">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-slate-900">
                  Asset Analytics
                </h2>
                <Button variant="outline" size="sm">
                  <LuEllipsis className="h-4 w-4" />
                </Button>
              </div>
              
              {/* Chart Placeholder */}
              <div className="h-64 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl flex items-center justify-center">
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
                  <p className="text-sm text-slate-600">
                    Weekly Asset Activity
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Recent Activity Card (1 column) */}
          <div>
            <Card className="p-6 h-full">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-slate-900">
                  Recent Activity
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
                      <p className="text-sm text-slate-900">
                        <span className="font-medium">{activity.user}</span>{' '}
                        {activity.action}{' '}
                        <span className="font-medium text-blue-600">
                          {activity.target}
                        </span>
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        {activity.time}
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
