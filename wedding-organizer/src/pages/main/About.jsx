import PageHeader from '../../components/PageHeader';

const About = () => (
  <div>
    <PageHeader title="About" subtitle="Tentang pasangan kami" />
    <div className="bg-white rounded-2xl p-5 shadow-sm mb-4">
      <div className="text-center mb-4">
        <div className="text-5xl mb-2">💑</div>
        <h2 className="text-xl font-bold text-pink-700" style={{ fontFamily: 'Playfair Display, serif' }}>
          Mazyn &amp; Jennifer
        </h2>
        <p className="text-pink-400 text-sm">Bersatu dalam cinta sejak 2020</p>
      </div>
      <div className="bg-pink-50 rounded-xl p-4 text-sm text-gray-500 leading-relaxed">
        <p>
          Kami bertemu di sebuah kafe kecil di Bandung pada tahun 2020. Sejak saat itu, kami tidak pernah berpisah.
          Perjalanan cinta kami penuh warna, dan kini kami siap melangkah ke babak baru bersama.
        </p>
      </div>
    </div>
    <div className="bg-white rounded-2xl p-5 shadow-sm">
      <p className="text-pink-500 font-semibold text-sm mb-3">Detail Pernikahan</p>
      <ul className="flex flex-col gap-2 text-sm text-gray-600">
        <li className="flex gap-2"><span className="text-pink-400">📅</span> 12 Juni 2026</li>
        <li className="flex gap-2"><span className="text-pink-400">📍</span> Bali, Indonesia</li>
        <li className="flex gap-2"><span className="text-pink-400">⛪</span> The Ritz-Carlton Bali</li>
        <li className="flex gap-2"><span className="text-pink-400">🕐</span> 10.00 WIB - Selesai</li>
      </ul>
    </div>
  </div>
);

export default About;
