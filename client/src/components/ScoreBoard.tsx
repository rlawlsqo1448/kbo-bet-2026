/**
 * ScoreBoard - 메인 점수 비교 카드
 * Design: TV 중계 하단 그래픽 스타일의 대형 스코어보드
 * 대각선 컷으로 레드 vs 블루 영역 분리
 */

import { motion } from "framer-motion";
import type { BetPlayer } from "@/lib/types";
import { Trophy } from "lucide-react";

const TROPHY_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663482429076/f8vyrGBAR8XFsuo4WCjhi7/trophy-icon-bFbqaYFVW6c8cDMeEj67gE.webp";

interface Props {
  players: [BetPlayer, BetPlayer];
}

export function ScoreBoard({ players }: Props) {
  const [p1, p2] = players;
  const p1Leading = p1.totalScore > p2.totalScore;
  const p2Leading = p2.totalScore > p1.totalScore;
  const tied = p1.totalScore === p2.totalScore;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="relative rounded-xl overflow-hidden border border-border bg-card"
    >
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url(https://d2xsxph8kpxj0f.cloudfront.net/310519663482429076/f8vyrGBAR8XFsuo4WCjhi7/pattern-texture-icsWZtD2CdSnhYw65Sot8W.webp)`,
          backgroundSize: "200px",
        }}
      />

      <div className="relative grid grid-cols-[1fr_auto_1fr] items-center">
        {/* Player 1 - Red side */}
        <div
          className={`p-6 sm:p-8 flex flex-col items-center gap-2 ${
            p1Leading ? "box-glow-red" : ""
          }`}
        >
          <div className="flex items-center gap-2">
            {p1Leading && (
              <img src={TROPHY_IMG} alt="leading" className="w-6 h-6 sm:w-8 sm:h-8" />
            )}
            <span className="text-sm sm:text-base font-semibold text-red-400 tracking-wide">
              {p1.name}
            </span>
          </div>
          <motion.span
            key={p1.totalScore}
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="font-display text-6xl sm:text-7xl md:text-8xl text-white text-glow-red"
          >
            {p1.totalScore}
          </motion.span>
          <span className="text-xs text-muted-foreground">
            {p1.teamScores
              .sort((a, b) => a.rank - b.rank)
              .map((t) => `${t.score}`)
              .join(" + ")}
          </span>
        </div>

        {/* Center divider */}
        <div className="flex flex-col items-center justify-center px-2 sm:px-4 py-6">
          <div className="w-px h-8 bg-gradient-to-b from-red-500/50 to-transparent" />
          <div className="my-2 px-3 py-1 rounded-full border border-border bg-background">
            <span className="font-display text-xl sm:text-2xl text-muted-foreground">
              {tied ? "TIED" : "VS"}
            </span>
          </div>
          <div className="w-px h-8 bg-gradient-to-b from-transparent to-blue-500/50" />
        </div>

        {/* Player 2 - Blue side */}
        <div
          className={`p-6 sm:p-8 flex flex-col items-center gap-2 ${
            p2Leading ? "box-glow-blue" : ""
          }`}
        >
          <div className="flex items-center gap-2">
            {p2Leading && (
              <img src={TROPHY_IMG} alt="leading" className="w-6 h-6 sm:w-8 sm:h-8" />
            )}
            <span className="text-sm sm:text-base font-semibold text-blue-400 tracking-wide">
              {p2.name}
            </span>
          </div>
          <motion.span
            key={p2.totalScore}
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="font-display text-6xl sm:text-7xl md:text-8xl text-white text-glow-blue"
          >
            {p2.totalScore}
          </motion.span>
          <span className="text-xs text-muted-foreground">
            {p2.teamScores
              .sort((a, b) => a.rank - b.rank)
              .map((t) => `${t.score}`)
              .join(" + ")}
          </span>
        </div>
      </div>

      {/* Bottom bar with score difference */}
      <div className="relative h-1.5 w-full bg-muted overflow-hidden">
        <motion.div
          className="absolute left-0 top-0 h-full bg-gradient-to-r from-red-600 to-red-400"
          initial={{ width: 0 }}
          animate={{
            width: `${(p1.totalScore / (p1.totalScore + p2.totalScore || 1)) * 100}%`,
          }}
          transition={{ duration: 1, delay: 0.5 }}
        />
        <motion.div
          className="absolute right-0 top-0 h-full bg-gradient-to-l from-blue-600 to-blue-400"
          initial={{ width: 0 }}
          animate={{
            width: `${(p2.totalScore / (p1.totalScore + p2.totalScore || 1)) * 100}%`,
          }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      </div>
    </motion.div>
  );
}
