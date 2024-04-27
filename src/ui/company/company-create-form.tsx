"use client";

import { useFormState, useFormStatus } from "react-dom";
import { createCompany } from "@/lib/actions";

export default function CreateCompanyForm() {
  const initialState = { message: "", errors: {} };
  const [state, dispatch] = useFormState(createCompany, initialState);

  return (
    <form action={dispatch}>
      <label htmlFor="company_name">Nombre</label>
      <input
        id="company_name"
        name="company_name"
        type="text"
        defaultValue=""
      />
      {state.errors?.name &&
        state.errors.name.map((error: string, index: number) => (
          <p className="error" key={index}>
            {error}
          </p>
        ))}

      <label htmlFor="company_description">Descripción</label>
      <textarea
        id="company_description"
        name="company_description"
        defaultValue=""
      />
      {state.errors?.description &&
        state.errors.description.map((error: string, index: number) => (
          <p className="error" key={index}>
            {error}
          </p>
        ))}

      <label htmlFor="company_image">Logotipo</label>
      <input
        id="company_image"
        name="company_image"
        type="file"
        accept="image/*"
      />
      {state.errors?.image &&
        state.errors.image.map((error: string, index: number) => (
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

  return <button aria-disabled={pending}>Crear cuenta</button>;
}
