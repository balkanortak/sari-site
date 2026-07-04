"use client";

import Link from "next/link";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useEffect } from "react";
import type { User } from "@supabase/supabase-js";

const mainCategories = [
  { name: "Emlak", slug: "emlak", icon: "🏠", subcategories: ["Konut", "İş Yeri", "Arsa", "Proje"] },
  { name: "Vasıta", slug: "vasita", icon: "🚗", subcategories: ["Otomobil", "Ticari Araç", "Motosiklet", "Kiralık Araç"] },
  { name: "Alışveriş", slug: "alisveris", icon: "🛍️", subcategories: ["Elektronik", "Giyim", "Ev Yaşam", "Spor"] },
  { name: "Yedek Parça", slug: "yedek-parca", icon: "🔧", subcategories: ["Otomobil", "Motosiklet", "Bilgisayar"] },
  { name: "İş Makineleri", slug: "is-makineleri", icon: "🏗️", subcategories: ["İş Makinesi", "Ticari Araç", "Traktör"] },
  { name: "Hizmetler", slug: "hizmetler", icon: "💼", subcategories: ["Nakliyat", "Tamirat", "Eğitim"] },
];

export default function Header() {
  const [user, setUser] = useState<User | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  return (
    <header className="sticky top-0 z-50">
      {/* Top Bar - sahibinden.com style */}
      <div className="bg-[#ffc107]">
        <div className="max-w-[1200px] mx-auto px-4 flex items-center justify-between h-10 text-xs">
          <div className="flex items-center gap-4">
            <span className="font-semibold text-gray-800">SarıSite</span>
            <span className="text-gray-600 hidden sm:inline">Türkiye&apos;nin En Büyük İlan Platformu</span>
          </div>
          <div className="flex items-center gap-3 text-gray-700">
            <Link href="#" className="hover:text-gray-900 transition-colors">Yardım</Link>
            <span className="text-gray-400">|</span>
            <Link href="#" className="hover:text-gray-900 transition-colors">İletişim</Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-[1200px] mx-auto px-4 flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-10 h-10 bg-[#ffc107] rounded-lg flex items-center justify-center font-black text-gray-900 text-lg">
              S
            </div>
            <span className="text-xl font-bold text-gray-900 hidden sm:block">
              Sarı<span className="text-[#ffc107]">Site</span>
            </span>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-xl mx-4">
            <div className="flex border-2 border-gray-200 rounded-lg overflow-hidden focus-within:border-[#ffc107] transition-colors">
              <select className="bg-gray-50 border-r border-gray-200 px-3 py-2.5 text-sm text-gray-600 focus:outline-none hidden md:block">
                <option>Tüm Kategoriler</option>
                <option>Emlak</option>
                <option>Vasıta</option>
                <option>Alışveriş</option>
              </select>
              <input
                type="text"
                placeholder="Aradığınız ilanı yazın..."
                className="flex-1 px-4 py-2.5 text-sm outline-none bg-transparent"
              />
              <button className="bg-[#ffc107] hover:bg-[#e6ac00] px-5 py-2.5 transition-colors">
                <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-2">
            {user ? (
              <Link
                href="/profil"
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="w-8 h-8 bg-[#ffc107] rounded-full flex items-center justify-center text-sm font-bold text-gray-800">
                  {user.email?.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm font-medium hidden md:block">Hesabım</span>
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors hidden sm:block"
                >
                  Giriş Yap
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 text-sm font-medium bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors hidden sm:block"
                >
                  Üye Ol
                </Link>
              </>
            )}
            <Link
              href="/ilan/yeni"
              className="px-4 py-2.5 text-sm font-bold bg-[#ffc107] text-gray-900 rounded-lg hover:bg-[#e6ac00] transition-colors flex items-center gap-1.5"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span className="hidden sm:inline">İlan Ver</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Category Navigation */}
      <div className="bg-white border-b border-gray-100 hidden lg:block">
        <div className="max-w-[1200px] mx-auto px-4">
          <nav className="flex items-center gap-0 overflow-x-auto">
            {mainCategories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/kategori/${cat.slug}`}
                className="group relative flex items-center gap-1.5 px-4 py-3 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors whitespace-nowrap"
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
                {/* Mega Menu */}
                <div className="absolute top-full left-0 bg-white shadow-xl rounded-b-lg border border-gray-100 p-4 min-w-[220px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                  {cat.subcategories.map((sub) => (
                    <Link
                      key={sub}
                      href={`/kategori/${cat.slug}`}
                      className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                    >
                      {sub}
                    </Link>
                  ))}
                </div>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
