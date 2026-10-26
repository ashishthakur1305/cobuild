"use client";

import { useState } from "react";
import Link from "next/link";

export default function MyPostsPage() {
  const [tab, setTab] = useState<"posts" | "apps">("posts");

  return (
    <div className="w-full max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-extrabold text-2xl text-primary">My Tracked Posts & Applications</h1>
          <p className="text-xs text-on-surface-variant mt-0.5">Manage your active startup requirements and review applicant proposals.</p>
        </div>
        <Link href="/create" className="px-4 py-2 rounded-xl bg-primary text-on-primary text-xs font-bold flex items-center gap-1.5 shadow-xs">
          <span className="material-symbols-outlined text-[18px]">add</span>
          <span>Post New Requirement</span>
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-4 border-b border-surface-container-high text-xs">
        <button
          onClick={() => setTab("posts")}
          className={`pb-3 font-bold transition-all ${tab === "posts" ? "border-b-2 border-primary text-primary" : "text-on-surface-variant hover:text-on-surface"}`}
        >
          My Posted Requirements (1)
        </button>
        <button
          onClick={() => setTab("apps")}
          className={`pb-3 font-bold transition-all ${tab === "apps" ? "border-b-2 border-primary text-primary" : "text-on-surface-variant hover:text-on-surface"}`}
        >
          My Applications as Builder (1)
        </button>
      </div>

      {/* Content */}
      {tab === "posts" ? (
        <div className="space-y-4">
          <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-card border border-surface-container-high/60 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed text-[10px] font-bold">Active in Market</span>
                  <span className="text-xs text-on-surface-variant">Posted 3 days ago</span>
                </div>
                <h3 className="font-heading font-bold text-base text-primary mt-1">Lead Full-Stack Engineer for Multi-Tenant Collaboration Platform</h3>
              </div>
              <div className="flex items-center gap-2">
                <Link href="/workspace" className="px-3 py-1.5 rounded-lg bg-surface-container text-primary text-xs font-bold hover:bg-surface-container-high">Workspace</Link>
                <Link href="/messages" className="px-3 py-1.5 rounded-lg bg-primary text-on-primary text-xs font-bold">Open Chat</Link>
              </div>
            </div>

            <div className="p-4 bg-surface-container-low rounded-xl border border-surface-container-high/60 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Incoming Builder Proposals (1)</span>
              
              <div className="flex items-center justify-between gap-3 p-3 bg-surface-container-lowest rounded-xl border border-surface-container-high/60">
                <div className="flex items-center gap-3">
                  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80" className="w-9 h-9 rounded-full object-cover"/>
                  <div>
                    <span className="font-bold text-xs text-on-surface">Alex Rivera</span>
                    <span className="text-[11px] text-secondary font-medium ml-1">✓ Portfolio & Identity Checked</span>
                    <p className="text-xs text-on-surface-variant">Proposed: $7,000 direct wire upon M2 + 1.5% equity. Architecture draft attached.</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-secondary-container text-on-secondary-container text-[10px] font-bold">Accepted</span>
                  <Link href="/workspace" className="px-3 py-1 rounded-lg bg-primary text-on-primary text-xs font-bold">Open Workspace</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-card border border-surface-container-high/60 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="px-2 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed text-[10px] font-bold">Proposal Accepted</span>
                <h3 className="font-heading font-bold text-base text-primary mt-1">Senior Backend Engineer for Early-Stage Real Estate B2B SaaS MVP</h3>
                <span className="text-xs text-on-surface-variant">Founder: Elena Vance • Kestrel Flow</span>
              </div>
              <Link href="/workspace" className="px-4 py-2 rounded-xl bg-primary text-on-primary text-xs font-bold">
                Go to Collaboration Workspace
              </Link>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
