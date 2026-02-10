---
title: 마크다운 기능 테스트
order: 3
---

# 마크다운 기능 테스트

이 문서는 모든 마크다운 기능을 테스트하기 위한 문서입니다.

## 헤딩 (Headings)

### H3 헤딩

#### H4 헤딩

##### H5 헤딩

###### H6 헤딩

## 텍스트 서식

**굵은 텍스트 (Bold)**

*기울임 텍스트 (Italic)*

***굵은 기울임 텍스트 (Bold Italic)***

~~취소선 (Strikethrough)~~

일반 텍스트 중간에 `인라인 코드`를 삽입할 수 있습니다.

`const x = 42;` 이런 식으로 코드를 강조합니다.

## 링크

[Google](https://www.google.com)

[내부 링크 - 시작하기](/docs/zk/getting-started)

## 인용문 (Blockquote)

> 이것은 인용문입니다.
> 여러 줄로 작성할 수 있습니다.

> 중첩된 인용문도 가능합니다.
>
> > 이것은 중첩된 인용문입니다.
> >
> > > 3단계 중첩도 가능합니다.

## 리스트

### 순서 없는 리스트

- 항목 1
- 항목 2
  - 하위 항목 2-1
  - 하위 항목 2-2
    - 더 깊은 하위 항목
- 항목 3

### 순서 있는 리스트

1. 첫 번째 항목
2. 두 번째 항목
   1. 하위 항목 2-1
   2. 하위 항목 2-2
3. 세 번째 항목

### 체크박스 리스트

- [ ] 미완료 항목
- [x] 완료된 항목
- [ ] 또 다른 미완료 항목
- [x] 또 다른 완료된 항목

## 코드 블록

### JavaScript

```javascript
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

const result = fibonacci(10);
console.log(`Fibonacci(10) = ${result}`);
```

### TypeScript

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  roles: string[];
}

async function fetchUser(id: number): Promise<User> {
  const response = await fetch(`/api/users/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch user: ${response.statusText}`);
  }
  return response.json();
}
```

### Python

```python
from dataclasses import dataclass
from typing import List

@dataclass
class Task:
    title: str
    completed: bool = False
    tags: List[str] = None

    def toggle(self):
        self.completed = not self.completed

tasks = [
    Task("Buy groceries", tags=["shopping"]),
    Task("Write documentation", completed=True),
    Task("Review PR", tags=["work", "code"]),
]

incomplete = [t for t in tasks if not t.completed]
print(f"Incomplete tasks: {len(incomplete)}")
```

### Bash

```bash
#!/bin/bash

# 디렉토리 내 파일 수 카운트
count_files() {
    local dir="${1:-.}"
    find "$dir" -type f | wc -l
}

echo "Current directory file count: $(count_files)"
echo "Docs directory file count: $(count_files ./docs)"
```

### JSON

```json
{
  "name": "dev-book",
  "version": "1.0.0",
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.0.0",
    "tailwindcss": "^4.0.0"
  },
  "scripts": {
    "dev": "next dev",
    "build": "next build"
  }
}
```

### CSS

```css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
```

### HTML

```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <title>Example Page</title>
</head>
<body>
  <header>
    <h1>Hello, World!</h1>
  </header>
  <main>
    <p>This is a paragraph.</p>
  </main>
</body>
</html>
```

### SQL

```sql
SELECT
    u.name,
    u.email,
    COUNT(o.id) AS order_count,
    SUM(o.total) AS total_spent
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE u.created_at >= '2024-01-01'
GROUP BY u.id, u.name, u.email
HAVING COUNT(o.id) > 0
ORDER BY total_spent DESC
LIMIT 10;
```

### Go

```go
package main

import (
    "fmt"
    "net/http"
)

func handler(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(w, "Hello, %s!", r.URL.Path[1:])
}

func main() {
    http.HandleFunc("/", handler)
    fmt.Println("Server starting on :8080")
    http.ListenAndServe(":8080", nil)
}
```

## 테이블

### 기본 테이블

| 이름 | 나이 | 직업 |
|------|------|------|
| 홍길동 | 30 | 개발자 |
| 김철수 | 25 | 디자이너 |
| 이영희 | 28 | PM |

### 정렬된 테이블

| 왼쪽 정렬 | 가운데 정렬 | 오른쪽 정렬 |
|:-----------|:----------:|------------:|
| Left | Center | Right |
| 텍스트 | 텍스트 | 텍스트 |
| 123 | 456 | 789 |

### 복잡한 테이블

| 기능 | 지원 | 비고 |
|------|:----:|------|
| 헤딩 (H1-H6) | O | 자동 ID 생성 |
| **굵은 텍스트** | O | `**text**` |
| *기울임* | O | `*text*` |
| `인라인 코드` | O | backtick |
| 코드 블록 | O | syntax highlighting |
| 테이블 | O | 정렬 지원 |
| 리스트 | O | 중첩 지원 |
| 인용문 | O | 중첩 지원 |

## 수평선

위 텍스트

---

아래 텍스트

***

또 다른 구분선

## 이미지

이미지는 아래와 같이 삽입합니다 (샘플 URL):

![Alt text placeholder](https://via.placeholder.com/600x200/3b82f6/ffffff?text=Dev+Book+Image+Test)

## 혼합 콘텐츠

아래는 다양한 요소가 혼합된 예시입니다:

1. **첫 번째 단계**: `config.ts` 파일을 수정합니다.
2. **두 번째 단계**: 아래 코드를 추가합니다:

```typescript
export const config = {
  theme: "dark",
  language: "ko",
};
```

3. **세 번째 단계**: 결과를 확인합니다.

> **참고**: 설정 변경 후 서버를 재시작해야 합니다.
>
> ```bash
> npm run dev
> ```

## 긴 코드 블록 (가로 스크롤 테스트)

```typescript
const veryLongVariableName = someFunction(firstArgument, secondArgument, thirdArgument, fourthArgument, fifthArgument, sixthArgument, seventhArgument);
```
