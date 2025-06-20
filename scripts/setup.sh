#!/bin/bash

echo "🚀 스타일카 프로젝트 설정을 시작합니다..."

# 1. 의존성 설치
echo "📦 의존성을 설치하는 중..."
npm install

# 2. 환경변수 파일 생성
echo "🔧 환경변수 파일을 생성하는 중..."
cat > .env.local << EOL
# NextAuth.js
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here-$(openssl rand -base64 32)

# 임시 OAuth 설정 (실제 서비스에서는 실제 값으로 교체 필요)
GOOGLE_CLIENT_ID=demo-google-client-id
GOOGLE_CLIENT_SECRET=demo-google-client-secret
KAKAO_CLIENT_ID=demo-kakao-client-id
KAKAO_CLIENT_SECRET=demo-kakao-client-secret
NAVER_CLIENT_ID=demo-naver-client-id
NAVER_CLIENT_SECRET=demo-naver-client-secret

# Facebook Pixel (선택사항)
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=your-facebook-pixel-id
EOL

# 3. 개발 서버 시작
echo "🌟 개발 서버를 시작합니다..."
echo "브라우저에서 http://localhost:3000 을 열어주세요!"

npm run dev
