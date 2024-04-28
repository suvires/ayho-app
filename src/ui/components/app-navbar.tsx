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
              "icon-offers " + (pathname === "/offers" ? "active" : "")
            }
            href="/offers"
          >
            <span className="visually-hidden">Offers</span>
          </Link>
        </li>
        <li>
          <Link
            className={
              "icon-matches " + (pathname === "/matches" ? "active" : "")
            }
            href="/matches"
          >
            <span className="visually-hidden">Matches</span>
          </Link>
        </li>
        <li>
          <Link
            className={
              "icon-messages " + (pathname === "/messages" ? "active" : "")
            }
            href="/messages"
          >
            <span className="visually-hidden">Messages</span>
          </Link>
        </li>
        <li>
          <Link
            className={
              "icon-profile " + (pathname === "/profile" ? "active" : "")
            }
            href="/profile"
          >
            <span className="visually-hidden">Profile</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
