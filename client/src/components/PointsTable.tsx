/**
 * PointsTable - 순위별 점수 배분 참조표
 * Design: Broadcast Scoreboard — 하단 참고 정보
 */

import { motion } from "framer-motion";
import { RANK_POINTS } from "@/lib/types";

export function PointsTable() {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <div className="w-1 h-6 rounded-full bg-amber-500" />
        <h2 className="font-display text-2xl text-foreground tracking-wide">
          순위별 점수 배분
        </h2>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="rounded-xl border border-border overflow-hidden bg-card"
      >
        <div className="grid grid-cols-10 divide-x divide-border">
          {/* Headers */}
          {RANK_POINTS.map((_, idx) => (
            <div
              key={`h-${idx}`}
              className="px-1 py-2.5 text-center bg-muted/50"
            >
              <span className="text-xs font-semibold text-muted-foreground">
                {idx + 1}위
              </span>
            </div>
          ))}
          {/* Values */}
          {RANK_POINTS.map((pts, idx) => (
            <div key={`v-${idx}`} className="px-1 py-3 text-center">
              <span
                className={`font-display text-xl sm:text-2xl ${
                  idx < 3
                    ? "text-amber-400"
                    : idx < 5
                    ? "text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                {pts}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500/70" />
          <span>김진배: 삼성, KT, 롯데, 두산, KIA</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-blue-500/70" />
          <span>윤정묵: LG, 한화, NC, SSG, 키움</span>
        </div>
      </div>
    </div>
  );
}
