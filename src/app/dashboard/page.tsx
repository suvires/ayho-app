import { getProfile, getMyCompanyOffers } from "@/lib/services";
import CreateCompanyForm from "@/ui/company/company-create-form";
import OffersList from "@/ui/offers/offers-list";

export default async function Page() {
  const profile = await getProfile();
  let offers = null;
  if (profile.company) {
    offers = await getMyCompanyOffers();
  }

  if (!profile.company) {
    return (
      <main>
        <p>¡Hola, {profile.name}!</p>
        <p>Antes de empezar a publicar ofertas, crea tu empresa.</p>
        <CreateCompanyForm />
      </main>
    );
  }

  return <main>{offers && <OffersList offers={offers} />}</main>;
}
