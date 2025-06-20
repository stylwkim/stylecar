import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/", "/auth/", "/mypage/", "/_next/", "/reviews/write"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/admin/", "/api/", "/auth/", "/mypage/", "/_next/"],
      },
      {
        userAgent: "NaverBot",
        allow: "/",
        disallow: ["/admin/", "/api/", "/auth/", "/mypage/", "/_next/"],
      },
    ],
    sitemap: "https://stylecar.co.kr/sitemap.xml",
    host: "https://stylecar.co.kr",
  }
}
