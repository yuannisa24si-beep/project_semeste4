import PageHeader from '../../components/PageHeader';

const Home = () => (
  <div>
    {/* Hero Banner */}
    <div className="bg-gradient-to-br from-pink-200 to-pink-300 rounded-2xl p-8 mb-6 text-center relative overflow-hidden">
      <div className="absolute top-2 left-1/2 -translate-x-1/2 text-pink-100 text-6xl opacity-30 select-none">🌸</div>
      <p className="text-pink-600 text-xs uppercase tracking-widest mb-1 font-semibold">WEDDING PLANNER</p>
      <h1 className="text-3xl font-bold text-pink-800 mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>
        MAZYN &amp; JENNIFER
      </h1>
      <p className="text-pink-500 text-sm mb-4">12 Juni 2026 • Bali, Indonesia</p>
      <div className="flex justify-center gap-2 text-2xl mb-4">🌺 💍 🌺</div>
      <button className="bg-pink-600 text-white px-8 py-2 rounded-full text-sm font-semibold hover:bg-pink-700 transition shadow">
        Mulai Perencanaan
      </button>
    </div>

    {/* About Section */}
    <div className="bg-white rounded-2xl p-5 mb-4 shadow-sm">
      <PageHeader title="About Us" subtitle="Cerita cinta kami" />
      <div className="flex gap-3 text-sm text-gray-500">
        <div className="flex-1 bg-pink-50 rounded-xl p-3 text-center">
          <div className="text-2xl mb-1">👰</div>
          <p className="font-semibold text-pink-700">Jennifer</p>
          <p className="text-xs text-pink-400">Pengantin Wanita</p>
        </div>
        <div className="flex items-center text-pink-300 text-xl">💕</div>
        <div className="flex-1 bg-pink-50 rounded-xl p-3 text-center">
          <div className="text-2xl mb-1">🤵</div>
          <p className="font-semibold text-pink-700">Mazyn</p>
          <p className="text-xs text-pink-400">Pengantin Pria</p>
        </div>
      </div>
    </div>

    {/* Checklist */}
    <div className="bg-white rounded-2xl p-5 shadow-sm">
      <PageHeader title="Checklist" subtitle="Persiapan pernikahan" />
      <ul className="flex flex-col gap-2 text-sm">
        {[
          { label: 'Venue sudah dipesan', done: true },
          { label: 'Katering', done: true },
          { label: 'Fotografer', done: false },
          { label: 'Dekorasi', done: false },
          { label: 'Undangan', done: false },
        ].map((item, i) => (
          <li key={i} className="flex items-center gap-2">
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${item.done ? 'bg-pink-400 text-white' : 'border-2 border-pink-200'}`}>
              {item.done ? '✓' : ''}
            </span>
            <span className={item.done ? 'line-through text-gray-400' : 'text-gray-600'}>{item.label}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default Home;
