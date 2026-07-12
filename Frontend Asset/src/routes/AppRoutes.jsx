import { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { RootLayout, AuthLayout, DashboardLayout } from '@/layouts'
import ProtectedRoute from './ProtectedRoute'
import PublicRoute from './PublicRoute'
import { ROUTES } from '@/constants'

/**
 * Route configuration for AssetFlow ERP modules.
 *
 * Pages are lazy-loaded from src/pages/ when implemented.
 * Uncomment route entries as each page module is built.
 */

// --- Auth pages (lazy — implement in src/pages/auth/) ---
// const LoginPage = lazy(() => import('@/pages/auth/LoginPage'))
// const RegisterPage = lazy(() => import('@/pages/auth/RegisterPage'))
// const ForgotPasswordPage = lazy(() => import('@/pages/auth/ForgotPasswordPage'))

// --- Dashboard pages (lazy — implement in src/pages/) ---
// const DashboardPage = lazy(() => import('@/pages/dashboard/DashboardPage'))
// const AssetsPage = lazy(() => import('@/pages/assets/AssetsPage'))
// const AssetDetailPage = lazy(() => import('@/pages/assets/AssetDetailPage'))
// const InventoryPage = lazy(() => import('@/pages/inventory/InventoryPage'))
// const ProcurementPage = lazy(() => import('@/pages/procurement/ProcurementPage'))
// const MaintenancePage = lazy(() => import('@/pages/maintenance/MaintenancePage'))
// const ReportsPage = lazy(() => import('@/pages/reports/ReportsPage'))
// const UsersPage = lazy(() => import('@/pages/users/UsersPage'))
// const SettingsPage = lazy(() => import('@/pages/settings/SettingsPage'))
// const NotFoundPage = lazy(() => import('@/pages/errors/NotFoundPage'))

function RouteFallback() {
  return (
    <div className="flex min-h-[200px] items-center justify-center">
      <span className="text-sm text-[rgb(var(--color-text-secondary))]">Loading…</span>
    </div>
  )
}

export function AppRoutes() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route element={<RootLayout />}>
          {/* Public auth routes */}
          <Route element={<PublicRoute />}>
            <Route element={<AuthLayout />}>
              {/* <Route path={ROUTES.LOGIN} element={<LoginPage />} /> */}
              {/* <Route path={ROUTES.REGISTER} element={<RegisterPage />} /> */}
              {/* <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPasswordPage />} /> */}
            </Route>
          </Route>

          {/* Protected ERP routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<DashboardLayout />}>
              {/* <Route index element={<Navigate to={ROUTES.DASHBOARD} replace />} /> */}
              {/* <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} /> */}
              {/* <Route path={ROUTES.ASSETS} element={<AssetsPage />} /> */}
              {/* <Route path={ROUTES.ASSET_DETAIL} element={<AssetDetailPage />} /> */}
              {/* <Route path={ROUTES.INVENTORY} element={<InventoryPage />} /> */}
              {/* <Route path={ROUTES.PROCUREMENT} element={<ProcurementPage />} /> */}
              {/* <Route path={ROUTES.MAINTENANCE} element={<MaintenancePage />} /> */}
              {/* <Route path={ROUTES.REPORTS} element={<ReportsPage />} /> */}
              {/* <Route path={ROUTES.USERS} element={<UsersPage />} /> */}
              {/* <Route path={ROUTES.SETTINGS} element={<SettingsPage />} /> */}
            </Route>
          </Route>

          {/* Fallback — redirect to dashboard once pages exist */}
          <Route path="*" element={<Navigate to={ROUTES.LOGIN} replace />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default AppRoutes
