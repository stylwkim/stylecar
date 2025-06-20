/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  
  // 빌드 오류 무시 (중요!)
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  
  images: {
    unoptimized: true,
  },
  
  experimental: {
    serverActions: true,
  },
  
  swcMinify: true,
  compress: true,
}

export default nextConfig
