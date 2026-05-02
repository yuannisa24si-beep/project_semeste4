import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/', label: '🏠 Home' },
  { to: '/about', label: '💑 About' },
  { to: '/album', label: '📷 Album' },
  { to: '/budget', label: '💰 Budget' },
];

const Sidebar = () => (
  <aside className="w-56 bg-white shadow-md min-h-screen p-4">
    <p className="text-pink-400 text-xs uppercase tracking-widest mb-4 font-semibold">Menu</p>
    <nav className="flex flex-col gap-2">
      {navItems.map(({ to, label }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              isActive ? 'bg-pink-100 text-pink-700' : 'text-gray-500 hover:bg-pink-50 hover:text-pink-600'
            }`
          }
        >
          {label}
        </NavLink>
      ))}
    </nav>
  </aside>
);

export default Sidebar;
