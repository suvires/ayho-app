import { Match } from "@/lib/definitions";
import { MatchItem } from "@/ui/matches/match-item";

export default function MatchesList({ matches }: { matches: Match[] }) {
  return (
    <ul className="matches-list">
      {matches.map((match: Match) => (
        <li key={match.id}>
          <MatchItem match={match} />
        </li>
      ))}
    </ul>
  );
}
