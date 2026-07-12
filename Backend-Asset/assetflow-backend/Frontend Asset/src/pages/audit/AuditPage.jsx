import { useState } from 'react'
import { Card, Button, DataTable, Badge } from '@/components'
import { LuCheck, LuAlertTriangle, LuSearch, LuClock } from 'react-icons/lu'

export function AuditPage() {
  const [selectedAudit, setSelectedAudit] = useState(null)

  const audits = [
    { id: 1, auditName: 'Asset Inventory', type: 'Inventory', status: 'Verified', performedBy: 'John Smith', date: '2024-07-10', findings: 2 },
    { id: 2, auditName: 'Procurement Compliance', type: 'Procurement', status: 'Pending', performedBy: 'Sarah Johnson', date: '2024-07-09', findings: 0 },
    { id: 3, auditName: 'User Access Review', type: 'Security', status: 'Failed', performedBy: 'Mike Chen', date: '2024-07-08', findings: 5 },
    { id: 4, auditName: 'Maintenance Logs', type: 'Maintenance', status: 'Verified', performedBy: 'Emily Davis', date: '2024-07-07', findings: 1 },
  ]

  const columns = [
    { key: 'auditName', header: 'Audit Name', sortable: true },
    { key: 'type', header: 'Type', sortable: true },
    {
      key: 'status',
      header: 'Status',
      render: (value) => (
        <Badge variant={
          value === 'Verified' ? 'success'
            : value === 'Pending' ? 'warning'
              : 'danger'
        }>
          {value}
        </Badge>
      )
    },
    { key: 'performedBy', header: 'Performed By', sortable: true },
    { key: 'date', header: 'Date', sortable: true },
    { key: 'findings', header: 'Findings', sortable: true },
    {
      key: 'actions',
      header: 'Actions',
      render: (_, row) => (
        <Button
          variant="outline"
          size="sm"
          onClick={() => setSelectedAudit(row)}
          disabled={row.status === 'Verified'}
          className="gap-1"
        >
          <LuCheck className="h-4 w-4" />
          Verify
        </Button>
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
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Audit Management</h1>
              <p className="text-slate-600">Manage audits and verify compliance</p>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-blue-100">
                <LuSearch className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">4</p>
                <p className="text-sm text-slate-600">Total Audits</p>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-green-100">
                <LuCheck className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">2</p>
                <p className="text-sm text-slate-600">Verified</p>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-yellow-100">
                <LuClock className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">1</p>
                <p className="text-sm text-slate-600">Pending</p>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-red-100">
                <LuAlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">8</p>
                <p className="text-sm text-slate-600">Total Findings</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Audit Table */}
        <Card className="p-6">
          <DataTable
            columns={columns}
            data={audits}
            pagination={{
              currentPage: 1,
              totalPages: 1,
              onPageChange: () => {},
              totalItems: audits.length
            }}
          />
        </Card>
      </div>
    </div>
  )
}

export default AuditPage
