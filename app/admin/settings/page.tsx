"use client"

import { useState } from "react"
import { Save, Upload, Download, RefreshCw, Bell, Shield, Globe, Database } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import AdminLayout from "@/components/admin-layout"

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(false)

  // 사이트 설정
  const [siteSettings, setSiteSettings] = useState({
    siteName: "스타일카",
    siteDescription: "자동차 용품 전문 쇼핑몰",
    siteUrl: "https://stylecar.co.kr", // 실제 도메인으로 변경
    adminEmail: "admin@stylecar.co.kr",
    supportEmail: "support@stylecar.co.kr",
    phone: "1588-1234",
    address: "서울시 강남구 테헤란로 123",
    businessNumber: "123-45-67890",
    ceoName: "홍길동",
  })

  // 배송 설정
  const [shippingSettings, setShippingSettings] = useState({
    freeShippingThreshold: 100000,
    shippingFee: 3000,
    expressShippingFee: 5000,
    returnShippingFee: 3000,
    exchangeShippingFee: 6000,
  })

  // 알림 설정
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    newOrderNotification: true,
    lowStockNotification: true,
    customerInquiryNotification: true,
    reviewNotification: false,
  })

  // 보안 설정
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: 30,
    passwordPolicy: "medium",
    loginAttempts: 5,
    ipWhitelist: "",
  })

  // SEO 설정
  const [seoSettings, setSeoSettings] = useState({
    metaTitle: "스타일카 - 자동차 용품 전문 쇼핑몰",
    metaDescription: "프리미엄 자동차 용품을 합리적인 가격에 만나보세요. 카매트, 세차용품, 차량용품 전문 쇼핑몰",
    metaKeywords: "자동차용품, 카매트, 세차용품, 차량용품, 자동차액세서리",
    googleAnalyticsId: "",
    googleSearchConsole: "",
    naverSearchAdvisor: "",
    facebookPixelId: "",
  })

  const handleSave = async (section: string) => {
    setIsLoading(true)
    // 실제 구현에서는 API 호출
    setTimeout(() => {
      setIsLoading(false)
      alert(`${section} 설정이 저장되었습니다.`)
    }, 1000)
  }

  const handleExportSettings = () => {
    const settings = {
      site: siteSettings,
      shipping: shippingSettings,
      notifications: notificationSettings,
      security: securitySettings,
      seo: seoSettings,
    }

    const dataStr = JSON.stringify(settings, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = "stylecar-settings.json"
    link.click()
  }

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">시스템 설정</h1>
          <p className="text-gray-500">사이트 운영에 필요한 각종 설정을 관리합니다.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleExportSettings}>
            <Download className="mr-2 h-4 w-4" />
            설정 내보내기
          </Button>
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            설정 가져오기
          </Button>
        </div>
      </div>

      <Tabs defaultValue="site" className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="site">사이트</TabsTrigger>
          <TabsTrigger value="shipping">배송</TabsTrigger>
          <TabsTrigger value="notifications">알림</TabsTrigger>
          <TabsTrigger value="security">보안</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
          <TabsTrigger value="system">시스템</TabsTrigger>
        </TabsList>

        {/* 사이트 설정 */}
        <TabsContent value="site" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                기본 사이트 정보
              </CardTitle>
              <CardDescription>사이트의 기본 정보를 설정합니다.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="siteName">사이트명</Label>
                  <Input
                    id="siteName"
                    value={siteSettings.siteName}
                    onChange={(e) => setSiteSettings({ ...siteSettings, siteName: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="siteUrl">사이트 URL</Label>
                  <Input
                    id="siteUrl"
                    value={siteSettings.siteUrl}
                    onChange={(e) => setSiteSettings({ ...siteSettings, siteUrl: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="siteDescription">사이트 설명</Label>
                <Textarea
                  id="siteDescription"
                  value={siteSettings.siteDescription}
                  onChange={(e) => setSiteSettings({ ...siteSettings, siteDescription: e.target.value })}
                />
              </div>
              <Separator />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="adminEmail">관리자 이메일</Label>
                  <Input
                    id="adminEmail"
                    type="email"
                    value={siteSettings.adminEmail}
                    onChange={(e) => setSiteSettings({ ...siteSettings, adminEmail: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="supportEmail">고객지원 이메일</Label>
                  <Input
                    id="supportEmail"
                    type="email"
                    value={siteSettings.supportEmail}
                    onChange={(e) => setSiteSettings({ ...siteSettings, supportEmail: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">대표 전화번호</Label>
                  <Input
                    id="phone"
                    value={siteSettings.phone}
                    onChange={(e) => setSiteSettings({ ...siteSettings, phone: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="businessNumber">사업자등록번호</Label>
                  <Input
                    id="businessNumber"
                    value={siteSettings.businessNumber}
                    onChange={(e) => setSiteSettings({ ...siteSettings, businessNumber: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="ceoName">대표자명</Label>
                  <Input
                    id="ceoName"
                    value={siteSettings.ceoName}
                    onChange={(e) => setSiteSettings({ ...siteSettings, ceoName: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="address">사업장 주소</Label>
                  <Input
                    id="address"
                    value={siteSettings.address}
                    onChange={(e) => setSiteSettings({ ...siteSettings, address: e.target.value })}
                  />
                </div>
              </div>
              <Button onClick={() => handleSave("사이트")} disabled={isLoading}>
                {isLoading ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                저장
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 배송 설정 */}
        <TabsContent value="shipping" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>기본 배송비 설정</CardTitle>
              <CardDescription>전체 상품에 적용되는 기본 배송 정책을 설정합니다.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="freeShippingThreshold">무료배송 기준금액 (원)</Label>
                  <Input
                    id="freeShippingThreshold"
                    type="number"
                    value={shippingSettings.freeShippingThreshold}
                    onChange={(e) =>
                      setShippingSettings({ ...shippingSettings, freeShippingThreshold: Number(e.target.value) })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="shippingFee">기본 배송비 (원)</Label>
                  <Input
                    id="shippingFee"
                    type="number"
                    value={shippingSettings.shippingFee}
                    onChange={(e) => setShippingSettings({ ...shippingSettings, shippingFee: Number(e.target.value) })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="expressShippingFee">특급배송비 (원)</Label>
                  <Input
                    id="expressShippingFee"
                    type="number"
                    value={shippingSettings.expressShippingFee}
                    onChange={(e) =>
                      setShippingSettings({ ...shippingSettings, expressShippingFee: Number(e.target.value) })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="returnShippingFee">반품배송비 (원)</Label>
                  <Input
                    id="returnShippingFee"
                    type="number"
                    value={shippingSettings.returnShippingFee}
                    onChange={(e) =>
                      setShippingSettings({ ...shippingSettings, returnShippingFee: Number(e.target.value) })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="exchangeShippingFee">교환배송비 (원)</Label>
                  <Input
                    id="exchangeShippingFee"
                    type="number"
                    value={shippingSettings.exchangeShippingFee}
                    onChange={(e) =>
                      setShippingSettings({ ...shippingSettings, exchangeShippingFee: Number(e.target.value) })
                    }
                  />
                </div>
              </div>
              <Button onClick={() => handleSave("배송")} disabled={isLoading}>
                {isLoading ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                저장
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>제품별 배송비 관리</CardTitle>
              <CardDescription>개별 상품의 배송비를 따로 설정할 수 있습니다.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <p className="text-sm text-gray-600">
                  제품별 배송비가 설정된 상품은 기본 배송비 대신 개별 설정된 배송비가 적용됩니다.
                </p>
                <Button onClick={() => window.open("/admin/products?tab=shipping", "_blank")} variant="outline">
                  제품별 배송비 설정하기
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 알림 설정 */}
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                알림 설정
              </CardTitle>
              <CardDescription>각종 알림 수신 설정을 관리합니다.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>이메일 알림</Label>
                    <p className="text-sm text-gray-500">이메일로 알림을 받습니다</p>
                  </div>
                  <Switch
                    checked={notificationSettings.emailNotifications}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, emailNotifications: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>SMS 알림</Label>
                    <p className="text-sm text-gray-500">SMS로 알림을 받습니다</p>
                  </div>
                  <Switch
                    checked={notificationSettings.smsNotifications}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, smsNotifications: checked })
                    }
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label>신규 주문 알림</Label>
                    <p className="text-sm text-gray-500">새로운 주문이 들어올 때 알림</p>
                  </div>
                  <Switch
                    checked={notificationSettings.newOrderNotification}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, newOrderNotification: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>재고 부족 알림</Label>
                    <p className="text-sm text-gray-500">상품 재고가 부족할 때 알림</p>
                  </div>
                  <Switch
                    checked={notificationSettings.lowStockNotification}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, lowStockNotification: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>고객 문의 알림</Label>
                    <p className="text-sm text-gray-500">새로운 고객 문의가 등록될 때 알림</p>
                  </div>
                  <Switch
                    checked={notificationSettings.customerInquiryNotification}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, customerInquiryNotification: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>리뷰 등록 알림</Label>
                    <p className="text-sm text-gray-500">새로운 상품 리뷰가 등록될 때 알림</p>
                  </div>
                  <Switch
                    checked={notificationSettings.reviewNotification}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, reviewNotification: checked })
                    }
                  />
                </div>
              </div>
              <Button onClick={() => handleSave("알림")} disabled={isLoading}>
                {isLoading ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                저장
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 보안 설정 */}
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                보안 설정
              </CardTitle>
              <CardDescription>시스템 보안 설정을 관리합니다.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>2단계 인증</Label>
                  <p className="text-sm text-gray-500">관리자 로그인 시 2단계 인증 사용</p>
                </div>
                <Switch
                  checked={securitySettings.twoFactorAuth}
                  onCheckedChange={(checked) => setSecuritySettings({ ...securitySettings, twoFactorAuth: checked })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="sessionTimeout">세션 타임아웃 (분)</Label>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    value={securitySettings.sessionTimeout}
                    onChange={(e) =>
                      setSecuritySettings({ ...securitySettings, sessionTimeout: Number(e.target.value) })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="loginAttempts">로그인 시도 제한</Label>
                  <Input
                    id="loginAttempts"
                    type="number"
                    value={securitySettings.loginAttempts}
                    onChange={(e) =>
                      setSecuritySettings({ ...securitySettings, loginAttempts: Number(e.target.value) })
                    }
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="passwordPolicy">비밀번호 정책</Label>
                <Select
                  value={securitySettings.passwordPolicy}
                  onValueChange={(value) => setSecuritySettings({ ...securitySettings, passwordPolicy: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">낮음 (6자 이상)</SelectItem>
                    <SelectItem value="medium">보통 (8자 이상, 영문+숫자)</SelectItem>
                    <SelectItem value="high">높음 (10자 이상, 영문+숫자+특수문자)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="ipWhitelist">IP 화이트리스트</Label>
                <Textarea
                  id="ipWhitelist"
                  placeholder="허용할 IP 주소를 한 줄에 하나씩 입력하세요"
                  value={securitySettings.ipWhitelist}
                  onChange={(e) => setSecuritySettings({ ...securitySettings, ipWhitelist: e.target.value })}
                />
              </div>
              <Button onClick={() => handleSave("보안")} disabled={isLoading}>
                {isLoading ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                저장
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* SEO 설정 */}
        <TabsContent value="seo" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>SEO 및 마케팅</CardTitle>
              <CardDescription>검색엔진 최적화 및 마케팅 도구 설정</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="metaTitle">메타 타이틀</Label>
                <Input
                  id="metaTitle"
                  value={seoSettings.metaTitle}
                  onChange={(e) => setSeoSettings({ ...seoSettings, metaTitle: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="metaDescription">메타 설명</Label>
                <Textarea
                  id="metaDescription"
                  value={seoSettings.metaDescription}
                  onChange={(e) => setSeoSettings({ ...seoSettings, metaDescription: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="metaKeywords">메타 키워드</Label>
                <Input
                  id="metaKeywords"
                  placeholder="키워드를 쉼표로 구분하여 입력"
                  value={seoSettings.metaKeywords}
                  onChange={(e) => setSeoSettings({ ...seoSettings, metaKeywords: e.target.value })}
                />
              </div>
              <Separator />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="googleAnalyticsId">Google Analytics ID</Label>
                  <Input
                    id="googleAnalyticsId"
                    placeholder="GA-XXXXXXXXX"
                    value={seoSettings.googleAnalyticsId}
                    onChange={(e) => setSeoSettings({ ...seoSettings, googleAnalyticsId: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="facebookPixelId">Facebook Pixel ID</Label>
                  <Input
                    id="facebookPixelId"
                    value={seoSettings.facebookPixelId}
                    onChange={(e) => setSeoSettings({ ...seoSettings, facebookPixelId: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="googleSearchConsole">Google Search Console</Label>
                  <Input
                    id="googleSearchConsole"
                    placeholder="인증 코드"
                    value={seoSettings.googleSearchConsole}
                    onChange={(e) => setSeoSettings({ ...seoSettings, googleSearchConsole: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="naverSearchAdvisor">네이버 서치어드바이저</Label>
                  <Input
                    id="naverSearchAdvisor"
                    placeholder="인증 코드"
                    value={seoSettings.naverSearchAdvisor}
                    onChange={(e) => setSeoSettings({ ...seoSettings, naverSearchAdvisor: e.target.value })}
                  />
                </div>
              </div>
              <Button onClick={() => handleSave("SEO")} disabled={isLoading}>
                {isLoading ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                저장
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 시스템 설정 */}
        <TabsContent value="system" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                시스템 관리
              </CardTitle>
              <CardDescription>시스템 유지보수 및 백업 설정</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">데이터베이스</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button variant="outline" className="w-full">
                      <Database className="mr-2 h-4 w-4" />
                      데이터베이스 백업
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Upload className="mr-2 h-4 w-4" />
                      백업 복원
                    </Button>
                    <Button variant="outline" className="w-full">
                      <RefreshCw className="mr-2 h-4 w-4" />
                      데이터베이스 최적화
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">캐시 관리</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button variant="outline" className="w-full">
                      <RefreshCw className="mr-2 h-4 w-4" />
                      페이지 캐시 삭제
                    </Button>
                    <Button variant="outline" className="w-full">
                      <RefreshCw className="mr-2 h-4 w-4" />
                      이미지 캐시 삭제
                    </Button>
                    <Button variant="outline" className="w-full">
                      <RefreshCw className="mr-2 h-4 w-4" />
                      전체 캐시 삭제
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">시스템 정보</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <Label>서버 시간</Label>
                      <p>{new Date().toLocaleString()}</p>
                    </div>
                    <div>
                      <Label>시스템 버전</Label>
                      <p>v1.0.0</p>
                    </div>
                    <div>
                      <Label>데이터베이스 크기</Label>
                      <p>245.7 MB</p>
                    </div>
                    <div>
                      <Label>총 상품 수</Label>
                      <p>1,234개</p>
                    </div>
                    <div>
                      <Label>총 주문 수</Label>
                      <p>5,678건</p>
                    </div>
                    <div>
                      <Label>총 고객 수</Label>
                      <p>2,345명</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  )
}
