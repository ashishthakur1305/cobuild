// CoBuild Client Application Engine
(function () {
  "use strict";

  // --- STATE STORE ---
  const state = {
    currentView: "feed",
    currentMode: "builder", // "builder" | "founder"
    currentUser: {
      id: "usr-2",
      name: "Alex Rivera",
      role: "BUILDER",
      email: "alex.rivera@cobuild.network",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80",
      verified: ["Identity Checked", "Portfolio Checked"],
    },
    savedPostIds: new Set(["post-1"]),
    selectedCategory: "all",
    searchQuery: "",
    filters: {
      comp: ["Both", "Cash", "Equity", "Negotiable"],
      commitment: ["part_time", "milestone", "full_time"],
      trust: ["identity", "company", "portfolio"],
      stage: null,
    },
    workspace: {
      term2Signed: false,
      term3Signed: false,
      isActive: false,
      m2Approved: false,
    },
    chat: {
      activePartner: "elena",
      messages: [
        {
          id: "m-1",
          sender: "elena",
          senderName: "Elena Vance",
          avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&h=120&q=80",
          time: "2:14 PM UTC",
          body: "Hi Alex, loved your GitHub repo on distributed rate limiters. Are you open to discussing the architecture this Thursday at 3 PM UTC?",
          isSelf: false,
        },
        {
          id: "m-2",
          sender: "alex",
          senderName: "Alex Rivera",
          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80",
          time: "2:18 PM UTC",
          body: "Hi Elena! Yes, that works for me. Here is our architecture draft:",
          isSelf: true,
          externalLink: "https://external-doc.com/rfc-draft",
        },
        {
          id: "m-3",
          sender: "elena",
          senderName: "Elena Vance",
          avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&h=120&q=80",
          time: "2:21 PM UTC",
          body: "Reviewed the initial diagram. The data isolation boundaries match our compliance targets perfectly. Let's make sure Term #2 and Term #3 are confirmed in our workspace checklist!",
          isSelf: false,
        },
      ],
    },
    posts: [
      {
        id: "post-1",
        title: "Senior Backend Engineer for Early-Stage Real Estate B2B SaaS MVP",
        businessContext:
          "We have secured letters of intent from 6 mid-market commercial property managers. The architecture demands a scalable multi-tenant Postgres database with row-level security and high-throughput real-time ingest pipelines.",
        companyName: "Kestrel Flow",
        ventureStage: "Pre-seed",
        founderName: "Elena Vance",
        founderAvatar:
          "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&h=120&q=80",
        founderVerified: ["Identity Checked", "Company Checked"],
        category: "Engineering",
        skills: ["PostgreSQL", "Node.js", "TypeScript", "Docker", "Stripe API"],
        compType: "Both",
        cashAmount: "$6,000 – $8,000 USD / mo",
        equityRange: "+ 1.5% Equity",
        timeCommitment: "part_time",
        timeCommitmentLabel: "25 hrs/wk • Remote (Americas / EMEA)",
        workMode: "remote",
        postedAgo: "3h ago",
        applicantsCount: 6,
        matchSignals: [
          "4 of 5 required skills match",
          "Timezone overlap (+2 hrs EST)",
          "Compensation preference matches",
        ],
      },
      {
        id: "post-2",
        title: "Lead Product Designer for Medical Workflow Automation Tablet App",
        businessContext:
          "Phase 1 clinical trial workflow software needs comprehensive patient consent and dosage audit screens with WCAG AA compliance.",
        companyName: "Arkea Health",
        ventureStage: "Seed",
        founderName: "Marcus Brody",
        founderAvatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80",
        founderVerified: ["Identity Checked"],
        category: "Design",
        skills: ["Figma", "Design Systems", "Tablet UI", "Accessibility (WCAG)"],
        compType: "Both",
        cashAmount: "$5,500 – $7,000 USD / mo",
        equityRange: "+ 0.75% Equity",
        timeCommitment: "part_time",
        timeCommitmentLabel: "20 hrs/wk • Remote",
        workMode: "remote",
        postedAgo: "6h ago",
        applicantsCount: 4,
        matchSignals: [
          "Design Systems & Mobile UI in your profile",
          "High verified founder trust score",
        ],
      },
      {
        id: "post-3",
        title: "Distributed Systems Architect for High-Frequency Cross-Border Settlements",
        businessContext:
          "Building idempotent ledger reconciliation engine with sub-50ms latency guarantees across multi-region AWS infrastructure.",
        companyName: "LayerFlow",
        ventureStage: "Series A",
        founderName: "Siddharth Nair",
        founderAvatar:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80",
        founderVerified: ["Identity Checked", "Company Checked", "Portfolio Checked"],
        category: "Engineering",
        skills: ["Go / Golang", "PostgreSQL", "Redis", "Kafka", "AWS"],
        compType: "Both",
        cashAmount: "$9,000 – $12,000 USD / mo",
        equityRange: "Negotiable",
        timeCommitment: "milestone",
        timeCommitmentLabel: "Milestone-based • Remote",
        workMode: "remote",
        postedAgo: "1d ago",
        applicantsCount: 9,
        matchSignals: [
          "PostgreSQL & Redis in your profile",
          "Fast Responder (Avg. 1 hr)",
        ],
      },
    ],
  };

  // --- TOAST NOTIFIER ---
  function showToast(message, type = "success") {
    const container = document.getElementById("toast-container");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = `toast-item px-4 py-3 rounded-xl shadow-lg text-xs font-semibold flex items-center gap-2 text-white border ${
      type === "error"
        ? "bg-error border-error-container text-white"
        : type === "warning"
        ? "bg-tertiary-dark border-tertiary-container text-tertiary-container"
        : "bg-primary border-primary-container text-white"
    }`;

    const icon =
      type === "error"
        ? "error"
        : type === "warning"
        ? "warning"
        : "check_circle";

    toast.innerHTML = `
      <span class="material-symbols-outlined text-[18px]">${icon}</span>
      <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(8px)";
      setTimeout(() => toast.remove(), 250);
    }, 3200);
  }

  // --- NAVIGATION CONTROLLER ---
  function switchView(viewName) {
    if (!viewName) return;

    // Normalizing name
    viewName = viewName.replace("#", "").replace("/", "");
    if (!viewName) viewName = "feed";

    state.currentView = viewName;
    window.location.hash = viewName;

    // Hide all views
    document.querySelectorAll(".app-view").forEach((el) => {
      el.classList.add("hidden");
    });

    // Show target view
    const target = document.getElementById(`view-${viewName}`);
    if (target) {
      target.classList.remove("hidden");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    // Update nav links active styling
    document.querySelectorAll(".nav-link").forEach((link) => {
      const linkView = link.getAttribute("data-view");
      if (linkView === viewName) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });

    // Close mobile menu if open
    const mobileNav = document.getElementById("mobile-nav");
    if (mobileNav) mobileNav.classList.add("hidden");

    // Close user dropdown if open
    const dropdown = document.getElementById("user-menu-dropdown");
    if (dropdown) dropdown.classList.add("hidden");
  }

  // --- RENDER OPPORTUNITIES FEED ---
  function renderFeed() {
    const feedContainer = document.getElementById("opportunities-feed");
    const countEl = document.getElementById("visible-count");
    if (!feedContainer) return;

    // Filter posts
    const filtered = state.posts.filter((p) => {
      if (state.selectedCategory !== "all" && p.category !== state.selectedCategory) {
        return false;
      }
      if (state.filters.stage && p.ventureStage !== state.filters.stage) {
        return false;
      }
      if (state.searchQuery) {
        const q = state.searchQuery.toLowerCase();
        const inTitle = p.title.toLowerCase().includes(q);
        const inSkills = p.skills.some((s) => s.toLowerCase().includes(q));
        const inCompany = p.companyName.toLowerCase().includes(q);
        const inFounder = p.founderName.toLowerCase().includes(q);
        if (!inTitle && !inSkills && !inCompany && !inFounder) return false;
      }
      return true;
    });

    if (countEl) {
      countEl.textContent = `${filtered.length} Opportunities`;
    }

    if (filtered.length === 0) {
      feedContainer.innerHTML = `
        <div class="bg-surface-container-lowest rounded-2xl p-8 text-center border border-surface-container-high/60 space-y-3">
          <span class="material-symbols-outlined text-[40px] text-outline">search_off</span>
          <h4 class="font-heading font-bold text-sm text-on-surface">No Opportunities Match Your Filters</h4>
          <p class="text-xs text-on-surface-variant max-w-sm mx-auto">Try resetting filters or adjusting search keywords to discover more collaborator requirements.</p>
          <button id="empty-reset-btn" class="px-4 py-2 rounded-xl bg-primary text-on-primary text-xs font-bold shadow-xs">Reset All Filters</button>
        </div>
      `;
      const btn = document.getElementById("empty-reset-btn");
      if (btn) {
        btn.addEventListener("click", () => {
          state.selectedCategory = "all";
          state.searchQuery = "";
          state.filters.stage = null;
          renderFeed();
        });
      }
      return;
    }

    feedContainer.innerHTML = filtered
      .map((post) => {
        const isSaved = state.savedPostIds.has(post.id);
        const matchSignalsHtml = post.matchSignals
          .map(
            (sig) => `
          <span class="inline-flex items-center gap-1 font-semibold text-[11px] text-secondary">
            <span class="material-symbols-outlined text-[14px]">check_circle</span>
            ${sig}
          </span>
        `
          )
          .join("");

        const badgesHtml = post.founderVerified
          .map(
            (b) => `
          <div class="relative group/badge inline-block">
            <span class="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-secondary-container/40 text-on-secondary-container text-[10px] font-bold cursor-help">
              <span class="material-symbols-outlined text-[12px] text-secondary">verified</span>
              ${b}
            </span>
          </div>
        `
          )
          .join("");

        const skillsHtml = post.skills
          .map(
            (s) => `
          <span class="px-2 py-0.5 rounded bg-surface-container text-on-surface text-[11px] font-medium">
            ${s}
          </span>
        `
          )
          .join("");

        return `
        <article class="bg-surface-container-lowest rounded-2xl p-6 shadow-card border border-surface-container-high/60 hover:shadow-card-hover transition-all relative overflow-hidden" data-post-id="${post.id}">
          
          <!-- Algorithmic Match Signals Bar -->
          <div class="bg-surface-container-low -mx-6 -mt-6 px-6 py-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs mb-4 border-b border-surface-container-high/40">
            ${matchSignalsHtml}
          </div>

          <!-- Founder Info Header -->
          <div class="flex items-start justify-between gap-4">
            <div class="flex items-center gap-3">
              <img src="${post.founderAvatar}" alt="${post.founderName}" class="w-11 h-11 rounded-full object-cover ring-1 ring-surface-container-highest"/>
              <div>
                <div class="flex items-center gap-2 flex-wrap">
                  <span class="font-heading font-bold text-sm text-on-surface">${post.founderName}</span>
                  <span class="text-xs text-on-surface-variant">• Founder @ ${post.companyName} (${post.ventureStage})</span>
                </div>
                <div class="flex items-center gap-1.5 mt-1">
                  ${badgesHtml}
                  <span class="text-[10px] text-outline ml-1">${post.postedAgo}</span>
                </div>
              </div>
            </div>

            <!-- Bookmark Button -->
            <button class="bookmark-btn p-2 text-on-surface-variant hover:text-primary transition-colors" data-id="${post.id}" title="${isSaved ? "Remove Bookmark" : "Save Post"}">
              <span class="material-symbols-outlined text-[20px] ${isSaved ? "text-primary filled" : ""}">
                bookmark
              </span>
            </button>
          </div>

          <!-- Post Title & Summary -->
          <div class="mt-3 space-y-1">
            <h3 class="post-title-click font-heading font-bold text-base text-primary hover:text-primary-hover cursor-pointer transition-colors" data-id="${post.id}">
              ${post.title}
            </h3>
            <p class="text-xs text-on-surface-variant line-clamp-2 leading-relaxed">
              ${post.businessContext}
            </p>
          </div>

          <!-- Compensation & Risk Tags Bar -->
          <div class="mt-3 flex flex-wrap items-center gap-2 text-xs">
            <span class="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-secondary-fixed/50 text-on-secondary-fixed-variant font-semibold text-[11px]">
              <span class="material-symbols-outlined text-[14px]">payments</span>
              ${post.cashAmount}
            </span>
            <span class="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-semibold text-[11px]">
              <span class="material-symbols-outlined text-[14px]">pie_chart</span>
              ${post.equityRange}
            </span>
            <span class="text-outline text-[11px] ml-auto">
              ${post.timeCommitmentLabel}
            </span>
          </div>

          <!-- Required Skills -->
          <div class="mt-3 flex flex-wrap gap-1.5">
            ${skillsHtml}
          </div>

          <!-- Card Footprint & Action CTAs -->
          <div class="mt-4 pt-3 border-t border-surface-container-high/60 flex items-center justify-between gap-4">
            <span class="text-[11px] text-on-surface-variant font-medium">
              ${post.applicantsCount} Applicants • Fast Responder
            </span>
            <div class="flex items-center gap-2">
              <button class="view-scope-btn px-3.5 py-1.5 rounded-xl border border-surface-container-high text-xs font-bold text-on-surface hover:bg-surface-container transition-colors" data-id="${post.id}">
                View Scope
              </button>
              <button class="quick-apply-btn px-4 py-1.5 rounded-xl bg-primary hover:bg-primary-container text-on-primary text-xs font-bold shadow-xs transition-all flex items-center gap-1 active:scale-95" data-id="${post.id}">
                <span>Quick Apply</span>
                <span class="material-symbols-outlined text-[14px]">arrow_forward</span>
              </button>
            </div>
          </div>

        </article>
      `;
      })
      .join("");

    // Attach bookmark events
    feedContainer.querySelectorAll(".bookmark-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const id = btn.getAttribute("data-id");
        if (state.savedPostIds.has(id)) {
          state.savedPostIds.delete(id);
          showToast("Post removed from saved bookmarks", "warning");
        } else {
          state.savedPostIds.add(id);
          showToast("Post bookmarked successfully!");
        }
        updateSavedCount();
        renderFeed();
      });
    });

    // Attach Quick Apply events
    feedContainer.querySelectorAll(".quick-apply-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const id = btn.getAttribute("data-id");
        const post = state.posts.find((p) => p.id === id);
        if (post) openQuickApplyModal(post);
      });
    });

    // Attach View Scope events -> switches to workspace
    feedContainer.querySelectorAll(".view-scope-btn, .post-title-click").forEach((btn) => {
      btn.addEventListener("click", () => {
        switchView("workspace");
      });
    });
  }

  function updateSavedCount() {
    const badge = document.getElementById("saved-count-badge");
    if (badge) badge.textContent = state.savedPostIds.size;
  }

  // --- MODAL CONTROLLERS ---
  let activePostForApply = null;

  function openQuickApplyModal(post) {
    activePostForApply = post;
    const modal = document.getElementById("quick-apply-modal");
    const titleEl = document.getElementById("modal-req-title");
    if (titleEl) titleEl.textContent = post.title;
    if (modal) modal.classList.remove("hidden");
  }

  function closeModals() {
    document.querySelectorAll(".modal-backdrop").forEach((m) => m.classList.add("hidden"));
  }

  // --- WORKSPACE INTERACTION LOGIC (5 CLAUSES & STAGE GATE) ---
  function updateWorkspaceState() {
    const isReady = state.workspace.term2Signed && state.workspace.term3Signed;

    // Clause 2
    const c2Icon = document.getElementById("clause-2-icon");
    const c2Pill = document.getElementById("clause-2-action-pill");
    const c2Status = document.getElementById("clause-2-builder-status");
    const c2Card = document.getElementById("clause-2-card");
    const c2SignBtn = document.getElementById("sign-term-2-btn");

    if (state.workspace.term2Signed) {
      if (c2Icon) c2Icon.innerHTML = `<span class="material-symbols-outlined text-[14px]">check</span>`;
      if (c2Icon) c2Icon.className = "w-6 h-6 rounded-full bg-secondary text-on-secondary text-xs flex items-center justify-center font-bold shrink-0 mt-0.5";
      if (c2Pill) c2Pill.remove();
      if (c2Status) {
        c2Status.textContent = "Builder: Confirmed ✓";
        c2Status.className = "text-secondary font-medium";
      }
      if (c2SignBtn) c2SignBtn.parentElement.innerHTML = `<span class="text-secondary font-semibold flex items-center gap-1"><span class="material-symbols-outlined text-[14px]">done_all</span> Signed on ${new Date().toLocaleTimeString()}</span>`;
    }

    // Clause 3
    const c3Icon = document.getElementById("clause-3-icon");
    const c3Pill = document.getElementById("clause-3-action-pill");
    const c3Status = document.getElementById("clause-3-builder-status");
    const c3Card = document.getElementById("clause-3-card");
    const c3SignBtn = document.getElementById("sign-term-3-btn");

    if (state.workspace.term3Signed) {
      if (c3Icon) c3Icon.innerHTML = `<span class="material-symbols-outlined text-[14px]">check</span>`;
      if (c3Icon) c3Icon.className = "w-6 h-6 rounded-full bg-secondary text-on-secondary text-xs flex items-center justify-center font-bold shrink-0 mt-0.5";
      if (c3Pill) c3Pill.remove();
      if (c3Status) {
        c3Status.textContent = "Builder: Confirmed ✓";
        c3Status.className = "text-secondary font-medium";
      }
      if (c3SignBtn) c3SignBtn.parentElement.innerHTML = `<span class="text-secondary font-semibold flex items-center gap-1"><span class="material-symbols-outlined text-[14px]">done_all</span> Signed on ${new Date().toLocaleTimeString()}</span>`;
    }

    // Summary Header & Percentage
    const termsPercent = document.getElementById("terms-percent");
    const pendingBadge = document.getElementById("terms-pending-badge");
    const statusText = document.getElementById("workspace-status-text");

    if (isReady) {
      if (termsPercent) termsPercent.textContent = "100%";
      if (pendingBadge) {
        pendingBadge.textContent = "All 5 Confirmed ✓";
        pendingBadge.className = "px-2 py-0.5 rounded text-[11px] font-bold bg-secondary-fixed text-on-secondary-fixed";
      }
      if (statusText) statusText.textContent = "Stage 1 Complete: Ready to Unlock Active Execution";
    }

    // Stage Gate Unlock Button
    const unlockBtn = document.getElementById("unlock-active-btn");
    const gateIcon = document.getElementById("stage-gate-icon");
    const gateTitle = document.getElementById("stage-gate-title");

    if (unlockBtn) {
      if (state.workspace.isActive) {
        unlockBtn.disabled = true;
        unlockBtn.className = "px-6 py-2.5 rounded-xl bg-secondary text-on-secondary text-xs font-bold shadow-xs flex items-center gap-1.5";
        unlockBtn.innerHTML = `<span class="material-symbols-outlined text-[16px]">verified</span><span>Collaboration Active ✓</span>`;
        if (gateIcon) gateIcon.textContent = "lock_open";
        if (gateTitle) gateTitle.textContent = "Stage Gate Unlocked: Active Execution";
        if (statusText) statusText.textContent = "Stage 2: Active Collaboration";
        
        // Advance Stepper
        const stageNum = document.getElementById("stage-number");
        const node2 = document.getElementById("step-node-2");
        const bar = document.getElementById("stepper-bar");
        if (stageNum) stageNum.textContent = "Stage 2 of 3";
        if (node2) {
          node2.className = "w-7 h-7 rounded-full bg-primary text-on-primary text-xs font-bold flex items-center justify-center shadow-xs";
        }
        if (bar) bar.style.width = "50%";
      } else if (isReady) {
        unlockBtn.disabled = false;
        unlockBtn.className = "px-6 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-on-primary text-xs font-bold shadow-md cursor-pointer flex items-center gap-1.5 active:scale-95 transition-all";
        unlockBtn.innerHTML = `<span class="material-symbols-outlined text-[16px]">lock_open</span><span>Unlock Active Status</span>`;
      }
    }
  }

  // --- CHAT MESSAGE RENDERER ---
  function renderChatMessages() {
    const container = document.getElementById("chat-messages-container");
    if (!container) return;

    // Preserving handshake item and appending messages
    const msgsHtml = state.chat.messages
      .map((msg) => {
        if (msg.isSelf) {
          return `
          <div class="flex items-start justify-end gap-3 max-w-xl ml-auto animate-fade-in">
            <div class="space-y-1 flex flex-col items-end">
              <div class="flex items-center gap-2">
                <span class="text-[10px] text-outline">${msg.time}</span>
                <span class="text-xs font-bold text-on-surface">You</span>
              </div>
              <div class="bg-primary text-on-primary p-3.5 rounded-2xl rounded-tr-sm shadow-sm text-xs leading-relaxed text-left">
                <p>${msg.body}</p>
                ${
                  msg.externalLink
                    ? `
                  <div class="my-2 p-2 bg-surface-container-lowest text-on-surface rounded-xl flex items-center justify-between gap-2 border border-surface-container-high">
                    <div class="flex items-center gap-1.5 truncate">
                      <span class="material-symbols-outlined text-[16px] text-tertiary">link_off</span>
                      <span class="font-mono text-[11px] text-primary underline truncate">${msg.externalLink}</span>
                    </div>
                    <button type="button" class="external-link-btn px-2 py-0.5 rounded bg-tertiary-container/30 text-tertiary text-[10px] font-bold shrink-0 hover:bg-tertiary-container/50 transition-colors" data-url="${msg.externalLink}">
                      Verify Link
                    </button>
                  </div>
                `
                    : ""
                }
              </div>
              <span class="text-[10px] text-outline flex items-center gap-0.5">
                Delivered <span class="material-symbols-outlined text-[12px] text-primary">done_all</span>
              </span>
            </div>
            <img src="${msg.avatar}" class="w-7 h-7 rounded-full object-cover shrink-0 mt-1"/>
          </div>
        `;
        } else {
          return `
          <div class="flex items-start gap-3 max-w-xl animate-fade-in">
            <img src="${msg.avatar}" class="w-7 h-7 rounded-full object-cover shrink-0 mt-1"/>
            <div class="space-y-1">
              <div class="flex items-center gap-2">
                <span class="text-xs font-bold text-primary">${msg.senderName}</span>
                <span class="text-[10px] text-outline">${msg.time}</span>
              </div>
              <div class="bg-surface-container-lowest p-3.5 rounded-2xl rounded-tl-sm shadow-xs border border-surface-container-high/60 text-xs text-on-surface leading-relaxed">
                ${msg.body}
              </div>
            </div>
          </div>
        `;
        }
      })
      .join("");

    container.innerHTML = `
      <!-- System Handshake Message -->
      <div class="flex flex-col items-center justify-center my-2">
        <div class="bg-surface-container-lowest p-3 rounded-xl border border-surface-container-high/60 shadow-xs max-w-md w-full flex items-center gap-3">
          <div class="w-8 h-8 rounded-lg bg-primary text-on-primary flex items-center justify-center shrink-0">
            <span class="material-symbols-outlined text-[18px]">verified</span>
          </div>
          <div class="flex-1 text-xs">
            <span class="font-bold text-primary">Official Collaboration Handshake</span>
            <p class="text-on-surface-variant text-[11px]">Alex Rivera applied with scope proposal & portfolio milestones.</p>
          </div>
        </div>
        <span class="text-[10px] text-outline mt-1">Session Key Validated • E2E Encrypted</span>
      </div>
      ${msgsHtml}
    `;

    // Reattach external link scanner triggers
    container.querySelectorAll(".external-link-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const url = btn.getAttribute("data-url");
        openSafetyLinkModal(url);
      });
    });

    container.scrollTop = container.scrollHeight;
  }

  function openSafetyLinkModal(url) {
    const modal = document.getElementById("safety-link-modal");
    const targetUrlEl = document.getElementById("safety-target-url");
    const proceedBtn = document.getElementById("proceed-external-btn");
    if (targetUrlEl) targetUrlEl.textContent = url;
    if (proceedBtn) {
      proceedBtn.onclick = () => {
        window.open(url, "_blank");
        closeModals();
      };
    }
    if (modal) modal.classList.remove("hidden");
  }

  // --- FOUNDER STUDIO LIVE PREVIEW BINDINGS ---
  function initFounderStudio() {
    const titleInput = document.getElementById("create-title");
    const summaryInput = document.getElementById("create-summary");
    const cashInput = document.getElementById("create-cash-amount");
    const equitySlider = document.getElementById("create-equity-slider");
    const equityDisplay = document.getElementById("create-equity-display");

    const prevTitle = document.getElementById("preview-title");
    const prevSummary = document.getElementById("preview-summary");
    const prevCash = document.getElementById("preview-cash");
    const prevEquity = document.getElementById("preview-equity");

    if (titleInput && prevTitle) {
      titleInput.addEventListener("input", (e) => {
        prevTitle.textContent = e.target.value || "Untitled Requirement";
      });
    }

    if (summaryInput && prevSummary) {
      summaryInput.addEventListener("input", (e) => {
        prevSummary.textContent = e.target.value || "No context specified.";
      });
    }

    if (cashInput && prevCash) {
      cashInput.addEventListener("input", (e) => {
        prevCash.textContent = e.target.value || "$0 USD";
      });
    }

    if (equitySlider && equityDisplay && prevEquity) {
      equitySlider.addEventListener("input", (e) => {
        const val = e.target.value;
        equityDisplay.textContent = `${val}% Equity (4-yr Vesting, 1-yr Cliff)`;
        prevEquity.textContent = `+ ${val}% Equity`;
      });
    }

    // Category Buttons
    document.querySelectorAll(".create-cat-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".create-cat-btn").forEach((b) => {
          b.className = "create-cat-btn py-2 px-3 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface text-xs font-semibold transition-colors";
        });
        btn.className = "create-cat-btn active py-2 px-3 rounded-xl bg-primary text-on-primary text-xs font-semibold shadow-xs";
      });
    });

    // Add Deliverable
    const addDelBtn = document.getElementById("add-deliverable-btn");
    const delList = document.getElementById("create-deliverables-list");
    if (addDelBtn && delList) {
      addDelBtn.addEventListener("click", () => {
        const text = prompt("Enter scope milestone deliverable:");
        if (text && text.trim()) {
          const item = document.createElement("div");
          item.className = "flex items-center gap-2 bg-surface-container-low p-2.5 rounded-xl border border-surface-container-high/60";
          item.innerHTML = `
            <span class="material-symbols-outlined text-secondary text-[20px]">check_box</span>
            <input type="text" class="deliverable-text flex-1 bg-transparent text-xs text-on-surface focus:outline-none" value="${text.trim()}"/>
            <button type="button" class="del-remove text-outline hover:text-error p-1"><span class="material-symbols-outlined text-[16px]">close</span></button>
          `;
          item.querySelector(".del-remove").onclick = () => item.remove();
          delList.appendChild(item);
          showToast("Scope deliverable added");
        }
      });
    }

    // Publish Requirement
    const publishBtn = document.getElementById("publish-requirement-btn");
    if (publishBtn) {
      publishBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const newPost = {
          id: "post-" + Date.now(),
          title: titleInput ? titleInput.value : "New Requirement",
          businessContext: summaryInput ? summaryInput.value : "Context",
          companyName: "Synthetix Labs",
          ventureStage: "Pre-seed",
          founderName: state.currentUser.name,
          founderAvatar: state.currentUser.avatar,
          founderVerified: ["Identity Checked"],
          category: "Engineering",
          skills: ["React", "TypeScript", "PostgreSQL"],
          compType: "Both",
          cashAmount: cashInput ? cashInput.value : "$5,000 USD / mo",
          equityRange: equitySlider ? `+ ${equitySlider.value}% Equity` : "+ 2.0% Equity",
          timeCommitment: "part_time",
          timeCommitmentLabel: "20 hrs/wk • Remote",
          workMode: "remote",
          postedAgo: "Just now",
          applicantsCount: 0,
          matchSignals: ["Matches your role criteria", "New Opportunity"],
        };

        state.posts.unshift(newPost);
        showToast("Requirement posted successfully to marketplace feed!");
        renderFeed();
        switchView("feed");
      });
    }
  }

  // --- INITIALIZATION ---
  document.addEventListener("DOMContentLoaded", () => {
    // 1. Navigation Listeners
    document.querySelectorAll(".nav-link, .nav-trigger").forEach((el) => {
      el.addEventListener("click", (e) => {
        e.preventDefault();
        const view = el.getAttribute("data-view");
        if (view) switchView(view);
      });
    });

    // Hash change handler
    window.addEventListener("hashchange", () => {
      const hash = window.location.hash.replace("#", "");
      if (hash && hash !== state.currentView) {
        switchView(hash);
      }
    });

    // 2. Mode Switcher
    const modeFounderBtn = document.getElementById("mode-founder");
    const modeBuilderBtn = document.getElementById("mode-builder");
    const modeStatusText = document.getElementById("mode-status-text");

    if (modeFounderBtn && modeBuilderBtn) {
      modeFounderBtn.addEventListener("click", () => {
        state.currentMode = "founder";
        modeFounderBtn.className = "mode-btn px-3 py-1 rounded-full text-xs font-semibold bg-surface-container-lowest text-primary shadow-xs transition-all flex items-center gap-1";
        modeBuilderBtn.className = "mode-btn px-3 py-1 rounded-full text-xs font-semibold text-on-surface-variant hover:text-on-surface transition-all flex items-center gap-1";
        if (modeStatusText) modeStatusText.textContent = "Viewing as Founder";
        showToast("Switched to Founder Mode");
      });

      modeBuilderBtn.addEventListener("click", () => {
        state.currentMode = "builder";
        modeBuilderBtn.className = "mode-btn px-3 py-1 rounded-full text-xs font-semibold bg-surface-container-lowest text-primary shadow-xs transition-all flex items-center gap-1";
        modeFounderBtn.className = "mode-btn px-3 py-1 rounded-full text-xs font-semibold text-on-surface-variant hover:text-on-surface transition-all flex items-center gap-1";
        if (modeStatusText) modeStatusText.textContent = "Viewing as Builder";
        showToast("Switched to Builder Mode");
      });
    }

    // 3. User Menu Dropdown & Persona Switching
    const userMenuBtn = document.getElementById("user-menu-btn");
    const userMenuDropdown = document.getElementById("user-menu-dropdown");
    if (userMenuBtn && userMenuDropdown) {
      userMenuBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        userMenuDropdown.classList.toggle("hidden");
      });
      document.addEventListener("click", () => {
        userMenuDropdown.classList.add("hidden");
      });
    }

    const toggleIdentityBtn = document.getElementById("toggle-user-identity");
    if (toggleIdentityBtn) {
      toggleIdentityBtn.addEventListener("click", () => {
        if (state.currentUser.name === "Alex Rivera") {
          state.currentUser = {
            id: "usr-1",
            name: "Elena Vance",
            role: "FOUNDER",
            email: "elena.vance@kestrel.flow",
            avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&h=120&q=80",
            verified: ["Identity Checked", "Company Checked"],
          };
        } else {
          state.currentUser = {
            id: "usr-2",
            name: "Alex Rivera",
            role: "BUILDER",
            email: "alex.rivera@cobuild.network",
            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80",
            verified: ["Identity Checked", "Portfolio Checked"],
          };
        }

        const avatar = document.getElementById("current-user-avatar");
        const nameEl = document.getElementById("menu-user-name");
        const roleEl = document.getElementById("menu-user-role");
        const emailEl = document.getElementById("menu-user-email");
        if (avatar) avatar.src = state.currentUser.avatar;
        if (nameEl) nameEl.textContent = state.currentUser.name;
        if (roleEl) roleEl.textContent = state.currentUser.role;
        if (emailEl) emailEl.textContent = state.currentUser.email;

        showToast(`Profile persona switched to: ${state.currentUser.name} (${state.currentUser.role})`);
      });
    }

    // 4. Category Pills Filter
    document.querySelectorAll(".cat-pill").forEach((pill) => {
      pill.addEventListener("click", () => {
        document.querySelectorAll(".cat-pill").forEach((p) => {
          p.className = "cat-pill px-4 py-1.5 rounded-full bg-surface-container-lowest text-on-surface hover:bg-surface-container transition-all shrink-0 flex items-center gap-1.5 border border-surface-container-high/60";
        });
        pill.className = "cat-pill px-4 py-1.5 rounded-full bg-primary text-on-primary shadow-xs shrink-0 flex items-center gap-1.5 active";
        state.selectedCategory = pill.getAttribute("data-category") || "all";
        renderFeed();
      });
    });

    // 5. Feed Search
    const searchInput = document.getElementById("feed-search-input");
    const clearSearchBtn = document.getElementById("clear-search-btn");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        state.searchQuery = e.target.value;
        if (clearSearchBtn) {
          if (e.target.value) clearSearchBtn.classList.remove("hidden");
          else clearSearchBtn.classList.add("hidden");
        }
        renderFeed();
      });
    }
    if (clearSearchBtn && searchInput) {
      clearSearchBtn.addEventListener("click", () => {
        searchInput.value = "";
        state.searchQuery = "";
        clearSearchBtn.classList.add("hidden");
        renderFeed();
      });
    }

    // 6. Reset Filters Button
    const resetFiltersBtn = document.getElementById("reset-filters-btn");
    if (resetFiltersBtn) {
      resetFiltersBtn.addEventListener("click", () => {
        state.selectedCategory = "all";
        state.searchQuery = "";
        state.filters.stage = null;
        if (searchInput) searchInput.value = "";
        document.querySelectorAll(".cat-pill").forEach((p, idx) => {
          if (idx === 0) p.className = "cat-pill px-4 py-1.5 rounded-full bg-primary text-on-primary shadow-xs shrink-0 flex items-center gap-1.5 active";
          else p.className = "cat-pill px-4 py-1.5 rounded-full bg-surface-container-lowest text-on-surface hover:bg-surface-container transition-all shrink-0 flex items-center gap-1.5 border border-surface-container-high/60";
        });
        renderFeed();
        showToast("Filters reset to default");
      });
    }

    // 7. Modals
    document.querySelectorAll(".close-modal-btn").forEach((btn) => {
      btn.addEventListener("click", closeModals);
    });

    const applyForm = document.getElementById("apply-form");
    if (applyForm) {
      applyForm.addEventListener("submit", (e) => {
        e.preventDefault();
        closeModals();
        showToast("Handshake proposal sent! Private conversation opened with founder.");
        switchView("messages");
      });
    }

    // 8. Workspace Signing Events
    const signTerm2Btn = document.getElementById("sign-term-2-btn");
    if (signTerm2Btn) {
      signTerm2Btn.addEventListener("click", () => {
        state.workspace.term2Signed = true;
        updateWorkspaceState();
        showToast("You signed Term #2 (Compensation Terms)");
      });
    }

    const signTerm3Btn = document.getElementById("sign-term-3-btn");
    if (signTerm3Btn) {
      signTerm3Btn.addEventListener("click", () => {
        state.workspace.term3Signed = true;
        updateWorkspaceState();
        showToast("You signed Term #3 (IP Ownership & Work-for-Hire Clause)");
      });
    }

    const unlockActiveBtn = document.getElementById("unlock-active-btn");
    if (unlockActiveBtn) {
      unlockActiveBtn.addEventListener("click", () => {
        if (state.workspace.term2Signed && state.workspace.term3Signed) {
          state.workspace.isActive = true;
          updateWorkspaceState();
          showToast("STAGE GATE UNLOCKED: Collaboration is now ACTIVE! Milestones unlocked.");
        }
      });
    }

    const approveM2Btn = document.getElementById("approve-m2-btn");
    if (approveM2Btn) {
      approveM2Btn.addEventListener("click", () => {
        state.workspace.m2Approved = true;
        approveM2Btn.parentElement.innerHTML = `<span class="text-[11px] text-secondary font-bold flex items-center gap-1"><span class="material-symbols-outlined text-[14px]">check_circle</span> Approved ✓</span>`;
        showToast("Milestone 2 deliverable approved! Notification dispatched.");
      });
    }

    // 9. Chat Send Event
    const chatForm = document.getElementById("chat-send-form");
    const chatInput = document.getElementById("chat-input");
    if (chatForm && chatInput) {
      chatForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const text = chatInput.value.trim();
        if (!text) return;

        const hasLink = text.includes("http") || text.includes(".com") || text.includes(".net");
        const newMsg = {
          id: "m-" + Date.now(),
          sender: "alex",
          senderName: state.currentUser.name,
          avatar: state.currentUser.avatar,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) + " UTC",
          body: text,
          isSelf: true,
          externalLink: hasLink ? (text.startsWith("http") ? text : "https://" + text) : undefined,
        };

        state.chat.messages.push(newMsg);
        chatInput.value = "";
        renderChatMessages();

        // Elena responds automatically after 1.2 seconds
        setTimeout(() => {
          state.chat.messages.push({
            id: "m-" + Date.now(),
            sender: "elena",
            senderName: "Elena Vance",
            avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&h=120&q=80",
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) + " UTC",
            body: "Understood! I verified the specification. Milestone roadmap is synchronized.",
            isSelf: false,
          });
          renderChatMessages();
        }, 1200);
      });
    }

    // 10. Initial Render
    renderFeed();
    updateSavedCount();
    updateWorkspaceState();
    renderChatMessages();
    initFounderStudio();

    // Check URL hash for initial view
    const initialHash = window.location.hash.replace("#", "");
    if (initialHash) {
      switchView(initialHash);
    } else {
      switchView("feed");
    }

    console.log("CoBuild client application engine ready.");
  });
})();
