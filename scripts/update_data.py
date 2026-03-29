#!/usr/bin/env python3
"""
KBO 내기 2026 - 데이터 수집 스크립트
GitHub Actions에서 주기적으로 실행되어 data.json을 업데이트합니다.

사용법:
  python scripts/update_data.py

출력:
  client/public/data.json
"""

import json
import urllib.request
import os
from datetime import datetime, timezone, timedelta

# ─── 설정 ───────────────────────────────────────────────────────────────────

RANK_API = "https://sports.daum.net/prx/hermes/api/team/rank.json?leagueCode=KBO&seasonKey=2026"
GAME_API = "https://sports.daum.net/prx/hermes/api/game/list.json?leagueCode=KBO&date={date}"

RANK_POINTS = [25, 21, 17, 14, 11, 8, 6, 4, 2, 1]

TEAM_MAP = {
    "HT": {"shortName": "KIA", "fullName": "KIA 타이거즈"},
    "SK": {"shortName": "SSG", "fullName": "SSG 랜더스"},
    "KT": {"shortName": "KT", "fullName": "KT 위즈"},
    "LT": {"shortName": "롯데", "fullName": "롯데 자이언츠"},
    "NC": {"shortName": "NC", "fullName": "NC 다이노스"},
    "OB": {"shortName": "두산", "fullName": "두산 베어스"},
    "LG": {"shortName": "LG", "fullName": "LG 트윈스"},
    "SS": {"shortName": "삼성", "fullName": "삼성 라이온즈"},
    "WO": {"shortName": "키움", "fullName": "키움 히어로즈"},
    "HH": {"shortName": "한화", "fullName": "한화 이글스"},
}

BET_CONFIG = {
    "player1": {
        "name": "김진배",
        "color": "red",
        "teams": ["SS", "KT", "LT", "OB", "HT"],
    },
    "player2": {
        "name": "윤정묵",
        "color": "blue",
        "teams": ["LG", "HH", "NC", "SK", "WO"],
    },
}


# ─── 데이터 수집 함수 ──────────────────────────────────────────────────────

def fetch_json(url: str) -> dict:
    """URL에서 JSON 데이터를 가져옵니다."""
    req = urllib.request.Request(url, headers={"User-Agent": "KBO-Bet-2026/1.0"})
    with urllib.request.urlopen(req, timeout=15) as resp:
        return json.loads(resp.read().decode("utf-8"))


def get_kst_now() -> datetime:
    """한국 시간(KST, UTC+9) 현재 시각을 반환합니다."""
    return datetime.now(timezone(timedelta(hours=9)))


def parse_standings(api_data: dict) -> list:
    """순위 API 응답을 파싱합니다."""
    standings = []
    for item in api_data.get("list", []):
        cp_id = item["cpTeamId"]
        info = TEAM_MAP.get(cp_id, {"shortName": cp_id, "fullName": cp_id})
        rank = item.get("rank", {})
        standings.append({
            "cpTeamId": cp_id,
            "shortName": info["shortName"],
            "fullName": info["fullName"],
            "rank": rank.get("rank", 0),
            "wins": rank.get("win", 0),
            "losses": rank.get("loss", 0),
            "draws": rank.get("draw", 0),
            "winRate": rank.get("wpct", 0),
            "gamesBack": rank.get("gb", "0"),
            "streak": rank.get("streak", "-"),
            "logoUrl": f"https://t1.daumcdn.net/media/img-section/sports13/logo/team/1/{cp_id}_300300.png",
        })
    return standings


def parse_games(api_data: dict) -> list:
    """경기 목록 API 응답을 파싱합니다."""
    games = []
    for g in api_data.get("list", []):
        home = g.get("home", {})
        away = g.get("away", {})
        home_team = home.get("team", {})
        away_team = away.get("team", {})
        games.append({
            "gameId": g.get("gameId", 0),
            "date": g.get("startDate", ""),
            "time": g.get("startTime", ""),
            "status": g.get("gameStatus", "READY"),
            "homeTeam": home_team.get("cpTeamId", ""),
            "awayTeam": away_team.get("cpTeamId", ""),
            "homeScore": int(home.get("result") or "0"),
            "awayScore": int(away.get("result") or "0"),
            "homeWlt": home.get("wlt", ""),
            "awayWlt": away.get("wlt", ""),
        })
    return games


def calculate_player_scores(standings: list, config: dict) -> dict:
    """참가자의 팀별 점수를 계산합니다."""
    team_scores = []
    for cp_id in config["teams"]:
        team = next((t for t in standings if t["cpTeamId"] == cp_id), None)
        rank = team["rank"] if team else 10
        score = RANK_POINTS[rank - 1] if 1 <= rank <= 10 else 0
        team_scores.append({"cpTeamId": cp_id, "rank": rank, "score": score})

    return {
        "name": config["name"],
        "color": config["color"],
        "teams": config["teams"],
        "totalScore": sum(t["score"] for t in team_scores),
        "teamScores": team_scores,
    }


# ─── 메인 실행 ──────────────────────────────────────────────────────────────

def main():
    now = get_kst_now()
    today_str = now.strftime("%Y%m%d")

    print(f"[{now.strftime('%Y-%m-%d %H:%M:%S KST')}] 데이터 수집 시작...")

    # 순위 데이터 가져오기
    print("  순위 데이터 수집 중...")
    rank_data = fetch_json(RANK_API)
    standings = parse_standings(rank_data)
    print(f"  → {len(standings)}개 팀 순위 수집 완료")

    # 오늘 경기 데이터 가져오기
    print(f"  오늘({today_str}) 경기 데이터 수집 중...")
    try:
        game_data = fetch_json(GAME_API.format(date=today_str))
        today_games = parse_games(game_data)
        print(f"  → {len(today_games)}개 경기 수집 완료")
    except Exception as e:
        print(f"  → 경기 데이터 수집 실패: {e}")
        today_games = []

    # 내기 점수 계산
    players = [
        calculate_player_scores(standings, BET_CONFIG["player1"]),
        calculate_player_scores(standings, BET_CONFIG["player2"]),
    ]
    print(f"  {players[0]['name']}: {players[0]['totalScore']}점")
    print(f"  {players[1]['name']}: {players[1]['totalScore']}점")

    # 결과 JSON 생성
    result = {
        "lastUpdated": now.strftime("%Y-%m-%d %H:%M:%S"),
        "standings": standings,
        "players": players,
        "todayGames": today_games,
    }

    # 파일 저장
    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_dir = os.path.dirname(script_dir)
    output_path = os.path.join(project_dir, "client", "public", "data.json")

    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(result, f, ensure_ascii=False, indent=2)

    print(f"  → {output_path} 저장 완료")
    print("데이터 수집 완료!")


if __name__ == "__main__":
    main()
