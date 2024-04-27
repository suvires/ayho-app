import { Offer } from "@/lib/definitions";

interface OfferItemProps {
  offer: Offer;
}

export default function OfferItem({ offer }: OfferItemProps) {
  return (
    <div>
      <p>offer_id {offer.id}</p>
      <p>offer_title {offer.title}</p>
      <p>offer_description {offer.description}</p>
    </div>
  );
}
