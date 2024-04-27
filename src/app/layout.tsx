import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "@/stylesheets/main.scss";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ayho",
  description: "Encuentra tu empleo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={montserrat.className}>{children}</body>
    </html>
  );
}
