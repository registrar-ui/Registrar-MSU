import { redirect } from "next/navigation";

export default function AdminIndexPage() {
  // Middleware already ensures only authenticated requests reach here,
  // so we can just send everyone straight to the dashboard.
  redirect("/admin/dashboard");
}