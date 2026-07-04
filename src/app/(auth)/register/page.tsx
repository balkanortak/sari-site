"use client";

import { useState, useActionState } from "react";
import Link from "next/link";
import { register } from "@/lib/supabase/actions";

const cities = ["Adana","Adıyaman","Afyonkarahisar","Ağrı","Aksaray","Amasya","Ankara","Antalya","Ardahan","Artvin","Aydın","Balıkesir","Bartın","Batman","Bayburt","Bilecik","Bingöl","Bitlis","Bolu","Burdur","Bursa","Çanakkale","Çankırı","Çorum","Denizli","Diyarbakır","Düzce","Edirne","Elazığ","Erzincan","Erzurum","Eskişehir","Gaziantep","Giresun","Gümüşhane","Hakkari","Hatay","Iğdır","Isparta","İstanbul","İzmir","Kahramanmaraş","Karabük","Karaman","Kars","Kastamonu","Kayseri","Kırıkkale","Kırklareli","Kırşehir","Kilis","Kocaeli","Konya","Kütahya","Malatya","Manisa","Mardin","Mersin","Muğla","Muş","Nevşehir","Niğde","Ordu","Osmaniye","Rize","Sakarya","Samsun","Şanlıurfa","Siirt","Sinop","Sivas","Şırnak","Tekirdağ","Tokat","Trabzon","Tunceli","Uşak","Van","Yalova","Yozgat","Zonguldak"];

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [state, formAction, pending] = useActionState(register, { error: "" });
  const [form, setForm] = useState({
    full_name: "", phone: "", city: "", email: "",
    password: "", password_confirm: "",
  });

  const update = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const step1Valid = form.full_name.length >= 2 && form.phone.length >= 10 && form.city.length > 0;
  const step2Valid = form.email.includes("@") && form.password.length >= 6 && form.password === form.password_confirm;

  return (
    <div className="min-h-screen bg-[#f0f0f0] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <Link href="/" className="flex items-center justify-center gap-2 mb-6">
          <div className="w-12 h-12 bg-[#ffc107] rounded-xl flex items-center justify-center font-black text-gray-900 text-xl">S</div>
          <span className="text-2xl font-bold text-gray-900">Sarı<span className="text-[#ffc107]">Site</span></span>
        </Link>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h1 className="text-xl font-bold text-gray-900 text-center mb-1">Üye Ol</h1>
          <p className="text-sm text-gray-500 text-center mb-6">Ücretsiz hesap oluşturarak ilan vermeye başlayın</p>

          {/* Progress */}
          <div className="flex items-center justify-center gap-3 mb-8">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all ${step > s ? "bg-green-500 text-white" : step === s ? "bg-[#ffc107] text-gray-900 ring-4 ring-[#ffc10720]" : "bg-gray-100 text-gray-400"}`}>
                  {step > s ? "✓" : s}
                </div>
                {s < 3 && <div className={`w-12 h-0.5 ${step > s ? "bg-green-500" : "bg-gray-100"}`}></div>}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-[11px] text-gray-400 mb-6 px-2">
            <span className={step >= 1 ? "text-gray-900 font-medium" : ""}>Kimlik</span>
            <span className={step >= 2 ? "text-gray-900 font-medium" : ""}>İletişim</span>
            <span className={step >= 3 ? "text-gray-900 font-medium" : ""}>Hesap</span>
          </div>

          {state.error && state.error.length > 0 && (
            <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm mb-4 border border-red-100">{state.error}</div>
          )}

          <form action={formAction}>
            {/* ALL FIELDS always in DOM, hidden via CSS */}
            <div style={{ display: step === 1 ? "block" : "none" }} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Ad Soyad</label>
                <input type="text" name="full_name" required value={form.full_name} onChange={(e) => update("full_name", e.target.value)} placeholder="Adınız Soyadınız"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#ffc107] focus:ring-1 focus:ring-[#ffc107] transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Şehir</label>
                <select name="city" required value={form.city} onChange={(e) => update("city", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#ffc107] bg-white">
                  <option value="">Şehir seçin</option>
                  {cities.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Telefon</label>
                <input type="tel" name="phone" required value={form.phone} onChange={(e) => update("phone", e.target.value.replace(/\D/g, "").slice(0, 11))} placeholder="05XX XXX XX XX"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#ffc107]" />
                <p className="text-xs text-gray-400 mt-1">Örn: 05321234567</p>
              </div>
              <button type="button" onClick={() => step1Valid && setStep(2)} disabled={!step1Valid}
                className="w-full bg-[#ffc107] hover:bg-[#e6ac00] text-gray-900 font-bold py-3 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed text-sm mt-2">
                Devam Et
              </button>
            </div>

            <div style={{ display: step === 2 ? "block" : "none" }} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">E-posta</label>
                <input type="email" name="email" required value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="ornek@email.com"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#ffc107]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Şifre</label>
                <div className="relative">
                  <input type={showPassword ? "text" : "password"} name="password" required minLength={6} value={form.password}
                    onChange={(e) => update("password", e.target.value)} placeholder="En az 6 karakter"
                    className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#ffc107]" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Şifre Tekrar</label>
                <input type="password" name="password_confirm" required value={form.password_confirm}
                  onChange={(e) => update("password_confirm", e.target.value)} placeholder="Şifrenizi tekrar girin"
                  className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none ${form.password_confirm && form.password !== form.password_confirm ? "border-red-300" : "border-gray-200 focus:border-[#ffc107]"}`} />
                {form.password_confirm && form.password !== form.password_confirm && <p className="text-xs text-red-500 mt-1">Şifreler eşleşmiyor</p>}
                {form.password_confirm && form.password === form.password_confirm && form.password.length >= 6 && <p className="text-xs text-green-500 mt-1">✓ Şifreler eşleşiyor</p>}
              </div>
              <div className="flex gap-3 mt-2">
                <button type="button" onClick={() => setStep(1)} className="px-5 py-3 border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50">← Geri</button>
                <button type="button" onClick={() => step2Valid && setStep(3)} disabled={!step2Valid}
                  className="flex-1 bg-[#ffc107] hover:bg-[#e6ac00] text-gray-900 font-bold py-3 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed text-sm">Devam Et</button>
              </div>
            </div>

            <div style={{ display: step === 3 ? "block" : "none" }} className="space-y-4">
              <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                <div className="flex justify-between text-sm"><span className="text-gray-500">Ad Soyad:</span><span className="font-medium text-gray-900">{form.full_name}</span></div>
                <div className="flex justify-between text-sm"><span className="text-gray-500">Şehir:</span><span className="font-medium text-gray-900">{form.city}</span></div>
                <div className="flex justify-between text-sm"><span className="text-gray-500">Telefon:</span><span className="font-medium text-gray-900">{form.phone}</span></div>
                <div className="flex justify-between text-sm"><span className="text-gray-500">E-posta:</span><span className="font-medium text-gray-900">{form.email}</span></div>
              </div>

              <div className="flex items-start gap-2">
                <input type="checkbox" required className="mt-1 w-4 h-4 accent-[#ffc107] rounded shrink-0" />
                <p className="text-xs text-gray-500 leading-relaxed">
                  <Link href="#" className="text-[#1a73e8] hover:underline">Kullanım Koşulları</Link>'nı ve
                  <Link href="#" className="text-[#1a73e8] hover:underline"> Gizlilik Politikası</Link>'nı okudum, kabul ediyorum.
                </p>
              </div>

              <div className="flex gap-3">
                <button type="button" onClick={() => setStep(2)} className="px-5 py-3 border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50">← Geri</button>
                <button type="submit" disabled={pending}
                  className="flex-1 bg-[#ffc107] hover:bg-[#e6ac00] text-gray-900 font-bold py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed text-sm">
                  {pending ? "Kayıt yapılıyor..." : "Üye Ol 🎉"}
                </button>
              </div>
            </div>
          </form>
        </div>
        <p className="text-center text-sm text-gray-500 mt-6">Zaten hesabınız var mı? <Link href="/login" className="text-[#1a73e8] font-medium hover:underline">Giriş Yap</Link></p>
      </div>
    </div>
  );
}
