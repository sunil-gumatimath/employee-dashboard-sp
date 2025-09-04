import { Routes, Route } from 'react-router-dom'
import './App.css'
import DashboardLayout from './layouts/dashboard/DashboardLayout'
import DashboardPage from './pages/dashboard/DashboardPage'
import EmployeeListPage from './pages/employees/EmployeeListPage'
import EmployeeDetailsPage from './pages/employees/EmployeeDetailsPage'
import SettingsPage from './pages/settings/SettingsPage'
import ReportsPage from './pages/reports/ReportsPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="employees">
          <Route index element={<EmployeeListPage />} />
          <Route path=":id" element={<EmployeeDetailsPage />} />
        </Route>
        <Route path="reports" element={<ReportsPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  )
}

export default App
