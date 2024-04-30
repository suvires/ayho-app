"use client";

import { unmatch } from "@/lib/actions";
import { Match } from "@/lib/definitions";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

export function MatchItem({ match }: { match: Match }) {
  const unmatchWithId = unmatch.bind(null, match.offer.id);
  const [submenu, setSubmenu] = useState(false);
  return (
    <article className="match">
      <Link href={`/matches/${match.id}`}>
        <figure>
          <Image
            width={match.offer.company.image_width}
            height={match.offer.company.image_height}
            alt={`Logotipo de ${match.offer.company.name}`}
            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${match.offer.company.image_url}`}
          />
        </figure>
        <section>
          <h3>{match.offer.company.name}</h3>
          <h2>{match.offer.title}</h2>
        </section>
      </Link>
      <div
        className="submenu-overlay"
        style={{ display: submenu ? "block" : "none" }}
        onClick={() => setSubmenu(false)}
      />
      <div
        className="submenu"
        onClick={(e) => {
          setSubmenu(!submenu);
        }}
      >
        <div style={{ display: submenu ? "block" : "none" }}>
          <form action={unmatchWithId}>
            <button>Deshacer match</button>
          </form>
        </div>
      </div>
    </article>
  );
}
