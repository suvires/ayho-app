import { getOffers, getUser } from "@/lib/services";
import OffersCards from "@/ui/offers/offers-cards";

export default async function Page() {
  const offers = await getOffers();
  const user = await getUser();

  if (offers.length === 0)
    return (
      <div className="empty-message">
        <p>Ahora mismo no hay ofertas que se ajusten a tu perfil.</p>
      </div>
    );

  return <OffersCards offers={offers} user={user} />;
}
