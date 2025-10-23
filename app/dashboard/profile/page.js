"use client";
import { useState } from "react";

export default function ProfilePage() {
  const [user, setUser] = useState(null);

  async function handleLogin(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: form.get("email"),
        password: form.get("password"),
      }),
    });
    const data = await res.json().catch(() => ({}));
    if (data.user) setUser(data.user);
    else alert(data.error || "Login failed");
  }

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Profile</h1>
      {user ? (
        <div className="p-4 border rounded bg-green-50">
          <div><b>Email:</b> {user.email}</div>
          <div><b>Name:</b> {user.name || "—"}</div>
        </div>
      ) : (
        <form onSubmit={handleLogin} className="space-y-3 max-w-sm">
          <input name="email" type="email" placeholder="Email" className="w-full border rounded px-3 py-2" required />
          <input name="password" type="password" placeholder="Password" className="w-full border rounded px-3 py-2" required />
          <button className="px-3 py-2 bg-blue-600 text-white rounded" type="submit">Log in</button>
        </form>
      )}
    </div>
  );
}
