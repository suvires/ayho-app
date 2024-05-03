"use client";

import { getOffers } from "@/lib/services";
import { Offer, User } from "@/lib/definitions";
import OfferCard from "./offer-card";
import { useEffect, useState } from "react";

export default function OffersCards({ user }: { user: User }) {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOffers = async () => {
      const fetchedOffers = await getOffers();
      setOffers(fetchedOffers);
      setLoading(false);
    };

    fetchOffers();
  }, []);

  if (loading) {
    return (
      <div className="empty-message">
        <p>Cargando...</p>
      </div>
    );
  }

  if (offers.length === 0)
    return (
      <div className="empty-message">
        <p>Ahora mismo no hay ofertas que se ajusten a tu perfil.</p>
      </div>
    );
  return (
    <div className="offers-cards">
      {offers.map((offer: Offer) => (
        <OfferCard offer={offer} user={user} key={offer.id} />
      ))}
    </div>
  );
}
