import { Offer, User } from "@/lib/definitions";
import Link from "next/link";
import OfferCard from "./offer-card";

export default function OffersCards({
  offers,
  user,
}: {
  offers: Offer[];
  user: User;
}) {
  if (offers.length === 0)
    return (
      <div>
        <Link href="/offers/create">Publica tu primera oferta</Link>
      </div>
    );
  return (
    <ul className="offers-cards">
      {offers.map((offer: Offer) => (
        <li key={offer.id}>
          <OfferCard offer={offer} user={user} />
        </li>
      ))}
    </ul>
  );
}
