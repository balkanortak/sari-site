import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function ListingDetailPage() {
  return (
    <div className="min-h-screen bg-[#f0f0f0]">
      <Header />
      <div className="max-w-[1200px] mx-auto px-4 py-3">
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <Link href="/" className="hover:text-gray-600">Ana Sayfa</Link><span>/</span>
          <Link href="/kategori/emlak" className="hover:text-gray-600">Emlak</Link><span>/</span>
          <span className="text-gray-700">Satılık Daire</span>
        </div>
      </div>
      <div className="max-w-[1200px] mx-auto px-4 pb-8">
        <div className="flex gap-6">
          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {/* Gallery */}
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden mb-4">
              <div className="aspect-video bg-gray-200 flex items-center justify-center text-6xl">
                🏠
              </div>
              <div className="flex gap-1 p-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="w-20 h-16 bg-gray-200 rounded-lg flex items-center justify-center text-xl cursor-pointer hover:ring-2 hover:ring-[#ffc107] transition-all">
                    📷
                  </div>
                ))}
              </div>
            </div>

            {/* Info */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-4">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-xl font-bold text-gray-900 mb-1">Kadıköy&apos;de Satılık 3+1 Daire</h1>
                  <p className="text-sm text-gray-500">📍 İstanbul, Kadıköy, Caferağa Mah.</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">4.500.000 ₺</p>
                  <p className="text-xs text-gray-400 mt-1">Satılık</p>
                </div>
              </div>

              {/* Property Details Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                {[
                  { label: "Brüt m²", value: "140" },
                  { label: "Net m²", value: "120" },
                  { label: "Oda Sayısı", value: "3+1" },
                  { label: "Bina Yaşı", value: "5" },
                  { label: "Bulunduğu Kat", value: "3" },
                  { label: "Toplam Kat", value: "8" },
                  { label: "Isıtma", value: "Kombi" },
                  { label: "Banyo", value: "2" },
                ].map((d) => (
                  <div key={d.label} className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-400">{d.label}</p>
                    <p className="text-sm font-bold text-gray-900">{d.value}</p>
                  </div>
                ))}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {["Krediye Uygun", "Takaslı", "Sahibinden", "Balkonlu", "Güvenlikli", "Otoparklı"].map((tag) => (
                  <span key={tag} className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full font-medium">{tag}</span>
                ))}
              </div>

              {/* Description */}
              <div className="border-t border-gray-100 pt-6">
                <h2 className="font-bold text-gray-900 mb-3">Açıklama</h2>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Kadıköy Caferağa Mahallesi&aposnde, metro ve minibüse yürüme mesafesinde,
                  bakımlı ve ferah 3+1 daire. Bina 5 yaşında olup, kombi ısıtma, 2 balkon,
                  kapalı otopark ve 24 saat güvenlik mevcuttur. Otobüs ve metro durağına
                  2 dakika yürüme mesafesindedir. Okul, hastane ve alışveriş merkezlerine
                  yakındır. Yatırım amaçlı veya oturma amaçlı uygundur.
                </p>
              </div>
            </div>

            {/* Location */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-4">
              <h2 className="font-bold text-gray-900 mb-3">Konum</h2>
              <div className="aspect-video bg-gray-100 rounded-xl flex items-center justify-center text-gray-400">
                🗺️ Harita
              </div>
            </div>
          </main>

          {/* Sidebar */}
          <aside className="w-80 shrink-0 hidden lg:block">
            {/* Seller Card */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-4 sticky top-32">
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
                <div className="w-12 h-12 bg-[#ffc107] rounded-full flex items-center justify-center font-bold text-gray-800">
                  A
                </div>
                <div>
                  <h3 className="font-bold text-sm text-gray-900">Ahmet Yılmaz</h3>
                  <p className="text-xs text-gray-400">Son 3 günde 12 ilan görüntüledi</p>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <button className="w-full bg-[#ffc107] hover:bg-[#e6ac00] text-gray-900 font-bold py-3 rounded-xl text-sm transition-colors flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  Telefonu Göster
                </button>
                <button className="w-full border border-gray-200 text-gray-700 font-medium py-3 rounded-xl text-sm hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                  Mesaj Gönder
                </button>
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs text-gray-400">İlan Numarası:</span>
                  <span className="text-xs font-mono text-gray-700">#12345</span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs text-gray-400">İlan Tarihi:</span>
                  <span className="text-xs text-gray-700">2 Temmuz 2026</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">Görüntülenme:</span>
                  <span className="text-xs text-gray-700">1.234</span>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <button className="flex-1 border border-gray-200 text-gray-600 py-2 rounded-lg text-xs hover:bg-gray-50 transition-colors flex items-center justify-center gap-1">
                  ❤️ Favori
                </button>
                <button className="flex-1 border border-gray-200 text-gray-600 py-2 rounded-lg text-xs hover:bg-gray-50 transition-colors flex items-center justify-center gap-1">
                  🔗 Paylaş
                </button>
                <button className="flex-1 border border-gray-200 text-gray-600 py-2 rounded-lg text-xs hover:bg-gray-50 transition-colors flex items-center justify-center gap-1">
                  🚩 Şikayet
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
      <Footer />
    </div>
  );
}
