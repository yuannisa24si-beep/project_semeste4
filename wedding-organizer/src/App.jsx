import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import AuthLayout from './layouts/AuthLayout'
import AdminLayout from './layouts/AdminLayout'
import Loading from './components/Loading'
import ErrorPage from './components/ErrorPage'

// Auth
const Login    = lazy(() => import('./pages/auth/Login'))
const Register = lazy(() => import('./pages/auth/Register'))

// Admin
const Dashboard = lazy(() => import('./pages/admin/Dashboard'))
const Bookings  = lazy(() => import('./pages/admin/Bookings'))
const Clients   = lazy(() => import('./pages/admin/Clients'))
const Services  = lazy(() => import('./pages/admin/Services'))
const Gallery   = lazy(() => import('./pages/admin/Gallery'))

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          {/* Redirect root ke login */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Auth */}
          <Route element={<AuthLayout />}>
            <Route path="/login"    element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* Admin */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index             element={<Dashboard />} />
            <Route path="bookings"   element={<Bookings />} />
            <Route path="clients"    element={<Clients />} />
            <Route path="services"   element={<Services />} />
            <Route path="gallery"    element={<Gallery />} />
          </Route>

          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
