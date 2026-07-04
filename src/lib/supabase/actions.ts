"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createServerSupabase } from "./server";
import { createClient } from "@supabase/supabase-js";

export async function login(prevState: { error?: string }, formData: FormData) {
  const supabase = await createServerSupabase();
  const { error } = await supabase.auth.signInWithPassword({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });

  if (error) return { error: error.message };

  revalidatePath("/", "layout");
  redirect("/");
}

export async function register(prevState: { error?: string }, formData: FormData) {
  const password = formData.get("password") as string;
  const passwordConfirm = formData.get("password_confirm") as string;

  if (password !== passwordConfirm) return { error: "Şifreler eşleşmiyor" };
  if (password.length < 6) return { error: "Şifre en az 6 karakter olmalıdır" };

  const email = formData.get("email") as string;
  const fullName = formData.get("full_name") as string;
  const phone = formData.get("phone") as string;
  const city = formData.get("city") as string;

  // Option 1: Try normal signup first
  const supabase = await createServerSupabase();
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name: fullName, phone, city, account_type: "bireysel" } },
  });

  if (authData?.user) {
    await supabase.from("profiles").upsert({
      user_id: authData.user.id,
      full_name: fullName,
      account_type: "bireysel",
      phone,
      city,
    }).maybeSingle();
    revalidatePath("/", "layout");
    redirect("/");
  }

  // Option 2: If trigger fails, use admin API with service_role key
  const adminClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_KEY!,
  );

  const { data: adminData, error: adminError } = await adminClient.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { full_name: fullName, phone, city, account_type: "bireysel" },
  });

  if (adminError) return { error: adminError.message };

  if (adminData.user) {
    await adminClient.from("profiles").upsert({
      user_id: adminData.user.id,
      full_name: fullName,
      account_type: "bireysel",
      phone,
      city,
    }).maybeSingle();
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function logout() {
  const supabase = await createServerSupabase();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/");
}
