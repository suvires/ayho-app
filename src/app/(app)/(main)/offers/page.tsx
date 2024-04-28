import { getUser, getMyCompanyOffers } from "@/lib/services";
import OffersList from "@/ui/offers/offers-list";

export default async function Page() {
  const user = await getUser();
  let offers = null;
  if (user.company) {
    offers = await getMyCompanyOffers();
  }

  return <main>{offers && <OffersList offers={offers} />}</main>;
}
