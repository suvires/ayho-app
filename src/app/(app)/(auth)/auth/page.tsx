import { LinkButton } from "@/ui/LinkButton";
import Image from "next/image";
export default function AuthPage() {
  return (
    <main className="auth">
      <section className="auth-wrapper">
        <h1>
          <Image
            src={"/images/logo-negative-white.png"}
            alt="Logotipo de ayho"
            width={347}
            height={129}
            priority={true}
          />
        </h1>
        <nav>
          <LinkButton styling="secondary" href="/signup">
            Ya tengo una cuenta
          </LinkButton>
          <LinkButton styling="transparent" href="/signin">
            Crear una cuenta
          </LinkButton>
        </nav>
      </section>
    </main>
  );
}
