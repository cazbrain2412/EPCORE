// src/app/layout.tsx
import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Epicore — Cloud ERP & Business Solutions",
  description:
    "Epicore: Premium Cloud ERP, AI voice agents, HRMS, Inventory & Finance solutions.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 antialiased">

        {/* ----------------- HEYGEN-STYLE PREMIUM MEGA MENU HEADER ----------------- */}
        <header className="sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4">
            {/* Outer gradient border (tiny padding) */}
            <div className="rounded-2xl p-0.5 bg-gradient-to-r from-pink-300 via-indigo-300 to-cyan-200">
              {/* Inner white nav container */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm mt-4 mb-4">
                <div className="flex items-center justify-between h-16 px-5">

                  {/* LOGO */}
                  <div className="flex items-center gap-6">
                    <Link
                      href="/"
                      className="text-lg font-semibold tracking-tight flex items-center gap-1"
                    >
                      Epicore
                    </Link>
                  </div>

                  {/* -------------------- DESKTOP NAVIGATION -------------------- */}
                  <nav className="hidden lg:flex items-center gap-6 text-sm text-gray-700">

                    {/* SERVICES MEGA MENU */}
                    <div className="relative group">
                      <button className="px-3 py-2 rounded-md hover:bg-gray-50 transition">
                        Services
                      </button>

                      {/* Mega panel - animated (opacity + translate) */}
                      <div className="absolute left-0 top-full mt-3 hidden group-hover:block w-[900px] rounded-xl border border-gray-100 bg-white shadow-2xl p-6
                                      opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 ease-out">
                        <div className="grid grid-cols-4 gap-6">

                          {/* PRODUCTS */}
                          <div>
                            <div className="text-xs font-semibold text-gray-400 uppercase mb-3">
                              Products
                            </div>
                            <ul className="space-y-2">
                              <li>
                                <Link href="/services/cloud-erp" className="block py-1 hover:text-black">
                                  Cloud ERP Suite
                                </Link>
                              </li>
                              <li>
                                <Link href="/services/financial-accounting" className="block py-1 hover:text-black">
                                  Financial ERP
                                </Link>
                              </li>
                              <li>
                                <Link href="/services/inventory" className="block py-1 hover:text-black">
                                  Inventory Management
                                </Link>
                              </li>
                              <li>
                                <Link href="/services/manufacturing" className="block py-1 hover:text-black">
                                  Manufacturing ERP
                                </Link>
                              </li>
                              <li>
                                <Link href="/services/hrms" className="block py-1 hover:text-black">
                                  HR & Payroll
                                </Link>
                              </li>
                            </ul>
                          </div>

                          {/* FEATURES */}
                          <div>
                            <div className="text-xs font-semibold text-gray-400 uppercase mb-3">
                              Features
                            </div>
                            <ul className="space-y-2">
                              <li>
                                <Link href="/features/ai-voice" className="block py-1 hover:text-black">
                                  AI Voice Agents
                                </Link>
                              </li>
                              <li>
                                <Link href="/features/no-code" className="block py-1 hover:text-black">
                                  No-Code Customization
                                </Link>
                              </li>
                              <li>
                                <Link href="/features/integrations" className="block py-1 hover:text-black">
                                  Integrations & APIs
                                </Link>
                              </li>
                              <li>
                                <Link href="/features/reports" className="block py-1 hover:text-black">
                                  Realtime Analytics
                                </Link>
                              </li>
                            </ul>
                          </div>

                          {/* INDUSTRIES */}
                          <div>
                            <div className="text-xs font-semibold text-gray-400 uppercase mb-3">
                              Industries
                            </div>
                            <ul className="space-y-3 text-sm">
                              <li>
                                <Link href="/industries/manufacturing" className="block py-1 hover:text-black">
                                  Manufacturing
                                </Link>
                                <div className="pl-3 text-gray-500 text-xs">Production, IoT, OEE</div>
                              </li>
                              <li>
                                <Link href="/industries/healthcare" className="block py-1 hover:text-black">
                                  Healthcare & Pharma
                                </Link>
                                <div className="pl-3 text-gray-500 text-xs">Compliance, EMR</div>
                              </li>
                              <li>
                                <Link href="/industries/retail" className="block py-1 hover:text-black">
                                  Retail & POS
                                </Link>
                                <div className="pl-3 text-gray-500 text-xs">Omnichannel, Multistore</div>
                              </li>
                              <li>
                                <Link href="/industries/logistics" className="block py-1 hover:text-black">
                                  Logistics
                                </Link>
                                <div className="pl-3 text-gray-500 text-xs">Fleet, WMS</div>
                              </li>
                            </ul>
                          </div>

                          {/* RESOURCES */}
                          <div>
                            <div className="text-xs font-semibold text-gray-400 uppercase mb-3">
                              Resources
                            </div>
                            <ul className="space-y-2">
                              <li>
                                <Link href="/blogs" className="block py-1 hover:text-black">Blogs</Link>
                              </li>
                              <li>
                                <Link href="/case-studies" className="block py-1 hover:text-black">Case Studies</Link>
                              </li>
                              <li>
                                <Link href="/faq" className="block py-1 hover:text-black">FAQ</Link>
                              </li>
                              <li>
                                <Link href="/pricing" className="block py-1 hover:text-black">Pricing</Link>
                              </li>
                            </ul>
                          </div>
                        </div>

                        {/* Bottom row inside dropdown */}
                        <div className="mt-6 border-t pt-4 flex items-center justify-between">
                          <div className="text-sm text-gray-600">Need guidance? Our experts can help.</div>
                          <div className="flex gap-3">
                            <Link href="/contact" className="px-4 py-2 rounded-lg border text-sm hover:bg-gray-50">Contact Sales</Link>
                            <Link href="/demo" className="px-4 py-2 rounded-lg bg-black text-white text-sm">Book Demo</Link>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* SIMPLE LINKS */}
                    <Link href="/blogs" className="px-3 py-2 rounded-md hover:bg-gray-50">Blogs</Link>
                    <Link href="/case-studies" className="px-3 py-2 rounded-md hover:bg-gray-50">Case Studies</Link>
                    <Link href="/pricing" className="px-3 py-2 rounded-md hover:bg-gray-50">Pricing</Link>
                  </nav>

                  {/* --------------------- RIGHT SIDE (ADMIN + MOBILE MENU) --------------------- */}
                  <div className="flex items-center gap-3">

                    {/* MOBILE MENU */}
                    <div className="lg:hidden">
                      <details className="relative">
                        <summary className="list-none px-3 py-2 rounded-md hover:bg-gray-50 cursor-pointer">Menu</summary>
                        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border p-4 z-50">
                          <nav className="flex flex-col gap-2 text-sm">
                            <Link href="/services/cloud-erp" className="py-2 px-2 rounded hover:bg-gray-50">Cloud ERP</Link>
                            <Link href="/services/financial-accounting" className="py-2 px-2 rounded hover:bg-gray-50">Financial ERP</Link>
                            <Link href="/industries/manufacturing" className="py-2 px-2 rounded hover:bg-gray-50">Manufacturing</Link>
                            <Link href="/blogs" className="py-2 px-2 rounded hover:bg-gray-50">Blogs</Link>
                            <Link href="/contact" className="py-2 px-2 rounded hover:bg-gray-50">Contact</Link>
                          </nav>
                        </div>
                      </details>
                    </div>

                    {/* ADMIN */}
                    <Link href="/admin/login" className="px-3 py-2 rounded-full border text-sm hover:bg-gray-50">
                      Admin
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
        {/* ----------------- END HEADER ----------------- */}

        {/* MAIN CONTENT */}
        <main className="max-w-6xl mx-auto px-6 py-8">{children}</main>

        {/* ----------------- FOOTER ----------------- */}
        <footer className="max-w-6xl mx-auto px-6 py-12 text-gray-500 text-sm border-t border-gray-200">
          <div className="flex flex-col md:flex-row md:justify-between gap-6">

            <div>
              <div className="text-base font-semibold">Epicore</div>
              <div className="mt-2 max-w-md">
                Premium Cloud ERP, AI Automation, HRMS, Inventory and Finance solutions.
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <div className="font-semibold mb-2">Products</div>
                <ul className="space-y-1">
                  <li><Link href="/services/cloud-erp" className="hover:underline">Cloud ERP</Link></li>
                  <li><Link href="/services/inventory" className="hover:underline">Inventory</Link></li>
                  <li><Link href="/services/hrms" className="hover:underline">HRMS</Link></li>
                </ul>
              </div>

              <div>
                <div className="font-semibold mb-2">Resources</div>
                <ul className="space-y-1">
                  <li><Link href="/blogs" className="hover:underline">Blogs</Link></li>
                  <li><Link href="/faq" className="hover:underline">FAQ</Link></li>
                  <li><Link href="/case-studies" className="hover:underline">Case Studies</Link></li>
                </ul>
              </div>

              <div>
                <div className="font-semibold mb-2">Company</div>
                <ul className="space-y-1">
                  <li><Link href="/about" className="hover:underline">About</Link></li>
                  <li><Link href="/careers" className="hover:underline">Careers</Link></li>
                  <li><Link href="/contact" className="hover:underline">Contact</Link></li>
                </ul>
              </div>

              <div>
                <div className="font-semibold mb-2">Legal</div>
                <ul className="space-y-1">
                  <li><Link href="/privacy" className="hover:underline">Privacy Policy</Link></li>
                  <li><Link href="/terms" className="hover:underline">Terms & Conditions</Link></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center text-xs text-gray-400">
            © {new Date().getFullYear()} Epicore. All rights reserved.
          </div>
        </footer>

      </body>
    </html>
  );
}

