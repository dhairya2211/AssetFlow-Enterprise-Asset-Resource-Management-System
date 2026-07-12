import { useState } from 'react'
import { Card, Button, Input, Select, Badge, Avatar } from '@/components'
import { useAuthContext } from '@/context/AuthContext'
import { useThemeContext } from '@/context/ThemeContext'
import {
  LuSettings,
  LuUser,
  LuBell,
  LuLock,
  LuGlobe,
  LuPalette,
  LuDatabase,
  LuSun,
  LuMoon,
  LuCheck,
  LuPen
} from 'react-icons/lu'

export function SettingsPage() {
  const { user } = useAuthContext()
  const { theme, toggleTheme, isDark } = useThemeContext()
  const [activeTab, setActiveTab] = useState('profile')
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: user?.name || 'Alex Wilson',
    email: user?.email || 'alex@company.com',
    phone: '+1 (555) 123-4567',
    timezone: 'America/New_York',
    language: 'English'
  })

  const tabs = [
    { id: 'profile', label: 'Profile', icon: LuUser },
    { id: 'notifications', label: 'Notifications', icon: LuBell },
    { id: 'security', label: 'Security', icon: LuLock },
    { id: 'appearance', label: 'Appearance', icon: LuPalette },
    { id: 'integrations', label: 'Integrations', icon: LuGlobe },
    { id: 'data', label: 'Data', icon: LuDatabase }
  ]

  const timezones = [
    { value: 'America/New_York', label: 'Eastern Time (ET)' },
    { value: 'America/Chicago', label: 'Central Time (CT)' },
    { value: 'America/Denver', label: 'Mountain Time (MT)' },
    { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
    { value: 'Europe/London', label: 'Greenwich Mean Time (GMT)' }
  ]

  const languages = [
    { value: 'English', label: 'English' },
    { value: 'Spanish', label: 'Spanish' },
    { value: 'French', label: 'French' },
    { value: 'German', label: 'German' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-blue-100">
                <LuSettings className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-900 mb-1">Settings</h1>
                <p className="text-slate-600">Manage your account and preferences</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <Card className="w-full lg:w-64 p-4 flex-shrink-0">
            <nav className="space-y-1">
              {tabs.map(tab => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      activeTab === tab.id
                        ? 'bg-blue-50 text-blue-700 font-medium'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{tab.label}</span>
                  </button>
                )
              })}
            </nav>
          </Card>

          {/* Main Content */}
          <div className="flex-1 space-y-6">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold text-slate-900">Profile Settings</h2>
                  <Button variant="outline" onClick={() => setIsEditing(!isEditing)} className="gap-2">
                    <LuPen className="h-4 w-4" />
                    {isEditing ? 'Cancel' : 'Edit Profile'}
                  </Button>
                </div>

                <div className="flex items-center gap-6 mb-8">
                  <Avatar name={profileData.name} size="xl" />
                  <div>
                    <Button variant="outline" size="sm" disabled={!isEditing}>
                      Change Avatar
                    </Button>
                    <p className="text-xs text-slate-500 mt-2">JPG, PNG, GIF up to 5MB</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                      <Input
                        value={profileData.name}
                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                        disabled={!isEditing}
                        leftIcon={<LuUser />}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                      <Input
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                        disabled={!isEditing}
                        leftIcon={<LuUser />}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Phone</label>
                      <Input
                        value={profileData.phone}
                        onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Timezone</label>
                      <Select
                        options={timezones}
                        value={profileData.timezone}
                        onChange={(val) => setProfileData({ ...profileData, timezone: val })}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Language</label>
                    <Select
                      options={languages}
                      value={profileData.language}
                      onChange={(val) => setProfileData({ ...profileData, language: val })}
                      disabled={!isEditing}
                    />
                  </div>
                  {isEditing && (
                    <div className="flex gap-3 pt-4 border-t border-slate-200">
                      <Button onClick={() => setIsEditing(false)}>
                        <LuCheck className="h-4 w-4 mr-2" />
                        Save Changes
                      </Button>
                    </div>
                  )}
                </div>
              </Card>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <Card className="p-6">
                <h2 className="text-2xl font-semibold text-slate-900 mb-6">Notification Preferences</h2>
                <div className="space-y-6">
                  {[
                    { id: 'email', label: 'Email Notifications', desc: 'Receive emails about account activity' },
                    { id: 'push', label: 'Push Notifications', desc: 'Receive push notifications on your devices' },
                    { id: 'weekly', label: 'Weekly Digest', desc: 'Get a weekly summary of your activity' },
                    { id: 'marketing', label: 'Marketing Updates', desc: 'Receive product updates and offers' }
                  ].map(setting => (
                    <div key={setting.id} className="flex items-center justify-between py-4 border-b border-slate-200 last:border-0">
                      <div>
                        <h3 className="text-sm font-medium text-slate-900">{setting.label}</h3>
                        <p className="text-xs text-slate-500 mt-1">{setting.desc}</p>
                      </div>
                      <button
                        onClick={() => {}}
                        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
                          setting.id !== 'marketing' ? 'bg-blue-600' : 'bg-slate-200'
                        }`}
                      >
                        <span
                          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                            setting.id !== 'marketing' ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <Card className="p-6">
                <h2 className="text-2xl font-semibold text-slate-900 mb-6">Security Settings</h2>
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-medium text-slate-900 mb-4">Change Password</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Current Password</label>
                        <Input type="password" placeholder="••••••••" leftIcon={<LuLock />} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">New Password</label>
                        <Input type="password" placeholder="••••••••" leftIcon={<LuLock />} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Confirm New Password</label>
                        <Input type="password" placeholder="••••••••" leftIcon={<LuLock />} />
                      </div>
                      <Button>Update Password</Button>
                    </div>
                  </div>
                  <div className="pt-6 border-t border-slate-200">
                    <h3 className="text-lg font-medium text-slate-900 mb-4">Two-Factor Authentication</h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-700">Add an extra layer of security to your account</p>
                        <p className="text-xs text-slate-500 mt-1">Recommended</p>
                      </div>
                      <Badge variant="secondary">Not Enabled</Badge>
                    </div>
                    <Button variant="outline" className="mt-4">
                      Enable 2FA
                    </Button>
                  </div>
                </div>
              </Card>
            )}

            {/* Appearance Tab */}
            {activeTab === 'appearance' && (
              <Card className="p-6">
                <h2 className="text-2xl font-semibold text-slate-900 mb-6">Appearance Settings</h2>
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-medium text-slate-900 mb-4">Theme</h3>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {isDark ? (
                          <LuMoon className="h-5 w-5 text-slate-600" />
                        ) : (
                          <LuSun className="h-5 w-5 text-slate-600" />
                        )}
                        <span className="text-slate-700">
                          {isDark ? 'Dark Mode' : 'Light Mode'}
                        </span>
                      </div>
                      <button
                        onClick={toggleTheme}
                        className={`relative inline-flex h-8 w-14 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
                          isDark ? 'bg-blue-600' : 'bg-slate-200'
                        }`}
                      >
                        <span
                          className={`pointer-events-none inline-block h-7 w-7 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                            isDark ? 'translate-x-6' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                  <div className="pt-6 border-t border-slate-200">
                    <h3 className="text-lg font-medium text-slate-900 mb-4">Color Theme</h3>
                    <div className="flex gap-3">
                      {['blue', 'purple', 'green', 'orange', 'pink'].map(color => (
                        <button
                          key={color}
                          className={`w-10 h-10 rounded-full border-2 transition-all ${
                            color === 'blue' ? 'border-slate-900 scale-110' : 'border-transparent hover:scale-105'
                          }`}
                          style={{ backgroundColor: `var(--color-${color}-500, #6366f1)` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {/* Integrations Tab */}
            {activeTab === 'integrations' && (
              <Card className="p-6">
                <h2 className="text-2xl font-semibold text-slate-900 mb-6">Integrations</h2>
                <div className="space-y-4">
                  {[
                    { name: 'Google Workspace', desc: 'Sync with Google Calendar and Drive', status: 'not-connected' },
                    { name: 'Slack', desc: 'Get notifications in Slack', status: 'not-connected' },
                    { name: 'Microsoft 365', desc: 'Sync with Outlook and Teams', status: 'not-connected' }
                  ].map(integration => (
                    <div key={integration.name} className="flex items-center justify-between py-4 px-4 bg-slate-50 rounded-lg">
                      <div>
                        <h3 className="text-sm font-medium text-slate-900">{integration.name}</h3>
                        <p className="text-xs text-slate-500 mt-1">{integration.desc}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Connect
                      </Button>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Data Tab */}
            {activeTab === 'data' && (
              <Card className="p-6">
                <h2 className="text-2xl font-semibold text-slate-900 mb-6">Data Management</h2>
                <div className="space-y-6">
                  <div className="flex items-center justify-between py-4 px-4 bg-slate-50 rounded-lg">
                    <div>
                      <h3 className="text-sm font-medium text-slate-900">Export Your Data</h3>
                      <p className="text-xs text-slate-500 mt-1">Download all your data as a ZIP file</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Export
                    </Button>
                  </div>
                  <div className="flex items-center justify-between py-4 px-4 bg-red-50 rounded-lg border border-red-200">
                    <div>
                      <h3 className="text-sm font-medium text-red-900">Delete Account</h3>
                      <p className="text-xs text-red-600 mt-1">Permanently delete your account and all data</p>
                    </div>
                    <Button variant="danger" size="sm">
                      Delete Account
                    </Button>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage
