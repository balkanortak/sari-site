import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const alisverisSubcats = [
  { name: "Elektronik", count: "23.456", icon: "📱" },
  { name: "Giyim & Moda", count: "18.234", icon: "👕" },
  { name: "Ev & Yaşam", count: "12.567", icon: "🛋️" },
  { name: "Spor & Outdoor", count: "8.901", icon: "⚽" },
  { name: "Anne & Çocuk", count: "6.789", icon: "👶" },
  { name: "Kozmetik", count: "4.321", icon: "💄" },
  { name: "Kitap & Müzik", count: "3.456", icon: "📚" },
  { name: "Oyun & Hobi", count: "5.678", icon: "🎮" },
];

export default function AlisverisPage() {
  return (
    <div className="min-h-screen bg-[#f0f0f0]">
      <Header />
      <div className="max-w-[1200px] mx-auto px-4 py-3">
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <Link href="/" className="hover:text-gray-600">Ana Sayfa</Link><span>/</span>
          <span className="text-gray-700">Alışveriş</span>
        </div>
      </div>
      <div className="max-w-[1200px] mx-auto px-4 pb-8">
        {/* Flash Deals Banner - trendyol/hepsiburada style */}
        <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl p-6 mb-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold tracking-widest uppercase mb-1 block opacity-90">Flaş Fırsatlar</span>
              <h2 className="text-2xl font-bold">Süper Fiyat, Süür Fırsat!</h2>
              <p className="text-sm opacity-80 mt-1">Seçili ürünlerde %70&apos;e varan indirim</p>
            </div>
            <div className="flex gap-2">
              {["23", "45", "12"].map((n, i) => (
                <div key={i} className="bg-white/20 rounded-lg px-3 py-2 text-center">
                  <div className="text-xl font-bold">{n}</div>
                  <div className="text-[10px] opacity-70">{["Saat", "Dk", "Sn"][i]}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-6">
          <aside className="w-64 shrink-0 hidden lg:block">
            <div className="bg-white rounded-xl border border-gray-100 p-5 sticky top-32">
              <h3 className="font-bold text-sm text-gray-900 mb-4">Filtreler</h3>
              {[
                { title: "Ürün Durumu", opts: ["Sıfır", "İkinci El", "Yenilenmiş"] },
                { title: "Marka", opts: ["Apple", "Samsung", "Nike", "Adidas", "Sony", "LG"] },
                { title: "Fiyat Aralığı", opts: ["0 - 500 ₺", "500 - 1.000 ₺", "1.000 - 5.000 ₺", "5.000+ ₺"] },
                { title: "Kargo", opts: ["Ücretsiz Kargo", "Aynı Gün Kargo", "Güvenli Ödeme"] },
              ].map((f) => (
                <div key={f.title} className="mb-5">
                  <h4 className="text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wider">{f.title}</h4>
                  <div className="space-y-1.5">
                    {f.opts.map((opt) => (
                      <label key={opt} className="flex items-center gap-2 cursor-pointer group">
                        <input type="checkbox" className="w-4 h-4 accent-[#ffc107] rounded" />
                        <span className="text-sm text-gray-600 group-hover:text-gray-900">{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </aside>
          <main className="flex-1 min-w-0">
            <div className="bg-white rounded-xl border border-gray-100 p-4 mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-lg font-bold text-gray-900">Alışveriş İlanları</h1>
                  <p className="text-sm text-gray-500">83.403 ilan bulundu</p>
                </div>
                <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none">
                  <option>En Yeniler</option>
                  <option>Fiyat: Düşükten Yükseğe</option>
                  <option>Fiyat: Yüksekten Düşüğe</option>
                  <option>En Popüler</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
              {alisverisSubcats.map((sub) => (
                <Link key={sub.name} href="#" className="bg-white rounded-xl border border-gray-100 p-4 hover:border-[#ffc107] hover:shadow-md transition-all flex items-center gap-3">
                  <span className="text-2xl">{sub.icon}</span>
                  <div>
                    <h3 className="font-semibold text-sm text-gray-900">{sub.name}</h3>
                    <p className="text-xs text-gray-400">{sub.count} ilan</p>
                  </div>
                </Link>
              ))}
            </div>
            {/* Product Grid - trendyol/hepsiburada style */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {Array.from({ length: 12 }).map((_, i) => (
                <Link key={i} href="/ilan/test" className="bg-white rounded-xl border border-gray-100 hover:shadow-lg transition-all group overflow-hidden">
                  <div className="aspect-square bg-gray-100 relative overflow-hidden">
                    <div className="w-full h-full flex items-center justify-center text-4xl group-hover:scale-110 transition-transform">
                      {alisverisSubcats[i % 8].icon}
                    </div>
                    {i % 3 === 0 && <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded">%25 İndirim</span>}
                  </div>
                  <div className="p-3">
                    <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-1 group-hover:text-[#1a73e8]">
                      {["iPhone 15 Pro Max 256GB", "Nike Air Max 270", "Samsung 65\" QLED TV", "Dyson V15 Süpürge", "PS5 Slim Dijital", "Lego Technic Set", "Bose QuietComfort 45", "Nike Dunk Low Retro", "iPad Air M2", "Adidas Ultraboost", "Sony WH-1000XM5", "MacBook Air M3"][i]}
                    </h3>
                    <div className="flex items-center gap-1 mb-1">
                      {Array.from({ length: 5 }).map((_, s) => (
                        <span key={s} className={`text-xs ${s < 4 ? "text-yellow-400" : "text-gray-200"}`}>★</span>
                      ))}
                      <span className="text-xs text-gray-400 ml-1">({Math.floor(Math.random() * 200 + 10)})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-base font-bold text-gray-900">{(Math.random() * 50000 + 500).toLocaleString("tr-TR")} ₺</span>
                      {i % 3 === 0 && <span className="text-xs text-gray-400 line-through">{(Math.random() * 80000 + 1000).toLocaleString("tr-TR")} ₺</span>}
                    </div>
                    <p className="text-[10px] text-green-600 mt-1 font-medium">Ücretsiz Kargo</p>
                  </div>
                </Link>
              ))}
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}
