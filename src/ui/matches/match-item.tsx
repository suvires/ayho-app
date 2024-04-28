import { Match } from "@/lib/definitions";
import Image from "next/image";

export function MatchItem({ match }: { match: Match }) {
  return (
    <article className="match">
      <figure>
        <Image
          width={match.offer.company.image_width}
          height={match.offer.company.image_height}
          alt={`Logotipo de ${match.offer.company.name}`}
          src={`${process.env.BACKEND_URL}${match.offer.company.image_url}`}
        />
      </figure>
      <section>
        <h3>{match.offer.company.name}</h3>
        <h2>{match.offer.title}</h2>
      </section>
    </article>
  );
}
