// src/app/admin/login/page.tsx
"use client";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("admin@epicore.local");
  const [password, setPassword] = useState("Admin@123");
  const [msg, setMsg] = useState("");

  async function handleSubmit(e: any) {
    e.preventDefault();
    setMsg("Logging in...");
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const j = await res.json();
    if (j.ok) {
      localStorage.setItem("epicore_token", j.token);
      setMsg("Login success — redirecting to dashboard...");
      window.location.href = "/admin/dashboard";
    } else {
      setMsg("Login failed: " + (j.error || "unknown"));
    }
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded-xl shadow-sm bg-white">
      <h1 className="text-2xl font-semibold mb-4 text-center">Admin Login</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Email</label>
          <input
            className="w-full p-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Password</label>
          <input
            type="password"
            className="w-full p-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-black text-white rounded hover:bg-gray-800"
        >
          Login
        </button>

        <div className="text-sm text-gray-600 mt-2">{msg}</div>
      </form>
    </div>
  );
}

