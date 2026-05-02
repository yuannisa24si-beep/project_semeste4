import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Loading from './components/Loading';
import ErrorPage from './components/ErrorPage';
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';

// Lazy load pages
const Home = lazy(() => import('./pages/main/Home'));
const About = lazy(() => import('./pages/main/About'));
const Album = lazy(() => import('./pages/main/Album'));
const Budget = lazy(() => import('./pages/main/Budget'));
const Login = lazy(() => import('./pages/auth/Login'));
const Register = lazy(() => import('./pages/auth/Register'));

const App = () => (
  <BrowserRouter>
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* Auth routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Main routes */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/album" element={<Album />} />
          <Route path="/budget" element={<Budget />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Suspense>
  </BrowserRouter>
);

export default App;
