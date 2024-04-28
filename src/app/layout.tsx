import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import { Montserrat } from "next/font/google";
import "@/stylesheets/main.scss";

const primaryFont = Raleway({
  subsets: ["latin"],
  variable: "--font-primary",
});

const secondaryFont = Montserrat({
  subsets: ["latin"],
  variable: "--font-secondary",
});

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
      <body className={`${primaryFont.variable} ${secondaryFont.variable}`}>
        {children}
      </body>
    </html>
  );
}
