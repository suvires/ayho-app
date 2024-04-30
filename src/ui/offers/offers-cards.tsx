import { Offer, User } from "@/lib/definitions";
import OfferCard from "./offer-card";

export default function OffersCards({
  offers,
  user,
}: {
  offers: Offer[];
  user: User;
}) {
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
