import { Outlet } from 'react-router-dom';

const AuthLayout = () => (
  <div className="min-h-screen bg-gradient-to-b from-pink-100 to-pink-200 flex items-center justify-center px-4">
    <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Top decoration */}
      <div className="bg-pink-400 h-2 w-full" />
      <div className="p-8">
        <div className="text-center mb-6">
          <div className="text-4xl mb-2">💍</div>
          <h1 className="text-xl font-bold text-pink-700" style={{ fontFamily: 'Playfair Display, serif' }}>
            Wedding Organizer
          </h1>
          <p className="text-pink-400 text-xs mt-1">Plan your perfect day</p>
        </div>
        <Outlet />
      </div>
    </div>
  </div>
);

export default AuthLayout;
