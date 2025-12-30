// src/app/admin/layout.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

type Props = { children: React.ReactNode };

/**
 * NavItem - shows a white-icon sidebar item that works in dark gradient sidebar.
 * It uses `usePathname()` to detect active state.
 */
function NavItem({ href, label, icon }: { href: string; label: string; icon?: React.ReactNode }) {
  const path = usePathname();
  const active = path?.startsWith(href);

  // item classes for gradient dark sidebar
  const base = "group flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm w-full";
  const activeCls = "bg-white/12 text-white font-medium shadow-inner";
  const inactiveCls = "text-white/90 hover:bg-white/6";

  return (
    <Link
      href={href}
      className={`${base} ${active ? activeCls : inactiveCls}`}
      aria-current={active ? "page" : undefined}
    >
      <span className="w-5 h-5 shrink-0 text-white/90 group-hover:text-white">{icon}</span>
      <span className="truncate">{label}</span>
    </Link>
  );
}

export default function AdminLayout({ children }: Props) {
  const [collapsed, setCollapsed] = useState(false);
  const path = usePathname();

  return (
    <div className="antialiased bg-gray-50 text-slate-900 min-h-screen">

        {/* Top header — subtle, thin; keeps site identity */}
        <header className="w-full">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="flex items-center justify-between py-4">
              <div className="flex items-center gap-4">
                <div className="text-lg font-semibold">CAZ BRAIN</div>
                <div className="hidden md:flex items-center gap-6 text-sm text-slate-500">
                  <Link href="/" className="hover:underline">View site</Link>
                  <Link href="/admin/dashboard" className="hover:underline">Dashboard</Link>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-sm text-slate-500 hidden md:block">Today</div>
                <Link href="/admin/login" className="px-3 py-1 rounded-full border border-slate-200 text-sm">Admin</Link>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex gap-6">

            {/* SIDEBAR (gradient deep blue) */}
            <aside
              className={`transition-all duration-200 ease-in-out ${collapsed ? "w-16" : "w-72"} shrink-0`}
            >
              <div className="sticky top-6">
                <div
                  className="h-full rounded-2xl overflow-hidden shadow-lg"
                  style={{ background: "linear-gradient(180deg,#0d4a78 0%, #1e73a8 100%)" }}
                >
                  <div className={`px-3 py-4 ${collapsed ? "text-center" : ""}`}>
                    <div className="flex items-center justify-between">
                      <div className={`flex items-center gap-3 ${collapsed ? "justify-center w-full" : ""}`}>
                        <div className="bg-white/8 rounded-md w-9 h-9 flex items-center justify-center text-white text-sm font-bold">
                          CB
                        </div>
                        {!collapsed && <div className="text-white font-semibold">CAZ BRAIN — Admin</div>}
                      </div>

                      <button
                        onClick={() => setCollapsed((s) => !s)}
                        aria-label="Toggle sidebar"
                        className="ml-2 p-1 rounded-md hover:bg-white/6 text-white"
                      >
                        {collapsed ? (
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                            <path d="M8 6L16 12L8 18V6Z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        ) : (
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                            <path d="M16 6L8 12L16 18V6Z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="px-2 pb-6">
                    {/* group: content */}
                    <div className={`mb-3 px-2 ${collapsed ? "sr-only" : ""}`}>
                      <div className="text-xs text-white/70 uppercase tracking-wide font-semibold">Content</div>
                    </div>

                    <nav className="flex flex-col gap-1 px-2">
                      <NavItem href="/admin/dashboard" label="Dashboard" icon={
                        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
                          <path d="M3 13h8V3H3v10zM3 21h8v-6H3v6zM13 21h8V11h-8v10zM13 3v6h8V3h-8z" fill="currentColor"/>
                        </svg>
                      } />
                      <NavItem href="/admin/pages" label="Pages" icon={
                        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
                          <path d="M7 3h10l4 4v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h3z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      } />
                      <NavItem href="/admin/pages/create" label="Create Page" icon={
                        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
                          <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                        </svg>
                      } />
                      <NavItem href="/admin/blocks" label="Blocks" icon={
                        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
                          <path d="M3 3h8v8H3V3zM13 3h8v8h-8V3zM3 13h8v8H3v-8zM13 13h8v8h-8v-8z" fill="currentColor"/>
                        </svg>
                      } />
                      <NavItem href="/admin/media" label="Media" icon={
                        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
                          <path d="M21 15V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10" stroke="currentColor" strokeWidth="1.2"/>
                          <path d="M21 21l-6-6-4 4-3-3-5 5" stroke="currentColor" strokeWidth="1.2"/>
                        </svg>
                      } />
                    </nav>

                    {/* group: customers */}
                    <div className={`mt-6 mb-2 px-2 ${collapsed ? "sr-only" : ""}`}>
                      <div className="text-xs text-white/70 uppercase tracking-wide font-semibold">Customers & Users</div>
                    </div>
                    <nav className="flex flex-col gap-1 px-2">
                      <NavItem href="/admin/inquiries" label="Inquiries" icon={
                        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
                          <path d="M21 15a2 2 0 0 0-2-2H7l-4 4V5a2 2 0 0 1 2-2h14" stroke="currentColor" strokeWidth="1.2"/>
                        </svg>
                      } />
                      <NavItem href="/admin/users" label="Users" icon={
                        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
                          <path d="M16 11c1.657 0 3-1.567 3-3.5S17.657 4 16 4s-3 1.567-3 3.5S14.343 11 16 11zM6 11c1.657 0 3-1.567 3-3.5S7.657 4 6 4 3 5.567 3 7.5 4.343 11 6 11z" stroke="currentColor" strokeWidth="1.2"/>
                          <path d="M2 20a8 8 0 0 1 8-8h4a8 8 0 0 1 8 8" stroke="currentColor" strokeWidth="1.2"/>
                        </svg>
                      } />
                    </nav>

                    {/* group: tools */}
                    <div className={`mt-6 mb-2 px-2 ${collapsed ? "sr-only" : ""}`}>
                      <div className="text-xs text-white/70 uppercase tracking-wide font-semibold">Tools</div>
                    </div>
                    <nav className="flex flex-col gap-1 px-2">
                      <NavItem href="/admin/seo" label="SEO" icon={
                        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
                          <path d="M3 7h18M3 12h12M3 17h18" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                        </svg>
                      } />
                      <NavItem href="/admin/settings" label="Settings" icon={
                        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
                          <path d="M12 15.5A3.5 3.5 0 1 0 12 8.5a3.5 3.5 0 0 0 0 7z" stroke="currentColor" strokeWidth="1.3"/>
                          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06A2 2 0 0 1 3.33 18.9l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82L3.21 6.09A2 2 0 0 1 6.04 3.27l.06.06a1.65 1.65 0 0 0 1.82.33h.09A1.65 1.65 0 0 0 9 3.34V3a2 2 0 0 1 4 0v.34c.16.01.32.06.47.14.62.33 1.4.08 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.09c.09.55.48 1.04 1 1.51h.09a2 2 0 0 1 0 4h-.09c-.52.47-.91.96-1 1.51v.09z" stroke="currentColor" strokeWidth="0.9" />
                        </svg>
                      } />
                    </nav>

                    {/* logout / bottom info */}
                    <div className="mt-6 px-3">
                      <NavItem href="/admin/logout" label="Logout" icon={
                        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
                          <path d="M16 17l5-5-5-5M21 12H9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M13 19H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      } />
                      {!collapsed && (
                        <div className="mt-4 text-xs text-white/60">
                          Logged in as
                          <div className="mt-1 text-sm font-medium text-white">Admin</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* MAIN CONTENT AREA */}
            <main className="flex-1">
              <div className="rounded-2xl bg-white shadow-sm border border-slate-100 p-6 min-h-[60vh]">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="text-xs text-slate-400 uppercase tracking-wide">{path?.startsWith("/admin") ? "Admin" : ""}</div>
                    <h1 className="text-2xl font-semibold">
                      {path === "/admin" || path === "/admin/dashboard" ? "Dashboard" :
                        path?.startsWith("/admin/pages/create") ? "Create Page" :
                        path?.startsWith("/admin/pages") ? "Pages" :
                        path?.replace("/admin/", "").replaceAll("/", " ").replaceAll("-", " ").replace(/^./, s => s.toUpperCase())
                      }
                    </h1>
                  </div>

                  <div className="flex items-center gap-3">
                    <button className="px-3 py-2 rounded-full border text-sm">Help</button>
                    <button className="px-4 py-2 rounded-full bg-indigo-600 text-white text-sm">New</button>
                  </div>
                </div>

                {/* injected admin page content */}
                <div>{children}</div>
              </div>
            </main>
          </div>
        </div>

        <footer className="max-w-7xl mx-auto px-4 md:px-6 mt-8 pb-12 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} Epicore. All rights reserved.
        </footer>
      </div>
  );
}

