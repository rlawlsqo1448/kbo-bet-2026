# KBO 내기 2026 — GitHub Pages 배포 가이드

이 문서는 **KBO 내기 2026** 대시보드를 GitHub에 올리고, GitHub Pages로 무료 배포하며, GitHub Actions를 통해 데이터를 자동 업데이트하는 전체 과정을 안내합니다.

---

## 1단계: GitHub 저장소 만들기

GitHub에 로그인한 뒤, 새 저장소(Repository)를 만듭니다.

1. [github.com/new](https://github.com/new) 에 접속합니다.
2. **Repository name**에 `kbo-bet-2026`을 입력합니다.
3. **Public**을 선택합니다 (GitHub Pages 무료 사용을 위해).
4. **Create repository** 버튼을 클릭합니다.

---

## 2단계: 프로젝트 코드 업로드

### 방법 A: GitHub 웹 UI로 업로드 (간편)

1. 생성된 저장소 페이지에서 **"uploading an existing file"** 링크를 클릭합니다.
2. 프로젝트 폴더 안의 모든 파일을 드래그 앤 드롭합니다.
3. **Commit changes** 버튼을 클릭합니다.

### 방법 B: Git 명령어로 업로드 (추천)

터미널에서 다음 명령어를 실행합니다:

```bash
cd kbo-bet-2026
git init
git add .
git commit -m "첫 번째 커밋: KBO 내기 2026 대시보드"
git branch -M main
git remote add origin https://github.com/본인아이디/kbo-bet-2026.git
git push -u origin main
```

> `본인아이디` 부분을 실제 GitHub 아이디로 바꿔주세요.

---

## 3단계: GitHub Pages 설정

1. 저장소 페이지에서 **Settings** 탭을 클릭합니다.
2. 왼쪽 메뉴에서 **Pages**를 클릭합니다.
3. **Source**를 **GitHub Actions**로 선택합니다.

이후 별도의 GitHub Pages 배포 워크플로우를 추가해야 합니다. 아래 파일을 `.github/workflows/deploy.yml`로 저장하세요:

```yaml
name: GitHub Pages 배포

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Node.js 설정
        uses: actions/setup-node@v4
        with:
          node-version: 22

      - name: pnpm 설치
        run: npm install -g pnpm

      - name: 의존성 설치
        run: pnpm install

      - name: 빌드
        run: pnpm run build

      - name: Pages 아티팩트 업로드
        uses: actions/upload-pages-artifact@v3
        with:
          path: dist/public

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: GitHub Pages 배포
        id: deployment
        uses: actions/deploy-pages@v4
```

---

## 4단계: 자동 데이터 업데이트 확인

프로젝트에 이미 포함된 `.github/workflows/update-data.yml` 파일이 자동으로 작동합니다.

이 워크플로우는 다음과 같이 동작합니다:

| 시간대 (KST) | 주기 | 설명 |
|:---|:---|:---|
| 매일 09:00 | 1회 | 전날 최종 결과 반영 |
| 14:00 ~ 23:00 | 10분마다 | 경기 진행 중 실시간 업데이트 |

> 이 스케줄은 KBO 시즌인 3월~10월에만 작동합니다.

---

## 5단계: 확인

모든 설정이 완료되면 다음 URL에서 대시보드를 확인할 수 있습니다:

```
https://본인아이디.github.io/kbo-bet-2026/
```

---

## 문제 해결

### Q: 데이터가 업데이트되지 않아요
- GitHub 저장소의 **Actions** 탭에서 워크플로우 실행 상태를 확인하세요.
- 워크플로우가 비활성화되어 있다면, **Enable workflow** 버튼을 클릭하세요.
- 수동으로 실행하려면 **Run workflow** 버튼을 클릭하세요.

### Q: 페이지가 404 에러가 나요
- Settings > Pages에서 Source가 **GitHub Actions**로 설정되어 있는지 확인하세요.
- `deploy.yml` 워크플로우가 정상적으로 실행되었는지 Actions 탭에서 확인하세요.

### Q: 빌드가 실패해요
- `pnpm install`이 정상적으로 실행되는지 확인하세요.
- Node.js 버전이 22 이상인지 확인하세요.

---

## 프로젝트 구조

```
kbo-bet-2026/
├── .github/workflows/
│   ├── update-data.yml    ← 데이터 자동 업데이트 (GitHub Actions)
│   └── deploy.yml         ← GitHub Pages 배포 (직접 추가 필요)
├── scripts/
│   └── update_data.py     ← 데이터 수집 Python 스크립트
├── client/
│   ├── public/
│   │   └── data.json      ← 자동 업데이트되는 데이터 파일
│   └── src/               ← React 프론트엔드 소스
├── package.json
└── DEPLOY_GUIDE.md         ← 이 문서
```
