import Link from "next/link";

const categories = [
  { name: "Emlak", slug: "emlak", icon: "🏠", count: "1,234,567" },
  { name: "Vasıta", slug: "vasita", icon: "🚗", count: "987,654" },
  { name: "Alışveriş", slug: "alisveris", icon: "🛍️", count: "2,345,678" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <header className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary-dark">
            SarıSite
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/ilan/yeni"
              className="bg-primary text-text px-5 py-2 rounded-lg font-semibold hover:bg-primary-dark transition-colors"
            >
              Ücretsiz İlan Ver
            </Link>
            <Link href="/login" className="text-text-muted hover:text-text">
              Giriş Yap
            </Link>
            <Link
              href="/register"
              className="bg-secondary text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
            >
              Kayıt Ol
            </Link>
          </div>
        </div>
      </header>

      <div className="bg-primary py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-text text-center mb-3">
            SarıSite&aposye Hoş Geldiniz
          </h1>
          <p className="text-text-muted text-center text-lg mb-8">
            Türkiye&aposnin en büyük ilan platformunda aradığınızı bulun
          </p>
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Ne arıyorsunuz?"
                className="w-full px-6 py-4 rounded-xl text-lg shadow-sm border-none focus:ring-2 focus:ring-secondary outline-none"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-secondary text-white px-8 py-2 rounded-lg font-semibold hover:opacity-90">
                Ara
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/kategori/${cat.slug}`}
              className="bg-surface rounded-xl p-8 text-center shadow-sm hover:shadow-md transition-shadow border border-border"
            >
              <div className="text-5xl mb-4">{cat.icon}</div>
              <h2 className="text-xl font-bold mb-1">{cat.name}</h2>
              <p className="text-text-muted text-sm">{cat.count} ilan</p>
            </Link>
          ))}
        </div>
      </div>

      <footer className="bg-white border-t border-border mt-12">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center text-text-muted text-sm">
          &copy; 2026 SarıSite. Tüm hakları saklıdır.
        </div>
      </footer>
    </div>
  );
}
