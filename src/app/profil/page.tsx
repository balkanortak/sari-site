import { createServerSupabase } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { logout } from "@/lib/supabase/actions";

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
    <div className="min-h-screen bg-bg">
      <header className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary-dark">
            SarıSite
          </Link>
          <form action={logout}>
            <button type="submit" className="text-text-muted hover:text-text">
              Çıkış Yap
            </button>
          </form>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-surface rounded-xl p-6 border border-border">
          <h1 className="text-2xl font-bold mb-4">Profilim</h1>
          {profile && (
          <div className="space-y-3">
            <div>
              <span className="text-text-muted text-sm">Ad Soyad:</span>
              <p className="font-medium">{profile?.full_name as string}</p>
            </div>
            <div>
              <span className="text-text-muted text-sm">E-posta:</span>
              <p className="font-medium">{user.email}</p>
            </div>
            <div>
              <span className="text-text-muted text-sm">Hesap Türü:</span>
              <p className="font-medium capitalize">{profile?.account_type as string}</p>
            </div>
          </div>
          )}
        </div>

        <div className="grid grid-cols-3 gap-4 mt-6">
          <Link
            href="/ilan/yeni"
            className="bg-surface rounded-xl p-4 text-center border border-border hover:shadow-sm transition-shadow"
          >
            <div className="text-2xl mb-1">📝</div>
            <div className="font-medium">İlan Ver</div>
          </Link>
          <Link
            href="#"
            className="bg-surface rounded-xl p-4 text-center border border-border hover:shadow-sm transition-shadow"
          >
            <div className="text-2xl mb-1">📋</div>
            <div className="font-medium">İlanlarım</div>
          </Link>
          <Link
            href="#"
            className="bg-surface rounded-xl p-4 text-center border border-border hover:shadow-sm transition-shadow"
          >
            <div className="text-2xl mb-1">❤️</div>
            <div className="font-medium">Favorilerim</div>
          </Link>
        </div>
      </div>
    </div>
  );
}
