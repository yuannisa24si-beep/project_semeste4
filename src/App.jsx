import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import AuthLayout from './layouts/AuthLayout'
import AdminLayout from './layouts/AdminLayout'
import Loading from './components/Loading'
import ErrorPage from './components/ErrorPage'

// Auth
const Login    = lazy(() => import('./pages/auth/Login'))
const Register = lazy(() => import('./pages/auth/Register'))

// Admin - sesuai CRM Wedding Organizer
const Dashboard = lazy(() => import('./pages/admin/Dashboard'))
const Bookings  = lazy(() => import('./pages/admin/Bookings'))   // Pemesanan / Transaksi
const Clients   = lazy(() => import('./pages/admin/Clients'))    // Data Customer
const Services  = lazy(() => import('./pages/admin/Services'))   // Paket Wedding
const Gallery   = lazy(() => import('./pages/admin/Gallery'))    // Galeri
const Invoice   = lazy(() => import('./pages/admin/Invoice'))    // Invoice Transaksi
const Chat      = lazy(() => import('./pages/admin/Chat'))       // Komunikasi Customer
const Users     = lazy(() => import('./pages/admin/Users'))      // Data User

const GuestDashboard = lazy(() => import('./pages/guest/GuestDashboard'))

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />

          <Route element={<AuthLayout />}>
            <Route path="/login"    element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          <Route path="/admin" element={<AdminLayout />}>
            <Route index           element={<Dashboard />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="clients"  element={<Clients />} />
            <Route path="services" element={<Services />} />
            <Route path="gallery"  element={<Gallery />} />
            <Route path="invoice"  element={<Invoice />} />
            <Route path="chat"     element={<Chat />} />
            <Route path="users"    element={<Users />} />
          </Route>

          <Route path="*" element={<ErrorPage />} />
          <Route path="/guest" element={<GuestDashboard />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
