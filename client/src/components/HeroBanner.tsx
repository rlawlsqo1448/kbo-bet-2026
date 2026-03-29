/**
 * HeroBanner - TV 중계 스타일 VS 배너
 * 상단에 야구장 배경 + VS 그래픽 오버레이
 */

import { motion } from "framer-motion";
import type { BetPlayer } from "@/lib/types";

const HERO_BG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663482429076/f8vyrGBAR8XFsuo4WCjhi7/hero-bg-7exLrMWn7BtsHxUp6Uo3jh.webp";
const VS_GRAPHIC =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663482429076/f8vyrGBAR8XFsuo4WCjhi7/vs-graphic-mtyeHxWhP9JbYzBxho4XAf.webp";

interface Props {
  players: [BetPlayer, BetPlayer];
}

export function HeroBanner({ players }: Props) {
  const [p1, p2] = players;
  const leader = p1.totalScore >= p2.totalScore ? p1 : p2;
  const diff = Math.abs(p1.totalScore - p2.totalScore);

  return (
    <div className="relative w-full overflow-hidden" style={{ height: "clamp(280px, 40vh, 420px)" }}>
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${HERO_BG})` }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background" />

      {/* VS Graphic overlay */}
      <div className="absolute inset-0 flex items-center justify-center opacity-30">
        <img
          src={VS_GRAPHIC}
          alt=""
          className="w-full max-w-3xl object-contain"
          loading="eager"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-4"
        >
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl tracking-wider text-white">
            KBO 2026
          </h1>
          <p className="text-white/70 text-sm sm:text-base mt-1 font-medium tracking-widest uppercase">
            Season Bet Dashboard
          </p>
        </motion.div>

        {/* VS Display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center gap-4 sm:gap-8"
        >
          <div className="text-right">
            <p className="font-display text-3xl sm:text-4xl text-red-400 text-glow-red">
              {p1.name}
            </p>
          </div>

          <div className="relative">
            <span className="font-display text-4xl sm:text-5xl text-white/90">VS</span>
          </div>

          <div className="text-left">
            <p className="font-display text-3xl sm:text-4xl text-blue-400 text-glow-blue">
              {p2.name}
            </p>
          </div>
        </motion.div>

        {/* Leader indicator */}
        {diff > 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-3 text-white/50 text-xs sm:text-sm"
          >
            {leader.name}님이 {diff}점 앞서고 있습니다
          </motion.p>
        )}
      </div>
    </div>
  );
}
