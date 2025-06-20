#!/bin/bash

echo "🚀 스타일카 자동 배포 스크립트"

# Vercel CLI 설치 확인
if ! command -v vercel &> /dev/null; then
    echo "📦 Vercel CLI를 설치하는 중..."
    npm i -g vercel
fi

# Vercel 로그인
echo "🔐 Vercel에 로그인해주세요..."
vercel login

# 프로젝트 배포
echo "🚀 프로젝트를 배포하는 중..."
vercel --prod

# 실제 도메인으로 업데이트
echo "🌐 도메인을 연결하는 중..."
vercel domains add stylecar.co.kr

echo "✅ 배포가 완료되었습니다!"
echo "🌍 웹사이트: https://stylecar.co.kr"
echo "📊 대시보드: https://vercel.com/dashboard"
