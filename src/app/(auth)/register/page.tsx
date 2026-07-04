"use client";

import { useState } from "react";
import Link from "next/link";
import { register } from "@/lib/supabase/actions";

export default function RegisterPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [accountType, setAccountType] = useState<"bireysel" | "kurumsal">("bireysel");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    formData.set("account_type", accountType);
    const result = await register(formData);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#f0f0f0] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="w-12 h-12 bg-[#ffc107] rounded-xl flex items-center justify-center font-black text-gray-900 text-xl">
            S
          </div>
          <span className="text-2xl font-bold text-gray-900">
            Sarı<span className="text-[#ffc107]">Site</span>
          </span>
        </Link>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h1 className="text-xl font-bold text-gray-900 text-center mb-1">Üye Ol</h1>
          <p className="text-sm text-gray-500 text-center mb-6">Ücretsiz hesap oluşturarak ilan vermeye başlayın</p>

          {/* Account Type Tabs */}
          <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
            <button
              type="button"
              onClick={() => setAccountType("bireysel")}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
                accountType === "bireysel"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              👤 Bireysel
            </button>
            <button
              type="button"
              onClick={() => setAccountType("kurumsal")}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
                accountType === "kurumsal"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              🏢 Kurumsal
            </button>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm mb-4 border border-red-100">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                {accountType === "kurumsal" ? "Şirket / Mağaza Adı" : "Ad Soyad"}
              </label>
              <input
                type="text"
                name="full_name"
                required
                placeholder={accountType === "kurumsal" ? "Örnek Emlak Ltd. Şti." : "Adınız Soyadınız"}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#ffc107] focus:ring-1 focus:ring-[#ffc107] transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">E-posta adresi</label>
              <input
                type="email"
                name="email"
                required
                placeholder="ornek@email.com"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#ffc107] focus:ring-1 focus:ring-[#ffc107] transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Şifre</label>
              <input
                type="password"
                name="password"
                required
                minLength={6}
                placeholder="En az 6 karakter"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#ffc107] focus:ring-1 focus:ring-[#ffc107] transition-colors"
              />
              <p className="text-xs text-gray-400 mt-1">En az 6 karakter olmalıdır</p>
            </div>

            {accountType === "kurumsal" && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Vergi Numarası</label>
                  <input
                    type="text"
                    name="vergi_no"
                    placeholder="1234567890"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#ffc107] focus:ring-1 focus:ring-[#ffc107] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Telefon Numarası</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="05XX XXX XX XX"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#ffc107] focus:ring-1 focus:ring-[#ffc107] transition-colors"
                  />
                </div>
              </>
            )}

            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                required
                className="mt-1 w-4 h-4 accent-[#ffc107]"
              />
              <p className="text-xs text-gray-500 leading-relaxed">
                <Link href="#" className="text-[#1a73e8] hover:underline">Kullanım Koşulları</Link>&apos;nı ve{" "}
                <Link href="#" className="text-[#1a73e8] hover:underline">Gizlilik Politikası</Link>&apos;nı okudum, kabul ediyorum.
              </p>
            </div>

            <input type="hidden" name="account_type" value={accountType} />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#ffc107] hover:bg-[#e6ac00] text-gray-900 font-bold py-3 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              {loading ? "Kayıt yapılıyor..." : "Üye Ol"}
            </button>
          </form>

          <p className="text-center text-xs text-gray-400 mt-4">
            Kayıt olarak ilanların ve fiyatların değişiklik gösterebileceğini kabul edersiniz.
          </p>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Zaten hesabınız var mı?{" "}
          <Link href="/login" className="text-[#1a73e8] font-medium hover:underline">
            Giriş Yap
          </Link>
        </p>
      </div>
    </div>
  );
}
