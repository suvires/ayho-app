import { signOut } from "@/auth";
import { getUser } from "@/lib/services";
import { ProfileView } from "@/ui/profile/Profile";

export default async function Page() {
  const user = await getUser();

  return (
    <>
      <ProfileView user={user} />
      <form
        action={async (formData) => {
          "use server";
          await signOut({ redirectTo: "/" });
        }}
      >
        <button className="btn btn--primary">Salir</button>
      </form>
    </>
  );
}
