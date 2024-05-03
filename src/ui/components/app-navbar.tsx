"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function AppNavbar() {
  const pathname = usePathname();
  return (
    <nav className="app-navbar">
      <ul>
        <li>
          <Link
            className={
              "icon-offers " + (pathname.startsWith("/offers") ? "active" : "")
            }
            href="/offers"
          >
            <span className="visually-hidden">Ofertas</span>
          </Link>
        </li>
        <li>
          <Link
            className={
              "icon-matches " +
              (pathname.startsWith("/matches") ? "active" : "")
            }
            href="/matches"
          >
            <span className="visually-hidden">Matches</span>
          </Link>
        </li>
        <li>
          <Link
            className={
              "icon-messages " + (pathname.startsWith("/chats") ? "active" : "")
            }
            href="/chats"
          >
            <span className="visually-hidden">Mensajes</span>
          </Link>
        </li>
        <li>
          <Link
            className={
              "icon-profile " +
              (pathname.startsWith("/profile") ? "active" : "")
            }
            href="/profile"
          >
            <span className="visually-hidden">Perfil</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
