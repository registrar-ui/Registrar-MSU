import Link from "next/link";
import {
  FileText,
  Clock,
  CheckCircle2,
  Users,
  ArrowRight,
  Megaphone,
} from "lucide-react";

const stats = [
  { label: "Pending Requests", value: "24", icon: Clock, tone: "bg-gold/15 text-gold-deep" },
  { label: "Processed Today", value: "58", icon: CheckCircle2, tone: "bg-emerald-50 text-emerald-600" },
  { label: "Total Students", value: "12,480", icon: Users, tone: "bg-royal/10 text-royal" },
  { label: "Documents Released", value: "25,110", icon: FileText, tone: "bg-royal/10 text-royal" },
];

const recentRequests = [
  { id: "TR-08842", student: "Maria Dela Cruz", type: "Transcript of Records", status: "Processing" },
  { id: "CE-05521", student: "Jerome Amora", type: "Certificate of Enrollment", status: "Released" },
  { id: "DP-01193", student: "Angel Santos", type: "Diploma Copy", status: "Pending Payment" },
  { id: "GM-07765", student: "Kevin Lopez", type: "Good Moral", status: "Released" },
];

const statusStyle: Record<string, string> = {
  Processing: "bg-gold/15 text-gold-deep",
  Released: "bg-emerald-50 text-emerald-600",
  "Pending Payment": "bg-red-50 text-red-600",
};

export default function AdminDashboardPage() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <p className="text-[13px] font-semibold tracking-widest text-gold-deep uppercase mb-1">Overview</p>
        <h1 className="font-display text-2xl sm:text-3xl font-semibold text-ink">Welcome back</h1>
        <p className="text-ink-soft text-sm mt-1">Here's what's happening in the registrar office today.</p>
      </div>

      {/* stat cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {stats.map((s) => (
          <div key={s.label} className="grad-border p-5">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${s.tone}`}>
              <s.icon size={19} />
            </div>
            <p className="font-display text-2xl font-semibold text-ink">{s.value}</p>
            <p className="text-[13px] text-ink-soft mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* quick action */}
      <div className="grad-border p-6 mb-10 flex items-center justify-between flex-wrap gap-4 bg-gradient-to-r from-royal to-royal-mid text-white !bg-none">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center">
            <Megaphone size={22} />
          </div>
          <div>
            <p className="font-semibold">Post a new announcement</p>
            <p className="text-white/70 text-[13px]">Enrollment notices, graduation updates, and system alerts.</p>
          </div>
        </div>
        <Link
          href="/admin/announcements"
          className="btn-gold font-semibold px-5 py-2.5 rounded-full text-[14px] inline-flex items-center gap-2"
        >
          New Announcement <ArrowRight size={16} />
        </Link>
      </div>

      {/* recent requests table */}
      <div className="grad-border overflow-hidden">
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
          <h2 className="font-semibold text-ink">Recent Document Requests</h2>
          <Link href="/admin/requests" className="text-[13px] font-semibold text-royal inline-flex items-center gap-1">
            View all <ArrowRight size={14} />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[12px] text-ink-soft uppercase tracking-wide">
                <th className="px-6 py-3 font-semibold">Reference</th>
                <th className="px-6 py-3 font-semibold">Student</th>
                <th className="px-6 py-3 font-semibold">Document</th>
                <th className="px-6 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentRequests.map((r) => (
                <tr key={r.id} className="border-t border-slate-100 text-[13.5px]">
                  <td className="px-6 py-4 font-mono text-ink-soft">{r.id}</td>
                  <td className="px-6 py-4 font-medium text-ink">{r.student}</td>
                  <td className="px-6 py-4 text-ink-soft">{r.type}</td>
                  <td className="px-6 py-4">
                    <span className={`text-[11.5px] font-semibold px-2.5 py-1 rounded-full ${statusStyle[r.status]}`}>
                      {r.status}
                    </span>
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