import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <Image
        src="/images/logo.png"
        alt="Ayho Logo"
        width={346}
        height={129}
        priority
      />
      <Link href="https://empresas.ayho.app">Soy una empresa</Link>
      <Link href="/signin">Iniciar sesión</Link>
      <Link href="/signup">Crear una cuenta</Link>
    </main>
  );
}
