/**
 * KBO 데이터 fetch 훅
 * Design: Broadcast Scoreboard
 * data.json 파일에서 데이터를 읽어옴 (GitHub Actions가 주기적으로 업데이트)
 */

import { useState, useEffect, useCallback } from "react";
import type { DashboardData } from "@/lib/types";

export function useKboData() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setError(null);
      // data.json은 GitHub Actions에 의해 주기적으로 업데이트됨
      // 캐시 방지를 위해 타임스탬프 쿼리 파라미터 추가
      const res = await fetch(`/data.json?t=${Date.now()}`);
      if (!res.ok) throw new Error("데이터 파일을 불러올 수 없습니다.");
      const json: DashboardData = await res.json();
      setData(json);
    } catch (err: any) {
      setError(err.message || "데이터를 불러오는 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    // 5분마다 자동 갱신 (GitHub Actions가 업데이트한 data.json을 다시 읽음)
    const interval = setInterval(fetchData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
