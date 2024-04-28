import { getOffers, getUser } from "@/lib/services";
import OffersCards from "@/ui/offers/offers-cards";

export default async function Page() {
  const offers = await getOffers();
  const user = await getUser();

  if (!offers)
    return <p>Ahora mismo no hay ofertas que se ajusten a tu perfil</p>;

  return <OffersCards offers={offers} user={user} />;
}
