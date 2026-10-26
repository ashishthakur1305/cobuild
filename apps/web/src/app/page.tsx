"use client";

import { useState } from "react";
import Link from "next/link";

interface Post {
  id: string;
  title: string;
  businessContext: string;
  companyName: string;
  ventureStage: string;
  founderName: string;
  founderAvatar: string;
  founderVerified: string[];
  category: string;
  skills: string[];
  cashAmount: string;
  equityRange: string;
  timeCommitment: string;
  workMode: string;
  postedAgo: string;
  applicantsCount: number;
  matchSignals: string[];
}

const INITIAL_POSTS: Post[] = [
  {
    id: "post-1",
    title: "Senior Backend Engineer for Early-Stage Real Estate B2B SaaS MVP",
    businessContext: "We have secured letters of intent from 6 mid-market commercial property managers. The architecture demands a scalable multi-tenant Postgres database with row-level security and high-throughput real-time ingest pipelines.",
    companyName: "Kestrel Flow",
    ventureStage: "Pre-seed",
    founderName: "Elena Vance",
    founderAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&h=120&q=80",
    founderVerified: ["Identity Checked", "Company Checked"],
    category: "Engineering",
    skills: ["PostgreSQL", "Node.js", "TypeScript", "Docker", "Stripe API"],
    cashAmount: "$6,000 – $8,000 USD / mo",
    equityRange: "+ 1.5% Equity",
    timeCommitment: "25 hrs/wk (Part-Time)",
    workMode: "Remote (Americas / EMEA)",
    postedAgo: "3h ago",
    applicantsCount: 6,
    matchSignals: ["4 of 5 required skills match", "Timezone overlap (+2 hrs EST)", "Compensation preference matches"]
  },
  {
    id: "post-2",
    title: "Lead Product Designer for Medical Workflow Automation Tablet App",
    businessContext: "Phase 1 clinical trial workflow software needs comprehensive patient consent and dosage audit screens with WCAG AA compliance.",
    companyName: "Arkea Health",
    ventureStage: "Seed",
    founderName: "Marcus Brody",
    founderAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80",
    founderVerified: ["Identity Checked"],
    category: "Design",
    skills: ["Figma", "Design Systems", "Tablet UI", "Accessibility (WCAG)"],
    cashAmount: "$5,500 – $7,000 USD / mo",
    equityRange: "+ 0.75% Equity",
    timeCommitment: "20 hrs/wk",
    workMode: "Remote",
    postedAgo: "6h ago",
    applicantsCount: 4,
    matchSignals: ["Design Systems match", "High verified founder score"]
  },
  {
    id: "post-3",
    title: "Distributed Systems Architect for High-Frequency Cross-Border Settlements",
    businessContext: "Building idempotent ledger reconciliation engine with sub-50ms latency guarantees across multi-region AWS infrastructure.",
    companyName: "LayerFlow",
    ventureStage: "Series A",
    founderName: "Siddharth Nair",
    founderAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80",
    founderVerified: ["Identity Checked", "Company Checked", "Portfolio Checked"],
    category: "Engineering",
    skills: ["Go / Golang", "PostgreSQL", "Redis", "Kafka", "AWS"],
    cashAmount: "$9,000 – $12,000 USD / mo",
    equityRange: "Negotiable",
    timeCommitment: "Milestone-based",
    workMode: "Remote",
    postedAgo: "1d ago",
    applicantsCount: 9,
    matchSignals: ["PostgreSQL & Redis in your profile", "Direct wire payout ready"]
  }
];

