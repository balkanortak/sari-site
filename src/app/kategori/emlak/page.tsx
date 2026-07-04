import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const emlakSubcats = [
  { name: "Satılık Daire", count: "12.345", icon: "🏠" },
  { name: "Kiralık Daire", count: "8.234", icon: "🔑" },
  { name: "Satılık Villa", count: "1.234", icon: "🏡" },
  { name: "Satılık İş Yeri", count: "3.456", icon: "🏢" },
  { name: "Arsa", count: "5.678", icon: "📐" },
  { name: "Proje", count: "890", icon: "🏗️" },
];

const filters = {
  "Oda Sayısı": ["1+0", "1+1", "2+1", "3+1", "4+1", "5+1"],
  "İl": ["İstanbul", "Ankara", "İzmir", "Bursa", "Antalya"],
  "Fiyat Aralığı": ["0 - 500.000 ₺", "500.000 - 1.000.000 ₺", "1.000.000 - 2.000.000 ₺", "2.000.000+ ₺"],
  "Metrekare": ["50m² altı", "50-100m²", "100-150m²", "150-200m²", "200m²+"],
  "Bina Yaşı": ["0-2 yaş", "3-5 yaş", "6-10 yaş", "11-15 yaş", "16-20 yaş", "20+ yaş"],
};

export default function EmlakPage() {
  return (
    <div className="min-h-screen bg-[#f0f0f0]">
      <Header />
      {/* Breadcrumb */}
      <div className="max-w-[1200px] mx-auto px-4 py-3">
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <Link href="/" className="hover:text-gray-600">Ana Sayfa</Link>
          <span>/</span>
          <span className="text-gray-700">Emlak</span>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 pb-8">
        <div className="flex gap-6">
          {/* Sidebar Filters - idefix style */}
          <aside className="w-64 shrink-0 hidden lg:block">
            <div className="bg-white rounded-xl border border-gray-100 p-5 sticky top-32">
              <h3 className="font-bold text-sm text-gray-900 mb-4">Filtreler</h3>
              {Object.entries(filters).map(([title, options]) => (
                <div key={title} className="mb-5 last:mb-0">
                  <h4 className="text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wider">{title}</h4>
                  <div className="space-y-1.5">
                    {options.map((opt) => (
                      <label key={opt} className="flex items-center gap-2 cursor-pointer group">
                        <input type="checkbox" className="w-4 h-4 accent-[#ffc107] rounded" />
                        <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
              <button className="w-full mt-4 bg-[#ffc107] hover:bg-[#e6ac00] text-gray-900 font-bold py-2.5 rounded-lg text-sm transition-colors">
                Filtreleri Uygula
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <div className="bg-white rounded-xl border border-gray-100 p-4 mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-lg font-bold text-gray-900">Emlak İlanları</h1>
                  <p className="text-sm text-gray-500">31.933 ilan bulundu</p>
                </div>
                <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#ffc107]">
                  <option>En Yeniler</option>
                  <option>Fiyat: Düşükten Yükseğe</option>
                  <option>Fiyat: Yüksekten Düşüğe</option>
                  <option>En Çok Görüntülenen</option>
                </select>
              </div>
            </div>

            {/* Subcategories */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
              {emlakSubcats.map((sub) => (
                <Link
                  key={sub.name}
                  href="#"
                  className="bg-white rounded-xl border border-gray-100 p-4 hover:border-[#ffc107] hover:shadow-md transition-all flex items-center gap-3"
                >
                  <span className="text-2xl">{sub.icon}</span>
                  <div>
                    <h3 className="font-semibold text-sm text-gray-900">{sub.name}</h3>
                    <p className="text-xs text-gray-400">{sub.count} ilan</p>
                  </div>
                </Link>
              ))}
            </div>

            {/* Listings */}
            <div className="space-y-3">
              {Array.from({ length: 8 }).map((_, i) => (
                <Link
                  key={i}
                  href="/ilan/test"
                  className="bg-white rounded-xl border border-gray-100 p-4 flex gap-4 hover:shadow-md transition-all group"
                >
                  <div className="w-40 h-32 bg-gray-100 rounded-lg flex items-center justify-center text-3xl shrink-0">
                    🏠
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 group-hover:text-[#1a73e8] transition-colors line-clamp-1">
                      {["Kadıköy'de Satılık 3+1 Daire", "Beşiktaş'ta Kiralık 2+1", "Ataşehir'de Lüks Villa", "Şişli'de Satılık 1+1"][i % 4]}
                    </h3>
                    <p className="text-xs text-gray-400 mt-1">
                      {["İstanbul, Kadıköy, Caferağa", "İstanbul, Beşiktaş, Levent", "İstanbul, Ataşehir, Kayışdağı", "İstanbul, Şişli, Merkez"][i % 4]}
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                      <span>{["120m²", "85m²", "350m²", "65m²"][i % 4]}</span>
                      <span>{["3+1", "2+1", "5+2", "1+1"][i % 4]}</span>
                      <span>{["5. yaş", "10. yaş", "Yeni", "15. yaş"][i % 4]}</span>
                      <span>{["Kat 3", "Kat 1", "Bahçe", "Kat 5"][i % 4]}</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-lg font-bold text-gray-900">
                      {["4.500.000", "25.000", "12.000.000", "2.800.000"][i % 4]} ₺
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {i % 4 === 1 ? "Kira" : "Satılık"}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {["Sahibinden", "Emlak Ofisinden", "Sahibinden", "Bankadan"][i % 4]}
                    </p>
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
