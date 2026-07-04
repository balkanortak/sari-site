import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const categories = [
  { name: "Emlak", slug: "emlak", icon: "🏠", color: "#2196F3", subcats: ["Konut", "İş Yeri", "Arsa", "Proje"] },
  { name: "Vasıta", slug: "vasita", icon: "🚗", color: "#4CAF50", subcats: ["Otomobil", "Ticari Araç", "Motosiklet"] },
  { name: "Alışveriş", slug: "alisveris", icon: "🛍️", color: "#E91E63", subcats: ["Elektronik", "Giyim", "Ev & Yaşam", "Spor"] },
  { name: "Yedek Parça", slug: "yedek-parca", icon: "🔧", color: "#FF9800", subcats: ["Otomobil", "Motosiklet", "Bilgisayar"] },
  { name: "İş Makineleri", slug: "is-makineleri", icon: "🏗️", color: "#795548", subcats: ["İş Makinesi", "Traktör", "Kiralık Araç"] },
  { name: "Hizmetler", slug: "hizmetler", icon: "💼", color: "#9C27B0", subcats: ["Nakliyat", "Tamirat", "Eğitim"] },
];

const quickLinks = [
  { label: "Satılık Daire", href: "/kategori/emlak", color: "#2196F3" },
  { label: "Kiralık Daire", href: "/kategori/emlak", color: "#2196F3" },
  { label: "2. El Araba", href: "/kategori/vasita", color: "#4CAF50" },
  { label: "Sıfır Araç", href: "/kategori/vasita", color: "#4CAF50" },
  { label: "Telefon", href: "/kategori/alisveris", color: "#E91E63" },
  { label: "Bilgisayar", href: "/kategori/alisveris", color: "#E91E63" },
  { label: "Koltuk Takımı", href: "/kategori/alisveris", color: "#E91E63" },
  { label: "Bisiklet", href: "/kategori/alisveris", color: "#E91E63" },
];

