/** @type {import('next').NextConfig} */
const nextConfig = {
  // 정적 내보내기 설정
  output: 'export',

  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // 이미지 최적화
  images: {
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30일 캐시
  },
  
  // 성능 최적화 설정
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
    serverActions: true,
    webVitalsAttribution: ['CLS', 'LCP', 'FCP', 'FID', 'TTFB'],
  },
  
  // 빌드 최적화
  swcMinify: true,
  
  // 압축 설정
  compress: true,
  
  // 정적 파일 최적화
  generateEtags: false,
  
  // 헤더 설정 (캐싱)
  async headers() {
    return [
      {
        source: '/categories-:path*.html',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:path*.(jpg|jpeg|png|gif|ico|svg|webp)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
  
  // 번들 분석기 및 최적화
  webpack: (config, { dev, isServer }) => {
    // 프로덕션 빌드에서만 최적화
    if (!dev) {
      config.optimization = {
        ...config.optimization,
        minimize: true,
        splitChunks: {
          chunks: 'all',
          minSize: 20000,
          maxSize: 70000,
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
              priority: -10,
              reuseExistingChunk: true,
            },
            commons: {
              name: 'commons',
              chunks: 'all',
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true,
            },
            styles: {
              name: 'styles',
              test: /\.css$/,
              chunks: 'all',
              enforce: true,
            },
          },
        },
        runtimeChunk: { name: 'runtime' },
      }

      // Tree shaking 최적화
      config.optimization.usedExports = true
      config.optimization.sideEffects = false
    }

    // 번들 크기 분석 (개발 시에만)
    if (dev && process.env.ANALYZE === 'true') {
      const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'server',
          openAnalyzer: true,
        })
      )
    }

    return config
  },
}

export default nextConfig
