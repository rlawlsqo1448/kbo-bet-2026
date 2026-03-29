/**
 * StandingsTable - KBO 전체 순위표
 * Design: Broadcast Scoreboard — 각 팀에 소유자 색상 표시
 */

import { motion } from "framer-motion";
import type { TeamRank } from "@/lib/types";
import { RANK_POINTS, getTeamLogoUrl, getTeamOwnerColor, getTeamOwnerName } from "@/lib/types";

interface Props {
  standings: TeamRank[];
}

export function StandingsTable({ standings }: Props) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <div className="w-1 h-6 rounded-full bg-white/30" />
        <h2 className="font-display text-2xl text-foreground tracking-wide">
          2026 KBO 순위
        </h2>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="rounded-xl border border-border overflow-hidden bg-card"
      >
        {/* Header */}
        <div className="grid grid-cols-[2.5rem_1fr_3rem_3rem_3rem_3.5rem_3rem_4rem] sm:grid-cols-[3rem_1fr_4rem_4rem_4rem_4.5rem_4rem_5rem] items-center gap-1 px-3 sm:px-4 py-3 bg-muted/50 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          <span className="text-center">#</span>
          <span>팀</span>
          <span className="text-center">승</span>
          <span className="text-center">패</span>
          <span className="text-center">무</span>
          <span className="text-center">승률</span>
          <span className="text-center">차</span>
          <span className="text-center">점수</span>
        </div>

        {/* Rows */}
        {standings.map((team, idx) => {
          const ownerColor = getTeamOwnerColor(team.cpTeamId);
          const ownerName = getTeamOwnerName(team.cpTeamId);
          const isRed = ownerColor === "red";
          const points = RANK_POINTS[team.rank - 1] || 0;

          return (
            <motion.div
              key={team.cpTeamId}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className={`grid grid-cols-[2.5rem_1fr_3rem_3rem_3rem_3.5rem_3rem_4rem] sm:grid-cols-[3rem_1fr_4rem_4rem_4rem_4.5rem_4rem_5rem] items-center gap-1 px-3 sm:px-4 py-2.5 border-t border-border/50 transition-colors hover:bg-muted/30 ${
                idx === 0 ? "border-t-0" : ""
              }`}
            >
              {/* Rank */}
              <span
                className={`text-center font-display text-lg ${
                  team.rank <= 3 ? "text-amber-400" : "text-muted-foreground"
                }`}
              >
                {team.rank}
              </span>

              {/* Team name + logo */}
              <div className="flex items-center gap-2 min-w-0">
                <img
                  src={team.logoUrl}
                  alt={team.shortName}
                  className="w-6 h-6 sm:w-7 sm:h-7 object-contain flex-shrink-0"
                  loading="lazy"
                />
                <span className="font-medium text-sm truncate">{team.shortName}</span>
                <span
                  className={`hidden sm:inline-block text-[10px] px-1.5 py-0.5 rounded-full font-medium ${
                    isRed
                      ? "bg-red-950/50 text-red-400 border border-red-900/30"
                      : "bg-blue-950/50 text-blue-400 border border-blue-900/30"
                  }`}
                >
                  {ownerName}
                </span>
              </div>

              {/* Stats */}
              <span className="text-center text-sm">{team.wins}</span>
              <span className="text-center text-sm">{team.losses}</span>
              <span className="text-center text-sm">{team.draws}</span>
              <span className="text-center text-sm">
                {team.winRate > 0 ? team.winRate.toFixed(3).replace(/^0/, "") : "-"}
              </span>
              <span className="text-center text-sm text-muted-foreground">
                {team.gamesBack === "0" || team.gamesBack === "0.0" ? "-" : team.gamesBack}
              </span>

              {/* Points */}
              <span
                className={`text-center font-display text-lg ${
                  isRed ? "text-red-400" : "text-blue-400"
                }`}
              >
                {points}
              </span>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
