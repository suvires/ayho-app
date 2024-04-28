import { Match } from "@/lib/definitions";
import { MatchItem } from "@/ui/matches/match-item";
import Link from "next/link";

export default function MatchesList({ matches }: { matches: Match[] }) {
  return (
    <ul className="matches-list">
      {matches.map((match: Match) => (
        <li key={match.id}>
          <Link href={`/matches/${match.id}`}>
            <MatchItem match={match} />
          </Link>
        </li>
      ))}
    </ul>
  );
}
