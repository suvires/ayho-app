import { getUser } from "@/lib/services";
import OffersCards from "@/ui/offers/offers-cards";

export default async function Page() {
  const user = await getUser();

  return <OffersCards user={user} />;
}
