"use client";

import Link from "next/link";

export default function TrustPage() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-8">
      
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-secondary">Trust Architecture & Platform Guarantees</span>
        <h1 className="font-heading font-extrabold text-3xl text-primary mt-1">Radical Transparency Policy</h1>
        <p className="text-xs text-on-surface-variant max-w-3xl mt-2 leading-relaxed">
          CoBuild deliberately rejects misleading tech hype. We provide clear, unambiguous boundaries on what our verification badges guarantee—and what they do not.
        </p>
      </div>

      {/* 3 Pillars Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Pillar 1: Identity Checked */}
        <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-card border border-surface-container-high/60 space-y-4">
          <div className="w-12 h-12 rounded-xl bg-secondary-container text-on-secondary-container flex items-center justify-center">
            <span className="material-symbols-outlined text-[28px]">verified_user</span>
          </div>
          <h3 className="font-heading font-bold text-base text-on-surface">1. Identity Checked</h3>
          
          <div className="space-y-3 text-xs leading-relaxed">
            <div className="p-3 bg-secondary-container/20 rounded-xl">
              <span className="font-bold text-secondary uppercase tracking-wider text-[10px] block mb-1">What It Means:</span>
              <p className="text-on-surface">Validated biometric liveness check and official government-issued photo ID matching the legal full name on file.</p>
            </div>
            <div className="p-3 bg-surface-container-low rounded-xl">
              <span className="font-bold text-outline uppercase tracking-wider text-[10px] block mb-1">What It Does NOT Mean:</span>
              <p className="text-on-surface-variant">Does not imply credit solvency, commercial reliability, or CoBuild warranty on work outputs.</p>
            </div>
          </div>
        </div>

        {/* Pillar 2: Company Checked */}
        <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-card border border-surface-container-high/60 space-y-4">
          <div className="w-12 h-12 rounded-xl bg-primary-fixed text-on-primary-fixed flex items-center justify-center">
            <span className="material-symbols-outlined text-[28px]">domain_verification</span>
          </div>
          <h3 className="font-heading font-bold text-base text-on-surface">2. Company Checked</h3>
          
          <div className="space-y-3 text-xs leading-relaxed">
            <div className="p-3 bg-primary-fixed/40 rounded-xl">
              <span className="font-bold text-primary uppercase tracking-wider text-[10px] block mb-1">What It Means:</span>
              <p className="text-on-surface">Active state registrar record (e.g. Delaware C-Corp) and EIN registry verified in good standing.</p>
            </div>
            <div className="p-3 bg-surface-container-low rounded-xl">
              <span className="font-bold text-outline uppercase tracking-wider text-[10px] block mb-1">What It Does NOT Mean:</span>
              <p className="text-on-surface-variant">Does not mean venture funding guarantees, payroll security, or future capitalization validity.</p>
            </div>
          </div>
        </div>

        {/* Pillar 3: Portfolio Checked */}
        <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-card border border-surface-container-high/60 space-y-4">
          <div className="w-12 h-12 rounded-xl bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center">
            <span className="material-symbols-outlined text-[28px]">folder_shared</span>
          </div>
          <h3 className="font-heading font-bold text-base text-on-surface">3. Portfolio Checked</h3>
          
          <div className="space-y-3 text-xs leading-relaxed">
            <div className="p-3 bg-tertiary-fixed/40 rounded-xl">
              <span className="font-bold text-tertiary uppercase tracking-wider text-[10px] block mb-1">What It Means:</span>
              <p className="text-on-surface">Cryptographically verified GitHub commits, live production domain links, or validated prior sprint completion.</p>
            </div>
            <div className="p-3 bg-surface-container-low rounded-xl">
              <span className="font-bold text-outline uppercase tracking-wider text-[10px] block mb-1">What It Does NOT Mean:</span>
              <p className="text-on-surface-variant">Does not mean code security audit clearance, zero-bug warranty, or platform insurance coverage.</p>
            </div>
          </div>
        </div>

      </div>

      {/* Statutory Disclaimer Card */}
      <div className="p-6 rounded-2xl bg-surface-container-high border-2 border-primary/20 space-y-3">
        <div className="flex items-center gap-2 text-primary font-bold text-sm">
          <span className="material-symbols-outlined text-[20px]">shield</span>
          <span>Statutory CoBuild Platform Boundaries</span>
        </div>
        <p className="text-xs text-on-surface leading-relaxed">
          CoBuild operates strictly as a connection and collaboration tracking service. CoBuild is <strong>never</strong> a custodian of funds, escrow holder, securities broker, equity registry, or legal counsel. All compensation arrangements, stock options, and intellectual property assignments must be negotiated and executed by the respective parties via independent counsel.
        </p>
      </div>

    </div>
  );
}
