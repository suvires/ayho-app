"use client";

import { useFormState, useFormStatus } from "react-dom";
import { createOffer } from "@/lib/actions";
import {
  Attendance,
  Schedule,
  Position,
  Skill,
  Place,
} from "@/lib/definitions";

export default function CreateOfferForm({
  attendances,
  schedules,
  places,
  positions,
  skills,
}: {
  attendances: Attendance[];
  schedules: Schedule[];
  places: Place[];
  positions: Position[];
  skills: Skill[];
}) {
  const initialState = { message: "", errors: {} };
  const [state, dispatch] = useFormState(createOffer, initialState);

  return (
    <form action={dispatch}>
      <label htmlFor="title">Título</label>
      <input
        id="title"
        type="text"
        name="title"
        placeholder="Escribe el título de la oferta"
      />
      {state.errors?.title &&
        state.errors.title.map((error: string, index: number) => (
          <p key={index}>{error}</p>
        ))}

      <label htmlFor="description">Descripción</label>
      <textarea
        id="description"
        name="description"
        placeholder="Describe la oferta"
      />
      {state.errors?.description &&
        state.errors.description.map((error: string, index: number) => (
          <p key={index}>{error}</p>
        ))}

      <label htmlFor="salary">Salario</label>
      <input
        id="salary"
        type="text"
        name="salary"
        placeholder="Escribe el salario máximo"
      />
      {state.errors?.salary &&
        state.errors.salary.map((error: string, index: number) => (
          <p key={index}>{error}</p>
        ))}

      <label htmlFor="attendance">Modalidad</label>
      <select id="attendance" name="attendance_id">
        <option value="">Selecciona una modalidad</option>
        {attendances.map((attendance: Attendance) => (
          <option key={attendance.id} value={attendance.id}>
            {attendance.name}
          </option>
        ))}
      </select>
      {state.errors?.attendance_id &&
        state.errors.attendance_id.map((error: string, index: number) => (
          <p key={index}>{error}</p>
        ))}

      <label htmlFor="schedule">Jornada</label>
      <select id="schedule" name="schedule_id">
        <option value="">Selecciona un horario</option>
        {schedules.map((schedule: Schedule) => (
          <option key={schedule.id} value={schedule.id}>
            {schedule.name}
          </option>
        ))}
      </select>
      {state.errors?.schedule_id &&
        state.errors.schedule_id.map((error: string, index: number) => (
          <p key={index}>{error}</p>
        ))}

      <label htmlFor="places">Lugar</label>
      <select id="places" name="places" multiple>
        {places.map((place: Place) => (
          <option key={place.id} value={place.id}>
            {place.name}
          </option>
        ))}
      </select>
      {state.errors?.places &&
        state.errors.places.map((error: string, index: number) => (
          <p key={index}>{error}</p>
        ))}

      <label htmlFor="skills">Habilidades</label>
      <select id="skills" name="skills" multiple>
        {skills.map((skill: Skill) => (
          <option key={skill.id} value={skill.id}>
            {skill.name}
          </option>
        ))}
      </select>
      {state.errors?.skills &&
        state.errors.skills.map((error: string, index: number) => (
          <p key={index}>{error}</p>
        ))}

      <label htmlFor="positions">Rol</label>
      <select id="positions" name="positions" multiple>
        {positions.map((position: Position) => (
          <option key={position.id} value={position.id}>
            {position.name}
          </option>
        ))}
      </select>
      {state.errors?.positions &&
        state.errors.positions.map((error: string, index: number) => (
          <p key={index}>{error}</p>
        ))}

      {state.message && <p>{state.message}</p>}
      <FormButton />
    </form>
  );
}

function FormButton() {
  const { pending } = useFormStatus();

  return <button aria-disabled={pending}>Crear oferta</button>;
}
