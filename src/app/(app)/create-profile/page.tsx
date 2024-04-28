import {
  getUser,
  getAttendances,
  getPlaces,
  getPositions,
  getSchedules,
  getSkills,
} from "@/lib/services";
import { sortPlaces } from "@/lib/utils";
import CreateProfileForm from "@/ui/profile/profile-create-form";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = await getUser();
  if (user.profile) {
    redirect("/profile");
  }
  const attendances = await getAttendances();
  const schedules = await getSchedules();
  const skills = await getSkills();
  const places = sortPlaces(await getPlaces());
  const positions = await getPositions();

  return (
    <CreateProfileForm
      user={user}
      attendances={attendances}
      schedules={schedules}
      skills={skills}
      places={places}
      positions={positions}
    />
  );
}
