import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <Image
        src="/images/logo.png"
        alt="Logotipo de ayho"
        width={346}
        height={129}
        priority
      />
      <Link href="https://empresas.ayho.app">Soy una empresa</Link>
      <Link href="/auth">Busco trabajo</Link>
    </main>
  );
}
