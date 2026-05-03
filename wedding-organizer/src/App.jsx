import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import AuthLayout from './layouts/AuthLayout'
import Loading from './components/Loading'
import ErrorPage from './components/ErrorPage'

const Home    = lazy(() => import('./pages/main/Home'))
const Services = lazy(() => import('./pages/main/Services'))
const Blog    = lazy(() => import('./pages/main/Blog'))
const Gallery = lazy(() => import('./pages/main/Gallery'))
const Contact = lazy(() => import('./pages/main/Contact'))
const Login   = lazy(() => import('./pages/auth/Login'))
const Register = lazy(() => import('./pages/auth/Register'))

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/login"    element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          <Route element={<MainLayout />}>
            <Route path="/"         element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/blog"     element={<Blog />} />
            <Route path="/gallery"  element={<Gallery />} />
            <Route path="/contact"  element={<Contact />} />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
