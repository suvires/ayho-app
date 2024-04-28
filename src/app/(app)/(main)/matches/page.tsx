import { getMatches, getUser } from "@/lib/services";
import MatchesList from "@/ui/matches/matches-list";

export default async function Page() {
  const matches = await getMatches();
  const user = await getUser();

  if (!matches)
    return (
      <p>
        Todavía no has hecho <i>match</i> con ninguna oferta
      </p>
    );

  return <MatchesList matches={matches} />;
}
