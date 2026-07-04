"use client";

import Link from "next/link";
import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const categories = [
  { name: "Emlak", slug: "emlak" },
  { name: "Vasıta", slug: "vasita" },
  { name: "Alışveriş", slug: "alisveris" },
  { name: "Yedek Parça", slug: "yedek-parca" },
  { name: "İş Makineleri", slug: "is-makineleri" },
  { name: "Hizmetler", slug: "hizmetler" },
];

export default function NewListingPage() {
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");

  return (
    <div className="min-h-screen bg-[#f0f0f0]">
      <Header />
      <div className="max-w-[800px] mx-auto px-4 py-8">
        {/* Progress */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
          <h1 className="text-xl font-bold text-gray-900 text-center mb-6">Yeni İlan Oluştur</h1>
          <div className="flex items-center justify-center gap-2 mb-2">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  step >= s ? "bg-[#ffc107] text-gray-900" : "bg-gray-100 text-gray-400"
                }`}>{s}</div>
                {s < 3 && <div className={`w-16 h-0.5 ${step > s ? "bg-[#ffc107]" : "bg-gray-100"}`}></div>}
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-16 text-xs text-gray-400">
            <span className={step >= 1 ? "text-gray-900 font-medium" : ""}>Kategori</span>
            <span className={step >= 2 ? "text-gray-900 font-medium" : ""}>Detaylar</span>
            <span className={step >= 3 ? "text-gray-900 font-medium" : ""}>Fotoğraf</span>
          </div>
        </div>

        {/* Step 1: Category */}
        {step === 1 && (
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="font-bold text-gray-900 mb-4">Kategori Seçin</h2>
            <div className="grid grid-cols-2 gap-3">
              {categories.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => { setSelectedCategory(cat.slug); setStep(2); }}
                  className={`p-4 rounded-xl border text-left hover:border-[#ffc107] hover:shadow-md transition-all ${
                    selectedCategory === cat.slug ? "border-[#ffc107] bg-[#ffc10710]" : "border-gray-100"
                  }`}
                >
                  <span className="text-2xl block mb-1">{{"emlak":"🏠","vasita":"🚗","alisveris":"🛍️","yedek-parca":"🔧","is-makineleri":"🏗️","hizmetler":"💼"}[cat.slug as string]}</span>
                  <span className="font-semibold text-sm text-gray-900">{cat.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Details */}
        {step === 2 && (
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="font-bold text-gray-900 mb-4">İlan Detayları</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">İlan Başlığı</label>
                <input type="text" placeholder="Ör: Kadıköy'de Satılık 3+1 Daire" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#ffc107]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Açıklama</label>
                <textarea rows={5} placeholder="İlanınızın detaylarını yazın..." className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#ffc107] resize-none"></textarea>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Fiyat</label>
                  <input type="number" placeholder="0" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#ffc107]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Para Birimi</label>
                  <select className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#ffc107]">
                    <option>₺ TL</option>
                    <option>$ USD</option>
                    <option>€ EUR</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">İl</label>
                  <select className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#ffc107]">
                    <option>İstanbul</option><option>Ankara</option><option>İzmir</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">İlçe</label>
                  <select className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#ffc107]">
                    <option>Kadıköy</option><option>Beşiktaş</option><option>Şişli</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Mahalle</label>
                  <input type="text" placeholder="Opsiyonel" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#ffc107]" />
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button onClick={() => setStep(1)} className="px-6 py-3 border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">Geri</button>
                <button onClick={() => setStep(3)} className="flex-1 bg-[#ffc107] hover:bg-[#e6ac00] text-gray-900 font-bold py-3 rounded-xl text-sm transition-colors">Devam Et</button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Photos */}
        {step === 3 && (
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="font-bold text-gray-900 mb-4">Fotoğraf Ekle</h2>
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-10 text-center hover:border-[#ffc107] transition-colors cursor-pointer mb-4">
              <div className="text-4xl mb-2">📷</div>
              <p className="text-sm font-medium text-gray-700">Fotoğrafları yüklemek için tıklayın</p>
              <p className="text-xs text-gray-400 mt-1">JPG, PNG formatında, en fazla 10MB</p>
              <p className="text-xs text-gray-400">Minimum 1, maksimum 20 fotoğraf</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStep(2)} className="px-6 py-3 border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">Geri</button>
              <button className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl text-sm transition-colors">İlanı Yayınla</button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
