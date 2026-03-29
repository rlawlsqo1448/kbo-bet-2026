/**
 * TeamCards - 각 참가자의 팀별 현황 카드
 * Design: Broadcast Scoreboard — 좌우 대칭 배치, 팀 로고 + 순위 뱃지
 */

import { motion } from "framer-motion";
import type { BetPlayer, TeamRank } from "@/lib/types";
import { TEAM_MAP, RANK_POINTS, getTeamLogoUrl } from "@/lib/types";

interface Props {
  players: [BetPlayer, BetPlayer];
  standings: TeamRank[];
}

function TeamCard({
  cpTeamId,
  rank,
  score,
  color,
  standings,
  index,
}: {
  cpTeamId: string;
  rank: number;
  score: number;
  color: "red" | "blue";
  standings: TeamRank[];
  index: number;
}) {
  const team = standings.find((t) => t.cpTeamId === cpTeamId);
  const teamInfo = TEAM_MAP[cpTeamId] || { shortName: cpTeamId, fullName: cpTeamId };
  const isRed = color === "red";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 * index }}
      className={`relative flex items-center gap-3 p-3 sm:p-4 rounded-lg border transition-all hover:scale-[1.02] ${
        isRed
          ? "border-red-900/40 bg-red-950/20 hover:border-red-700/50 hover:bg-red-950/30"
          : "border-blue-900/40 bg-blue-950/20 hover:border-blue-700/50 hover:bg-blue-950/30"
      }`}
    >
      {/* Rank badge */}
      <div
        className={`absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white ${
          rank <= 3
            ? isRed
              ? "bg-red-600"
              : "bg-blue-600"
            : "bg-muted text-muted-foreground"
        }`}
      >
        {rank}
      </div>

      {/* Team logo */}
      <img
        src={getTeamLogoUrl(cpTeamId)}
        alt={teamInfo.shortName}
        className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
        loading="lazy"
      />

      {/* Team info */}
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm sm:text-base text-foreground truncate">
          {teamInfo.shortName}
        </p>
        <p className="text-xs text-muted-foreground">
          {team ? `${team.wins}승 ${team.losses}패 ${team.draws}무` : "-"}
        </p>
      </div>

      {/* Score */}
      <div className="text-right">
        <span
          className={`font-display text-2xl sm:text-3xl ${
            isRed ? "text-red-400" : "text-blue-400"
          }`}
        >
          {score}
        </span>
        <p className="text-[10px] text-muted-foreground">점</p>
      </div>
    </motion.div>
  );
}

export function TeamCards({ players, standings }: Props) {
  const [p1, p2] = players;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
      {/* Player 1 teams */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1 h-6 rounded-full bg-red-500" />
          <h2 className="font-display text-2xl text-red-400 tracking-wide">
            {p1.name}의 팀
          </h2>
        </div>
        <div className="grid gap-3">
          {p1.teamScores
            .sort((a, b) => a.rank - b.rank)
            .map((ts, i) => (
              <TeamCard
                key={ts.cpTeamId}
                cpTeamId={ts.cpTeamId}
                rank={ts.rank}
                score={ts.score}
                color="red"
                standings={standings}
                index={i}
              />
            ))}
        </div>
      </div>

      {/* Player 2 teams */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1 h-6 rounded-full bg-blue-500" />
          <h2 className="font-display text-2xl text-blue-400 tracking-wide">
            {p2.name}의 팀
          </h2>
        </div>
        <div className="grid gap-3">
          {p2.teamScores
            .sort((a, b) => a.rank - b.rank)
            .map((ts, i) => (
              <TeamCard
                key={ts.cpTeamId}
                cpTeamId={ts.cpTeamId}
                rank={ts.rank}
                score={ts.score}
                color="blue"
                standings={standings}
                index={i}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
