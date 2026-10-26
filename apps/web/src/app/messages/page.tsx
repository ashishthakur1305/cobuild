"use client";

import { useState } from "react";
import Link from "next/link";

interface ChatMessage {
  id: string;
  senderName: string;
  senderAvatar: string;
  time: string;
  body: string;
  isSelf: boolean;
  type?: string;
  externalLink?: string;
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "msg-1",
      senderName: "Elena Vance",
      senderAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&h=120&q=80",
      time: "2:14 PM",
      body: "Hi Alex, loved your GitHub repo on distributed rate limiters. Are you open to discussing the architecture this Thursday at 3 PM UTC?",
      isSelf: false,
    },
    {
      id: "msg-2",
      senderName: "Alex Rivera",
      senderAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80",
      time: "2:18 PM",
      body: "Hi Elena! Yes, that works for me. Here is our architecture draft: external-doc.com/rfc-draft. Looking forward to walking through the sharding mechanisms and caching strategy.",
      isSelf: true,
      externalLink: "https://external-doc.com/rfc-draft",
    },
    {
      id: "msg-3",
      senderName: "Elena Vance",
      senderAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&h=120&q=80",
      time: "2:21 PM",
      body: "Reviewed the initial diagram. The data isolation boundaries match our compliance targets perfectly. Let's make sure Term #2 and Term #3 are confirmed in our workspace checklist!",
      isSelf: false,
    },
  ]);

  const [inputVal, setInputVal] = useState("");
  const [showCautionModal, setShowCautionModal] = useState(false);
  const [targetUrl, setTargetUrl] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const newMsg: ChatMessage = {
      id: "msg-" + Date.now(),
      senderName: "Alex Rivera",
      senderAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      body: inputVal.trim(),
      isSelf: true,
      externalLink: inputVal.includes("http") || inputVal.includes(".com") ? inputVal.trim() : undefined,
    };

    setMessages([...messages, newMsg]);
    setInputVal("");

    // Simulate Elena's response after a brief pause
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: "msg-" + Date.now(),
          senderName: "Elena Vance",
          senderAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&h=120&q=80",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          body: "Acknowledged! I will review and update our milestone roadmap.",
          isSelf: false,
        }
      ]);
    }, 1500);
  };

  const verifyLink = (url: string) => {
    setTargetUrl(url);
    setShowCautionModal(true);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 lg:px-8 py-6">
      
      {/* Session Security Indicator */}
      <div className="mb-4 bg-surface-container-low px-4 py-2 rounded-xl border border-surface-container-high/60 flex flex-wrap items-center justify-between gap-2 text-xs text-on-surface-variant">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[16px] text-primary">lock</span>
          <span className="font-semibold text-on-surface">End-to-End Encrypted Private Mesh</span>
          <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
          <span className="text-secondary font-medium">Session Key Validated</span>
        </div>
        <div className="flex items-center gap-4 text-[11px]">
          <span>Sync Latency: <strong className="text-on-surface">18ms</strong></span>
          <span className="flex items-center gap-1 text-secondary">
            <span className="material-symbols-outlined text-[14px]">shield</span>
            <span>Anti-solicitation filters active</span>
          </span>
        </div>
      </div>

      {/* Main Chat Grid (4 cols / 8 cols) */}
      <div className="grid grid-cols-12 bg-surface-container-lowest rounded-2xl shadow-card border border-surface-container-high/60 overflow-hidden min-h-[640px]">
        
        {/* Directory Sidebar */}
        <aside className="col-span-12 lg:col-span-4 border-r border-surface-container-high/60 flex flex-col bg-surface-container-low/40">
          <div className="p-4 space-y-3 border-b border-surface-container-high/60">
            <div className="flex items-center justify-between">
              <h2 className="font-heading font-extrabold text-base text-primary">Direct Messages</h2>
              <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-primary text-[11px] font-bold">4 Channels</span>
            </div>
            <div className="relative">
              <span className="material-symbols-outlined text-[16px] absolute left-3 top-2.5 text-outline">search</span>
              <input type="text" placeholder="Search conversations..." className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-surface-container border border-surface-container-high text-xs text-on-surface focus:outline-none"/>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-surface-container-high/40">
            {/* Elena Vance */}
            <div className="p-4 bg-surface-container-lowest border-l-4 border-primary cursor-pointer">
              <div className="flex items-start gap-3">
                <div className="relative shrink-0">
                  <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&h=120&q=80" className="w-10 h-10 rounded-full object-cover ring-1 ring-surface-container-highest"/>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-secondary ring-2 ring-white"></span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="font-bold text-xs text-on-surface truncate">Elena Vance</span>
                    <span className="text-[10px] text-outline">2:21 PM</span>
                  </div>
                  <span className="text-[11px] text-on-surface-variant block truncate">Founder @ Kestrel Flow</span>
                  <p className="text-xs text-on-surface-variant truncate mt-1">Reviewed the initial diagram. Architecture matches...</p>
                  <span className="mt-2 inline-block px-2 py-0.2 rounded-full bg-secondary-container text-on-secondary-container text-[10px] font-semibold">Active Collaboration</span>
                </div>
              </div>
            </div>

            {/* Marcus Brody */}
            <div className="p-4 hover:bg-surface-container-high/40 transition-colors cursor-pointer">
              <div className="flex items-start gap-3">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80" className="w-10 h-10 rounded-full object-cover"/>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="font-bold text-xs text-on-surface truncate">Marcus Brody</span>
                    <span className="text-[10px] text-outline">Yesterday</span>
                  </div>
                  <span className="text-[11px] text-on-surface-variant block truncate">Lead @ Arkea Health</span>
                  <p className="text-xs text-outline truncate mt-1">Counter-proposal sent for 0.75% milestone equity grant.</p>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Chat Thread */}
        <section className="col-span-12 lg:col-span-8 flex flex-col bg-surface-container-lowest">
          
          <div className="p-4 border-b border-surface-container-high/60 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&h=120&q=80" className="w-10 h-10 rounded-full object-cover ring-1 ring-surface-container-highest"/>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-sm text-on-surface">Elena Vance</h3>
                  <span className="px-1.5 py-0.2 rounded bg-secondary-container text-on-secondary-container text-[10px] font-bold">Identity Checked</span>
                  <span className="px-1.5 py-0.2 rounded bg-surface-container-high text-primary text-[10px] font-bold">Company Checked</span>
                </div>
                <span className="text-[11px] text-on-surface-variant">Founder @ Kestrel Flow • Requirement: B2B FinTech MVP</span>
              </div>
            </div>

            <Link href="/workspace" className="px-3 py-1.5 rounded-lg bg-surface-container text-primary hover:bg-surface-container-high text-xs font-bold flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">contract</span>
              <span>View Terms</span>
            </Link>
          </div>

          {/* Safety Notice Banner */}
          <div className="bg-surface-container-high px-4 py-2 border-b border-surface-container-highest text-xs text-on-surface-variant flex items-start gap-2">
            <span className="material-symbols-outlined text-tertiary text-[18px] shrink-0 mt-0.5">warning</span>
            <p className="text-[11px] leading-tight">
              <strong>Safety Notice:</strong> Never pay to apply, wire advance fees, or share bank logins. Report unsolicited off-platform cryptocurrency payment offers immediately.
            </p>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-surface-container-low/20">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex items-start gap-3 max-w-xl ${msg.isSelf ? "justify-end ml-auto" : ""}`}>
                {!msg.isSelf && <img src={msg.senderAvatar} className="w-7 h-7 rounded-full object-cover shrink-0 mt-1"/>}
                
                <div className={`space-y-1 ${msg.isSelf ? "flex flex-col items-end" : ""}`}>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-primary">{msg.senderName}</span>
                    <span className="text-[10px] text-outline">{msg.time}</span>
                  </div>

                  <div className={`p-3.5 rounded-2xl text-xs leading-relaxed ${msg.isSelf ? "bg-primary text-on-primary rounded-tr-sm shadow-sm" : "bg-surface-container-lowest text-on-surface rounded-tl-sm border border-surface-container-high/60 shadow-xs"}`}>
                    <p>{msg.body}</p>

                    {msg.externalLink && (
                      <div className="mt-2 p-2 bg-surface-container-lowest text-on-surface rounded-xl flex items-center justify-between gap-2 border border-surface-container-high">
                        <div className="flex items-center gap-1.5 truncate">
                          <span className="material-symbols-outlined text-[16px] text-tertiary">link_off</span>
                          <span className="font-mono text-[11px] text-primary underline truncate">{msg.externalLink}</span>
                        </div>
                        <button type="button" onClick={() => verifyLink(msg.externalLink!)} className="px-2 py-0.5 rounded bg-tertiary-container/30 text-tertiary text-[10px] font-bold shrink-0 hover:bg-tertiary-container/50 transition-colors">
                          Verify Link
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {msg.isSelf && <img src={msg.senderAvatar} className="w-7 h-7 rounded-full object-cover shrink-0 mt-1"/>}
              </div>
            ))}
          </div>

          {/* Input Form */}
          <div className="p-4 border-t border-surface-container-high/60 bg-surface-container-lowest">
            <form onSubmit={handleSend} className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Type a private message or paste a specification link..."
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-xl bg-surface-container-low border border-surface-container-high/60 text-xs text-on-surface focus:outline-none focus:border-primary"
              />
              <button type="submit" className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-container text-on-primary text-xs font-bold shadow-xs flex items-center gap-1">
                <span>Send</span>
                <span className="material-symbols-outlined text-[16px]">send</span>
              </button>
            </form>
          </div>

        </section>

      </div>

      {/* EXTERNAL LINK CAUTION MODAL */}
      {showCautionModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-2xl p-6 max-w-md w-full shadow-xl border border-surface-container-high space-y-4">
            <div className="flex items-center gap-3 text-tertiary">
              <div className="w-10 h-10 rounded-xl bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[24px]">security_update_warning</span>
              </div>
              <div>
                <h3 className="font-heading font-bold text-base text-on-surface">External Link Detected</h3>
                <span className="text-xs text-outline">Third-Party Domain Safety Check</span>
              </div>
            </div>

            <p className="text-xs text-on-surface leading-relaxed">
              Target address: <strong className="text-primary font-mono">{targetUrl}</strong>
            </p>

            <div className="p-3 bg-error-container/40 rounded-xl text-[11px] text-on-error-container space-y-1">
              <span className="font-bold block">Security Guidelines:</span>
              <ul className="list-disc pl-4 space-y-0.5">
                <li>Never re-enter your CoBuild platform password on external domains.</li>
                <li>Never pay advance recruitment or escrow fees outside mutually signed agreements.</li>
              </ul>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button type="button" onClick={() => setShowCautionModal(false)} className="px-4 py-2 rounded-xl text-on-surface-variant hover:bg-surface-container font-bold text-xs">Back to Safety</button>
              <button type="button" onClick={() => { setShowCautionModal(false); window.open(targetUrl, "_blank"); }} className="px-5 py-2 rounded-xl bg-primary text-on-primary font-bold text-xs hover:bg-primary-container">
                Proceed to Link
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
