import { createServerSupabase } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { logout } from "@/lib/supabase/actions";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default async function ProfilePage() {
  const supabase = await createServerSupabase();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();

  return (
    <div className="min-h-screen bg-[#f0f0f0]">
      <Header />
      <div className="max-w-[1200px] mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-[#ffc107] rounded-full flex items-center justify-center text-2xl font-bold text-gray-800">
              {profile?.full_name?.charAt(0) || user.email?.charAt(0)?.toUpperCase()}
            </div>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-gray-900">
                {(profile as { full_name?: string })?.full_name || "Kullanıcı"}
              </h1>
              <p className="text-sm text-gray-500">{user.email}</p>
              <span className="inline-block mt-1 text-xs font-medium bg-blue-50 text-blue-600 px-2.5 py-0.5 rounded-full capitalize">
                {(profile as { account_type?: string })?.account_type || "Bireysel"}
              </span>
            </div>
            <form action={logout}>
              <button type="submit" className="px-4 py-2 text-sm text-gray-500 hover:text-gray-900 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                Çıkış Yap
              </button>
            </form>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Link
            href="/ilan/yeni"
            className="bg-white rounded-xl p-5 border border-gray-100 hover:shadow-md transition-all text-center group"
          >
            <div className="w-12 h-12 bg-[#ffc10715] rounded-xl mx-auto mb-3 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
              📝
            </div>
            <h3 className="font-semibold text-sm text-gray-900">İlan Ver</h3>
            <p className="text-xs text-gray-400 mt-1">Yeni ilan oluştur</p>
          </Link>
          <Link
            href="#"
            className="bg-white rounded-xl p-5 border border-gray-100 hover:shadow-md transition-all text-center group"
          >
            <div className="w-12 h-12 bg-blue-50 rounded-xl mx-auto mb-3 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
              📋
            </div>
            <h3 className="font-semibold text-sm text-gray-900">İlanlarım</h3>
            <p className="text-xs text-gray-400 mt-1">Aktif ilanlar</p>
          </Link>
          <Link
            href="#"
            className="bg-white rounded-xl p-5 border border-gray-100 hover:shadow-md transition-all text-center group"
          >
            <div className="w-12 h-12 bg-red-50 rounded-xl mx-auto mb-3 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
              ❤️
            </div>
            <h3 className="font-semibold text-sm text-gray-900">Favorilerim</h3>
            <p className="text-xs text-gray-400 mt-1">Kayıtlı ilanlar</p>
          </Link>
          <Link
            href="#"
            className="bg-white rounded-xl p-5 border border-gray-100 hover:shadow-md transition-all text-center group"
          >
            <div className="w-12 h-12 bg-green-50 rounded-xl mx-auto mb-3 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
              💬
            </div>
            <h3 className="font-semibold text-sm text-gray-900">Mesajlar</h3>
            <p className="text-xs text-gray-400 mt-1">Gelen kutusu</p>
          </Link>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Son Aktiviteler</h2>
          <div className="text-center py-8">
            <div className="text-4xl mb-3">📭</div>
            <p className="text-sm text-gray-500">Henüz bir aktiviteniz yok</p>
            <Link
              href="/ilan/yeni"
              className="inline-block mt-3 text-sm font-medium text-[#1a73e8] hover:underline"
            >
              İlk ilanınızı verin →
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
