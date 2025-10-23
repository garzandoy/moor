"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function RegisterPage() {
  const r = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setMsg("");
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
    });
    setLoading(false);
    if (error) return setMsg(error.message);

    // If email confirmations are enabled in Supabase, the user must verify first.
    setMsg("Check your email to confirm your account, then sign in.");
    r.push("/login");
  }

  return (
    <div className="mx-auto max-w-sm p-6">
      <h1 className="text-2xl font-semibold mb-4">Create account</h1>
      {msg && <p className="mb-3 text-gray-700">{msg}</p>}
      <form onSubmit={onSubmit} className="space-y-3">
        <input
          className="w-full border p-2 rounded"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          className="w-full border p-2 rounded"
          type="password"
          placeholder="Password (min 6 chars)"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <button
          className="w-full border p-2 rounded hover:bg-gray-100 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Creating..." : "Sign up"}
        </button>
      </form>
    </div>
  );
}