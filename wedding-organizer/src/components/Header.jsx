import { Link } from 'react-router-dom';

const Header = () => (
  <header className="bg-white shadow-sm sticky top-0 z-50">
    <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
      <Link to="/" className="text-pink-600 font-bold text-lg" style={{ fontFamily: 'Playfair Display, serif' }}>
        💍 WeddingOrg
      </Link>
      <nav className="flex gap-4 text-sm text-pink-500">
        <Link to="/" className="hover:text-pink-700">Home</Link>
        <Link to="/album" className="hover:text-pink-700">Album</Link>
        <Link to="/budget" className="hover:text-pink-700">Budget</Link>
      </nav>
    </div>
  </header>
);

export default Header;
