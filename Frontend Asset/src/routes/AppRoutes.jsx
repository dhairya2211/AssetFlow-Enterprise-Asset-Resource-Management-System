import { Suspense, lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { RootLayout, AuthLayout, DashboardLayout } from '@/layouts'
import ProtectedRoute from './ProtectedRoute'
import PublicRoute from './PublicRoute'
import { RoleProtectedRoute, PermissionProtectedRoute } from './RoleProtectedRoute'
import { LoadingRoute, PageLoadingRoute } from './LoadingRoute'
import { NotFoundPage, UnauthorizedPage, ServerErrorPage } from './NotFoundPage'
import { ROUTES, USER_ROLES } from '@/constants'

/**
 * Route configuration for AssetFlow ERP modules.
 * 
 * Architecture:
 * - Public routes: No authentication required (login, register, etc.)
 * - Private routes: Authentication required
 * - Role-protected routes: Specific roles required
 * - Nested routes: Module-based routing with child routes
 * - Error routes: 404, 401, 500 pages
 * 
 * Pages are lazy-loaded from src/pages/ when implemented.
 * Uncomment route entries as each page module is built.
 */

// --- Auth pages (lazy — implement in src/pages/auth/) ---
// const LoginPage = lazy(() => import('@/pages/auth/LoginPage'))
// const RegisterPage = lazy(() => import('@/pages/auth/RegisterPage'))
// const ForgotPasswordPage = lazy(() => import('@/pages/auth/ForgotPasswordPage'))
// const ResetPasswordPage = lazy(() => import('@/pages/auth/ResetPasswordPage'))
// const VerifyEmailPage = lazy(() => import('@/pages/auth/VerifyEmailPage'))

// --- Dashboard pages (lazy — implement in src/pages/) ---
// const DashboardPage = lazy(() => import('@/pages/dashboard/DashboardPage'))

// --- Assets module pages (lazy — implement in src/pages/assets/) ---
// const AssetsPage = lazy(() => import('@/pages/assets/AssetsPage'))
// const AssetDetailPage = lazy(() => import('@/pages/assets/AssetDetailPage'))
// const AssetCreatePage = lazy(() => import('@/pages/assets/AssetCreatePage'))
// const AssetEditPage = lazy(() => import('@/pages/assets/AssetEditPage'))
// const AssetCategoriesPage = lazy(() => import('@/pages/assets/AssetCategoriesPage'))

// --- Inventory module pages (lazy — implement in src/pages/inventory/) ---
// const InventoryPage = lazy(() => import('@/pages/inventory/InventoryPage'))
// const InventoryStockPage = lazy(() => import('@/pages/inventory/InventoryStockPage'))
// const InventoryMovementsPage = lazy(() => import('@/pages/inventory/InventoryMovementsPage'))
// const InventoryLocationsPage = lazy(() => import('@/pages/inventory/InventoryLocationsPage'))

// --- Procurement module pages (lazy — implement in src/pages/procurement/) ---
// const ProcurementPage = lazy(() => import('@/pages/procurement/ProcurementPage'))
// const ProcurementOrdersPage = lazy(() => import('@/pages/procurement/ProcurementOrdersPage'))
// const ProcurementOrderDetailPage = lazy(() => import('@/pages/procurement/ProcurementOrderDetailPage'))
// const ProcurementVendorsPage = lazy(() => import('@/pages/procurement/ProcurementVendorsPage'))
// const ProcurementVendorDetailPage = lazy(() => import('@/pages/procurement/ProcurementVendorDetailPage'))
// const ProcurementRequestsPage = lazy(() => import('@/pages/procurement/ProcurementRequestsPage'))

// --- Maintenance module pages (lazy — implement in src/pages/maintenance/) ---
// const MaintenancePage = lazy(() => import('@/pages/maintenance/MaintenancePage'))
// const MaintenanceWorkOrdersPage = lazy(() => import('@/pages/maintenance/MaintenanceWorkOrdersPage'))
// const MaintenanceWorkOrderDetailPage = lazy(() => import('@/pages/maintenance/MaintenanceWorkOrderDetailPage'))
// const MaintenanceSchedulesPage = lazy(() => import('@/pages/maintenance/MaintenanceSchedulesPage'))
// const MaintenancePreventivePage = lazy(() => import('@/pages/maintenance/MaintenancePreventivePage'))

// --- Reports module pages (lazy — implement in src/pages/reports/) ---
// const ReportsPage = lazy(() => import('@/pages/reports/ReportsPage'))
// const ReportsAssetsPage = lazy(() => import('@/pages/reports/ReportsAssetsPage'))
// const ReportsInventoryPage = lazy(() => import('@/pages/reports/ReportsInventoryPage'))
// const ReportsProcurementPage = lazy(() => import('@/pages/reports/ReportsProcurementPage'))
// const ReportsMaintenancePage = lazy(() => import('@/pages/reports/ReportsMaintenancePage'))
// const ReportsCustomPage = lazy(() => import('@/pages/reports/ReportsCustomPage'))

// --- Users module pages (lazy — implement in src/pages/users/) ---
// const UsersPage = lazy(() => import('@/pages/users/UsersPage'))
// const UserDetailPage = lazy(() => import('@/pages/users/UserDetailPage'))
// const UserCreatePage = lazy(() => import('@/pages/users/UserCreatePage'))
// const UserEditPage = lazy(() => import('@/pages/users/UserEditPage'))
// const UsersRolesPage = lazy(() => import('@/pages/users/UsersRolesPage'))
// const UsersPermissionsPage = lazy(() => import('@/pages/users/UsersPermissionsPage'))

// --- Settings module pages (lazy — implement in src/pages/settings/) ---
// const SettingsPage = lazy(() => import('@/pages/settings/SettingsPage'))
// const SettingsOrganizationPage = lazy(() => import('@/pages/settings/SettingsOrganizationPage'))
// const SettingsPreferencesPage = lazy(() => import('@/pages/settings/SettingsPreferencesPage'))
// const SettingsNotificationsPage = lazy(() => import('@/pages/settings/SettingsNotificationsPage'))
// const SettingsSecurityPage = lazy(() => import('@/pages/settings/SettingsSecurityPage'))
// const SettingsIntegrationsPage = lazy(() => import('@/pages/settings/SettingsIntegrationsPage'))
// const SettingsAuditLogPage = lazy(() => import('@/pages/settings/SettingsAuditLogPage'))

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
          {/* === PUBLIC AUTH ROUTES === */}
          <Route element={<PublicRoute />}>
            <Route element={<AuthLayout />}>
              {/* <Route path={ROUTES.LOGIN} element={<LoginPage />} /> */}
              {/* <Route path={ROUTES.REGISTER} element={<RegisterPage />} /> */}
              {/* <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPasswordPage />} /> */}
              {/* <Route path={ROUTES.RESET_PASSWORD} element={<ResetPasswordPage />} /> */}
              {/* <Route path={ROUTES.VERIFY_EMAIL} element={<VerifyEmailPage />} /> */}
            </Route>
          </Route>

          {/* === PROTECTED ERP ROUTES === */}
          <Route element={<ProtectedRoute />}>
            <Route element={<DashboardLayout />}>
              {/* Default redirect */}
              {/* <Route index element={<Navigate to={ROUTES.DASHBOARD} replace />} /> */}

              {/* Dashboard */}
              {/* <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} /> */}

              {/* === ASSETS MODULE (Nested Routes) === */}
              {/* <Route path={ROUTES.ASSETS} element={<AssetsPage />} /> */}
              {/* <Route path={ROUTES.ASSET_DETAIL} element={<AssetDetailPage />} /> */}
              {/* <Route path={ROUTES.ASSET_CREATE} element={<AssetCreatePage />} /> */}
              {/* <Route path={ROUTES.ASSET_EDIT} element={<AssetEditPage />} /> */}
              {/* <Route path={ROUTES.ASSET_CATEGORIES} element={<AssetCategoriesPage />} /> */}

              {/* === INVENTORY MODULE (Nested Routes) === */}
              {/* <Route path={ROUTES.INVENTORY} element={<InventoryPage />} /> */}
              {/* <Route path={ROUTES.INVENTORY_STOCK} element={<InventoryStockPage />} /> */}
              {/* <Route path={ROUTES.INVENTORY_MOVEMENTS} element={<InventoryMovementsPage />} /> */}
              {/* <Route path={ROUTES.INVENTORY_LOCATIONS} element={<InventoryLocationsPage />} /> */}

              {/* === PROCUREMENT MODULE (Nested Routes) === */}
              {/* <Route path={ROUTES.PROCUREMENT} element={<ProcurementPage />} /> */}
              {/* <Route path={ROUTES.PROCUREMENT_ORDERS} element={<ProcurementOrdersPage />} /> */}
              {/* <Route path={ROUTES.PROCUREMENT_ORDER_DETAIL} element={<ProcurementOrderDetailPage />} /> */}
              {/* <Route path={ROUTES.PROCUREMENT_VENDORS} element={<ProcurementVendorsPage />} /> */}
              {/* <Route path={ROUTES.PROCUREMENT_VENDOR_DETAIL} element={<ProcurementVendorDetailPage />} /> */}
              {/* <Route path={ROUTES.PROCUREMENT_REQUESTS} element={<ProcurementRequestsPage />} /> */}

              {/* === MAINTENANCE MODULE (Nested Routes) === */}
              {/* <Route path={ROUTES.MAINTENANCE} element={<MaintenancePage />} /> */}
              {/* <Route path={ROUTES.MAINTENANCE_WORK_ORDERS} element={<MaintenanceWorkOrdersPage />} /> */}
              {/* <Route path={ROUTES.MAINTENANCE_WORK_ORDER_DETAIL} element={<MaintenanceWorkOrderDetailPage />} /> */}
              {/* <Route path={ROUTES.MAINTENANCE_SCHEDULES} element={<MaintenanceSchedulesPage />} /> */}
              {/* <Route path={ROUTES.MAINTENANCE_PREVENTIVE} element={<MaintenancePreventivePage />} /> */}

              {/* === REPORTS MODULE (Nested Routes) === */}
              {/* <Route path={ROUTES.REPORTS} element={<ReportsPage />} /> */}
              {/* <Route path={ROUTES.REPORTS_ASSETS} element={<ReportsAssetsPage />} /> */}
              {/* <Route path={ROUTES.REPORTS_INVENTORY} element={<ReportsInventoryPage />} /> */}
              {/* <Route path={ROUTES.REPORTS_PROCUREMENT} element={<ReportsProcurementPage />} /> */}
              {/* <Route path={ROUTES.REPORTS_MAINTENANCE} element={<ReportsMaintenancePage />} /> */}
              {/* <Route path={ROUTES.REPORTS_CUSTOM} element={<ReportsCustomPage />} /> */}

              {/* === USERS MODULE (Nested Routes - Role Protected) === */}
              <Route element={<RoleProtectedRoute allowedRoles={[USER_ROLES.ADMIN, USER_ROLES.MANAGER]} />}>
                {/* <Route path={ROUTES.USERS} element={<UsersPage />} /> */}
                {/* <Route path={ROUTES.USER_DETAIL} element={<UserDetailPage />} /> */}
                {/* <Route path={ROUTES.USER_CREATE} element={<UserCreatePage />} /> */}
                {/* <Route path={ROUTES.USER_EDIT} element={<UserEditPage />} /> */}
              </Route>

              <Route element={<RoleProtectedRoute allowedRoles={[USER_ROLES.ADMIN]} />}>
                {/* <Route path={ROUTES.USERS_ROLES} element={<UsersRolesPage />} /> */}
                {/* <Route path={ROUTES.USERS_PERMISSIONS} element={<UsersPermissionsPage />} /> */}
              </Route>

              {/* === SETTINGS MODULE (Nested Routes - Role Protected) === */}
              <Route element={<RoleProtectedRoute allowedRoles={[USER_ROLES.ADMIN, USER_ROLES.MANAGER]} />}>
                {/* <Route path={ROUTES.SETTINGS} element={<SettingsPage />} /> */}
                {/* <Route path={ROUTES.SETTINGS_PREFERENCES} element={<SettingsPreferencesPage />} /> */}
                {/* <Route path={ROUTES.SETTINGS_NOTIFICATIONS} element={<SettingsNotificationsPage />} /> */}
              </Route>

              <Route element={<RoleProtectedRoute allowedRoles={[USER_ROLES.ADMIN]} />}>
                {/* <Route path={ROUTES.SETTINGS_ORGANIZATION} element={<SettingsOrganizationPage />} /> */}
                {/* <Route path={ROUTES.SETTINGS_SECURITY} element={<SettingsSecurityPage />} /> */}
                {/* <Route path={ROUTES.SETTINGS_INTEGRATIONS} element={<SettingsIntegrationsPage />} /> */}
                {/* <Route path={ROUTES.SETTINGS_AUDIT_LOG} element={<SettingsAuditLogPage />} /> */}
              </Route>
            </Route>
          </Route>

          {/* === ERROR ROUTES (Public) === */}
          <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
          <Route path={ROUTES.UNAUTHORIZED} element={<UnauthorizedPage />} />
          <Route path={ROUTES.SERVER_ERROR} element={<ServerErrorPage />} />

          {/* === 404 CATCH-ALL === */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default AppRoutes
