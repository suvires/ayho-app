"use client";

import { useFormState, useFormStatus } from "react-dom";
import { createUser } from "@/lib/actions";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function SignUpForm() {
  const initialState = { message: "", errors: {} };
  const [state, dispatch] = useFormState(createUser, initialState);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleShowPasswordClick = () => {
    setShowPassword(!showPassword);
  };

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
        </div>

        <div className="form-group">
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
        </div>

        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <div className="input-password">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Escribe tu contraseña"
            />
            <i
              className={showPassword ? "show-password" : ""}
              onClick={handleShowPasswordClick}
            ></i>
          </div>
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
      Registrarse
    </button>
  );
}
