import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/sign-in");

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome {user?.email} </p>
    </div>
  );
}
