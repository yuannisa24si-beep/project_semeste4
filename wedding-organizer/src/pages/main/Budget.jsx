import PageHeader from '../../components/PageHeader';

const items = [
  { label: 'Venue', budget: 15000000, spent: 15000000 },
  { label: 'Katering', budget: 20000000, spent: 12000000 },
  { label: 'Fotografer', budget: 8000000, spent: 0 },
  { label: 'Dekorasi', budget: 10000000, spent: 5000000 },
  { label: 'Gaun & Jas', budget: 7000000, spent: 7000000 },
];

const fmt = (n) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(n);

const Budget = () => {
  const total = items.reduce((s, i) => s + i.budget, 0);
  const spent = items.reduce((s, i) => s + i.spent, 0);
  const pct = Math.round((spent / total) * 100);

  return (
    <div>
      <PageHeader title="Budget" subtitle="Manajemen keuangan pernikahan" />

      {/* Summary */}
      <div className="bg-pink-100 rounded-2xl p-4 mb-4 flex items-center gap-4">
        <div className="relative w-16 h-16">
          <svg viewBox="0 0 36 36" className="w-16 h-16 -rotate-90">
            <circle cx="18" cy="18" r="15.9" fill="none" stroke="#fce7f3" strokeWidth="3" />
            <circle cx="18" cy="18" r="15.9" fill="none" stroke="#ec4899" strokeWidth="3"
              strokeDasharray={`${pct} ${100 - pct}`} strokeLinecap="round" />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-pink-700">{pct}%</span>
        </div>
        <div>
          <p className="text-xs text-pink-400">Total Budget</p>
          <p className="font-bold text-pink-700 text-sm">{fmt(total)}</p>
          <p className="text-xs text-pink-400 mt-1">Terpakai: <span className="text-pink-600 font-semibold">{fmt(spent)}</span></p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-pink-50">
            <tr>
              <th className="text-left px-4 py-2 text-pink-500 font-semibold text-xs">Item</th>
              <th className="text-right px-4 py-2 text-pink-500 font-semibold text-xs">Budget</th>
              <th className="text-right px-4 py-2 text-pink-500 font-semibold text-xs">Terpakai</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <tr key={i} className="border-t border-pink-50">
                <td className="px-4 py-2 text-gray-600">{item.label}</td>
                <td className="px-4 py-2 text-right text-gray-500 text-xs">{fmt(item.budget)}</td>
                <td className="px-4 py-2 text-right text-xs">
                  <span className={item.spent === item.budget ? 'text-green-500' : item.spent > 0 ? 'text-yellow-500' : 'text-gray-300'}>
                    {fmt(item.spent)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Budget;
