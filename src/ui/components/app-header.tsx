import Image from "next/image";

export function AppHeader() {
  return (
    <header className="app-header">
      <h1>
        <Image
          src="/images/logo.png"
          width={107}
          height={40}
          alt="Logotipo de ayho"
          priority={true}
        />
      </h1>
    </header>
  );
}
