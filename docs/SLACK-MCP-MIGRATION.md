# Slack 워크스페이스 + MCP 이관 작업

작성일: 2026-05-27
오너: Carshu (solo founder)
상태: 시작 전, 사전 결정 단계

---

## 프로젝트 개요

### 무엇을 만드는가
**Carshu 개인 command center**로 쓸 Slack 워크스페이스 세팅 + Claude Code가 그 Slack을 읽고 쓸 수 있도록 **Slack MCP 서버 연동**.

### 왜 만드는가
- 현재 흩어져 있는 작업 메모/할일/아이디어/제품 신호를 한 곳에 모음
- Claude Code가 Slack 채널을 직접 읽고 쓸 수 있게 되면, "이 채널의 메모 정리해줘", "어제 내가 쓴 아이디어 다시 보여줘", "이 작업 시작 알려줘" 같은 자연어 명령 가능
- 모바일에서 Slack 앱으로 메모/할일 추가 → 데스크탑 Claude Code가 이어서 작업
- 향후 gliddy 제품 알림(주문/에러)도 같은 워크스페이스의 별도 채널로 흘릴 수 있음 (이번 작업 범위 X)

### 현재 상태
- 프로젝트에 Slack 관련 코드/설정 **없음** (검색 확인: lib/plan-stats.ts의 가짜 매치 1건만)
- `.mcp.json` 또는 프로젝트 단위 MCP 설정 파일 **없음**
- 글로벌 Claude Code MCP 설정도 미확인 (`~/.claude/` 또는 `%USERPROFILE%\.claude\` 확인 필요)
- → 기본적으로 **fresh setup**

---

## 목표 (Done의 정의)

이 작업 끝나면 다음이 가능해야 함:

- [ ] Slack 워크스페이스 존재, Carshu만 멤버
- [ ] 최소 3개 채널 운영 중 (#inbox, #ideas, #log — 아래 설계 참조)
- [ ] Claude Code에서 `mcp list`로 Slack MCP 서버 보임
- [ ] Claude Code에게 "Slack #ideas 채널에 '이 아이디어 메모' 적어줘" 하면 실제로 게시됨
- [ ] Claude Code에게 "Slack #inbox 최근 5개 읽어줘" 하면 실제로 읽어옴
- [ ] Slack 모바일 앱에서 적은 메모를 데스크탑 Claude가 인지 가능
- [ ] MCP 토큰이 안전한 곳에 저장됨 (코드 외부, .env 또는 OS 키체인)

---

## 사전 결정 사항 (시작 전 확정)

### 1. 워크스페이스 이름
- 후보: `carshu`, `kms-hq`, `gliddy-hq` 등
- 권장: 개인 command center이므로 personal naming (`kms-hq` 같은). gliddy 제품 알림 채널은 별도 워크스페이스 또는 같은 워크스페이스의 분리된 채널 그룹.
- **결정 필요:** _______________

### 2. Slack 플랜
- **Free 플랜으로 시작 권장.** 메시지 90일 retention 제한 있지만 개인 command center로는 충분.
- Pro ($8.75/월) 업그레이드는 메시지 영구 보관 + 무제한 앱 통합 필요할 때.
- **결정 필요:** Free / Pro

### 3. Slack MCP 서버 선택

옵션 (2026-05 기준, 시작 전 최신 확인 필요):

| 서버 | 출처 | 장점 | 단점 |
|---|---|---|---|
| `@modelcontextprotocol/server-slack` | Anthropic 공식 (modelcontextprotocol/servers 리포) | 안정적, 문서 잘됨 | 기능 보수적 |
| Community Slack MCP | GitHub 커뮤니티 | 더 많은 기능 | 보안 리뷰 필요 |
| Self-hosted Slack MCP | 직접 구현 | 완전 제어 | 시간 비용 큼 |

**권장:** 공식 `@modelcontextprotocol/server-slack` 우선 (안전한 디폴트).
**결정 필요:** _______________

### 4. 토큰 저장 방식
- `.env` 파일 (단순, 하지만 git 제외 필수)
- OS 키체인 / Credential Manager (Windows)
- `~/.claude/secrets.json` 형태 (Claude Code 전용)
- **권장:** Windows Credential Manager + `.env`로 export (가장 안전 + 호환성)
- **결정 필요:** _______________

---

## 설치 체크리스트 (순차 실행)

### Phase 1: Slack 워크스페이스 생성 (Carshu, ~15분)

- [ ] [slack.com/create](https://slack.com/create) 접속, 새 워크스페이스 생성
- [ ] 이메일: carshello@naver.com (gliddy 등록 이메일과 동일)
- [ ] 워크스페이스 이름 결정 (위 1번 참조)
- [ ] 첫 채널 자동 생성 (#general) 확인
- [ ] 본인 외 멤버 초대 X (개인 command center이므로)

### Phase 2: 채널 구조 세팅 (Carshu, ~10분)

권장 초기 채널 5개:

| 채널 | 용도 | 예시 |
|---|---|---|
| `#inbox` | 모바일/순간 메모 일단 다 던지는 곳 | "오늘 그 식당 이름 메모", "이 트윗 나중에 보기" |
| `#ideas` | 정리된 제품/마케팅 아이디어 | "Reddit 답변 시 한국식 영어 톤이 더 통할 듯" |
| `#log` | 일일 작업 기록 | "오늘 Reddit 5개 게시 → 4개 [deleted]" |
| `#focus` | 현재 집중 중인 작업의 컨텍스트 | "이번 주: Reddit 카르마 빌드 + Naver 초안" |
| `#reading` | 나중에 읽을 링크 | URL + 한 줄 요약 |

- [ ] 위 5개 채널 생성
- [ ] 각 채널 description 설정 (위 용도 그대로 복붙)
- [ ] #general 채널은 사용 안 함 표시 ("이 워크스페이스는 개인 command center입니다. #inbox부터 시작하세요.")

### Phase 3: Slack 앱 + 토큰 발급 (Carshu, ~20분)

- [ ] [api.slack.com/apps](https://api.slack.com/apps) → "Create New App" → "From scratch"
- [ ] App 이름: `claude-code-mcp` (또는 비슷)
- [ ] 위에서 만든 워크스페이스 선택
- [ ] **OAuth & Permissions** 메뉴에서 다음 스코프 추가:
  - Bot Token Scopes:
    - `channels:history` (퍼블릭 채널 읽기)
    - `channels:read` (채널 목록)
    - `chat:write` (메시지 보내기)
    - `groups:history` (프라이빗 채널 읽기 — 필요 시)
    - `groups:read`
    - `users:read` (멤버 정보)
  - User Token Scopes (Claude가 본인으로 행세할 때):
    - `search:read` (메시지 검색)
- [ ] "Install to Workspace" 클릭, 권한 승인
- [ ] **Bot User OAuth Token** (xoxb-...) 복사 → 안전한 곳에 임시 저장
- [ ] **User OAuth Token** (xoxp-...) 복사 → 안전한 곳에 임시 저장
- [ ] App을 모든 채널에 초대: 각 채널에서 `/invite @claude-code-mcp`

### Phase 4: Claude Code MCP 설정 (Carshu + Claude, ~15분)

- [ ] Claude Code 설치 위치 확인: `where claude` (PowerShell)
- [ ] 글로벌 MCP 설정 파일 위치 확인:
  - Windows: `%USERPROFILE%\.claude\` 또는 `~/.claude.json`
- [ ] `claude mcp add` 명령 또는 설정 파일 직접 편집으로 Slack MCP 서버 등록:

```json
{
  "mcpServers": {
    "slack": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-slack"],
      "env": {
        "SLACK_BOT_TOKEN": "xoxb-...",
        "SLACK_USER_TOKEN": "xoxp-...",
        "SLACK_TEAM_ID": "T..."
      }
    }
  }
}
```

- [ ] 정확한 패키지 이름 + 환경변수 이름 npm/GitHub 최신 README로 검증 (`npx -y @modelcontextprotocol/server-slack --help`)
- [ ] Claude Code 재시작
- [ ] `claude mcp list`로 slack 서버 보이는지 확인

### Phase 5: 토큰 보안 정리 (Carshu, ~10분)

- [ ] 토큰을 Windows Credential Manager에 저장
  ```powershell
  cmdkey /generic:slack_bot_token /user:claude /pass:xoxb-...
  ```
- [ ] `.claude/settings.json`에서 토큰 직접 작성 대신 env 참조 가능한지 확인
- [ ] 토큰을 임시 저장한 메모/파일 **모두 삭제**
- [ ] 토큰을 절대 git, 메시지, screenshot에 노출하지 않음 (재발급은 가능하지만 귀찮음)

### Phase 6: 검증 (Carshu, ~10분)

- [ ] Claude Code에서: "Slack #inbox 채널에 '테스트 메시지' 보내줘" → 실제 게시 확인
- [ ] Slack 모바일 앱에서 #ideas에 메모 1개 직접 작성
- [ ] Claude Code에서: "Slack #ideas 최근 메시지 읽어줘" → 모바일에서 쓴 메모 보이는지
- [ ] 채널 검색 테스트: "Slack에서 'gliddy' 검색해줘"
- [ ] 에러 발생 시 디버그: `claude mcp logs slack`

---

## 초기 채널 구조 (확장 시 참고)

Phase 2의 5개 채널 외에 나중에 추가할 만한 것:

- `#reddit-log` — Reddit 답변 + 결과 누적 (현재 진행 중인 마케팅 작업 기록)
- `#naver-log` — Naver 블로그 게시 + 트래픽 데이터
- `#metrics` — 매주 자동으로 GA/PostHog 숫자 받기 (Phase 7 미래)
- `#errors` — Anthropic API 에러, LemonSqueezy 웹훅 실패 등 (Phase 7 미래)
- `#wins` — 첫 매출, 100번째 사용자 등 동기부여 마일스톤

---

## 알려진 함정 (Known Gotchas)

1. **무료 플랜 90일 retention** — 1주일에 한번 #log #ideas의 중요 내용을 별도 파일로 백업 권장
2. **MCP 서버 패키지 이름 변동** — 2026년 들어 MCP 생태계 빠르게 변하니 시작 전 npm/GitHub로 정확한 패키지 이름 확인
3. **Slack API rate limit** — Tier 3 (200+/min)이라 개인 사용 충분, 단 대량 검색은 페이지네이션 필수
4. **MCP 서버 충돌** — 동일 머신에서 여러 Claude Code 세션이 같은 MCP 서버 호출 시 토큰 사용량 ↑. 모니터링 필요
5. **토큰 만료/리볼브** — Slack 토큰은 만료 없지만 Slack App 삭제 시 즉시 무효. 백업 메모 (어디서 어떻게 발급했는지) 권장

---

## 미래 확장 (현재 스코프 외)

- gliddy 제품 알림 채널 (#orders, #errors) → 별도 작업, 같은 워크스페이스에 추가 가능
- GitHub MCP 연동 → issue/PR 자동 관리
- Supabase MCP 연동 → DB 직접 쿼리
- 자동화: Slack의 특정 채널에 메시지 오면 자동으로 Claude에게 분석 요청 (webhook + cron)

---

## 진행 추적

체크리스트 진행은 이 파일을 직접 수정해서 `[ ]` → `[x]` 변경. 또는 #log 채널에 매일 진행상황 기록.

각 Phase 완료 시 commit:
```
chore(slack-mcp): Phase N complete — <한 줄 요약>
```

---

## 다음 액션

1. **사전 결정 4가지 확정** (워크스페이스 이름, 플랜, MCP 서버, 토큰 저장 방식)
2. **Phase 1 시작** — slack.com에서 워크스페이스 생성

결정 사항 알려주시면 Phase 1부터 같이 진행합니다.
