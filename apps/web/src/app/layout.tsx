import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "CoBuild - High-Trust Global Startup Collaboration Marketplace",
  description: "Connect founders and skilled builders with tracked collaborations, private negotiation, and mutual written terms. CoBuild is a connection service only.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-surface text-on-surface">
        
        {/* STATUTORY PLATFORM LEGAL GUARDRAIL STRIP */}
        <aside className="bg-surface-container-high px-4 lg:px-8 py-1.5 border-b border-surface-container-highest text-xs text-on-surface-variant z-50">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1">
            <div className="flex items-center gap-1.5 text-center sm:text-left">
              <span className="material-symbols-outlined text-[16px] text-secondary">verified_user</span>
              <span><strong>CoBuild is a connection service only.</strong> Contracts & payments are agreed directly between parties. CoBuild never brokers securities, holds escrow, or guarantees equity.</span>
            </div>
            <div className="hidden md:flex items-center gap-4 shrink-0 font-medium">
              <span className="text-secondary flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> Dual-Verified Network
              </span>
              <span className="h-3 w-px bg-outline-variant"></span>
              <Link href="/trust" className="hover:text-primary transition-colors flex items-center gap-0.5">
                <span>Platform Guarantees & Safety</span>
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </Link>
            </div>
          </div>
        </aside>

        {/* MAIN NAVIGATION HEADER */}
        <header className="sticky top-0 w-full z-40 glass-header border-b border-surface-container-highest/60 shadow-xs">
          <div className="max-w-7xl mx-auto px-4 lg:px-8 h-16 flex items-center justify-between gap-4">
            
            {/* Logo */}
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center gap-2.5 group">
                <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-on-primary shadow-xs group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-[22px]">hub</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-heading font-extrabold text-lg tracking-tight text-primary leading-none">CoBuild</span>
                  <span className="text-[9px] font-bold tracking-wider uppercase text-on-surface-variant mt-0.5">Tracked Collaborations</span>
                </div>
              </Link>

              {/* Navigation Links */}
              <nav className="hidden xl:flex items-center gap-1 p-1 bg-surface-container-low rounded-xl border border-surface-container-highest/40 text-xs font-semibold">
                <Link href="/" className="px-3 py-1.5 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all">
                  Feed & Discover
                </Link>
                <Link href="/my-posts" className="px-3 py-1.5 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all">
                  My Posts & Apps
                </Link>
                <Link href="/workspace" className="px-3 py-1.5 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all flex items-center gap-1.5">
                  <span>Workspace</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                </Link>
                <Link href="/messages" className="px-3 py-1.5 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all flex items-center gap-1">
                  <span>Messages</span>
                  <span className="bg-primary text-on-primary text-[10px] px-1.5 py-0.2 rounded-full font-bold">1</span>
                </Link>
                <Link href="/trust" className="px-3 py-1.5 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all">
                  Trust & Safety
                </Link>
                <Link href="/admin" className="px-3 py-1.5 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all">
                  Admin Console
                </Link>
              </nav>
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-3">
              {/* Post Requirement CTA */}
              <Link href="/create" className="hidden sm:inline-flex items-center gap-1 px-3.5 py-2 rounded-xl bg-primary text-on-primary hover:bg-primary-container text-xs font-semibold shadow-xs transition-all">
                <span className="material-symbols-outlined text-[16px]">add</span>
                <span>Post Requirement</span>
              </Link>

              {/* Notifications */}
              <button className="relative p-2 rounded-full text-on-surface-variant hover:bg-surface-container-low transition-colors" title="Notifications">
                <span className="material-symbols-outlined text-[20px]">notifications</span>
                <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-tertiary text-on-tertiary rounded-full text-[9px] font-bold flex items-center justify-center">2</span>
              </button>

              {/* User Avatar */}
              <div className="flex items-center gap-2 pl-1 border-l border-surface-container-highest">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80" alt="Alex Rivera" className="w-8 h-8 rounded-full object-cover ring-1 ring-surface-container-highest"/>
                <div className="hidden md:flex flex-col text-left">
                  <span className="text-xs font-bold text-on-surface leading-tight">Alex Rivera</span>
                  <span className="text-[10px] text-secondary font-semibold">Dual-Verified Builder</span>
                </div>
              </div>
            </div>

          </div>
        </header>

        {/* PAGE CONTENT */}
        <div className="flex-1">
          {children}
        </div>

        {/* FOOTER */}
        <footer className="border-t border-surface-container-high bg-surface-container-low/60 py-8 px-4 lg:px-8 text-xs text-on-surface-variant mt-16">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="font-heading font-extrabold text-sm text-primary">CoBuild</span>
              <span>&copy; {new Date().getFullYear()} CoBuild Network. Connection platform only.</span>
            </div>
            <div className="flex items-center gap-4 text-xs font-medium">
              <Link href="/trust" className="hover:text-primary transition-colors">Radical Transparency Policy</Link>
              <Link href="/trust" className="hover:text-primary transition-colors">Safety Guidelines</Link>
              <Link href="/admin" className="hover:text-primary transition-colors">Audited Moderation</Link>
            </div>
          </div>
        </footer>

      </body>
    </html>
  );
}
