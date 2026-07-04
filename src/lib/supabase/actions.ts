"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createServerSupabase } from "./server";

export async function login(prevState: { error?: string }, formData: FormData) {
  const supabase = await createServerSupabase();

  const { error } = await supabase.auth.signInWithPassword({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function register(prevState: { error?: string }, formData: FormData) {
  const supabase = await createServerSupabase();

  const password = formData.get("password") as string;
  const passwordConfirm = formData.get("password_confirm") as string;

  if (password !== passwordConfirm) {
    return { error: "Şifreler eşleşmiyor" };
  }

  if (password.length < 6) {
    return { error: "Şifre en az 6 karakter olmalıdır" };
  }

  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: formData.get("email") as string,
    password: password,
    options: {
      data: {
        full_name: formData.get("full_name") as string,
        phone: formData.get("phone") as string,
        city: formData.get("city") as string,
        account_type: "bireysel",
      },
    },
  });

  if (authError) {
    return { error: authError.message };
  }

  if (authData.user) {
    await supabase.from("profiles").upsert({
      user_id: authData.user.id,
      full_name: formData.get("full_name") as string,
      account_type: "bireysel",
      phone: formData.get("phone") as string,
      city: formData.get("city") as string,
    });
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
