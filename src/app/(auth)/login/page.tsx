"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { login } from "@/lib/supabase/actions";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    const result = await login(formData);
    if (result?.error) {
      setError(result.error);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg">
      <div className="bg-surface p-8 rounded-xl shadow-sm w-full max-w-md border border-border">
        <Link href="/" className="text-2xl font-bold text-primary-dark block text-center mb-6">
          SarıSite
        </Link>
        <h1 className="text-xl font-bold text-center mb-6">Giriş Yap</h1>

        {error && (
          <div className="bg-red-50 text-danger p-3 rounded-lg text-sm mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">E-posta</label>
            <input
              type="email"
              name="email"
              required
              className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-secondary outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Şifre</label>
            <input
              type="password"
              name="password"
              required
              className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-secondary outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-secondary text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Giriş Yap
          </button>
        </form>

        <p className="text-center text-sm text-text-muted mt-4">
          Hesabınız yok mu?{" "}
          <Link href="/register" className="text-secondary hover:underline">
            Kayıt Ol
          </Link>
        </p>
      </div>
    </div>
  );
}
