"use client";

import { useState } from "react";

export default function AdminPage() {
  const [users, setUsers] = useState([
    { id: "usr-1", name: "Elena Vance", email: "elena.vance@kestrel.flow", role: "FOUNDER", verified: "Company + ID", status: "ACTIVE" },
    { id: "usr-2", name: "Alex Rivera", email: "alex.rivera@cobuild.network", role: "BUILDER", verified: "Portfolio + ID", status: "ACTIVE" },
    { id: "usr-3", name: "Devon Clark", email: "devon@cryptopool.io", role: "BUILDER", verified: "Unverified", status: "FLAGGED" },
  ]);

  const toggleStatus = (id: string) => {
    setUsers(users.map(u => {
      if (u.id === id) {
        const next = u.status === "ACTIVE" ? "SUSPENDED" : "ACTIVE";
        return { ...u, status: next };
      }
      return u;
    }));
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-primary">Operations & Safety Console</span>
          <h1 className="font-heading font-extrabold text-2xl text-primary mt-1">Platform KPI & Moderation Dashboard</h1>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse"></span>
          <span className="text-xs font-bold text-secondary">All Safety Systems Normal</span>
        </div>
      </div>

      {/* KPI Bento Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-card border border-surface-container-high/60 space-y-1">
          <span className="text-xs text-on-surface-variant">Connected GMV Volume</span>
          <div className="font-heading font-extrabold text-2xl text-primary">$1,420,000</div>
          <span className="text-[11px] text-secondary font-semibold">+18% this month</span>
        </div>
        <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-card border border-surface-container-high/60 space-y-1">
          <span className="text-xs text-on-surface-variant">Active Collaborations</span>
          <div className="font-heading font-extrabold text-2xl text-secondary">142</div>
          <span className="text-[11px] text-on-surface-variant">Stage Gate Locked</span>
        </div>
        <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-card border border-surface-container-high/60 space-y-1">
          <span className="text-xs text-on-surface-variant">Verified Badges Issued</span>
          <div className="font-heading font-extrabold text-2xl text-primary">894</div>
          <span className="text-[11px] text-secondary font-semibold">Dual-Verified</span>
        </div>
        <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-card border border-surface-container-high/60 space-y-1">
          <span className="text-xs text-on-surface-variant">Flagged Reports Queue</span>
          <div className="font-heading font-extrabold text-2xl text-tertiary">0 Pending</div>
          <span className="text-[11px] text-secondary font-semibold">100% Cleared</span>
        </div>
      </div>

      {/* Moderation Review Queue */}
      <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-card border border-surface-container-high/60 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-heading font-bold text-base text-on-surface">Community Safety & User Audit Queue</h3>
          <span className="text-xs text-outline">Reason-mandated logging active</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="text-on-surface-variant uppercase text-[10px] tracking-wider border-b border-surface-container-high bg-surface-container-low/40">
              <tr>
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Verification</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Moderation Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container-high/60">
              {users.map(u => (
                <tr key={u.id}>
                  <td className="py-3 px-4 font-bold text-on-surface">{u.name}</td>
                  <td className="py-3 px-4">{u.role}</td>
                  <td className="py-3 px-4 font-mono text-[11px]">{u.verified}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${u.status === "ACTIVE" ? "bg-secondary-fixed text-on-secondary-fixed" : "bg-error-container text-on-error-container"}`}>
                      {u.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      type="button"
                      onClick={() => toggleStatus(u.id)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold ${u.status === "ACTIVE" ? "text-error hover:bg-error-container/30" : "text-secondary hover:bg-secondary-fixed/40"}`}
                    >
                      {u.status === "ACTIVE" ? "Suspend Account" : "Restore Account"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
