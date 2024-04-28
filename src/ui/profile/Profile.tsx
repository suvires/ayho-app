import { ProfileImage } from "@/ui/components/profile-image";
import { User } from "@/lib/definitions";
import Link from "next/link";

export function ProfileView({ user }: { user: User }) {
  console.log(user);
  return (
    <>
      <ProfileImage
        src={
          (user.profile.image_url &&
            `${process.env.BACKEND_URL}/${user.profile.image_url}`) ||
          "/images/avatar.png"
        }
      />

      <h2>Mi nombre</h2>
      <p>{user.name}</p>
      <h2>Mi email</h2>
      <p>{user.email}</p>
      <h2>Mi LinkedIn</h2>
      <p>
        <Link href={`https://linkedin.com/in/${user.profile.linkedin}`}>
          https://linkedin.com/in/{user.profile.linkedin}
        </Link>
      </p>
      <h2>Mis expectativas salariales</h2>
      {`${Number(user.profile.salary)
        .toLocaleString("es-ES", { useGrouping: true })
        .replace(/\./g, " ")} €`}
      <h2>Mi perfil profesional</h2>
      <ul className="tags">
        {user.positions.map((position) => (
          <li key={`tag--position-${position.id}`}>
            <span>{position.name}</span>
          </li>
        ))}
      </ul>
      <h2>Mis mejores habilidades</h2>
      <ul className="tags">
        {user.skills.map((skill) => (
          <li key={`tag--skill-${skill.id}`}>
            <span>{skill.name}</span>
          </li>
        ))}
      </ul>
      <h2>Lugares desde donde trabajar</h2>
      <ul className="tags">
        {user.places.map((place) => (
          <li key={`tag--place-${place.id}`}>
            <span>{place.name}</span>
          </li>
        ))}
      </ul>
      <h2>Jornada laboral</h2>
      <ul className="tags">
        {user.schedules.map((schedule) => (
          <li key={`tag--schedule-${schedule.id}`}>
            <span>{schedule.name}</span>
          </li>
        ))}
      </ul>
      <h2>Presencialidad</h2>
      <ul className="tags">
        {user.attendances.map((attendance) => (
          <li key={`tag--attendance-${attendance.id}`}>
            <span>{attendance.name}</span>
          </li>
        ))}
      </ul>
    </>
  );
}
