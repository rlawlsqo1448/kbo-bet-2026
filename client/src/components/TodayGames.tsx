/**
 * TodayGames - 오늘의 경기 결과
 * Design: Broadcast Scoreboard — 경기 카드 형태로 표시
 */

import { motion } from "framer-motion";
import type { GameResult } from "@/lib/types";
import { TEAM_MAP, getTeamLogoUrl, getTeamOwnerColor } from "@/lib/types";

interface Props {
  games: GameResult[];
}

function GameCard({ game, index }: { game: GameResult; index: number }) {
  const awayInfo = TEAM_MAP[game.awayTeam] || { shortName: game.awayTeam, fullName: game.awayTeam };
  const homeInfo = TEAM_MAP[game.homeTeam] || { shortName: game.homeTeam, fullName: game.homeTeam };
  const awayColor = getTeamOwnerColor(game.awayTeam);
  const homeColor = getTeamOwnerColor(game.homeTeam);

  const isEnd = game.status === "END";
  const isLive = game.status === "PROGRESS";

  const statusLabel = isEnd ? "종료" : isLive ? "진행중" : "예정";
  const statusClass = isEnd
    ? "text-muted-foreground"
    : isLive
    ? "text-green-400 animate-pulse"
    : "text-amber-400";

  const timeStr = game.time
    ? `${game.time.slice(0, 2)}:${game.time.slice(2)}`
    : "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.08 }}
      className="flex items-center gap-2 sm:gap-4 p-3 sm:p-4 rounded-lg border border-border bg-card hover:bg-muted/20 transition-colors"
    >
      {/* Away team */}
      <div className="flex items-center gap-2 flex-1 min-w-0 justify-end">
        <span
          className={`font-medium text-sm sm:text-base truncate ${
            game.awayWlt === "W" ? "text-foreground" : "text-muted-foreground"
          }`}
        >
          {awayInfo.shortName}
        </span>
        <img
          src={getTeamLogoUrl(game.awayTeam)}
          alt={awayInfo.shortName}
          className="w-7 h-7 sm:w-8 sm:h-8 object-contain flex-shrink-0"
          loading="lazy"
        />
      </div>

      {/* Score */}
      <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
        <span
          className={`font-display text-2xl sm:text-3xl ${
            game.awayWlt === "W"
              ? awayColor === "red"
                ? "text-red-400"
                : "text-blue-400"
              : "text-muted-foreground"
          }`}
        >
          {isEnd || isLive ? game.awayScore : "-"}
        </span>

        <div className="flex flex-col items-center">
          <span className={`text-[10px] font-semibold ${statusClass}`}>
            {statusLabel}
          </span>
          {!isEnd && !isLive && (
            <span className="text-[10px] text-muted-foreground">{timeStr}</span>
          )}
        </div>

        <span
          className={`font-display text-2xl sm:text-3xl ${
            game.homeWlt === "W"
              ? homeColor === "red"
                ? "text-red-400"
                : "text-blue-400"
              : "text-muted-foreground"
          }`}
        >
          {isEnd || isLive ? game.homeScore : "-"}
        </span>
      </div>

      {/* Home team */}
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <img
          src={getTeamLogoUrl(game.homeTeam)}
          alt={homeInfo.shortName}
          className="w-7 h-7 sm:w-8 sm:h-8 object-contain flex-shrink-0"
          loading="lazy"
        />
        <span
          className={`font-medium text-sm sm:text-base truncate ${
            game.homeWlt === "W" ? "text-foreground" : "text-muted-foreground"
          }`}
        >
          {homeInfo.shortName}
        </span>
      </div>
    </motion.div>
  );
}

export function TodayGames({ games }: Props) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <div className="w-1 h-6 rounded-full bg-green-500" />
        <h2 className="font-display text-2xl text-foreground tracking-wide">
          오늘의 경기
        </h2>
      </div>

      <div className="grid gap-3">
        {games.map((game, i) => (
          <GameCard key={game.gameId} game={game} index={i} />
        ))}
      </div>
    </div>
  );
}
