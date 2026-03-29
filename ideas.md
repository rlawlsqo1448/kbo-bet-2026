# KBO 내기 현황 대시보드 - 디자인 아이디어

## 프로젝트 맥락
- 김진배 vs 윤정묵, 2026 KBO 시즌 내기 현황판
- 10개 팀을 5:5로 나누어 순위 기반 점수 합산 대결
- 친구 둘이서 수시로 확인하는 개인적이고 재미있는 대시보드

---

<response>
<text>

## 아이디어 1: "Stadium Night" — 야간 경기장 무드

### Design Movement
야간 야구 경기장의 분위기를 디지털로 재현한 **Atmospheric Dark UI**. 경기장 조명 아래의 따뜻한 빛과 어두운 관중석의 대비를 모티브로 삼는다.

### Core Principles
1. **Warm-on-Dark**: 짙은 네이비/차콜 배경 위에 앰버(amber), 골드 톤의 하이라이트
2. **Data-First Hierarchy**: 숫자와 점수가 가장 먼저 눈에 들어오는 정보 위계
3. **Compact Density**: 한 화면에 모든 핵심 정보를 담되, 시각적 혼잡함 없이

### Color Philosophy
- 배경: `#0F1923` (깊은 네이비) → `#1A2332` (카드 배경)
- 강조: `#F59E0B` (앰버 골드) — 승리, 1등, 핵심 수치
- 보조: `#EF4444` (레드) vs `#3B82F6` (블루) — 두 참가자 대비
- 텍스트: `#E2E8F0` (밝은 슬레이트)

### Layout Paradigm
- 상단에 대형 스코어보드 (두 사람의 총점 대결)
- 하단에 2열 그리드로 각자의 팀 카드 나열
- 모바일에서는 단일 컬럼으로 자연스럽게 전환

### Signature Elements
1. 스코어보드 영역에 미세한 그라데이션 글로우 효과
2. 팀 카드에 순위 변동 시 미세한 펄스 애니메이션
3. 경기장 조명을 연상시키는 상단 라디얼 그라데이션

### Interaction Philosophy
- 호버 시 카드가 살짝 들어올려지며 그림자 강화
- 점수 변동 시 숫자가 카운트업 애니메이션으로 전환

### Animation
- 페이지 로드 시 스코어보드가 위에서 슬라이드 인
- 팀 카드는 stagger 방식으로 순차 페이드인
- 점수 숫자는 spring 기반 카운트업

### Typography System
- 제목/점수: **Oswald** (condensed, bold) — 스포츠 스코어보드 느낌
- 본문/라벨: **Pretendard** 또는 시스템 산세리프 — 깔끔한 가독성

</text>
<probability>0.08</probability>
</response>

---

<response>
<text>

## 아이디어 2: "Dugout Chalkboard" — 더그아웃 칠판 스타일

### Design Movement
야구 더그아웃의 전술 칠판/화이트보드를 모티브로 한 **Analog-Digital Hybrid**. 손으로 쓴 듯한 질감과 스포츠 데이터의 정밀함이 공존하는 스타일.

### Core Principles
1. **Handcrafted Feel**: 약간의 거칠고 아날로그적인 텍스처
2. **Playful Competition**: 내기의 재미와 경쟁 요소를 시각적으로 강조
3. **Chalk & Marker Aesthetic**: 칠판 위 분필/마커 느낌의 컬러링

### Color Philosophy
- 배경: `#2D3A2E` (칠판 그린) 또는 `#1E293B` (슬레이트 보드)
- 강조: `#FBBF24` (노란 분필), `#FB923C` (주황 마커)
- 대비: 흰색 분필 텍스트 + 형광 하이라이터 효과
- 참가자: 빨간 마커 vs 파란 마커

### Layout Paradigm
- 전체 화면이 하나의 큰 칠판처럼 보이는 단일 보드 레이아웃
- 좌우 분할로 두 참가자의 영역을 나누되, 중앙에 VS 배지
- 하단에 순위표가 가로로 길게 펼쳐지는 형태

### Signature Elements
1. 칠판 텍스처 배경 (미세한 노이즈 + 그린/다크 톤)
2. 점수 영역에 동그라미 치거나 밑줄 긋는 듯한 SVG 장식
3. "VS" 뱃지가 중앙에서 회전하며 존재감 발휘

### Interaction Philosophy
- 요소 호버 시 분필 가루가 날리는 듯한 파티클 효과
- 클릭 시 마커로 체크하는 듯한 피드백

### Animation
- 텍스트가 손글씨 쓰듯 한 글자씩 나타나는 효과
- 점수판이 지우고 다시 쓰는 듯한 전환 애니메이션

### Typography System
- 제목: **Permanent Marker** 또는 **Caveat** — 손글씨 느낌
- 데이터: **Space Mono** — 모노스페이스로 정렬된 숫자 표현

</text>
<probability>0.05</probability>
</response>

---

<response>
<text>

## 아이디어 3: "Broadcast Scoreboard" — TV 중계 스코어보드 스타일

### Design Movement
TV 야구 중계의 하단 스코어 그래픽을 전체 화면으로 확장한 **Broadcast Graphics UI**. ESPN, MBC 스포츠 중계 그래픽의 세련된 정보 전달 방식을 웹으로 가져온다.

### Core Principles
1. **Broadcast Precision**: TV 중계처럼 정보가 깔끔하고 즉각적으로 전달
2. **Bold Contrast**: 강렬한 색상 대비로 두 참가자를 명확히 구분
3. **Motion Graphics DNA**: 정적이지 않고, 항상 미세하게 살아 움직이는 느낌

### Color Philosophy
- 배경: `#0A0A0A` (순수 다크) → `#141414` (카드)
- 김진배 컬러: `#DC2626` (딥 레드) 계열 — 강렬한 존재감
- 윤정묵 컬러: `#2563EB` (로열 블루) 계열 — 차분한 대비
- 강조: `#FFFFFF` (순백) 텍스트 + `#22C55E` (그린) 승리 표시

### Layout Paradigm
- 최상단: 대형 "VS" 스코어 배너 (TV 중계 하단 그래픽을 상단으로)
- 중앙: 두 참가자의 팀 목록이 좌우로 대칭 배치
- 하단: KBO 전체 순위표 (10개 팀, 각 팀에 소유자 색상 표시)

### Signature Elements
1. 스코어 영역에 대각선 컷(diagonal slash) 디바이더 — 레드 vs 블루
2. 팀 카드에 순위 뱃지가 TV 그래픽처럼 모서리에 붙어있는 형태
3. 상단 배너에 미세한 스캔라인 또는 글리치 텍스처

### Interaction Philosophy
- 데이터 갱신 시 TV 중계처럼 슬라이드-인/아웃 트랜지션
- 승리 중인 쪽에 미세한 글로우 펄스

### Animation
- 스코어 변경 시 TV 중계 하단 그래픽처럼 좌에서 우로 와이프 전환
- 팀 카드 진입 시 아래에서 위로 스택되며 등장
- 배경에 미세한 그라데이션 시프트 (살아있는 느낌)

### Typography System
- 점수/헤드라인: **Bebas Neue** — 중계 그래픽의 대표적 폰트
- 본문/라벨: **Noto Sans KR** (Medium/Regular) — 한글 가독성 최적화

</text>
<probability>0.07</probability>
</response>
