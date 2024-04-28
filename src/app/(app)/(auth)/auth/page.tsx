import Image from "next/image";
import Link from "next/link";
export default function AuthPage() {
  return (
    <main className="app auth">
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
        <div className="buttons">
          <Link className="btn btn--secondary" href="/signin">
            Ya tengo una cuenta
          </Link>
          <Link className="btn btn--transparent" href="/signup">
            Crear una cuenta
          </Link>
        </div>
      </section>
    </main>
  );
}
