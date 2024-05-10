"use client";

import Image from "next/image";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { z } from "zod";
import { createProfile } from "@/lib/actions";
import { ProgressBar } from "@/ui/components/progress-bar";
import {
  PROFILE_MAX_POSITIONS,
  CREATE_PROFILE_STEPS,
  PROFILE_MAX_SKILLS,
} from "@/constants";
import {
  User,
  Attendance,
  Schedule,
  Position,
  Skill,
  Place,
} from "@/lib/definitions";
import { ProfileImage } from "../components/profile-image";
import { readFileAsDataURL } from "@/lib/utils";

interface FormErrors {
  linkedin?: string[];
  salary?: string[];
  positions?: string[];
  skills?: string[];
  places?: string[];
  schedules?: string[];
  attendances?: string[];
  image?: string[];
}

export default function CreateProfileForm({
  user,
  attendances,
  schedules,
  places,
  positions,
  skills,
}: {
  user: User;
  attendances: Attendance[];
  schedules: Schedule[];
  places: Place[];
  positions: Position[];
  skills: Skill[];
}) {
  const initialState = { message: "", errors: {} };
  const [state, dispatch] = useFormState(createProfile, initialState);
  const lastStep = CREATE_PROFILE_STEPS;
  const [currentStep, setCurrentStep] = useState(0);
  const [linkedinValue, setLinkedinValue] = useState("");
  const salaryRangeRef = useRef<HTMLInputElement>(null);
  const salaryOutputRef = useRef<HTMLOutputElement>(null);
  const [salaryValue, setSalaryValue] = useState("0");
  const [positionsValue, setPositionsValue] = useState<number[]>([]);
  const [skillsValue, setSkillsValue] = useState<number[]>([]);
  const [placesValue, setPlacesValue] = useState<number[]>([]);
  const [schedulesValue, setSchedulesValue] = useState<number[]>([]);
  const [attendancesValue, setAttendancesValue] = useState<number[]>([]);
  const [errors, setErrors] = useState<FormErrors>({});
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    if (salaryValue && salaryOutputRef.current) {
      const value = Number(salaryValue);
      const min = Number((salaryRangeRef.current as HTMLInputElement).min);
      const max = Number((salaryRangeRef.current as HTMLInputElement).max);
      const relativeValue = ((value - min) * 100) / (max - min);
      salaryOutputRef.current.style.left = `calc(${relativeValue}% + (${
        8 - relativeValue * 0.15
      }px))`;
    }
  }, [salaryValue]);

  const handleLinkedinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLinkedinValue(e.target.value);
  };

  const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSalaryValue(e.target.value);
  };

  const handlePositionsChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    position_id: number
  ) => {
    const checked = e.target.checked;
    if (checked) {
      setPositionsValue([...positionsValue, position_id]);
    } else {
      setPositionsValue(positionsValue.filter((id) => id !== position_id));
    }
  };

  const handleSkillsChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    skill_id: number
  ) => {
    const checked = e.target.checked;
    if (checked) {
      setSkillsValue([...skillsValue, skill_id]);
    } else {
      setSkillsValue(skillsValue.filter((id) => id !== skill_id));
    }
  };

  const handlePlacesChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    place_id: number
  ) => {
    const checked = e.target.checked;
    if (checked) {
      setPlacesValue([...placesValue, place_id]);
    } else {
      setPlacesValue(placesValue.filter((id) => id !== place_id));
    }
  };

  const handleSchedulesChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    schedule_id: number
  ) => {
    const checked = e.target.checked;
    if (checked) {
      setSchedulesValue([...schedulesValue, schedule_id]);
    } else {
      setSchedulesValue(schedulesValue.filter((id) => id !== schedule_id));
    }
  };

  const handleAttendancesChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    attendance_id: number
  ) => {
    const checked = e.target.checked;
    if (checked) {
      setAttendancesValue([...attendancesValue, attendance_id]);
    } else {
      setAttendancesValue(
        attendancesValue.filter((id) => id !== attendance_id)
      );
    }
  };

  const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      try {
        const previewUrl = await readFileAsDataURL(file);
        setPreviewImage(previewUrl);
      } catch (error) {
        console.error("Error reading file: ", error);
      }
    }
  };

  const handleStep = (step: number) => {
    if (step > 0) {
      const formSchema = z.object({
        linkedin: z
          .string()
          .min(1, { message: "El perfil de LindikedIn es obligatorio" }),
        salary: z.string().refine((val: any) => Number(val) > 0, {
          message: "Las expectativas salariales son obligatorias",
        }),
        positions: z
          .array(z.string())
          .nonempty({
            message: "Selecciona al menos un puesto",
          })
          .max(PROFILE_MAX_POSITIONS, {
            message: "Solo puedes seleccionar hasta 5 puestos",
          }),
        skills: z
          .array(z.string())
          .nonempty({
            message: "Selecciona al menos una habilidad",
          })
          .max(PROFILE_MAX_SKILLS, {
            message: "Solo puedes seleccionar hasta 10 habilidades",
          }),
        places: z.array(z.string()).nonempty({
          message: "Selecciona al menos una ciudad",
        }),
        schedules: z.array(z.string()).nonempty({
          message: "Selecciona al menos un tipo jornada",
        }),
        attendances: z.array(z.string()).nonempty({
          message: "Selecciona al menos una modalidad",
        }),
      });
      let validateFields;
      switch (currentStep) {
        case 1:
          setErrors({});
          const linkedinSchema = formSchema.pick({ linkedin: true });
          validateFields = linkedinSchema.safeParse({
            linkedin: linkedinValue,
          });
          break;
        case 2:
          setErrors({});
          const salarySchema = formSchema.pick({ salary: true });
          validateFields = salarySchema.safeParse({
            salary: salaryValue,
          });
          break;
        case 3:
          setErrors({});
          const positionsSchema = formSchema.pick({ positions: true });
          validateFields = positionsSchema.safeParse({
            positions: positionsValue.map((id) => String(id)),
          });
          break;
        case 4:
          setErrors({});
          const skillsSchema = formSchema.pick({ skills: true });
          validateFields = skillsSchema.safeParse({
            skills: skillsValue.map((id) => String(id)),
          });
          break;
        case 5:
          setErrors({});
          const schedulesSchema = formSchema.pick({ schedules: true });
          validateFields = schedulesSchema.safeParse({
            schedules: schedulesValue.map((id) => String(id)),
          });
          break;
        case 6:
          setErrors({});
          const attendancesSchema = formSchema.pick({ attendances: true });
          validateFields = attendancesSchema.safeParse({
            attendances: attendancesValue.map((id) => String(id)),
          });
          break;
        case 7:
          setErrors({});
          const placesSchema = formSchema.pick({ places: true });
          validateFields = placesSchema.safeParse({
            places: placesValue.map((id) => String(id)),
          });
          break;
        default:
          validateFields = formSchema.partial().safeParse({});
      }
      if (!validateFields.success) {
        setErrors(validateFields.error.flatten().fieldErrors);
        return;
      }
    }
    setCurrentStep((prevStep) => prevStep + step);
  };

  return (
    <>
      {currentStep > 0 && (
        <Image
          src="/images/icons/back.png"
          width={32}
          height={60}
          alt="Atrás"
          className="back"
          priority={true}
          onClick={() => handleStep(-1)}
        />
      )}
      <ProgressBar progress={(100 / lastStep) * currentStep} />
      <form className="form" action={dispatch}>
        <div
          className={`step ${currentStep > 0 ? "step--past" : ""} ${
            currentStep === 0 ? "step--current" : ""
          } ${currentStep < 0 ? "step--future" : ""}`}
        >
          <div className="form-group">
            <h2>¡Hola, {user.name}!</h2>
            <p>Antes de empezar a encontrar ofertas, completa tu perfil.</p>
          </div>
          <div className="form-footer">
            <button
              type="button"
              onClick={() => {
                handleStep(1);
              }}
              className="btn btn--primary"
            >
              Comenzar
            </button>
          </div>
        </div>

        <div
          className={`step ${currentStep > 1 ? "step--past" : ""} ${
            currentStep === 1 ? "step--current" : ""
          } ${currentStep < 1 ? "step--future" : ""}`}
        >
          <div className="form-group">
            <label htmlFor="linkedin">Tu perfil de LinkedIn</label>
            <div className="linkedin-input-container">
              <span className="linkedin-input-prefix">
                https://linkedin.com/in/
              </span>
              <input
                id="linkedin"
                name="linkedin"
                type="text"
                onChange={handleLinkedinChange}
              />
            </div>
            {errors?.linkedin &&
              errors.linkedin.map((error: string, index: number) => (
                <p className="error" key={index}>
                  {error}
                </p>
              ))}
            {state.errors?.linkedin &&
              state.errors.linkedin.map((error: string, index: number) => (
                <p className="error" key={index}>
                  {error}
                </p>
              ))}
          </div>
          <div className="form-footer">
            <button
              type="button"
              onClick={() => {
                handleStep(1);
              }}
              className="btn btn--primary"
            >
              Continuar
            </button>
          </div>
        </div>

        <div
          className={`step ${currentStep > 2 ? "step--past" : ""} ${
            currentStep === 2 ? "step--current" : ""
          } ${currentStep < 2 ? "step--future" : ""}`}
        >
          <div className="form-group">
            <label htmlFor="salary">Tus expectativas salariales</label>
            <small>Las empresas no verán tus expectativas salariales</small>
            <div className="range">
              <input
                ref={salaryRangeRef}
                type="range"
                min="12000"
                max="100000"
                step="1000"
                id="salary"
                name="salary"
                defaultValue="0"
                onChange={handleSalaryChange}
              />
              {Number(salaryValue) > 0 && (
                <output htmlFor="salary" ref={salaryOutputRef}>
                  {`${Number(salaryValue)
                    .toLocaleString("es-ES", { useGrouping: true })
                    .replace(/\./g, " ")} €`}
                </output>
              )}
            </div>
            {errors?.salary &&
              errors.salary.map((error: string, index: number) => (
                <p className="error" key={index}>
                  {error}
                </p>
              ))}
            {state.errors?.salary &&
              state.errors.salary.map((error: string, index: number) => (
                <p className="error" key={index}>
                  {error}
                </p>
              ))}
          </div>
          <div className="form-footer">
            <button
              type="button"
              onClick={() => {
                handleStep(1);
              }}
              className="btn btn--primary"
            >
              Continuar
            </button>
          </div>
        </div>

        <div
          className={`step ${currentStep > 3 ? "step--past" : ""} ${
            currentStep === 3 ? "step--current" : ""
          } ${currentStep < 3 ? "step--future" : ""}`}
        >
          <div className="form-group">
            <h2>¿Qué puestos te gustaría desempeñar?</h2>
            <small>Puedes seleccionar hasta 3 puestos</small>
            <ul className="tags">
              {positions.map((position) => (
                <li
                  key={position.id}
                  className={
                    !positionsValue.includes(position.id) &&
                    positionsValue.length >= PROFILE_MAX_POSITIONS
                      ? "disabled"
                      : positionsValue.includes(position.id)
                      ? "active"
                      : ""
                  }
                >
                  <label htmlFor={`position-${position.id}`}>
                    <input
                      name="positions"
                      type="checkbox"
                      checked={positionsValue.includes(position.id)}
                      id={`position-${position.id}`}
                      value={position.id}
                      disabled={
                        !positionsValue.includes(position.id) &&
                        positionsValue.length >= PROFILE_MAX_POSITIONS
                      }
                      onChange={(e) => {
                        handlePositionsChange(e, position.id);
                      }}
                    />
                    {position.name}
                  </label>
                </li>
              ))}
            </ul>
            {errors?.positions &&
              errors.positions.map((error: string, index: number) => (
                <p className="error" key={index}>
                  {error}
                </p>
              ))}
            {state.errors?.positions &&
              state.errors.positions.map((error: string, index: number) => (
                <p className="error" key={index}>
                  {error}
                </p>
              ))}
          </div>
          <div className="form-footer">
            <button
              type="button"
              onClick={() => {
                handleStep(1);
              }}
              className="btn btn--primary"
            >
              Continuar
            </button>
          </div>
        </div>

        <div
          className={`step ${currentStep > 4 ? "step--past" : ""} ${
            currentStep === 4 ? "step--current" : ""
          } ${currentStep < 4 ? "step--future" : ""}`}
        >
          <div className="form-group">
            <h2>Tus mejores habilidades</h2>
            <small>Puedes seleccionar hasta 7 habilidades</small>
            <ul className="tags">
              {skills.map((skill) => (
                <li
                  key={skill.id}
                  className={
                    !skillsValue.includes(skill.id) &&
                    skillsValue.length >= PROFILE_MAX_SKILLS
                      ? "disabled"
                      : skillsValue.includes(skill.id)
                      ? "active"
                      : ""
                  }
                >
                  <label htmlFor={`skill-${skill.id}`}>
                    <input
                      name="skills"
                      type="checkbox"
                      checked={skillsValue.includes(skill.id)}
                      id={`skill-${skill.id}`}
                      value={skill.id}
                      disabled={
                        !skillsValue.includes(skill.id) &&
                        skillsValue.length >= PROFILE_MAX_SKILLS
                      }
                      onChange={(e) => {
                        handleSkillsChange(e, skill.id);
                      }}
                    />
                    {skill.name}
                  </label>
                </li>
              ))}
            </ul>
            {errors?.skills &&
              errors.skills.map((error: string, index: number) => (
                <p className="error" key={index}>
                  {error}
                </p>
              ))}
            {state.errors?.skills &&
              state.errors.skills.map((error: string, index: number) => (
                <p className="error" key={index}>
                  {error}
                </p>
              ))}
          </div>
          <div className="form-footer">
            <button
              type="button"
              onClick={() => {
                handleStep(1);
              }}
              className="btn btn--primary"
            >
              Continuar
            </button>
          </div>
        </div>

        <div
          className={`step ${currentStep > 5 ? "step--past" : ""} ${
            currentStep === 5 ? "step--current" : ""
          } ${currentStep < 5 ? "step--future" : ""}`}
        >
          <div className="form-group">
            <h2>¿Qué jornada laboral prefieres?</h2>
            <ul className="tags">
              {schedules.map((schedule) => (
                <li
                  key={schedule.id}
                  className={
                    schedulesValue.includes(schedule.id) ? "active" : ""
                  }
                >
                  <label htmlFor={`schedule-${schedule.id}`}>
                    <input
                      name="schedules"
                      type="checkbox"
                      checked={schedulesValue.includes(schedule.id)}
                      id={`schedule-${schedule.id}`}
                      value={schedule.id}
                      onChange={(e) => {
                        handleSchedulesChange(e, schedule.id);
                      }}
                    />
                    {schedule.name}
                  </label>
                </li>
              ))}
            </ul>
            {errors?.schedules &&
              errors.schedules.map((error: string, index: number) => (
                <p className="error" key={index}>
                  {error}
                </p>
              ))}
            {state.errors?.schedules &&
              state.errors.schedules.map((error: string, index: number) => (
                <p className="error" key={index}>
                  {error}
                </p>
              ))}
          </div>
          <div className="form-footer">
            <button
              type="button"
              onClick={() => {
                handleStep(1);
              }}
              className="btn btn--primary"
            >
              Continuar
            </button>
          </div>
        </div>

        <div
          className={`step ${currentStep > 6 ? "step--past" : ""} ${
            currentStep === 6 ? "step--current" : ""
          } ${currentStep < 6 ? "step--future" : ""}`}
        >
          <div className="form-group">
            <h2>¿Presencial, híbrido o en remoto?</h2>
            <ul className="tags">
              {attendances.map((attendance) => (
                <li
                  key={attendance.id}
                  className={
                    attendancesValue.includes(attendance.id) ? "active" : ""
                  }
                >
                  <label htmlFor={`attendance-${attendance.id}`}>
                    <input
                      name="attendances"
                      type="checkbox"
                      checked={attendancesValue.includes(attendance.id)}
                      id={`attendance-${attendance.id}`}
                      value={attendance.id}
                      onChange={(e) => {
                        handleAttendancesChange(e, attendance.id);
                      }}
                    />
                    {attendance.name}
                  </label>
                </li>
              ))}
            </ul>
            {errors?.attendances &&
              errors.attendances.map((error: string, index: number) => (
                <p className="error" key={index}>
                  {error}
                </p>
              ))}
            {state.errors?.attendances &&
              state.errors.attendances.map((error: string, index: number) => (
                <p className="error" key={index}>
                  {error}
                </p>
              ))}
          </div>
          <div className="form-footer">
            <button
              type="button"
              onClick={() => {
                handleStep(1);
              }}
              className="btn btn--primary"
            >
              Continuar
            </button>
          </div>
        </div>

        <div
          className={`step ${currentStep > 7 ? "step--past" : ""} ${
            currentStep === 7 ? "step--current" : ""
          } ${currentStep < 7 ? "step--future" : ""}`}
        >
          <div className="form-group">
            <h2>¿Desde dónde quieres trabajar?</h2>
            <ul className="tags">
              {places.map((place) => (
                <li
                  key={place.id}
                  className={placesValue.includes(place.id) ? "active" : ""}
                >
                  <label htmlFor={`place-${place.id}`}>
                    <input
                      name="places"
                      type="checkbox"
                      checked={placesValue.includes(place.id)}
                      id={`place-${place.id}`}
                      value={place.id}
                      onChange={(e) => {
                        handlePlacesChange(e, place.id);
                      }}
                    />
                    {place.name}
                  </label>
                </li>
              ))}
            </ul>
            {errors?.places &&
              errors.places.map((error: string, index: number) => (
                <p className="error" key={index}>
                  {error}
                </p>
              ))}
            {state.errors?.places &&
              state.errors.places.map((error: string, index: number) => (
                <p className="error" key={index}>
                  {error}
                </p>
              ))}
          </div>
          <div className="form-footer">
            <button
              type="button"
              onClick={() => {
                handleStep(1);
              }}
              className="btn btn--primary"
            >
              Continuar
            </button>
          </div>
        </div>

        <div
          className={`step ${currentStep > 8 ? "step--past" : ""} ${
            currentStep === 8 ? "step--current" : ""
          } ${currentStep < 8 ? "step--future" : ""}`}
        >
          <div className="form-group">
            <label htmlFor="image">Tu mejor foto</label>
            <ProfileImage
              src={
                previewImage && !errors.image
                  ? previewImage
                  : "/images/avatar.png"
              }
              editable={true}
              htmlFor="image"
            />
            <input
              type="file"
              id="image"
              name="image"
              accept="image/jpeg, image/png"
              onInput={handleImageChange}
              className="visually-hidden"
            />
            {state.errors?.image &&
              state.errors.image.map((error: string, index: number) => (
                <p className="error" key={index}>
                  {error}
                </p>
              ))}
          </div>
          <div className="form-footer">
            {state.message && <p className="error">{state.message}</p>}
            <FormButton />
          </div>
        </div>
      </form>
    </>
  );
}
function FormButton() {
  const { pending } = useFormStatus();

  return (
    <button className="btn btn--primary" disabled={pending}>
      {pending ? "Cargando..." : "Crear perfil"}
    </button>
  );
}
