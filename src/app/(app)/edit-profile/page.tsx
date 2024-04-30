import {
  getUser,
  getAttendances,
  getPlaces,
  getPositions,
  getSchedules,
  getSkills,
} from "@/lib/services";
import { sortPlaces } from "@/lib/utils";
import EditProfileForm from "@/ui/profile/profile-edit-form";

export default async function Page() {
  const user = await getUser();

  const attendances = await getAttendances();
  const schedules = await getSchedules();
  const skills = await getSkills();
  const places = sortPlaces(await getPlaces());
  const positions = await getPositions();

  return (
    <EditProfileForm
      user={user}
      attendances={attendances}
      schedules={schedules}
      skills={skills}
      places={places}
      positions={positions}
    />
  );
}
