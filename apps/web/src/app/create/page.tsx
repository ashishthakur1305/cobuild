"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CreateRequirementPage() {
  const router = useRouter();
  const [title, setTitle] = useState("Senior Backend Engineer for Early-Stage Real Estate B2B SaaS MVP");
  const [category, setCategory] = useState("Engineering");
  const [summary, setSummary] = useState("We have secured letters of intent from 6 mid-market commercial property managers. The architecture demands a scalable multi-tenant Postgres database with row-level security and high-throughput real-time ingest pipelines.");
  const [deliverables, setDeliverables] = useState([
    "Production-grade RESTful API and multi-tenant PostgreSQL schema with Supabase Auth",
    "Stripe webhook handling for subscription tier upgrades, prorated billing, and dunning",
    "Containerized Docker deployment configuration with CI/CD GitHub Actions pipeline on AWS ECS"
  ]);
  const [newDeliverable, setNewDeliverable] = useState("");
  const [skills, setSkills] = useState(["PostgreSQL", "Node.js", "Docker", "AWS ECS"]);
  const [skillInput, setSkillInput] = useState("");
  const [cashAmount, setCashAmount] = useState("$6,000 – $8,000 USD / mo");
  const [equity, setEquity] = useState("2.0");
  const [compType, setCompType] = useState("Both");

  const addDeliverable = () => {
    if (newDeliverable.trim()) {
      setDeliverables([...deliverables, newDeliverable.trim()]);
      setNewDeliverable("");
    }
  };

  const removeDeliverable = (idx: number) => {
    setDeliverables(deliverables.filter((_, i) => i !== idx));
  };

  const addSkill = (e: React.KeyboardEvent) => {
    if ((e.key === "Enter" || e.key === ",") && skillInput.trim()) {
      e.preventDefault();
      if (!skills.includes(skillInput.trim())) {
        setSkills([...skills, skillInput.trim()]);
      }
      setSkillInput("");
    }
  };

  const removeSkill = (s: string) => {
    setSkills(skills.filter(item => item !== s));
  };

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Requirement published to the marketplace successfully! Navigating to your feed.");
    router.push("/");
  };

  return (
    <div className="w-full">
      {/* Stepper Header Strip */}
      <div className="bg-surface-container-low border-b border-surface-container-highest/60 py-4 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-on-surface-variant">
              <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">arrow_back</span>
                Back to Feed
              </Link>
              <span>/</span>
              <span className="font-semibold text-primary">Founder Studio</span>
            </div>
            <h1 className="font-heading font-extrabold text-2xl text-primary mt-1">Structured Post Architect</h1>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary text-on-primary font-semibold shadow-xs">
              <span className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center text-[10px]">1</span>
              <span>Architecture & Scope</span>
            </div>
            <div className="w-4 h-0.5 bg-outline-variant"></div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container text-on-surface-variant font-medium">
              <span className="w-4 h-4 rounded-full bg-surface-container-highest flex items-center justify-center text-[10px]">2</span>
              <span>Terms & Compensation</span>
            </div>
          </div>
        </div>
      </div>

      {/* 60% Form / 40% Live Preview Split */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Form Column */}
          <form onSubmit={handlePublish} className="lg:col-span-7 space-y-6">
            
            {/* Section 1 */}
            <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-xs border border-surface-container-high/60 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold tracking-widest uppercase px-2 py-0.5 rounded bg-primary-fixed text-on-primary-fixed">Section 01</span>
                <span className="text-xs text-secondary font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> Live synchronizing
                </span>
              </div>
              <h2 className="font-heading font-bold text-base text-on-surface">Requirement Core</h2>

              <div className="space-y-1">
                <label className="text-xs font-bold text-on-surface">Requirement Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-surface-container-low border border-surface-container-high text-xs text-on-surface focus:outline-none focus:border-primary"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-on-surface">Category Classification *</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {["Engineering", "Design", "Product", "Marketing"].map((cat) => (
                    <button
                      type="button"
                      key={cat}
                      onClick={() => setCategory(cat)}
                      className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all ${
                        category === cat
                          ? "bg-primary text-on-primary shadow-xs"
                          : "bg-surface-container-low text-on-surface hover:bg-surface-container border border-surface-container-high/60"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-on-surface">Context & Business Obstacle *</label>
                <textarea
                  rows={3}
                  required
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-surface-container-low border border-surface-container-high text-xs text-on-surface focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            {/* Section 2 */}
            <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-xs border border-surface-container-high/60 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold tracking-widest uppercase px-2 py-0.5 rounded bg-primary-fixed text-on-primary-fixed">Section 02</span>
                <span className="text-xs text-on-surface-variant">{deliverables.length} Milestones Added</span>
              </div>
              <h2 className="font-heading font-bold text-base text-on-surface">Scope Acceptance Deliverables</h2>

              <div className="space-y-2">
                {deliverables.map((del, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-surface-container-low p-2.5 rounded-xl border border-surface-container-high/60 text-xs">
                    <span className="material-symbols-outlined text-secondary text-[18px]">check_box</span>
                    <span className="flex-1 text-on-surface">{del}</span>
                    <button type="button" onClick={() => removeDeliverable(idx)} className="text-outline hover:text-error p-1">
                      <span className="material-symbols-outlined text-[16px]">close</span>
                    </button>
                  </div>
                ))}

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="text"
                    placeholder="Add specific acceptance deliverable (e.g. Supabase Auth with RLS policies)..."
                    value={newDeliverable}
                    onChange={(e) => setNewDeliverable(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-xl bg-surface-container-low border border-surface-container-high text-xs focus:outline-none"
                  />
                  <button type="button" onClick={addDeliverable} className="px-3 py-2 rounded-xl bg-surface-container text-primary font-bold text-xs hover:bg-surface-container-high">
                    + Add
                  </button>
                </div>
              </div>
            </div>

            {/* Section 3 */}
            <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-card border border-surface-container-high/60 space-y-4">
              <span className="text-[10px] font-extrabold tracking-widest uppercase px-2 py-0.5 rounded bg-primary-fixed text-on-primary-fixed">Section 03</span>
              <h2 className="font-heading font-bold text-base text-on-surface">Skills & Commercial Offer</h2>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-on-surface">Required Skills (Press Enter or Comma)</label>
                <div className="p-2 bg-surface-container-low rounded-xl border border-surface-container-high/60 flex flex-wrap items-center gap-1.5">
                  {skills.map(s => (
                    <span key={s} className="px-2.5 py-1 rounded-lg bg-surface-container-highest text-primary text-xs font-semibold flex items-center gap-1">
                      {s} <button type="button" onClick={() => removeSkill(s)} className="text-outline hover:text-error"><span className="material-symbols-outlined text-[12px]">close</span></button>
                    </span>
                  ))}
                  <input
                    type="text"
                    placeholder="Type skill..."
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={addSkill}
                    className="bg-transparent text-xs text-on-surface focus:outline-none p-1 min-w-[100px]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-on-surface">Cash Allocation ($ USD / mo or project)</label>
                  <input
                    type="text"
                    value={cashAmount}
                    onChange={(e) => setCashAmount(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-surface-container-low border border-surface-container-high text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-on-surface">Equity Grant Range: {equity}%</label>
                  <input
                    type="range"
                    min="0.5"
                    max="10.0"
                    step="0.5"
                    value={equity}
                    onChange={(e) => setEquity(e.target.value)}
                    className="w-full accent-primary cursor-pointer mt-2"
                  />
                </div>
              </div>

              <div className="p-3 bg-tertiary-container/10 border border-tertiary-container/30 rounded-xl text-[11px] text-tertiary leading-relaxed">
                <strong>Statutory Advisory:</strong> Equity details listed are for discussion purposes only. CoBuild is a discovery platform and does not escrow funds or guarantee stock grants.
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <Link href="/" className="px-4 py-2 rounded-xl border border-surface-container-high text-xs font-bold text-on-surface hover:bg-surface-container">
                  Cancel
                </Link>
                <button type="submit" className="px-6 py-2 rounded-xl bg-primary text-on-primary text-xs font-bold hover:bg-primary-container shadow-xs">
                  Publish Requirement
                </button>
              </div>
            </div>

          </form>

          {/* Live Preview Column */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            
            <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-xs border border-surface-container-high/60 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-heading font-bold text-sm text-on-surface flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px] text-secondary">analytics</span>
                  Requirement Health
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-[10px] font-bold">88% Optimal</span>
              </div>

              <p className="text-xs text-on-surface-variant">
                Unambiguous technical deliverables and clear milestone definitions match 3.4x faster with top builders.
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Live Marketplace Card Preview</span>
              <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-xs border-2 border-primary/20 space-y-3">
                <div className="flex items-center gap-2.5">
                  <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&h=120&q=80" className="w-10 h-10 rounded-full object-cover ring-1 ring-surface-container-highest"/>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-xs text-on-surface">Elena Vance</span>
                      <span className="px-1.5 py-0.2 rounded bg-secondary-container text-on-secondary-container text-[10px] font-bold">Identity Checked</span>
                    </div>
                    <span className="text-[11px] text-on-surface-variant">Founder @ Kestrel Flow</span>
                  </div>
                </div>

                <h4 className="font-heading font-bold text-sm text-primary">{title}</h4>
                <p className="text-xs text-on-surface-variant line-clamp-2">{summary}</p>

                <div className="flex flex-wrap gap-1.5 text-xs">
                  <span className="px-2.5 py-0.5 rounded-full bg-secondary-fixed/50 text-on-secondary-fixed-variant text-[11px] font-semibold">{cashAmount}</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed text-[11px] font-semibold">+ {equity}% Equity</span>
                </div>

                <div className="flex flex-wrap gap-1 pt-1">
                  {skills.map(s => (
                    <span key={s} className="px-2 py-0.2 rounded bg-surface-container text-on-surface text-[10px]">{s}</span>
                  ))}
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
