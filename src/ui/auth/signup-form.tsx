"use client";

import { useFormState, useFormStatus } from "react-dom";
import { createUser } from "@/lib/actions";

export default function SignUpForm() {
  const initialState = { message: "", errors: {} };
  const [state, dispatch] = useFormState(createUser, initialState);

  return (
    <form action={dispatch}>
      <label htmlFor="name">Nombre</label>
      <input
        id="fullname"
        type="text"
        name="fullname"
        placeholder="Escribe tu nombre completo"
      />
      {state.errors?.name &&
        state.errors.name.map((error: string, index: number) => (
          <p className="error" key={index}>
            {error}
          </p>
        ))}

      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="text"
        name="email"
        placeholder="Escribe tu email"
      />
      {state.errors?.email &&
        state.errors.email.map((error: string, index: number) => (
          <p className="error" key={index}>
            {error}
          </p>
        ))}

      <label htmlFor="password">Contraseña</label>
      <input
        id="password"
        type="password"
        name="password"
        placeholder="Escribe tu contraseña"
      />
      {state.errors?.password &&
        state.errors.password.map((error: string, index: number) => (
          <p className="error" key={index}>
            {error}
          </p>
        ))}

      {state.message && <p className="error">{state.message}</p>}
      <FormButton />
    </form>
  );
}

function FormButton() {
  const { pending } = useFormStatus();

  return <button aria-disabled={pending}>Registrarse</button>;
}
