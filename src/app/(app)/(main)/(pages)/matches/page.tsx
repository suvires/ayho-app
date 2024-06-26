import { getMatches } from "@/lib/services";
import MatchesList from "@/ui/matches/matches-list";

export default async function Page() {
  const matches = await getMatches();

  if (matches.length === 0)
    return (
      <div className="empty-message">
        <p>
          Todavía no has hecho <i>match</i> con ninguna oferta.
        </p>
      </div>
    );

  return <MatchesList matches={matches} />;
}
