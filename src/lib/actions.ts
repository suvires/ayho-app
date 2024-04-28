"use server";

import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { signIn } from "@/auth";
import {
  ROLE,
  API_ROUTES,
  MAX_UPLOAD_SIZE,
  ACCEPTED_IMAGE_TYPES,
  PROFILE_MAX_POSITIONS,
  PROFILE_MAX_SKILLS,
} from "@/constants";
import { AuthError } from "next-auth";

const authenticateSchema = z.object({
  email: z
    .string()
    .min(1, "El email es obligatorio")
    .email("Escribe un email válido"),
  password: z.string().min(1, "La contraseña es obligatoria"),
});

export async function authenticate(prevState: any, formData: FormData) {
  try {
    const email = formData.get("email");
    const password = formData.get("password");

    const validatedFields = authenticateSchema.safeParse({
      password,
      email,
    });

    if (!validatedFields.success) {
      return {
        ...prevState,
        errors: validatedFields.error.flatten().fieldErrors,
        message: "Revisa los errores de validación",
      };
    }

    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { message: "Email o contraseña incorrectos" };
        default:
          return { message: "Sign in error: " + error.message };
      }
    }
    throw error;
  }
  redirect("/offers");
}

const createUserSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  email: z
    .string()
    .min(1, "El email es boligatorio")
    .email("Escribe un email válido"),
  password: z
    .string()
    .min(1, "La contraseña es obligatoria")
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).*$/,
      "La contraseña debe tener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial."
    ),
});

export async function createUser(prevState: any, formData: FormData) {
  const name = formData.get("fullname");
  const password = formData.get("password");
  const email = formData.get("email");

  const validatedFields = createUserSchema.safeParse({
    name,
    password,
    email,
  });

  if (!validatedFields.success) {
    return {
      ...prevState,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Revisa los errores de validación",
    };
  }

  const role = ROLE.EMPLOYEE;

  try {
    const res = await fetch(
      `${process.env.BACKEND_URL}/${API_ROUTES.SIGN_UP}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, role }),
      }
    );

    if (!res.ok) {
      const errorData = await res.json();
      return {
        ...prevState,
        message: "API error: " + errorData.message,
      };
    }
  } catch (error: any) {
    return {
      message: "Sign up error: " + error.message,
    };
  }

  await authenticate(prevState, formData);
}

const createProfileSchema = z.object({
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
      message: "Solo puedes seleccionar hasta 3 puestos",
    }),
  skills: z
    .array(z.string())
    .nonempty({
      message: "Selecciona al menos una habilidad",
    })
    .max(PROFILE_MAX_SKILLS, {
      message: "Solo puedes seleccionar hasta 7 habilidades",
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
  image: z
    .any()
    .refine((file: File) => file?.size !== 0, "La imagen es obligatoria")
    .refine((file) => {
      return (
        !file ||
        (file instanceof File && ACCEPTED_IMAGE_TYPES.includes(file.type))
      );
    }, "El archivo debe ser PNG, JPG o JPEG")
    .refine(
      (file) => file?.size < MAX_UPLOAD_SIZE,
      "La imagen debe ocupar menos de 2MB."
    ),
});

export async function createProfile(prevState: any, formData: FormData) {
  const linkedin = formData.get("linkedin");
  const salary = formData.get("salary");
  const positions = formData.getAll("positions");
  const skills = formData.getAll("skills");
  const places = formData.getAll("places");
  const schedules = formData.getAll("schedules");
  const attendances = formData.getAll("attendances");
  const image = formData.get("image");

  const validatedFields = createProfileSchema.safeParse({
    linkedin,
    salary,
    positions,
    skills,
    places,
    schedules,
    attendances,
    image,
  });

  if (!validatedFields.success) {
    return {
      ...prevState,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Revisa los errores de validación",
    };
  }

  const session = await auth();

  try {
    const bodyFormData = new FormData();
    bodyFormData.append("linkedin", linkedin as string);
    bodyFormData.append("salary", salary as string);
    bodyFormData.append("positions", JSON.stringify(positions));
    bodyFormData.append("skills", JSON.stringify(skills));
    bodyFormData.append("places", JSON.stringify(places));
    bodyFormData.append("schedules", JSON.stringify(schedules));
    bodyFormData.append("attendances", JSON.stringify(attendances));
    bodyFormData.append("image", image as File);
    const res = await fetch(
      `${process.env.BACKEND_URL}/${API_ROUTES.CREATE_PROFILE}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session!.accessToken}`,
        },
        body: bodyFormData,
      }
    );
    if (!res.ok) {
      const errorData = await res.json();
      return {
        ...prevState,
        message: "API error: " + errorData.message,
      };
    }
  } catch (error: any) {
    return {
      message: "Create profile error: " + error.message,
    };
  }

  redirect("/offers");
}
