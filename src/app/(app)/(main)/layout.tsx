import { AppHeader } from "@/ui/components/app-header";
import { AppNavbar } from "@/ui/components/app-navbar";
import { getUser } from "@/lib/services";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();
  if (!user.profile) {
    redirect("/create-profile");
  }
  return (
    <main className="app">
      <AppHeader />
      <section className="app-content">{children}</section>
      <AppNavbar />
    </main>
  );
}
