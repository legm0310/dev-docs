---
title: 빠른 시작
order: 3
---

# 빠른 시작

5분 안에 첫 번째 문서를 작성하고 확인하는 방법을 알아봅니다.

## 1. 문서 파일 생성

`docs/` 디렉토리에 마크다운 파일을 생성합니다.

```markdown
---
title: 나의 첫 문서
order: 1
---

# 나의 첫 문서

여기에 내용을 작성합니다.
```

## 2. Frontmatter 설정

각 마크다운 파일의 상단에 frontmatter를 추가합니다.

| 필드    | 설명                                  | 필수 |
| ------- | ------------------------------------- | ---- |
| `title` | 문서 제목 (사이드바에 표시)           | O    |
| `order` | 정렬 순서 (숫자가 작을수록 위에 표시) | O    |

## 3. 디렉토리 구조

문서를 폴더로 그룹화할 수 있습니다.

```
docs/
├── getting-started/
│   ├── index.md        # /docs/getting-started
│   └── installation.md # /docs/getting-started/installation
└── guides/
    ├── index.md        # /docs/guides
    └── basic-usage.md  # /docs/guides/basic-usage
```

## 4. 확인

개발 서버를 실행하고 브라우저에서 문서를 확인합니다.

```bash
npm run dev
```
