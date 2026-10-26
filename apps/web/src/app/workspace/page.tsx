"use client";

import { useState } from "react";
import Link from "next/link";

export default function WorkspacePage() {
  const [signedTerm2, setSignedTerm2] = useState(false);
  const [signedTerm3, setSignedTerm3] = useState(false);
  const [collabActive, setCollabActive] = useState(false);
  const [m2Approved, setM2Approved] = useState(false);

  const allConfirmed = signedTerm2 && signedTerm3;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-6">
      
      {/* Binding Contract Advisory Banner */}
      <div className="rounded-2xl bg-tertiary-container/10 border border-tertiary-container/30 p-4 shadow-xs">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-tertiary text-on-tertiary shrink-0 mt-0.5">
            <span className="material-symbols-outlined text-[20px]">gavel</span>
          </div>
          <div className="flex-1 flex flex-col md:flex-row md:items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-xs text-tertiary uppercase tracking-wider">Binding Contract Advisory</span>
                <span className="px-2 py-0.5 rounded text-[10px] bg-tertiary text-on-tertiary font-bold uppercase">Strict Platform Rule</span>
              </div>
              <p className="text-xs text-on-surface-variant mt-0.5">
                Chat alone is <strong>not a complete contract</strong>. CoBuild provides structured mutual checklists but does not adjudicate bank wires, cap tables, or IP assignments. Confirm all 5 written terms below to unlock active execution status.
              </p>
            </div>
            <Link href="/trust" className="shrink-0 text-xs font-bold text-primary hover:underline flex items-center gap-1">
              <span>Platform Guarantees & Safety</span>
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Collaboration Header Card */}
      <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-card border border-surface-container-high/60 space-y-6">
        <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-6">
          
          {/* Left: Project Details & Members */}
          <div className="flex-1 min-w-0 space-y-3">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-mono font-medium">ID: CB-9824-CORE</span>
              <span className={`px-2.5 py-0.5 rounded-full font-semibold flex items-center gap-1 ${collabActive ? "bg-secondary-fixed text-on-secondary-fixed" : "bg-tertiary-fixed text-on-tertiary-fixed"}`}>
                <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></span>
                <span>{collabActive ? "Stage 2: Active Collaboration" : `Stage 1: Pending Setup (${allConfirmed ? "5/5" : "3/5"} Terms Signed)`}</span>
              </span>
              <span className="text-on-surface-variant">Created Nov 18 • Target: Jan 20</span>
            </div>

            <h1 className="font-heading font-extrabold text-2xl text-primary tracking-tight">
              B2B FinTech MVP - Backend Core & Authentication
            </h1>

            {/* Participants Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low border border-surface-container-high/60">
                <div className="flex items-center gap-3">
                  <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&h=120&q=80" alt="Elena Vance" className="w-10 h-10 rounded-full object-cover ring-2 ring-secondary"/>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-on-surface">Elena Vance</span>
                      <span className="px-1.5 py-0.2 rounded bg-primary-fixed text-on-primary-fixed text-[10px] font-bold">Founder</span>
                    </div>
                    <span className="text-[11px] text-secondary font-medium flex items-center gap-0.5">
                      <span className="material-symbols-outlined text-[12px]">verified</span> Identity & Company Checked
                    </span>
                  </div>
                </div>
                <Link href="/messages" className="p-2 text-on-surface-variant hover:text-primary rounded-lg hover:bg-surface-container-lowest" title="Open Chat with Elena">
                  <span className="material-symbols-outlined text-[20px]">chat</span>
                </Link>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low border border-surface-container-high/60">
                <div className="flex items-center gap-3">
                  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80" alt="Alex Rivera" className="w-10 h-10 rounded-full object-cover ring-2 ring-secondary"/>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-on-surface">Alex Rivera (You)</span>
                      <span className="px-1.5 py-0.2 rounded bg-secondary-fixed text-on-secondary-fixed text-[10px] font-bold">Builder</span>
                    </div>
                    <span className="text-[11px] text-secondary font-medium flex items-center gap-0.5">
                      <span className="material-symbols-outlined text-[12px]">verified</span> Portfolio & Identity Checked
                    </span>
                  </div>
                </div>
                <Link href="/trust" className="p-2 text-on-surface-variant hover:text-primary rounded-lg hover:bg-surface-container-lowest" title="View Trust Dossier">
                  <span className="material-symbols-outlined text-[20px]">badge</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Right: State Stepper */}
          <div className="w-full xl:w-96 p-4 rounded-xl bg-surface-container-low border border-surface-container-high/60 flex flex-col justify-between gap-4">
            <div>
              <div className="flex items-center justify-between mb-3 text-xs">
                <span className="font-bold uppercase tracking-wider text-on-surface-variant">Collaboration State</span>
                <span className="font-bold text-primary">{collabActive ? "Stage 2 of 3" : "Stage 1 of 3"}</span>
              </div>

              <div className="flex items-center justify-between relative px-2 mb-2">
                <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-1 bg-surface-container-highest rounded-full -z-0"></div>
                <div className={`absolute left-6 top-1/2 -translate-y-1/2 h-1 bg-primary rounded-full -z-0 transition-all ${collabActive ? "w-1/2" : "w-1/4"}`}></div>

                <div className="flex flex-col items-center gap-1 relative z-10">
                  <div className="w-7 h-7 rounded-full bg-primary text-on-primary text-xs font-bold flex items-center justify-center shadow-xs">1</div>
                  <span className="text-[10px] font-bold text-primary">Setup</span>
                </div>
                <div className="flex flex-col items-center gap-1 relative z-10">
                  <div className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center ${collabActive ? "bg-primary text-on-primary shadow-xs" : "bg-surface-container-highest text-on-surface-variant"}`}>2</div>
                  <span className={`text-[10px] ${collabActive ? "font-bold text-primary" : "font-medium text-on-surface-variant"}`}>Active</span>
                </div>
                <div className="flex flex-col items-center gap-1 relative z-10">
                  <div className="w-7 h-7 rounded-full bg-surface-container-highest text-on-surface-variant text-xs font-bold flex items-center justify-center">3</div>
                  <span className="text-[10px] font-medium text-on-surface-variant">Done</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-surface-container-high text-xs">
              <button onClick={() => alert("Collaboration paused. Note registered on audit trail.")} className="flex-1 py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container font-semibold flex items-center justify-center gap-1">
                <span className="material-symbols-outlined text-[16px]">pause</span> Pause
              </button>
              <button onClick={() => alert("Dispute notice registered. Under Review status triggered.")} className="flex-1 py-1.5 rounded-lg text-error hover:bg-error-container/30 font-semibold flex items-center justify-center gap-1">
                <span className="material-symbols-outlined text-[16px]">flag</span> Dispute / Flag
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Main Track: 5-Clause Written Terms Agreement */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        
        <div className="xl:col-span-8 space-y-6">
          <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-card border border-surface-container-high/60 space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-surface-container-high">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-heading font-extrabold text-lg text-on-surface">Mutual Written-Terms Agreement</h2>
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-tertiary-fixed text-on-tertiary-fixed">
                    {allConfirmed ? "All Confirmed" : "Action Required"}
                  </span>
                </div>
                <p className="text-xs text-on-surface-variant mt-0.5">Every clause requires unilateral confirmation from both Founder and Builder before code commits begin.</p>
              </div>

              <div className="flex items-center gap-3 bg-surface-container-low px-4 py-2 rounded-xl">
                <span className="font-heading font-extrabold text-lg text-primary">{allConfirmed ? "100%" : "60%"}</span>
                <span className="text-xs text-on-surface-variant">Mutual Confirmation</span>
              </div>
            </div>

            {/* 5 Clauses */}
            <div className="space-y-4 text-xs">
              
              {/* Clause 1 */}
              <div className="p-4 rounded-xl bg-surface-container-low border border-surface-container-high/60 space-y-2">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-secondary text-on-secondary text-xs flex items-center justify-center font-bold shrink-0 mt-0.5">
                      <span className="material-symbols-outlined text-[14px]">check</span>
                    </span>
                    <div>
                      <span className="font-bold text-on-surface">1. Scope & Acceptance Criteria</span>
                      <p className="text-on-surface-variant mt-0.5">Postgres schema with RLS, Supabase auth endpoints, and Stripe metered billing webhooks.</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed text-[11px] font-semibold flex items-center gap-1 shrink-0">
                    <span className="material-symbols-outlined text-[14px]">done_all</span> Both Confirmed
                  </span>
                </div>
              </div>

              {/* Clause 2: Compensation */}
              <div className={`p-4 rounded-xl border space-y-3 transition-colors ${signedTerm2 ? "bg-surface-container-low border-surface-container-high/60" : "bg-tertiary-container/10 border-tertiary-container/40"}`}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2.5">
                    <span className={`w-6 h-6 rounded-full text-xs flex items-center justify-center font-bold shrink-0 mt-0.5 ${signedTerm2 ? "bg-secondary text-on-secondary" : "bg-tertiary text-on-tertiary"}`}>
                      <span className="material-symbols-outlined text-[14px]">{signedTerm2 ? "check" : "pending"}</span>
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-on-surface">2. Agreed Private Compensation</span>
                        {!signedTerm2 && <span className="px-1.5 py-0.2 rounded bg-tertiary text-on-tertiary text-[10px] font-bold">Action Required</span>}
                      </div>
                      <p className="text-on-surface-variant mt-1">
                        <strong>$7,000 USD</strong> direct wire upon Milestone 2 approval + <strong>1.5% Advisor Equity</strong> (subject to executed Carta grant).
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1 text-[11px]">
                    <span className="text-secondary font-medium">Founder: Confirmed ✓</span>
                    <span className={signedTerm2 ? "text-secondary font-medium" : "font-bold text-tertiary"}>
                      Builder: {signedTerm2 ? "Confirmed ✓" : "Pending"}
                    </span>
                  </div>
                </div>

                {!signedTerm2 && (
                  <div className="p-2.5 bg-surface-container-lowest rounded-lg border border-surface-container-high/60 flex items-center justify-between gap-3">
                    <span className="text-[11px]">Parties acknowledge CoBuild is purely an introducer and never holds custodial escrow or guarantees share issuance.</span>
                    <button type="button" onClick={() => setSignedTerm2(true)} className="px-4 py-1.5 rounded-lg bg-primary hover:bg-primary-container text-on-primary text-xs font-bold transition-all shrink-0">
                      Sign & Confirm Term #2
                    </button>
                  </div>
                )}
              </div>

              {/* Clause 3: IP Ownership */}
              <div className={`p-4 rounded-xl border space-y-3 transition-colors ${signedTerm3 ? "bg-surface-container-low border-surface-container-high/60" : "bg-tertiary-container/10 border-tertiary-container/40"}`}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2.5">
                    <span className={`w-6 h-6 rounded-full text-xs flex items-center justify-center font-bold shrink-0 mt-0.5 ${signedTerm3 ? "bg-secondary text-on-secondary" : "bg-tertiary text-on-tertiary"}`}>
                      <span className="material-symbols-outlined text-[14px]">{signedTerm3 ? "check" : "pending"}</span>
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-on-surface">3. IP Ownership & Work-for-Hire Clause</span>
                        {!signedTerm3 && <span className="px-1.5 py-0.2 rounded bg-tertiary text-on-tertiary text-[10px] font-bold">Action Required</span>}
                      </div>
                      <p className="text-on-surface-variant mt-1">
                        All software commits, architectural designs, and schemas transfer exclusively to Founder upon clearance of agreed fees.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1 text-[11px]">
                    <span className="text-secondary font-medium">Founder: Confirmed ✓</span>
                    <span className={signedTerm3 ? "text-secondary font-medium" : "font-bold text-tertiary"}>
                      Builder: {signedTerm3 ? "Confirmed ✓" : "Pending"}
                    </span>
                  </div>
                </div>

                {!signedTerm3 && (
                  <div className="p-2.5 bg-surface-container-lowest rounded-lg border border-surface-container-high/60 flex items-center justify-between gap-3">
                    <span className="text-[11px]">Includes standard personal open-source tool retention carve-outs.</span>
                    <button type="button" onClick={() => setSignedTerm3(true)} className="px-4 py-1.5 rounded-lg bg-primary hover:bg-primary-container text-on-primary text-xs font-bold transition-all shrink-0">
                      Sign & Confirm Term #3
                    </button>
                  </div>
                )}
              </div>

              {/* Clause 4 */}
              <div className="p-4 rounded-xl bg-surface-container-low border border-surface-container-high/60 space-y-2">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-secondary text-on-secondary text-xs flex items-center justify-center font-bold shrink-0 mt-0.5">
                      <span className="material-symbols-outlined text-[14px]">check</span>
                    </span>
                    <div>
                      <span className="font-bold text-on-surface">4. Mutual Non-Disclosure Agreement (NDA)</span>
                      <p className="text-on-surface-variant mt-0.5">Covers confidential business algorithms, client pipeline data, and unreleased product roadmaps.</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed text-[11px] font-semibold flex items-center gap-1 shrink-0">
                    <span className="material-symbols-outlined text-[14px]">done_all</span> Both Confirmed
                  </span>
                </div>
              </div>

              {/* Clause 5 */}
              <div className="p-4 rounded-xl bg-surface-container-low border border-surface-container-high/60 space-y-2">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-secondary text-on-secondary text-xs flex items-center justify-center font-bold shrink-0 mt-0.5">
                      <span className="material-symbols-outlined text-[14px]">check</span>
                    </span>
                    <div>
                      <span className="font-bold text-on-surface">5. Governing Law & Jurisdiction</span>
                      <p className="text-on-surface-variant mt-0.5">Commercial governance under State of Delaware Chancery with mandatory 30-day pre-litigation conciliation.</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed text-[11px] font-semibold flex items-center gap-1 shrink-0">
                    <span className="material-symbols-outlined text-[14px]">done_all</span> Both Confirmed
                  </span>
                </div>
              </div>

            </div>

            {/* STAGE GATE ACTION BAR */}
            <div className="p-4 rounded-xl bg-surface-container border border-surface-container-high flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-[24px]">{collabActive ? "lock_open" : "lock"}</span>
                <div>
                  <span className="font-bold text-xs text-on-surface">Stage Gate: Lock Active Collaboration Status</span>
                  <p className="text-xs text-on-surface-variant">Both parties must confirm all 5 written-terms items to unlock Active status and milestone payouts.</p>
                </div>
              </div>
              <button
                type="button"
                disabled={!allConfirmed || collabActive}
                onClick={() => { setCollabActive(true); alert("Stage Gate unlocked! Collaboration is now ACTIVE. Milestones can be verified."); }}
                className={`px-6 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                  collabActive
                    ? "bg-secondary text-on-secondary shadow-xs cursor-default"
                    : allConfirmed
                    ? "bg-primary hover:bg-primary-container text-on-primary shadow-xs"
                    : "bg-surface-container-highest text-outline opacity-60 cursor-not-allowed"
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">verified</span>
                <span>{collabActive ? "Collaboration Active" : allConfirmed ? "Unlock Active Status" : "Mark as Active (Locked)"}</span>
              </button>
            </div>

          </div>
        </div>

        {/* Right Track: Milestones Tracker */}
        <div className="xl:col-span-4 space-y-6">
          <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-card border border-surface-container-high/60 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-bold text-sm text-on-surface">Tracked Milestones</h3>
              <span className="text-[11px] font-bold text-secondary">3 Sprints</span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-xl bg-surface-container-low border border-surface-container-high/60 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-primary">Milestone 1</span>
                  <span className="text-[11px] text-on-surface-variant">Due Dec 05</span>
                </div>
                <p className="font-semibold text-on-surface">PostgreSQL Schema & RLS Policies</p>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] text-secondary font-medium flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">check_circle</span> Verified & Tested
                  </span>
                  <span className="px-2 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed text-[10px] font-bold">Approved</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-surface-container-low border border-surface-container-high/60 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-primary">Milestone 2</span>
                  <span className="text-[11px] text-on-surface-variant">Due Dec 22</span>
                </div>
                <p className="font-semibold text-on-surface">JWT Authentication & RBAC Rules</p>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] text-tertiary font-medium">{m2Approved ? "Deliverable Accepted" : "Under active review"}</span>
                  <button
                    type="button"
                    onClick={() => { setM2Approved(true); alert("Milestone 2 approved! Elena notified of release."); }}
                    className={`px-2.5 py-1 rounded text-[10px] font-bold ${m2Approved ? "bg-secondary text-on-secondary cursor-default" : "bg-primary text-on-primary hover:bg-primary-container"}`}
                  >
                    {m2Approved ? "Approved ✓" : "Approve Deliverable"}
                  </button>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-surface-container-low border border-surface-container-high/60 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-primary">Milestone 3</span>
                  <span className="text-[11px] text-on-surface-variant">Due Jan 15</span>
                </div>
                <p className="font-semibold text-on-surface">Stripe Metered Billing Engine & Webhooks</p>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] text-outline">Queued</span>
                  <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant text-[10px] font-medium">Pending M2</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
