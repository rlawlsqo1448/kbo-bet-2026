# API Data Notes

## 순위 API
- URL: `https://sports.daum.net/prx/hermes/api/team/rank.json?leagueCode=KBO&seasonKey=2026`
- rank 정보: `team.rank.rank`, `team.rank.win`, `team.rank.loss`, `team.rank.draw`, `team.rank.wpct`, `team.rank.gb`, `team.rank.streak`
- 팀 식별: `team.cpTeamId`, `team.shortNameKo`

## 경기 목록 API
- URL: `https://sports.daum.net/prx/hermes/api/game/list.json?leagueCode=KBO&date=YYYYMMDD`
- home/away: `game.home.team.shortNameKo`, `game.home.result` (점수), `game.home.wlt` (W/L/D)
- 상태: `game.gameStatus` (END, PROGRESS, READY)

## 팀 매핑 (cpTeamId -> shortNameKo)
- HT -> KIA
- SK -> SSG
- KT -> KT
- LT -> 롯데
- NC -> NC
- OB -> 두산
- LG -> LG
- SS -> 삼성
- WO -> 키움
- HH -> 한화

## 팀 로고 URL 패턴
- `http://t1.daumcdn.net/media/img-section/sports13/logo/team/1/{cpTeamId}_300300.png`

## 내기 팀 배분
- 김진배: 삼성(SS), KT(KT), 롯데(LT), 두산(OB), KIA(HT)
- 윤정묵: LG(LG), 한화(HH), NC(NC), SSG(SK), 키움(WO)

## 점수 배분 (1위~10위)
25, 21, 17, 14, 11, 8, 6, 4, 2, 1
