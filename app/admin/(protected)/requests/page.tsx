"use client";

import React, { useEffect, useState } from "react";
import { FileText, ChevronDown, ChevronUp } from "lucide-react";
import { type DocumentRequest, type RequestStatus } from "@/lib/types";

const STATUS_OPTIONS: { value: RequestStatus; label: string; className: string }[] = [
  { value: "PENDING", label: "Pending", className: "bg-slate-100 text-slate-600" },
  { value: "PROCESSING", label: "Processing", className: "bg-gold/15 text-gold-deep" },
  { value: "READY_FOR_RELEASE", label: "Ready for Release", className: "bg-royal/10 text-royal" },
  { value: "RELEASED", label: "Released", className: "bg-emerald-50 text-emerald-600" },
  { value: "REJECTED", label: "Rejected", className: "bg-red-50 text-red-600" },
];

function statusMeta(status: RequestStatus) {
  return STATUS_OPTIONS.find((s) => s.value === status) ?? STATUS_OPTIONS[0];
}

export default function AdminRequestsPage() {
  const [items, setItems] = useState<DocumentRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [remarksDraft, setRemarksDraft] = useState<Record<string, string>>({});
  const [savingId, setSavingId] = useState<string | null>(null);

  async function refresh() {
    const res = await fetch("/api/requests");
    const data = await res.json();
    setItems(data);
    setLoading(false);
  }

  useEffect(() => {
    refresh();
  }, []);

  async function handleStatusChange(id: string, status: RequestStatus) {
    setItems((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
    await fetch(`/api/requests/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
  }

  function toggleExpand(item: DocumentRequest) {
    if (expandedId === item.id) {
      setExpandedId(null);
      return;
    }
    setExpandedId(item.id);
    setRemarksDraft((prev) => ({ ...prev, [item.id]: prev[item.id] ?? item.remarks ?? "" }));
  }

  async function handleSaveRemarks(id: string) {
    setSavingId(id);
    const remarks = remarksDraft[id] ?? "";
    await fetch(`/api/requests/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ remarks }),
    });
    setItems((prev) => prev.map((r) => (r.id === id ? { ...r, remarks } : r)));
    setSavingId(null);
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <p className="text-[13px] font-semibold tracking-widest text-gold-deep uppercase mb-1">
          Document Requests
        </p>
        <h1 className="font-display text-2xl sm:text-3xl font-semibold text-ink">Student Requests</h1>
        <p className="text-ink-soft text-sm mt-1">
          Submitted through the public request forms. Remarks you add here are visible to the student on the
          public tracking page.
        </p>
      </div>

      {loading ? (
        <p className="text-ink-soft text-sm">Loading…</p>
      ) : items.length === 0 ? (
        <div className="grad-border p-14 text-center">
          <div className="w-14 h-14 rounded-2xl bg-royal/10 flex items-center justify-center mx-auto mb-4">
            <FileText size={24} className="text-royal" />
          </div>
          <p className="font-semibold text-ink mb-1">No requests yet</p>
          <p className="text-[13.5px] text-ink-soft">Submitted document requests will show up here.</p>
        </div>
      ) : (
        <div className="grad-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[12px] text-ink-soft uppercase tracking-wide">
                  <th className="px-6 py-3 font-semibold">Reference</th>
                  <th className="px-6 py-3 font-semibold">Student</th>
                  <th className="px-6 py-3 font-semibold">Document</th>
                  <th className="px-6 py-3 font-semibold">Submitted</th>
                  <th className="px-6 py-3 font-semibold">Status</th>
                  <th className="px-6 py-3 font-semibold"></th>
                </tr>
              </thead>
              <tbody>
                {items.map((r) => {
                  const meta = statusMeta(r.status);
                  const expanded = expandedId === r.id;
                  const idf = r.details?.identification;
                  const del = r.details?.delivery;
                  return (
                    <React.Fragment key={r.id}>
                      <tr className="border-t border-slate-100 text-[13.5px] align-top">
                        <td className="px-6 py-4 font-mono text-ink-soft whitespace-nowrap">{r.reference}</td>
                        <td className="px-6 py-4">
                          <p className="font-medium text-ink">{r.studentName}</p>
                          <p className="text-[12px] text-ink-soft">{r.studentEmail}</p>
                          <p className="text-[12px] text-ink-soft">{r.studentMobile}</p>
                        </td>
                        <td className="px-6 py-4 text-ink-soft">{r.documentType.title}</td>
                        <td className="px-6 py-4 text-ink-soft whitespace-nowrap">
                          {new Date(r.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </td>
                        <td className="px-6 py-4">
                          <select
                            value={r.status}
                            onChange={(e) => handleStatusChange(r.id, e.target.value as RequestStatus)}
                            className={`text-[12px] font-semibold px-2.5 py-1.5 rounded-full border-0 ${meta.className}`}
                          >
                            {STATUS_OPTIONS.map((opt) => (
                              <option key={opt.value} value={opt.value}>
                                {opt.label}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => toggleExpand(r)}
                            className="text-[12.5px] font-semibold text-royal inline-flex items-center gap-1"
                          >
                            Details {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                          </button>
                        </td>
                      </tr>
                      {expanded && (
                        <tr className="border-t border-slate-100 bg-mist/60">
                          <td colSpan={6} className="px-6 py-4">
                            <div className="grid sm:grid-cols-2 gap-4 mb-4 text-[12.5px]">
                              <div>
                                <p className="font-semibold text-ink-soft mb-1">Identification</p>
                                {idf?.method === "known" ? (
                                  <p>Student #: {idf.studentNumber} · DOB: {idf.birthDate}</p>
                                ) : (
                                  <p>
                                    {idf?.firstName} {idf?.middleName} {idf?.lastName} · {idf?.college} ·{" "}
                                    {idf?.program} · {idf?.yearGraduatedOrLastAttended}
                                  </p>
                                )}
                              </div>
                              <div>
                                <p className="font-semibold text-ink-soft mb-1">Delivery</p>
                                {del?.method === "courier" ? (
                                  <p>
                                    Courier to {del.receiverName}, {del.address}, {del.cityMunicipality},{" "}
                                    {del.province} {del.zip} ({del.contactNumber})
                                  </p>
                                ) : (
                                  <p>Pick-up at the Registrar's Office</p>
                                )}
                              </div>
                              <div className="sm:col-span-2">
                                <p className="font-semibold text-ink-soft mb-1">Purpose</p>
                                <p>
                                  {r.purpose} — {r.details?.document?.copies} cop
                                  {r.details?.document?.copies === 1 ? "y" : "ies"}
                                  {r.details?.document?.specialInstructions
                                    ? ` · Note: ${r.details.document.specialInstructions}`
                                    : ""}
                                </p>
                              </div>
                            </div>

                            <label className="block text-[12.5px] font-semibold text-ink mb-1.5">
                              Remarks for the student
                            </label>
                            <textarea
                              rows={2}
                              value={remarksDraft[r.id] ?? ""}
                              onChange={(e) =>
                                setRemarksDraft((prev) => ({ ...prev, [r.id]: e.target.value }))
                              }
                              placeholder="e.g. Please settle payment at the cashier before release."
                              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm bg-white"
                            />
                            <button
                              onClick={() => handleSaveRemarks(r.id)}
                              disabled={savingId === r.id}
                              className="mt-3 btn-gold font-semibold px-5 py-2 rounded-full text-[13px] disabled:opacity-60"
                            >
                              {savingId === r.id ? "Saving…" : "Save Remarks"}
                            </button>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}