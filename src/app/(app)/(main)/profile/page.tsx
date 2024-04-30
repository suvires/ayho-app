import { signOut } from "@/auth";
import { getUser } from "@/lib/services";
import { ProfileView } from "@/ui/profile/Profile";
import Link from "next/link";

export default async function Page() {
  const user = await getUser();

  return (
    <>
      <ProfileView user={user} />
      <div className="profile-buttons">
        <Link className="btn btn--primary" href="/edit-profile">
          Editar perfil
        </Link>
        <form
          action={async (formData) => {
            "use server";
            await signOut({ redirectTo: "/" });
          }}
        >
          <button className="btn btn--tertiary">Salir</button>
        </form>
      </div>
    </>
  );
}
