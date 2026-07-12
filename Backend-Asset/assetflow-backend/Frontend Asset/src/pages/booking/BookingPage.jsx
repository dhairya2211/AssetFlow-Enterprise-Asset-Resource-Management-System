import { useState } from 'react'
import { Card, Button, DataTable, Drawer, Badge } from '@/components'
import { LuPlus, LuCalendar, LuClock, LuBuilding2 } from 'react-icons/lu'

export function BookingPage() {
  const [isBookingDrawerOpen, setIsBookingDrawerOpen] = useState(false)
  const [selectedResource, setSelectedResource] = useState('')
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])

  const bookings = [
    { id: 1, resourceName: 'Conference Room A', booker: 'John Smith', purpose: 'Client Meeting', date: '2024-07-15', time: '10:00 AM - 12:00 PM', status: 'Confirmed' },
    { id: 2, resourceName: 'Projector 1', booker: 'Sarah Johnson', purpose: 'Team Presentation', date: '2024-07-16', time: '2:00 PM - 4:00 PM', status: 'Pending' },
    { id: 3, resourceName: 'Conference Room B', booker: 'Mike Chen', purpose: 'Interview', date: '2024-07-17', time: '9:00 AM - 11:00 AM', status: 'Confirmed' },
    { id: 4, resourceName: 'Laptop Cart', booker: 'Emily Davis', purpose: 'Training Session', date: '2024-07-18', time: '1:00 PM - 5:00 PM', status: 'Confirmed' }
  ]

  const resources = [
    { id: 1, name: 'Conference Room A', type: 'Room', capacity: 10 },
    { id: 2, name: 'Conference Room B', type: 'Room', capacity: 6 },
    { id: 3, name: 'Projector 1', type: 'Equipment' },
    { id: 4, name: 'Projector 2', type: 'Equipment' },
    { id: 5, name: 'Laptop Cart', type: 'Equipment' },
    { id: 6, name: 'Whiteboard Set', type: 'Equipment' }
  ]

  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ]

  const columns = [
    { key: 'resourceName', header: 'Resource', sortable: true },
    { key: 'booker', header: 'Booked By', sortable: true },
    { key: 'purpose', header: 'Purpose', sortable: true },
    { key: 'date', header: 'Date', sortable: true },
    { key: 'time', header: 'Time', sortable: true },
    {
      key: 'status',
      header: 'Status',
      render: (value) => (
        <Badge variant={value === 'Confirmed' ? 'success' : 'warning'}>
          {value}
        </Badge>
      )
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Booking Management</h1>
              <p className="text-slate-600">Book resources and manage bookings</p>
            </div>
            <Button onClick={() => setIsBookingDrawerOpen(true)} size="lg" className="gap-2">
              <LuPlus className="h-5 w-5" />
              Create Booking
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-blue-100">
                <LuCalendar className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">4</p>
                <p className="text-sm text-slate-600">Total Bookings</p>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-green-100">
                <LuCalendar className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">3</p>
                <p className="text-sm text-slate-600">Confirmed</p>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-yellow-100">
                <LuCalendar className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">1</p>
                <p className="text-sm text-slate-600">Pending</p>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-purple-100">
                <LuBuilding2 className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">6</p>
                <p className="text-sm text-slate-600">Resources</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar Placeholder */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-slate-900">Calendar</h2>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Previous</Button>
                  <Button variant="outline" size="sm">Next</Button>
                </div>
              </div>
              <div className="grid grid-cols-7 gap-2 mb-4">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="text-center text-sm font-medium text-slate-500 py-2">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 31 }).map((_, i) => (
                  <div
                    key={i}
                    className={`aspect-square flex items-center justify-center rounded-lg text-sm cursor-pointer transition-all hover:bg-blue-50 ${
                      i + 1 === parseInt(selectedDate.split('-')[2])
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-700'
                    }`}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Resources Selector */}
          <div>
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">Resources</h2>
              <div className="space-y-3">
                {resources.map(resource => (
                  <div
                    key={resource.id}
                    onClick={() => setSelectedResource(resource.id)}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedResource === resource.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-slate-900">{resource.name}</span>
                      <Badge variant="secondary">{resource.type}</Badge>
                    </div>
                    {resource.capacity && (
                      <p className="text-sm text-slate-500">Capacity: {resource.capacity}</p>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* Booking List */}
        <Card className="p-6 mt-8">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Upcoming Bookings</h2>
          <DataTable
            columns={columns}
            data={bookings}
            pagination={{
              currentPage: 1,
              totalPages: 1,
              onPageChange: () => {},
              totalItems: bookings.length
            }}
          />
        </Card>

        {/* Create Booking Drawer */}
        <Drawer
          isOpen={isBookingDrawerOpen}
          onClose={() => setIsBookingDrawerOpen(false)}
          title="Create New Booking"
          position="right"
          size="lg"
          footer={
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setIsBookingDrawerOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsBookingDrawerOpen(false)}>
                Create Booking
              </Button>
            </div>
          }
        >
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Resource</label>
              <select className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Select Resource</option>
                {resources.map(r => (
                  <option key={r.id} value={r.id}>{r.name} ({r.type})</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Date</label>
              <input
                type="date"
                defaultValue={selectedDate}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Start Time</label>
                <select className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  {timeSlots.map(time => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">End Time</label>
                <select className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  {timeSlots.map(time => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Purpose</label>
              <input
                type="text"
                placeholder="Enter purpose"
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Notes</label>
              <textarea
                rows={3}
                placeholder="Enter notes..."
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
          </div>
        </Drawer>

      </div>
    </div>
  )
}

export default BookingPage
