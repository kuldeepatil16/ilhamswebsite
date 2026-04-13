import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminLogin from "@/components/admin/AdminLogin";
import { ADMIN_EMAILS } from "@/lib/constants";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <AdminLogin />;
  }

  if (!user.email || !ADMIN_EMAILS.includes(user.email as (typeof ADMIN_EMAILS)[number])) {
    redirect("/");
  }

  return (
    <div className="ui-page mx-auto flex max-w-7xl gap-6 px-4 py-8 lg:px-8">
      <AdminSidebar />
      <main className="min-w-0 flex-1">{children}</main>
    </div>
  );
}
