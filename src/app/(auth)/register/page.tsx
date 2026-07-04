"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { register } from "@/lib/supabase/actions";

export default function RegisterPage() {
  const [error, setError] = useState<string | null>(null);
  const [accountType, setAccountType] = useState<"bireysel" | "kurumsal">("bireysel");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    formData.set("account_type", accountType);
    const result = await register(formData);
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
        <h1 className="text-xl font-bold text-center mb-6">Kayıt Ol</h1>

        {error && (
          <div className="bg-red-50 text-danger p-3 rounded-lg text-sm mb-4">
            {error}
          </div>
        )}

        <div className="flex gap-2 mb-6">
          <button
            type="button"
            onClick={() => setAccountType("bireysel")}
            className={`flex-1 py-3 rounded-lg font-medium text-sm transition-colors ${
              accountType === "bireysel"
                ? "bg-secondary text-white"
                : "bg-gray-100 text-text-muted"
            }`}
          >
            Bireysel
          </button>
          <button
            type="button"
            onClick={() => setAccountType("kurumsal")}
            className={`flex-1 py-3 rounded-lg font-medium text-sm transition-colors ${
              accountType === "kurumsal"
                ? "bg-secondary text-white"
                : "bg-gray-100 text-text-muted"
            }`}
          >
            Kurumsal
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Ad Soyad</label>
            <input
              type="text"
              name="full_name"
              required
              className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-secondary outline-none"
            />
          </div>
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
              minLength={6}
              className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-secondary outline-none"
            />
          </div>

          {accountType === "kurumsal" && (
            <>
              <div>
                <label className="block text-sm font-medium mb-1">Vergi No</label>
                <input
                  type="text"
                  name="vergi_no"
                  className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-secondary outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Şirket Adı</label>
                <input
                  type="text"
                  name="company_name"
                  className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-secondary outline-none"
                />
              </div>
            </>
          )}

          <input type="hidden" name="account_type" value={accountType} />

          <button
            type="submit"
            className="w-full bg-secondary text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Kayıt Ol
          </button>
        </form>

        <p className="text-center text-sm text-text-muted mt-4">
          Zaten hesabınız var mı?{" "}
          <Link href="/login" className="text-secondary hover:underline">
            Giriş Yap
          </Link>
        </p>
      </div>
    </div>
  );
}
