import { useState } from 'react'
import { Card, Button, Input, Avatar, Badge } from '@/components'
import { useAuthContext } from '@/context/AuthContext'
import { useThemeContext } from '@/context/ThemeContext'
import { LuUser, LuMail, LuBuilding2, LuLock, LuSun, LuMoon, LuSave, LuCheck } from 'react-icons/lu'

export function ProfilePage() {
  const { user } = useAuthContext()
  const { theme, toggleTheme, isDark } = useThemeContext()
  const [editMode, setEditMode] = useState(false)
  const [profileData, setProfileData] = useState({
    name: user?.name || 'Alex Wilson',
    email: user?.email || 'alex@company.com',
    department: 'Engineering',
    role: user?.role || 'admin',
    phone: '+1 (555) 123-4567',
    location: 'New York, USA',
  })
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [showSuccess, setShowSuccess] = useState({ profile: false, password: false })

  const handleProfileSave = (e) => {
    e.preventDefault()
    setShowSuccess({ ...showSuccess, profile: true })
    setEditMode(false)
    setTimeout(() => setShowSuccess({ ...showSuccess, profile: false }), 3000)
  }

  const handlePasswordSave = (e) => {
    e.preventDefault()
    setShowSuccess({ ...showSuccess, password: true })
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
    setTimeout(() => setShowSuccess({ ...showSuccess, password: false }), 3000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-blue-100">
              <LuUser className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-1">My Profile</h1>
              <p className="text-slate-600">Manage your account settings</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* User Profile Card */}
          <div className="lg:col-span-1">
            <Card className="p-6 text-center">
              <Avatar
                size="xl"
                name={profileData.name}
                className="mx-auto mb-4"
              />
              <h2 className="text-2xl font-bold text-slate-900 mb-1">{profileData.name}</h2>
              <p className="text-slate-600 mb-2">{profileData.email}</p>
              <Badge variant="primary" className="mb-4">
                {profileData.role.charAt(0).toUpperCase() + profileData.role.slice(1)}
              </Badge>
              <div className="space-y-3 text-left">
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <LuBuilding2 className="h-4 w-4" />
                  <span>{profileData.department}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <LuUser className="h-4 w-4" />
                  <span>{profileData.location}</span>
                </div>
              </div>
            </Card>

            {/* Theme Toggle */}
            <Card className="p-6 mt-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Theme</h3>
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
                    className={`pointer-events-none inline-block h-7 w-7 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                      isDark ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </Card>
          </div>

          {/* Edit Profile and Change Password */}
          <div className="lg:col-span-2 space-y-6">
            {/* Edit Profile */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-slate-900">Edit Profile</h3>
                {!editMode ? (
                  <Button variant="outline" onClick={() => setEditMode(true)}>
                    Edit
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setEditMode(false)}>
                      Cancel
                    </Button>
                  </div>
                )}
              </div>
              
              <form onSubmit={handleProfileSave} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                    <Input
                      value={profileData.name}
                      onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                      disabled={!editMode}
                      leftIcon={<LuUser />}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                    <Input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      disabled={!editMode}
                      leftIcon={<LuMail />}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Department</label>
                    <Input
                      value={profileData.department}
                      onChange={(e) => setProfileData({ ...profileData, department: e.target.value })}
                      disabled={!editMode}
                      leftIcon={<LuBuilding2 />}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Phone</label>
                    <Input
                      value={profileData.phone}
                      onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                      disabled={!editMode}
                    />
                  </div>
                </div>

                {editMode && (
                  <div className="flex items-center gap-3 pt-4">
                    <Button type="submit" className="gap-2">
                      <LuSave className="h-4 w-4" />
                      Save Changes
                    </Button>
                    {showSuccess.profile && (
                      <span className="flex items-center gap-1 text-green-600 text-sm">
                        <LuCheck className="h-4 w-4" />
                        Profile updated successfully!
                      </span>
                    )}
                  </div>
                )}
              </form>
            </Card>

            {/* Change Password */}
            <Card className="p-6">
              <h3 className="text-xl font-semibold text-slate-900 mb-6">Change Password</h3>
              
              <form onSubmit={handlePasswordSave} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Current Password</label>
                  <Input
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                    leftIcon={<LuLock />}
                    placeholder="Enter current password"
                  />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">New Password</label>
                    <Input
                      type="password"
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                      leftIcon={<LuLock />}
                      placeholder="Enter new password"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Confirm New Password</label>
                    <Input
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                      leftIcon={<LuLock />}
                      placeholder="Confirm new password"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-4">
                  <Button type="submit" className="gap-2">
                    <LuSave className="h-4 w-4" />
                    Update Password
                  </Button>
                  {showSuccess.password && (
                    <span className="flex items-center gap-1 text-green-600 text-sm">
                      <LuCheck className="h-4 w-4" />
                      Password changed successfully!
                    </span>
                  )}
                </div>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
