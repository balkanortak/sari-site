import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const vasitaSubcats = [
  { name: "Otomobil", count: "45.234", icon: "🚗" },
  { name: "Ticari Araç", count: "12.345", icon: "🚐" },
  { name: "Motosiklet", count: "8.567", icon: "🏍️" },
  { name: "Minivan & Panelvan", count: "5.432", icon: "🛻" },
  { name: "Kiralık Araç", count: "3.210", icon: "🔑" },
  { name: "Treyler & Karavan", count: "1.098", icon: "🏕️" },
];

export default function VasitaPage() {
  return (
    <div className="min-h-screen bg-[#f0f0f0]">
      <Header />
      <div className="max-w-[1200px] mx-auto px-4 py-3">
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <Link href="/" className="hover:text-gray-600">Ana Sayfa</Link><span>/</span>
          <span className="text-gray-700">Vasıta</span>
        </div>
      </div>
      <div className="max-w-[1200px] mx-auto px-4 pb-8">
        <div className="flex gap-6">
          <aside className="w-64 shrink-0 hidden lg:block">
            <div className="bg-white rounded-xl border border-gray-100 p-5 sticky top-32">
              <h3 className="font-bold text-sm text-gray-900 mb-4">Filtreler</h3>
              {[
                { title: "Marka", opts: ["Alfa Romeo", "Audi", "BMW", "Fiat", "Ford", "Honda", "Hyundai", "Mercedes", "Toyota", "Volkswagen"] },
                { title: "Model Yılı", opts: ["2024", "2023", "2022", "2021", "2020", "2019 ve öncesi"] },
                { title: "Yakıt Tipi", opts: ["Benzin", "Dizel", "Hibrit", "Elektrik", "LPG"] },
                { title: "Vites", opts: ["Manuel", "Otomatik"] },
                { title: "Fiyat Aralığı", opts: ["0 - 200.000 ₺", "200.000 - 500.000 ₺", "500.000 - 1.000.000 ₺", "1.000.000+ ₺"] },
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
              <button className="w-full mt-4 bg-[#ffc107] hover:bg-[#e6ac00] text-gray-900 font-bold py-2.5 rounded-lg text-sm transition-colors">
                Filtreleri Uygula
              </button>
            </div>
          </aside>
          <main className="flex-1 min-w-0">
            <div className="bg-white rounded-xl border border-gray-100 p-4 mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-lg font-bold text-gray-900">Vasıta İlanları</h1>
                  <p className="text-sm text-gray-500">75.886 ilan bulundu</p>
                </div>
                <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none">
                  <option>En Yeniler</option>
                  <option>Fiyat: Düşükten Yükseğe</option>
                  <option>Fiyat: Yüksekten Düşüğe</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
              {vasitaSubcats.map((sub) => (
                <Link key={sub.name} href="#" className="bg-white rounded-xl border border-gray-100 p-4 hover:border-[#ffc107] hover:shadow-md transition-all flex items-center gap-3">
                  <span className="text-2xl">{sub.icon}</span>
                  <div>
                    <h3 className="font-semibold text-sm text-gray-900">{sub.name}</h3>
                    <p className="text-xs text-gray-400">{sub.count} ilan</p>
                  </div>
                </Link>
              ))}
            </div>
            <div className="space-y-3">
              {Array.from({ length: 8 }).map((_, i) => (
                <Link key={i} href="/ilan/test" className="bg-white rounded-xl border border-gray-100 p-4 flex gap-4 hover:shadow-md transition-all group">
                  <div className="w-40 h-32 bg-gray-100 rounded-lg flex items-center justify-center text-3xl shrink-0">🚗</div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 group-hover:text-[#1a73e8] transition-colors line-clamp-1">
                      {["2023 Hyundai i20 1.4 Dizel", "2022 BMW 3.20i M Sport", "2024 Toyota Corolla Hibrit", "2021 Fiat Egea 1.3 Multijet"][i % 4]}
                    </h3>
                    <p className="text-xs text-gray-400 mt-1">{["İstanbul, Kadıköy", "Ankara, Çankaya", "İzmir, Bornova", "Bursa, Nilüfer"][i % 4]}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                      <span>{["45.000 km", "23.000 km", "12.000 km", "67.000 km"][i % 4]}</span>
                      <span>{["Dizel", "Benzin", "Hibrit", "Dizel"][i % 4]}</span>
                      <span>{["Otomatik", "Otomatik", "CVT", "Manuel"][i % 4]}</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-lg font-bold text-gray-900">{["850.000", "1.950.000", "1.200.000", "520.000"][i % 4]} ₺</p>
                    <p className="text-xs text-gray-400 mt-1">{["Sahibinden", "Galeriden", "Sahibinden", "Sahibinden"][i % 4]}</p>
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
