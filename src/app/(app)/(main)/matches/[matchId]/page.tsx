import { getMatch, getUser } from "@/lib/services";
import MatchCard from "@/ui/matches/match-card";

export default async function Page({
  params,
}: {
  params: { matchId: string };
}) {
  const match = await getMatch(params.matchId);
  const user = await getUser();

  return (
    <div className="offers-cards">
      <MatchCard offer={match.offer} user={user} />
    </div>
  );
}
