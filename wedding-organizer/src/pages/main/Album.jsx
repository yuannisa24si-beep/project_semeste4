import PageHeader from '../../components/PageHeader';

const photos = [
  { id: 1, emoji: '📸', label: 'Pre-Wedding 1' },
  { id: 2, emoji: '💒', label: 'Venue' },
  { id: 3, emoji: '👗', label: 'Gaun Pengantin' },
  { id: 4, emoji: '💐', label: 'Buket Bunga' },
  { id: 5, emoji: '🎂', label: 'Wedding Cake' },
  { id: 6, emoji: '🥂', label: 'Resepsi' },
];

const Album = () => (
  <div>
    <PageHeader title="Album" subtitle="Foto pernikahan kami" />
    <div className="grid grid-cols-2 gap-3">
      {photos.map((p) => (
        <div key={p.id} className="bg-pink-100 rounded-xl aspect-square flex flex-col items-center justify-center shadow-sm hover:shadow-md transition cursor-pointer">
          <span className="text-4xl mb-2">{p.emoji}</span>
          <span className="text-xs text-pink-600 font-medium">{p.label}</span>
        </div>
      ))}
    </div>
    <button className="mt-4 w-full bg-pink-500 text-white rounded-full py-2 text-sm font-semibold hover:bg-pink-600 transition">
      + Tambah Foto
    </button>
  </div>
);

export default Album;
