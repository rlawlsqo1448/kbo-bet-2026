/**
 * KBO 내기 대시보드 - 타입 정의
 * Design: Broadcast Scoreboard (TV 중계 스코어보드 스타일)
 */

export interface TeamRank {
  cpTeamId: string;
  shortName: string;
  fullName: string;
  rank: number;
  wins: number;
  losses: number;
  draws: number;
  winRate: number;
  gamesBack: string;
  streak: string;
  logoUrl: string;
}

export interface BetPlayer {
  name: string;
  color: "red" | "blue";
  teams: string[]; // cpTeamId 배열
  totalScore: number;
  teamScores: { cpTeamId: string; rank: number; score: number }[];
}

export interface GameResult {
  gameId: number;
  date: string;
  time: string;
  status: string; // END, PROGRESS, READY
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  homeWlt: string;
  awayWlt: string;
}

export interface DashboardData {
  lastUpdated: string;
  standings: TeamRank[];
  players: [BetPlayer, BetPlayer];
  todayGames: GameResult[];
}

// 순위별 점수 배분
export const RANK_POINTS = [25, 21, 17, 14, 11, 8, 6, 4, 2, 1];

// 팀 매핑 정보
export const TEAM_MAP: Record<string, { shortName: string; fullName: string }> = {
  HT: { shortName: "KIA", fullName: "KIA 타이거즈" },
  SK: { shortName: "SSG", fullName: "SSG 랜더스" },
  KT: { shortName: "KT", fullName: "KT 위즈" },
  LT: { shortName: "롯데", fullName: "롯데 자이언츠" },
  NC: { shortName: "NC", fullName: "NC 다이노스" },
  OB: { shortName: "두산", fullName: "두산 베어스" },
  LG: { shortName: "LG", fullName: "LG 트윈스" },
  SS: { shortName: "삼성", fullName: "삼성 라이온즈" },
  WO: { shortName: "키움", fullName: "키움 히어로즈" },
  HH: { shortName: "한화", fullName: "한화 이글스" },
};

// 내기 참가자 설정
export const BET_CONFIG = {
  player1: {
    name: "김진배",
    color: "red" as const,
    teams: ["SS", "KT", "LT", "OB", "HT"], // 삼성, KT, 롯데, 두산, KIA
  },
  player2: {
    name: "윤정묵",
    color: "blue" as const,
    teams: ["LG", "HH", "NC", "SK", "WO"], // LG, 한화, NC, SSG, 키움
  },
};

// 팀 로고 URL 생성
export function getTeamLogoUrl(cpTeamId: string): string {
  return `https://t1.daumcdn.net/media/img-section/sports13/logo/team/1/${cpTeamId}_300300.png`;
}

// 팀 소유자 색상 반환
export function getTeamOwnerColor(cpTeamId: string): "red" | "blue" {
  if (BET_CONFIG.player1.teams.includes(cpTeamId)) return "red";
  return "blue";
}

// 팀 소유자 이름 반환
export function getTeamOwnerName(cpTeamId: string): string {
  if (BET_CONFIG.player1.teams.includes(cpTeamId)) return BET_CONFIG.player1.name;
  return BET_CONFIG.player2.name;
}
