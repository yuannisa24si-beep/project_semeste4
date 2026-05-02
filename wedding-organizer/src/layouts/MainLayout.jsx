import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

const MainLayout = () => (
  <div className="min-h-screen bg-pink-50">
    <Header />
    <div className="flex max-w-5xl mx-auto">
      <Sidebar />
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  </div>
);

export default MainLayout;
