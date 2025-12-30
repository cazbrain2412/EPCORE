// src/app/admin/dashboard/page.tsx
"use client";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [users, setUsers] = useState<any[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("epicore_token");
    if (!token) {
      window.location.href = "/admin/login";
      return;
    }
    fetch("/api/admin/users", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((j) => {
        if (j.ok) setUsers(j.users || []);
        else setError(j.error || "Failed");
      })
      .catch((e) => setError(String(e)));
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <h2>Admin Dashboard</h2>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <h3>Users</h3>
      <table border={1} cellPadding={6}>
        <thead><tr><th>Name</th><th>Email</th><th>Role</th></tr></thead>
        <tbody>
          {users.map((u: any) => (
            <tr key={u._id}><td>{u.name}</td><td>{u.email}</td><td>{u.role}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

