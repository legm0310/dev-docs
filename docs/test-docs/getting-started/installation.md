---
title: 설치
order: 2
---

# 설치

Dev Book을 설치하고 실행하는 방법을 안내합니다.

## 사전 요구사항

- Node.js 18 이상
- npm 또는 yarn

## 설치 방법

프로젝트를 클론하고 의존성을 설치합니다.

```bash
git clone https://github.com/your-org/dev-book.git
cd dev-book
npm install
```

## 개발 서버 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:3000`으로 접속합니다.

## 프로덕션 빌드

정적 사이트를 생성하려면 다음 명령어를 실행합니다.

```bash
npm run build
```

`out/` 디렉토리에 정적 HTML 파일이 생성됩니다.

## 배포

생성된 `out/` 디렉토리를 Nginx 등의 웹 서버로 서빙합니다.

```nginx
server {
    listen 80;
    server_name docs.example.com;
    root /path/to/out;
    index index.html;

    location / {
        try_files $uri $uri.html $uri/index.html =404;
    }
}
```
