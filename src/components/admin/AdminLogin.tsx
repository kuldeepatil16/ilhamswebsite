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
    <form action={submit} className="ui-surface mx-auto mt-10 max-w-md space-y-3 rounded-xl p-6">
      <h2 className="ui-text text-xl font-bold">Admin Login</h2>
      <input type="email" name="email" required placeholder="Email" className="ui-input" />
      <input type="password" name="password" required placeholder="Password" className="ui-input" />
      <button className="ui-btn-primary px-4 py-2 text-sm" type="submit">Sign in</button>
      {error ? <p className="text-sm text-danger">{error}</p> : null}
    </form>
  );
}
