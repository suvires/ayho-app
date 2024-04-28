import { Offer, User } from "@/lib/definitions";
import { Card } from "@/ui/components/card";
import { Like } from "@/ui/components/like";
import { Dislike } from "@/ui/components/dislike";
import { Undo } from "@/ui/components/undo";
import Image from "next/image";

interface OfferItemProps {
  offer: Offer;
  user: User;
}

export default function OfferCard({ offer, user }: OfferItemProps) {
  return (
    <Card>
      <article className="offer">
        <section className="offer--company-summary">
          <figure>
            <Image
              width={offer.company.image_width}
              height={offer.company.image_height}
              alt={`Logotipo de ${offer.company.name}`}
              src={`${process.env.BACKEND_URL}${offer.company.image_url}`}
              priority={true}
            />
          </figure>
          <div>
            <h3>{offer.company.name}</h3>
            <a href={`#offer--company-profile-${offer.id}`}>
              Ver perfil de la empresa
            </a>
          </div>
        </section>
        <h2>{offer.title}</h2>
        <ul className="tags">
          {offer.positions.map((position) => (
            <li
              key={`tag--position-${position.id}`}
              className={position.id in user.positions ? "active" : "disabled"}
            >
              <span>{position.name}</span>
            </li>
          ))}
          <li
            className={
              offer.salary >= user.profile.salary ? "active" : "disabled"
            }
          >
            <span>{`${Number(offer.salary)
              .toLocaleString("es-ES", { useGrouping: true })
              .replace(/\./g, " ")} €`}</span>
          </li>

          <li
            className={
              offer.schedule.id in user.schedules ? "active" : "disabled"
            }
          >
            <span>{offer.schedule.name}</span>
          </li>
          <li
            className={
              offer.attendance.id in user.attendances ? "active" : "disabled"
            }
          >
            <span>{offer.attendance.name}</span>
          </li>
          {offer.places.map((place) => (
            <li
              key={`tag--place-${place.id}`}
              className={place.id in user.places ? "active" : "disabled"}
            >
              <span>{place.name}</span>
            </li>
          ))}
        </ul>
        <h4>Habilidades</h4>
        <ul className="tags">
          {offer.skills.map((skill) => (
            <li
              key={`tag--skills-${skill.id}`}
              className={skill.id in user.skills ? "active" : "disabled"}
            >
              <span>{skill.name}</span>
            </li>
          ))}
        </ul>
        <h4>Descripción</h4>
        <section
          className="offer--description"
          dangerouslySetInnerHTML={{ __html: offer.description }}
        ></section>
        <section
          className="offer--company-profile"
          id={`offer--company-profile-${offer.id}`}
        >
          <figure>
            <Image
              width={offer.company.image_width}
              height={offer.company.image_height}
              alt={`Logotipo de ${offer.company.name}`}
              src={`${process.env.BACKEND_URL}${offer.company.image_url}`}
              loading="lazy"
            />
          </figure>
          <h3>{offer.company.name}</h3>
          <div
            className="offer--company-description"
            dangerouslySetInnerHTML={{ __html: offer.company.description }}
          ></div>
        </section>
        <aside>
          <Undo />
          <Dislike offerId={offer.id} />
          <Like offerId={offer.id} />
        </aside>
      </article>
    </Card>
  );
}
