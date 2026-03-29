/**
 * KBO 내기 대시보드 - 메인 페이지
 * Design: Broadcast Scoreboard (TV 중계 스코어보드 스타일)
 * - 다크 배경 + 레드 vs 블루 대결 구도
 * - Bebas Neue 점수 폰트 + Noto Sans KR 본문
 */

import { useKboData } from "@/hooks/useKboData";
import { HeroBanner } from "@/components/HeroBanner";
import { ScoreBoard } from "@/components/ScoreBoard";
import { TeamCards } from "@/components/TeamCards";
import { StandingsTable } from "@/components/StandingsTable";
import { TodayGames } from "@/components/TodayGames";
import { PointsTable } from "@/components/PointsTable";
import { Loader2, RefreshCw } from "lucide-react";

export default function Home() {
  const { data, loading, error, refetch } = useKboData();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 animate-spin text-red-brand" />
          <p className="text-muted-foreground font-medium">데이터를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4 text-center px-4">
          <p className="text-destructive text-lg font-semibold">오류 발생</p>
          <p className="text-muted-foreground">{error || "데이터를 불러올 수 없습니다."}</p>
          <button
            onClick={refetch}
            className="flex items-center gap-2 px-4 py-2 rounded-md bg-card text-foreground border border-border hover:bg-accent transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Banner with VS graphic */}
      <HeroBanner players={data.players} />

      {/* Main Score Board */}
      <section className="container -mt-8 relative z-10">
        <ScoreBoard players={data.players} />
      </section>

      {/* Team Cards - 각 참가자의 팀 현황 */}
      <section className="container mt-10">
        <TeamCards players={data.players} standings={data.standings} />
      </section>

      {/* Today's Games */}
      {data.todayGames.length > 0 && (
        <section className="container mt-10">
          <TodayGames games={data.todayGames} />
        </section>
      )}

      {/* Full Standings Table */}
      <section className="container mt-10">
        <StandingsTable standings={data.standings} />
      </section>

      {/* Points Reference Table */}
      <section className="container mt-10 pb-16">
        <PointsTable />
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-6">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-muted-foreground">
          <span>KBO 내기 2026 — 김진배 vs 윤정묵</span>
          <span className="flex items-center gap-2">
            마지막 업데이트: {data.lastUpdated}
            <button
              onClick={refetch}
              className="p-1 rounded hover:bg-accent transition-colors"
              title="새로고침"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </span>
        </div>
      </footer>
    </div>
  );
}
