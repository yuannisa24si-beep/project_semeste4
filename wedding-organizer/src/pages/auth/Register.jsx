import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/login');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label className="text-xs text-pink-500 font-medium block mb-1">Nama Lengkap</label>
        <input
          type="text"
          placeholder="Nama kamu"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full border border-pink-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
        />
      </div>
      <div>
        <label className="text-xs text-pink-500 font-medium block mb-1">Email</label>
        <input
          type="email"
          placeholder="admin@gmail.com"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full border border-pink-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
        />
      </div>
      <div>
        <label className="text-xs text-pink-500 font-medium block mb-1">Password</label>
        <input
          type="password"
          placeholder="••••••••"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full border border-pink-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
        />
      </div>
      <button
        type="submit"
        className="bg-pink-500 text-white rounded-full py-2 text-sm font-semibold hover:bg-pink-600 transition mt-2"
      >
        Daftar Sekarang
      </button>
      <p className="text-center text-xs text-gray-400">
        Sudah punya akun?{' '}
        <Link to="/login" className="text-pink-500 hover:underline">Masuk</Link>
      </p>
    </form>
  );
};

export default Register;
