"use client";

import { useFormState, useFormStatus } from "react-dom";
import { authenticate } from "@/lib/actions";

export default function SignInForm() {
  const initialState = { message: "", errors: {} };
  const [state, dispatch] = useFormState(authenticate, initialState);

  return (
    <form action={dispatch}>
      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="text"
        name="email"
        placeholder="Escribe  tu email"
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

  return <button aria-disabled={pending}>Entrar</button>;
}
