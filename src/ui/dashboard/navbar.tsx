import { auth, signOut } from "@/auth";
import { getProfile } from "@/lib/services";
import Link from "next/link";

export default async function Navbar() {
  const profile = await getProfile();

  return (
    <>
      <Link href="/dashboard/">Dashboard</Link>
      {profile.company && (
        <Link href="/dashboard/offers/create">Publicar oferta</Link>
      )}
      <p>User id: {profile.id}</p>
      <p>User name: {profile.name}</p>
      <p>User email: {profile.email}</p>
      <form
        action={async (formData) => {
          "use server";
          await signOut({ redirectTo: "/" });
        }}
      >
        <button>Salir</button>
      </form>
    </>
  );
}