export default function FeedPage() {
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedComps, setSelectedComps] = useState<string[]>(["Both", "Cash", "Equity", "Negotiable"]);
  const [savedPostIds, setSavedPostIds] = useState<Set<string>>(new Set(["post-1"]));
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [activeApplyingPost, setActiveApplyingPost] = useState<Post | null>(null);

  const toggleSave = (id: string) => {
    setSavedPostIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const filteredPosts = posts.filter(post => {
    if (selectedCategory !== "all" && post.category !== selectedCategory) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const inTitle = post.title.toLowerCase().includes(q);
      const inSkills = post.skills.some(s => s.toLowerCase().includes(q));
      const inCompany = post.companyName.toLowerCase().includes(q);
      if (!inTitle && !inSkills && !inCompany) return false;
    }
    return true;
  });

  return (
    <div className="w-full">
      
      {/* Search & Command Header */}
      <div className="bg-surface-container-low border-b border-surface-container-highest/60 py-6 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col gap-4">
          
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-3xl">
              <div className="relative flex items-center bg-surface-container-lowest rounded-2xl shadow-xs px-4 py-3 border border-surface-container-high/60 focus-within:border-primary/50 transition-all">
                <span className="material-symbols-outlined text-[22px] text-on-surface-variant mr-3">search</span>
                <input
                  type="text"
                  placeholder="Search by role, stack (React, Postgres, Supabase), founder, or company..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-xs text-on-surface placeholder:text-outline focus:outline-none"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")} className="p-1 text-on-surface-variant hover:text-on-surface">
                    <span className="material-symbols-outlined text-[16px]">cancel</span>
                  </button>
                )}
              </div>
            </div>

            {/* Saved Posts Counter */}
            <div className="flex items-center gap-3 justify-between lg:justify-end">
              <div className="flex items-center gap-2 bg-surface-container-highest/60 rounded-full px-4 py-1.5 text-xs">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                <span className="font-semibold text-on-surface">Viewing as Builder</span>
                <span className="text-on-surface-variant text-[11px]">(Live Opportunities)</span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-surface-container-lowest text-on-surface shadow-xs text-xs font-semibold">
                <span className="material-symbols-outlined text-[18px] text-primary">bookmark</span>
                <span>Saved Posts: {savedPostIds.size}</span>
              </div>
            </div>
          </div>

          {/* Categories Carousel */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs font-semibold">
            {["all", "Engineering", "Design", "Product", "Marketing", "Finance"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full transition-all shrink-0 flex items-center gap-1.5 ${
                  selectedCategory === cat
                    ? "bg-primary text-on-primary shadow-xs"
                    : "bg-surface-container-lowest text-on-surface hover:bg-surface-container border border-surface-container-high/60"
                }`}
              >
                <span>{cat === "all" ? "All Categories" : cat}</span>
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* Main Grid: Sidebar Filters + Opportunities */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 flex flex-col lg:flex-row items-start gap-8">
        
        {/* SIDEBAR FILTERS */}
        <aside className="w-full lg:w-72 shrink-0 space-y-6">
          <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-xs border border-surface-container-high/60 space-y-5">
            <div className="flex items-center justify-between pb-1 border-b border-surface-container-high">
              <span className="font-heading font-bold text-sm text-on-surface flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px] text-primary">filter_alt</span>
                Filters
              </span>
              <button onClick={() => { setSelectedCategory("all"); setSearchQuery(""); }} className="text-xs text-primary font-semibold hover:underline">
                Reset
              </button>
            </div>

            {/* Compensation Model */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-on-surface uppercase tracking-wider">Compensation Type</label>
              <div className="space-y-1.5 text-xs">
                {["Cash + Equity", "Cash Only", "Equity Only", "Negotiable"].map((type) => (
                  <label key={type} className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded accent-primary" />
                    <span>{type}</span>
                  </label>
                ))}
              </div>

              {/* Statutory Equity Risk Callout */}
              <div className="mt-3 p-3 bg-tertiary-container/10 border border-tertiary-container/30 rounded-xl flex items-start gap-2">
                <span className="material-symbols-outlined text-[18px] text-tertiary shrink-0 mt-0.5">warning</span>
                <p className="text-[11px] text-tertiary leading-snug">
                  <strong>Equity Advisory:</strong> Early-stage startup equity is speculative and illiquid. CoBuild is a discovery service and does not guarantee valuation or legal validity.
                </p>
              </div>
            </div>

            {/* Founder Trust Level */}
            <div className="space-y-2 pt-2 border-t border-surface-container-high text-xs">
              <label className="font-bold text-on-surface uppercase tracking-wider">Founder Trust Level</label>
              <div className="space-y-1.5">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="accent-secondary" />
                  <span className="flex items-center gap-1 text-secondary font-medium">
                    <span className="material-symbols-outlined text-[14px]">verified_user</span> Identity Checked
                  </span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="accent-secondary" />
                  <span className="flex items-center gap-1 text-primary font-medium">
                    <span className="material-symbols-outlined text-[14px]">domain_verification</span> Company Checked
                  </span>
                </label>
              </div>
            </div>

          </div>
        </aside>

        {/* FEED STREAM */}
        <div className="flex-1 w-full space-y-4">
          <div className="flex items-center justify-between text-xs text-on-surface-variant pb-1">
            <span>Showing <strong className="text-on-surface">{filteredPosts.length} High-Match Opportunities</strong></span>
            <span className="font-semibold text-primary">Algorithmic Best Match</span>
          </div>

          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <article key={post.id} className="bg-surface-container-lowest rounded-2xl p-6 shadow-xs border border-surface-container-high/60 hover:shadow-md transition-shadow relative overflow-hidden">
                
                {/* Algorithmic Match Signals Bar */}
                <div className="bg-surface-container-low -mx-6 -mt-6 px-6 py-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-secondary mb-4 border-b border-surface-container-high/40">
                  {post.matchSignals.map((signal, idx) => (
                    <span key={idx} className="inline-flex items-center gap-1 font-semibold text-[11px]">
                      <span className="material-symbols-outlined text-[14px]">check_circle</span>
                      {signal}
                    </span>
                  ))}
                </div>

                {/* Founder Info Header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img src={post.founderAvatar} alt={post.founderName} className="w-11 h-11 rounded-full object-cover ring-1 ring-surface-container-highest"/>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-heading font-bold text-sm text-on-surface">{post.founderName}</span>
                        <span className="text-xs text-on-surface-variant">• Founder @ {post.companyName} ({post.ventureStage})</span>
                      </div>
                      <div className="flex items-center gap-1.5 mt-1">
                        {post.founderVerified.map((v, idx) => (
                          <span key={idx} className="inline-flex items-center gap-0.5 px-2 py-0.2 rounded-full bg-secondary-container/40 text-on-secondary-container text-[10px] font-bold">
                            <span className="material-symbols-outlined text-[12px] text-secondary">verified</span>
                            {v}
                          </span>
                        ))}
                        <span className="text-[10px] text-outline ml-1">{post.postedAgo}</span>
                      </div>
                    </div>
                  </div>

                  {/* Bookmark Button */}
                  <button
                    onClick={() => toggleSave(post.id)}
                    className="p-2 text-on-surface-variant hover:text-primary transition-colors"
                    title="Bookmark Opportunity"
                  >
                    <span className={`material-symbols-outlined text-[20px] ${savedPostIds.has(post.id) ? "text-primary filled" : ""}`}>
                      bookmark
                    </span>
                  </button>
                </div>

                {/* Post Title & Context */}
                <div className="mt-3 space-y-1">
                  <h3 className="font-heading font-bold text-base text-primary hover:text-primary-hover cursor-pointer transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-xs text-on-surface-variant line-clamp-2 leading-relaxed">
                    {post.businessContext}
                  </p>
                </div>

                {/* Compensation & Risk Pills */}
                <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-secondary-fixed/50 text-on-secondary-fixed-variant font-semibold text-[11px]">
                    <span className="material-symbols-outlined text-[14px]">payments</span>
                    {post.cashAmount}
                  </span>
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-semibold text-[11px]">
                    <span className="material-symbols-outlined text-[14px]">pie_chart</span>
                    {post.equityRange}
                  </span>
                  <span className="text-outline text-[11px] ml-auto">
                    {post.timeCommitment} • {post.workMode}
                  </span>
                </div>

                {/* Required Skills */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {post.skills.map((skill, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-surface-container text-on-surface text-[11px] font-medium">
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Card Footer CTAs */}
                <div className="mt-4 pt-3 border-t border-surface-container-high/60 flex items-center justify-between gap-4">
                  <span className="text-[11px] text-on-surface-variant font-medium">
                    {post.applicantsCount} Applicants • Fast Responder
                  </span>
                  <div className="flex items-center gap-2">
                    <Link href="/workspace" className="px-3 py-1.5 rounded-xl border border-surface-container-high text-xs font-bold text-on-surface hover:bg-surface-container transition-colors">
                      View Scope
                    </Link>
                    <button
                      onClick={() => { setActiveApplyingPost(post); setShowApplyModal(true); }}
                      className="px-4 py-1.5 rounded-xl bg-primary hover:bg-primary-container text-on-primary text-xs font-bold shadow-xs transition-all flex items-center gap-1"
                    >
                      <span>Quick Apply</span>
                      <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                    </button>
                  </div>
                </div>

              </article>
            ))}
          </div>

        </div>

      </div>

      {/* QUICK APPLY MODAL */}
      {showApplyModal && activeApplyingPost && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-2xl p-6 max-w-lg w-full shadow-xl border border-surface-container-high space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-surface-container-high">
              <h3 className="font-heading font-bold text-base text-on-surface">Submit Collaboration Handshake</h3>
              <button onClick={() => setShowApplyModal(false)} className="text-outline hover:text-on-surface">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            
            <p className="text-xs text-on-surface-variant">
              Applying for: <strong className="text-primary">{activeApplyingPost.title}</strong>
            </p>

            <form onSubmit={(e) => { e.preventDefault(); alert("Collaboration handshake proposal submitted to " + activeApplyingPost.founderName + "! Private safety chat initiated."); setShowApplyModal(false); }} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-on-surface block mb-1">Proposal & Architectural Approach *</label>
                <textarea rows={3} required placeholder="Detail your relevant experience and how you will execute the scope..." className="w-full p-2.5 rounded-xl bg-surface-container-low border border-surface-container-high focus:outline-none" defaultValue="Hi Elena, I reviewed the technical scope. I have built three multi-tenant PostgreSQL systems on Supabase and AWS ECS. Ready to execute Milestones 1 through 3." />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-on-surface block mb-1">Proposed Cash Payout ($)</label>
                  <input type="text" defaultValue="$7,000 USD upon Milestone 2" className="w-full p-2 rounded-xl bg-surface-container-low border border-surface-container-high focus:outline-none" />
                </div>
                <div>
                  <label className="font-bold text-on-surface block mb-1">Proposed Equity Grant</label>
                  <input type="text" defaultValue="1.5% Advisor Stock Grant" className="w-full p-2 rounded-xl bg-surface-container-low border border-surface-container-high focus:outline-none" />
                </div>
              </div>

              <div className="p-3 bg-tertiary-container/10 border border-tertiary-container/30 rounded-xl text-[11px] text-tertiary">
                <strong>Platform Notice:</strong> CoBuild connects parties directly. Never wire advance fees. Formal terms are signed inside the collaboration workspace.
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowApplyModal(false)} className="px-4 py-2 rounded-xl text-on-surface-variant hover:bg-surface-container font-bold">Cancel</button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-primary text-on-primary font-bold hover:bg-primary-container">
                  Send Proposal Handshake
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
