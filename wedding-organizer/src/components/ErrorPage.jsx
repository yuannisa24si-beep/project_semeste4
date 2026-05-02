import { Link } from 'react-router-dom';

const ErrorPage = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-pink-50 text-center px-4">
    <div className="text-6xl mb-4">💔</div>
    <h1 className="text-3xl font-bold text-pink-600 mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
      Halaman Tidak Ditemukan
    </h1>
    <p className="text-pink-400 mb-6 text-sm">Maaf, halaman yang kamu cari tidak ada.</p>
    <Link to="/" className="bg-pink-500 text-white px-6 py-2 rounded-full text-sm hover:bg-pink-600 transition">
      Kembali ke Beranda
    </Link>
  </div>
);

export default ErrorPage;
