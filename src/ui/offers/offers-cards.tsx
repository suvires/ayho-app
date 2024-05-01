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
    <div className="offers-cards">
      {offers.map((offer: Offer) => (
        <OfferCard offer={offer} user={user} key={offer.id} />
      ))}
    </div>
  );
}
