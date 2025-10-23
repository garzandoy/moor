import { redirect } from "next/navigation";
import { createSupabaseServer } from "@/lib/supabaseServer";

export default async function Dashboard() {
  const supabase = createSupabaseServer();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-2">Dashboard</h1>
      <p>Welcome, {user.email}</p>
    </div>
  );
} 