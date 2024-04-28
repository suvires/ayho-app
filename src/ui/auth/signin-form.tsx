"use client";

import { useFormState, useFormStatus } from "react-dom";
import { authenticate } from "@/lib/actions";
import Image from "next/image";
import Link from "next/link";

export default function SignInForm() {
  const initialState = { message: "", errors: {} };
  const [state, dispatch] = useFormState(authenticate, initialState);

  return (
    <>
      <Link href="/auth">
        <Image
          src="/images/icons/back.png"
          width={32}
          height={60}
          alt="Atrás"
          className="back"
          priority={true}
        />
      </Link>
      <form className="app form" action={dispatch}>
        <div className="form-group">
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
        </div>
        <div className="form-group">
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
        </div>

        <div className="form-footer">
          {state.message && <p className="error">{state.message}</p>}
          <FormButton />
        </div>
      </form>
    </>
  );
}

function FormButton() {
  const { pending } = useFormStatus();

  return (
    <button className="btn btn--primary" aria-disabled={pending}>
      Entrar
    </button>
  );
}
