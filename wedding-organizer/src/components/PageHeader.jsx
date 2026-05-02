const PageHeader = ({ title, subtitle }) => (
  <div className="mb-6">
    <h1 className="text-2xl font-bold text-pink-700" style={{ fontFamily: 'Playfair Display, serif' }}>
      {title}
    </h1>
    {subtitle && <p className="text-pink-400 text-sm mt-1">{subtitle}</p>}
  </div>
);

export default PageHeader;
