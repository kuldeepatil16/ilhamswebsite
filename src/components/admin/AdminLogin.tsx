"use client";


import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function AdminLogin() {
  const [error, setError] = useState<string | null>(null);

  async function submit(formData: FormData) {
    setError(null);
    const email = String(formData.get("email") || "");
    const password = String(formData.get("password") || "");
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
      return;
    }
    window.location.reload();
  }

  return (
    <form action={submit} className="mx-auto mt-10 max-w-md space-y-3 rounded-xl border border-slate-200 bg-white p-6">
      <h2 className="text-xl font-bold">Admin Login</h2>
      <input type="email" name="email" required placeholder="Email" className="w-full rounded-lg border border-slate-200 px-3 py-2" />
      <input type="password" name="password" required placeholder="Password" className="w-full rounded-lg border border-slate-200 px-3 py-2" />
      <button className="rounded-full bg-navy px-4 py-2 text-sm font-semibold text-white" type="submit">Sign in</button>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
    </form>
  );
}