const cities = [
  "İstanbul", "Ankara", "İzmir", "Bursa", "Antalya", "Adana",
  "Konya", "Gaziantep", "Şanlıurfa", "Kocaeli", "Mersin", "Diyarbakır",
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#f0f0f0]">
      <Header />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#ffc107] via-[#ffd54f] to-[#ffe082]">
        <div className="max-w-[1200px] mx-auto px-4 py-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Aradığınız Her Şey Burada
            </h1>
            <p className="text-gray-700 text-sm md:text-base">
              Emlak, vasıta, alışveriş ve daha fazlası için binlerce ilan
            </p>
          </div>
          {/* Hero Search */}
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-2 flex flex-col md:flex-row gap-2">
              <select className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#ffc107] md:w-48">
                <option>Tüm Kategoriler</option>
                {categories.map(c => <option key={c.slug}>{c.name}</option>)}
              </select>
              <select className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#ffc107] md:w-40">
                <option>Tüm Şehirler</option>
                {cities.map(c => <option key={c}>{c}</option>)}
              </select>
              <input
                type="text"
                placeholder="Emlak, vasıta, elektronik... ne aramıştınız?"
                className="flex-1 px-4 py-3 text-sm outline-none border border-gray-200 rounded-lg focus:border-[#ffc107]"
              />
              <button className="bg-[#ffc107] hover:bg-[#e6ac00] text-gray-900 font-bold px-8 py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Ara
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Links Bar - hepsiburada style */}
      <div className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="flex items-center gap-2 py-3 overflow-x-auto">
            <span className="text-xs font-bold text-gray-500 whitespace-nowrap mr-2">POPÜLER:</span>
            {quickLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="whitespace-nowrap text-xs font-medium px-3 py-1.5 rounded-full border border-gray-200 text-gray-600 hover:border-gray-400 hover:text-gray-900 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Category Grid - sahibinden.com style */}
      <div className="max-w-[1200px] mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-gray-900">Kategoriler</h2>
          <Link href="#" className="text-sm text-[#1a73e8] hover:underline">Tümünü Gör →</Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/kategori/${cat.slug}`}
              className="group bg-white rounded-xl p-4 text-center hover:shadow-lg transition-all border border-gray-100"
            >
              <div
                className="w-14 h-14 rounded-xl mx-auto mb-3 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform"
                style={{ backgroundColor: `${cat.color}15` }}
              >
                {cat.icon}
              </div>
              <h3 className="font-semibold text-sm text-gray-900 mb-1">{cat.name}</h3>
              <div className="flex flex-wrap justify-center gap-1">
                {cat.subcats.map((sub) => (
                  <span key={sub} className="text-[10px] text-gray-400">{sub}</span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Banner - trendyol style */}
      <div className="max-w-[1200px] mx-auto px-4 mb-8">
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-6 md:p-10 flex items-center justify-between overflow-hidden relative">
          <div className="relative z-10">
            <span className="text-[#ffc107] text-xs font-bold tracking-widest uppercase mb-2 block">Kampanya</span>
            <h2 className="text-white text-xl md:text-3xl font-bold mb-2">İlk İlanın Ücretsiz!</h2>
            <p className="text-gray-300 text-sm mb-4">Hemen üye ol, ilk 3 ilanını tamamen ücretsiz ver.</p>
            <Link
              href="/register"
              className="inline-block bg-[#ffc107] hover:bg-[#e6ac00] text-gray-900 font-bold px-6 py-3 rounded-lg text-sm transition-colors"
            >
              Hemen Üye Ol
            </Link>
          </div>
          <div className="text-7xl md:text-8xl opacity-20 absolute right-6 md:right-10">🎉</div>
        </div>
      </div>

      {/* Öne Çıkan İlanlar - hepsiburada grid style */}
      <div className="max-w-[1200px] mx-auto px-4 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-gray-900">Öne Çıkan İlanlar</h2>
          <Link href="#" className="text-sm text-[#1a73e8] hover:underline">Tümünü Gör →</Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <Link
              key={i}
              href="/ilan/test"
              className="bg-white rounded-xl border border-gray-100 hover:shadow-lg transition-all group overflow-hidden"
            >
              <div className="aspect-square bg-gray-100 relative overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-gray-300 text-3xl group-hover:scale-105 transition-transform">
                  {categories[i % 6].icon}
                </div>
                {i % 3 === 0 && (
                  <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                    ACIL
                  </span>
                )}
                {i % 4 === 0 && (
                  <span className="absolute top-2 right-2 bg-[#ffc107] text-gray-900 text-[10px] font-bold px-2 py-0.5 rounded">
                    DOPİNG
                  </span>
                )}
              </div>
              <div className="p-3">
                <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-1 group-hover:text-[#1a73e8] transition-colors">
                  {i % 3 === 0 ? "Satılık 3+1 Daire" : i % 3 === 1 ? "2023 Model Araba" : "Sıfır Laptop"}
                </h3>
                <p className="text-xs text-gray-400 mb-2">
                  {i % 2 === 0 ? "İstanbul, Kadıköy" : "Ankara, Çankaya"}
                </p>
                <p className="text-base font-bold text-gray-900">
                  {(Math.random() * 5000000 + 100000).toLocaleString("tr-TR")} ₺
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Şehirlere Göre - sahibinden style */}
      <div className="max-w-[1200px] mx-auto px-4 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-gray-900">Şehirlere Göre İlanlar</h2>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
          {cities.map((city) => (
            <Link
              key={city}
              href="#"
              className="bg-white rounded-lg p-3 text-center border border-gray-100 hover:border-[#ffc107] hover:shadow-md transition-all"
            >
              <div className="w-10 h-10 bg-gray-100 rounded-full mx-auto mb-2 flex items-center justify-center text-lg">
                📍
              </div>
              <span className="text-sm font-medium text-gray-700">{city}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Son Eklenenler - trendyol list style */}
      <div className="max-w-[1200px] mx-auto px-4 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-gray-900">Son Eklenenler</h2>
          <Link href="#" className="text-sm text-[#1a73e8] hover:underline">Tümünü Gör →</Link>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 divide-y divide-gray-100">
          {Array.from({ length: 5 }).map((_, i) => (
            <Link
              key={i}
              href="/ilan/test"
              className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center text-2xl shrink-0">
                {categories[i].icon}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-gray-900 truncate">
                  {["Satılık 2+1 Bakımlı Daire", "2024 Model Hyundai i20", "iPhone 15 Pro Max", "IKEA Koltuk Takımı", "amaha MT-07 Motosiklet"][i]}
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  {["İstanbul, Beşiktaş", "İzmir, Bornova", "Ankara, Keçiören", "Bursa, Nilüfer", "Antalya, Muratpaşa"][i]}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {["2 saat önce", "5 saat önce", "1 gün önce", "2 gün önce", "3 gün önce"][i]}
                </p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-base font-bold text-gray-900">
                  {["3.500.000", "850.000", "65.000", "45.000", "280.000"][i]} ₺
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {["Görüntülenme: 1.234", "Görüntülenme: 892", "Görüntülenme: 2.341", "Görüntülenme: 567", "Görüntülenme: 1.089"][i]}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Bilgi Kartları - idefix style */}
      <div className="max-w-[1200px] mx-auto px-4 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-6 border border-gray-100">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-2xl mb-3">🔒</div>
            <h3 className="font-bold text-sm text-gray-900 mb-1">Güvenli Alışveriş</h3>
            <p className="text-xs text-gray-500 leading-relaxed">Tüm işlemleriniz SSL ile şifrelenir. Kişisel bilgileriniz korunur.</p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-100">
            <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-2xl mb-3">💳</div>
            <h3 className="font-bold text-sm text-gray-900 mb-1">Param Güvende</h3>
            <p className="text-xs text-gray-500 leading-relaxed">Satıcıya güvenmeden alışveriş yapın. Paranız güvende kalır.</p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-100">
            <div className="w-12 h-12 bg-yellow-50 rounded-xl flex items-center justify-center text-2xl mb-3">📞</div>
            <h3 className="font-bold text-sm text-gray-900 mb-1">7/24 Destek</h3>
            <p className="text-xs text-gray-500 leading-relaxed">Sorularınız için müşteri hizmetlerimiz her zaman yanınızda.</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
