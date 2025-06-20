"use client"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { AlertCircle, Wand2, Calendar, Eye, FileText, Trash2, X, Edit, Plus, Minus } from "lucide-react"
import AdminLayout from "@/components/admin-layout"

interface ProductConfig {
  id: string
  productName: string
  category: string
  productType: string
  carBrand: string
  textLength: string
}

interface Review {
  id: string
  title: string
  content: string
  tags: string[]
  productConfig: ProductConfig
  images?: Array<{
    id: string
    src: string
    type: string
    prompt?: string
    isAuto?: boolean
  }>
}

export default function AutoGenerateReviewPage() {
  const router = useRouter()
  const [isGenerating, setIsGenerating] = useState(false)
  const [isGeneratingBatch, setIsGeneratingBatch] = useState(false)

  // 제품 추가 개수 상태 추가
  const [addProductCount, setAddProductCount] = useState(0)

  // 다중 제품 설정
  const [productConfigs, setProductConfigs] = useState<ProductConfig[]>([
    {
      id: "1",
      productName: "",
      category: "",
      productType: "카매트",
      carBrand: "국산차",
      textLength: "3000",
    },
  ])

  // 제목 관련 상태
  const [titleList, setTitleList] = useState<string[]>([])
  const [editingTitleIndex, setEditingTitleIndex] = useState<number | null>(null)
  const [editingTitleValue, setEditingTitleValue] = useState("")
  const [selectedTitles, setSelectedTitles] = useState<number[]>([])

  // 배치 생성 관련 상태
  const [batchSize, setBatchSize] = useState(5)
  const [maxReviews, setMaxReviews] = useState(25)
  const [generatedReviews, setGeneratedReviews] = useState<Review[]>([])
  const [currentBatch, setCurrentBatch] = useState(0)
  const [progress, setProgress] = useState(0)
  const [selectedReview, setSelectedReview] = useState<Review | null>(null)

  // 발행 설정
  const [publishType, setPublishType] = useState<"immediate" | "scheduled">("immediate")
  const [scheduledDate, setScheduledDate] = useState("")
  const [scheduledTime, setScheduledTime] = useState("")

  // 발행된 제목들을 추적하는 상태 추가
  const [publishedTitles, setPublishedTitles] = useState<Set<string>>(new Set())

  // 제품 설정 추가 (숫자 입력 방식)
  const addMultipleProductConfigs = () => {
    if (addProductCount === 0) return

    const newConfigs: ProductConfig[] = []
    for (let i = 0; i < addProductCount; i++) {
      const newConfig: ProductConfig = {
        id: `${Date.now()}-${i}`,
        productName: "",
        category: "",
        productType: "카매트",
        carBrand: "국산차",
        textLength: "3000",
      }
      newConfigs.push(newConfig)
    }
    setProductConfigs((prev) => [...prev, ...newConfigs])
    setAddProductCount(0) // 추가 후 0으로 리셋
  }

  // 제품 설정 제거
  const removeProductConfig = (id: string) => {
    if (productConfigs.length > 1) {
      setProductConfigs(productConfigs.filter((config) => config.id !== id))
    }
  }

  // 제품 설정 업데이트 (즉시 반응)
  const updateProductConfig = (id: string, field: keyof ProductConfig, value: string) => {
    setProductConfigs((prev) => prev.map((config) => (config.id === id ? { ...config, [field]: value } : config)))
  }

  // 유효한 제품 설정 개수 계산
  const getValidProductCount = () => {
    return productConfigs.filter((config) => config.productName.trim() && config.category.trim()).length
  }

  // 예상 제목 개수 계산 (제품당 20개) - 모든 제품 포함
  const getExpectedTitleCount = () => {
    return productConfigs.length * 20
  }

  // 유효한 제목 개수 계산 (실제 생성 가능한 개수)
  const getValidTitleCount = () => {
    return getValidProductCount() * 20
  }

  // 제목 생성 함수
  const generateTitles = async () => {
    const validConfigs = productConfigs.filter((config) => config.productName.trim() && config.category.trim())

    if (validConfigs.length === 0) {
      alert("최소 하나의 제품에 대해 제품명과 카테고리를 입력해주세요.")
      return
    }

    setIsGenerating(true)

    setTimeout(() => {
      let allTitles: string[] = []

      validConfigs.forEach((config) => {
        const titles = generateProfessionalTitles(config.productName, config.productType, config.carBrand)
        // 발행되지 않은 제목만 필터링
        const newTitles = titles.filter((title) => !publishedTitles.has(title))
        allTitles = [...allTitles, ...newTitles]
      })

      setTitleList(allTitles)
      setIsGenerating(false)
    }, 2000)
  }

  // 배치 후기 생성 함수
  const generateBatchReviews = async () => {
    if (titleList.length === 0) {
      alert("먼저 제목을 생성해주세요.")
      return
    }

    const validConfigs = productConfigs.filter((config) => config.productName.trim() && config.category.trim())

    if (validConfigs.length === 0) {
      alert("최소 하나의 제품에 대해 제품명과 카테고리를 입력해주세요!")
      return
    }

    setIsGeneratingBatch(true)
    setProgress(0)
    setCurrentBatch(0)

    const totalBatches = Math.ceil(Math.min(maxReviews, titleList.length) / batchSize)

    for (let batch = 0; batch < totalBatches; batch++) {
      setCurrentBatch(batch + 1)

      const batchReviews: Review[] = []
      const startIndex = batch * batchSize
      const endIndex = Math.min(startIndex + batchSize, Math.min(maxReviews, titleList.length))

      for (let i = startIndex; i < endIndex; i++) {
        // 제목에 맞는 제품 설정 찾기 (간단한 매칭)
        const matchingConfig = findMatchingConfig(titleList[i], validConfigs)

        const review: Review = {
          id: `review-${Date.now()}-${i}-${Math.random()}`,
          title: titleList[i],
          content: generateReviewContent(
            titleList[i],
            matchingConfig.productName,
            matchingConfig.productType,
            matchingConfig.carBrand,
            Number.parseInt(matchingConfig.textLength),
          ),
          tags: generateReviewTags(titleList[i], matchingConfig.productType, matchingConfig.carBrand),
          productConfig: matchingConfig,
        }
        batchReviews.push(review)
      }

      setGeneratedReviews((prev) => [...prev, ...batchReviews])

      const progressPercent = ((batch + 1) / totalBatches) * 100
      setProgress(progressPercent)

      // 배치 간 딜레이
      if (batch < totalBatches - 1) {
        await new Promise((resolve) => setTimeout(resolve, 500))
      }
    }

    setIsGeneratingBatch(false)
    alert(`${Math.min(maxReviews, titleList.length)}개의 후기가 생성되었습니다!`)
  }

  // 제목과 매칭되는 제품 설정 찾기
  const findMatchingConfig = (title: string, configs: ProductConfig[]): ProductConfig => {
    // 제목에서 차량 모델 추출하여 매칭
    for (const config of configs) {
      const carModel = extractCarModel(config.productName)
      if (title.includes(carModel) || title.includes(config.productName)) {
        return config
      }
    }
    // 매칭되는 것이 없으면 첫 번째 설정 반환
    return configs[0]
  }

  // 전체 선택/해제 함수들
  const toggleTitleSelection = useCallback((index: number) => {
    setSelectedTitles((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }, [])

  const toggleAllTitles = () => {
    if (selectedTitles.length === titleList.length) {
      setSelectedTitles([])
    } else {
      setSelectedTitles(titleList.map((_, index) => index))
    }
  }

  const getSelectedTitleTexts = () => {
    return selectedTitles.map((index) => titleList[index]).filter(Boolean)
  }

  // 선택된 제목들로 배치 생성
  const generateBatchFromTitles = async (titles: string[]) => {
    if (titles.length === 0) {
      alert("생성할 제목을 선택해주세요!")
      return
    }

    const validConfigs = productConfigs.filter((config) => config.productName.trim() && config.category.trim())

    if (validConfigs.length === 0) {
      alert("최소 하나의 제품에 대해 제품명과 카테고리를 입력해주세요!")
      return
    }

    setIsGeneratingBatch(true)
    setProgress(0)
    setCurrentBatch(0)

    const totalBatches = Math.ceil(titles.length / batchSize)

    for (let batch = 0; batch < totalBatches; batch++) {
      setCurrentBatch(batch + 1)

      const batchReviews: Review[] = []
      const startIndex = batch * batchSize
      const endIndex = Math.min(startIndex + batchSize, titles.length)

      for (let i = startIndex; i < endIndex; i++) {
        const matchingConfig = findMatchingConfig(titles[i], validConfigs)

        const review: Review = {
          id: `review-${Date.now()}-${i}-${Math.random()}`,
          title: titles[i],
          content: generateReviewContent(
            titles[i],
            matchingConfig.productName,
            matchingConfig.productType,
            matchingConfig.carBrand,
            Number.parseInt(matchingConfig.textLength),
          ),
          tags: generateReviewTags(titles[i], matchingConfig.productType, matchingConfig.carBrand),
          productConfig: matchingConfig,
        }
        batchReviews.push(review)
      }

      setGeneratedReviews((prev) => [...prev, ...batchReviews])

      const progressPercent = ((batch + 1) / totalBatches) * 100
      setProgress(progressPercent)

      if (batch < totalBatches - 1) {
        await new Promise((resolve) => setTimeout(resolve, 500))
      }
    }

    setIsGeneratingBatch(false)
    alert(`${titles.length}개의 후기가 생성되었습니다!`)
  }

  // 전문적인 제목 생성 (20개)
  const generateProfessionalTitles = (product: string, type: string, brand: string) => {
    const carModel = extractCarModel(product)

    const baseTemplates = {
      review: [
        "리얼 후기",
        "솔직 후기",
        "사용 후기",
        "장착 후기",
        "설치 후기",
        "체험 후기",
        "구매 후기",
        "실사용 후기",
        "6개월 후기",
        "1년 후기",
        "장기 사용기",
        "완전 분석",
      ],
      comparison: [
        "vs 순정",
        "vs 해외직구",
        "전/후 비교",
        "순정 대비",
        "타사 대비",
        "가성비 비교",
        "품질 비교",
        "성능 비교",
        "내구성 비교",
        "디자인 비교",
      ],
      features: [
        "맞춤 제작",
        "도면 제작",
        "수작업 제작",
        "친환경 인증",
        "무독성",
        "무냄새",
        "방수 기능",
        "방음 기능",
        "방오 기능",
        "분리 가능",
        "세척 편리",
        "완벽한 핏",
      ],
      emotions: [
        "대만족",
        "강력 추천",
        "필수템",
        "끝판왕",
        "완벽",
        "최고",
        "놀라운",
        "감동",
        "만족도 100%",
        "재구매 의사",
        "추천 이유",
        "선택한 이유",
      ],
      periods: ["3개월", "6개월", "1년", "2년", "장기간", "단기간", "즉시", "바로"],
    }

    const brandKeywords = {
      현대차: ["가죽자수 입체매트", "라텍스 코일매트", "쏘나타 DN8", "아반떼 DN7", "현대차 전용"],
      푸조: ["6D 7D 매트", "이중 입체매트", "우레탄 악셀 발판", "푸조 전용", "수입차 매트"],
      아우디: ["6D 7D 카본매트", "아우디 자수로고", "이중입체매트", "우레탄 악셀패드", "독일 프리미엄"],
      재규어: ["풀커버 매트", "휠하우스 커버", "분리 가능한 구조", "재규어 전용", "영국 프리미엄"],
      제네시스: ["카본매트", "제네시스 자수로고", "이중 입체 카본매트", "제네시스 전용", "프리미엄 카본"],
      국산차: ["이중 입체매트", "라텍스 코일매트", "맞춤 제작", "친환경 매트", "무독성 매트"],
    }

    const keywords = brandKeywords[brand as keyof typeof brandKeywords] || brandKeywords.국산차
    const titles: string[] = []

    // 20개 제목 생성 (기존 500개에서 변경)
    for (let i = 0; i < 20; i++) {
      const reviewWord = baseTemplates.review[i % baseTemplates.review.length]
      const featureWord = baseTemplates.features[i % baseTemplates.features.length]
      const emotionWord = baseTemplates.emotions[i % baseTemplates.emotions.length]
      const periodWord = baseTemplates.periods[i % baseTemplates.periods.length]
      const keyword = keywords[i % keywords.length]
      const comparisonWord = baseTemplates.comparison[i % baseTemplates.comparison.length]

      const patterns = [
        `${carModel} ${type} 스타일카 ${reviewWord} | ${keyword}의 차이`,
        `${carModel} 오너라면 필수! 스타일카 ${keyword} ${periodWord} ${reviewWord}`,
        `스타일카 ${carModel} ${type} ${reviewWord} | ${featureWord}의 품질`,
        `${carModel} ${emotionWord} - 스타일카 ${keyword} ${reviewWord}`,
        `스타일카 ${type}로 ${carModel} ${emotionWord} 완성 | ${comparisonWord}`,
        `${carModel} 스타일카 ${keyword} 장착기 | ${featureWord}의 ${emotionWord}`,
        `스타일카 ${type} ${reviewWord} | ${carModel} 오너 ${periodWord} 사용기`,
        `${carModel} ${type} ${emotionWord}! 스타일카 ${keyword} ${reviewWord}`,
        `스타일카 ${carModel} ${featureWord} ${reviewWord} | ${keyword} 분석`,
        `${carModel} 인테리어 ${emotionWord} - 스타일카 ${type} ${reviewWord}`,
      ]

      const selectedPattern = patterns[i % patterns.length]
      titles.push(selectedPattern)
    }

    return titles
  }

  // 차량 모델 추출
  const extractCarModel = (product: string) => {
    const models = [
      "그랜저",
      "쏘나타",
      "아반떼",
      "아이오닉",
      "캐스퍼",
      "코나",
      "투싼",
      "팰리세이드",
      "G70",
      "G80",
      "G90",
      "GV60",
      "GV70",
      "GV80",
      "K3",
      "K5",
      "K7",
      "K8",
      "K9",
      "니로",
      "모하비",
      "셀토스",
      "스토닉",
      "스팅어",
      "스포티지",
      "쏘렌토",
      "카니발",
      "A4",
      "A5",
      "A6",
      "A7",
      "A8",
      "Q3",
      "Q5",
      "Q7",
      "Q8",
      "320",
      "330",
      "520",
      "530",
    ]

    for (const model of models) {
      if (product.includes(model)) return model
    }
    return product
  }

  // 후기 콘텐츠 생성 (개선된 버전)
  const generateReviewContent = (title: string, product: string, type: string, brand: string, length: number) => {
    const carModel = extractCarModel(product)

    // 더 자연스러운 시작 문장들
    const naturalIntros = [
      `안녕하세요~ ${carModel} 타고있는 직장인입니다ㅎㅎ`,
      `${carModel} 오너인데 후기 남겨봅니다!`,
      `${brand} ${type} 써보고 후기 올려요`,
      `실제로 써본 ${product} 솔직후기입니다`,
      `${carModel} ${type} 고민하시는분들 참고하세요~`,
    ]

    // 구매 이유 (더 개인적이고 자연스럽게)
    const purchaseReasons = [
      `기존에 쓰던 매트가 너무 얇아서... 물 쏟으면 바로 스며들고 ㅠㅠ 특히 겨울에 눈 묻은 신발로 타면 차 바닥이 항상 젖어있더라구요. 냄새도 나기 시작해서 이거 안되겠다 싶어서 바꾸게 되었어요. 스타일카는 3D 스캐너로 직접 스캔해서 만든다고 해서 선택했습니다.`,

      `순정 매트로는 한계가 있더라구요.. 비오는날이나 세차하고 나서 물기 때문에 스트레스 받았는데, 지인이 스타일카 추천해줘서 구매했습니다. 신차 출시되면 바로 3D 스캐닝해서 도면 만든다고 하더라구요. 그래서 핏감이 완벽하다고 해서요.`,

      `아이가 있다보니 음료수 흘리고 과자 부스러기 떨어뜨리고... 기존 매트로는 청소가 너무 힘들었어요 ㅜㅜ 방수되는 매트 찾다가 스타일카로 결정했는데, 차량별 맞춤 제작이라 핏감이 다르다고 해서요.`,
    ]

    // 사용 경험 (실제 경험담처럼)
    const experiences = [
      `설치는 생각보다 쉬웠어요! 기존 매트 빼고 새거 넣고 운전석쪽만 클립으로 고정해주면 끝. 5분도 안걸렸네요. 개봉했을때 첫인상이 진짜 좋았어요. 3D 스캐닝으로 만들어서 그런지 구석구석 딱 맞더라구요. 수작업으로 제작한다고 하던데 퀄리티가 확실히 다르네요.`,

      `받자마자 바로 설치해봤는데 핏감이 정말 완벽해요!! 3D 스캐너로 직접 스캔해서 도면 만든다고 하더니 진짜 구석구석 딱 맞더라구요. 빈틈 하나 없이 커버되는게 인상적이었어요. 역시 맞춤 제작의 차이를 느꼈습니다.`,

      `처음엔 좀 뻣뻣한 느낌이었는데 며칠 쓰니까 자연스럽게 자리잡더라구요. 무게감도 있어서 밀리지도 않고 좋네요. 차량별 전용 도면으로 만들어서 그런지 색깔도 차 내부랑 완벽하게 어울려요.`,
    ]

    // 장점들 (불규칙한 형태로)
    const prosVariations = [
      `써보니까 이런점들이 좋더라구요:
    
3D 스캐너로 직접 스캔해서 핏감이 정말 완벽해요
수작업 제작이라 퀄리티가 확실히 다름
방수 기능 짱! 물 쏟아도 전혀 안스며들어요
미끄럼방지도 확실하고
청소가 너무 쉬워졌어요 물티슈로 닦으면 끝
차량별 맞춤 제작이라 구석구석 딱 맞음`,

      `장점 정리해보면

1) 3D 스캐닝 기술로 정밀 제작 - 핏감 완벽
2) 수작업 제작으로 품질 보장
3) 방수 기능이 진짜 좋아요
4) 청소 완전 간편함
5) 미끄럼 안됨 
6) 내구성 좋아보임
7) 디자인도 고급스러워요

단점이라면... 가격이 좀 비싸다는것? 그래도 맞춤 제작 품질 생각하면 납득할만해요`,

      `실제로 써보니

• 3D 스캐닝 → 완벽한 핏감
• 수작업 제작 → 높은 품질
• 방수 완벽 → 물 쏟아도 OK
• 청소 쉬움 → 걸레질 한번이면 끝
• 안밀림 → 운전중에도 제자리
• 튼튼함 → 오래 쓸것같음
• 예쁨 → 차 내부가 고급스러워짐`,
    ]

    // 마무리 (더 개인적이고 자연스럽게)
    const conclusions = [
      `결론적으로 정말 만족스러운 구매였어요! 다음에 차 바꿔도 또 살 예정입니다ㅎㅎ 특히 겨울철에 진짜 유용해요. ${carModel} ${type} 고민하시는 분들한테 추천드려요~ 궁금한거 있으면 댓글 달아주세요!`,

      `가격은 좀 비싸지만 그만한 값어치는 충분히 한다고 생각해요. 품질 생각하면 합리적인 선택이었네요. ${brand} 제품 믿고 쓸만한것 같아요. 추천합니다!!`,

      `이제 ${brand} 팬 됐어요ㅋㅋ 앞으로 자동차 용품은 여기서 사려구요. 품질이 확실하니까 안심되네요. 여러분도 한번 써보세요~`,
    ]

    // 랜덤하게 선택하되, 더 다양한 조합
    const randomIntro = naturalIntros[Math.floor(Math.random() * naturalIntros.length)]
    const randomReason = purchaseReasons[Math.floor(Math.random() * purchaseReasons.length)]
    const randomExperience = experiences[Math.floor(Math.random() * experiences.length)]
    const randomPros = prosVariations[Math.floor(Math.random() * prosVariations.length)]
    const randomConclusion = conclusions[Math.floor(Math.random() * conclusions.length)]

    // 자연스러운 연결어와 함께 조합
    const connectors = ["그래서", "그런데", "아무튼", "어쨌든", "참고로", "그리고"]
    const randomConnector = connectors[Math.floor(Math.random() * connectors.length)]

    // 기본 문단 구성
    let content = `${randomIntro}

${randomReason}

${randomExperience}

${randomPros}

${randomConnector} ${randomConclusion}`

    // 길이 조절을 위한 다양한 추가 문장들 (반복 방지)
    const additionalSentences = [
      `\n\n추가로 말씀드리면 AS 서비스도 잘 되는것 같더라구요. 문의했을때 친절하게 답변해주시더라구요.`,
      `\n\n주문하고 일주일 정도 걸렸는데 맞춤 제작이라 그런지 기다릴만했어요.`,
      `\n\n파우치 포장으로 깔끔하게 왔어요. 매트가 접혀서 오는데 펼치면 금방 모양 잡히더라구요.`,
      `\n\n맞춤 제작이라 그런지 핏감이 정말 완벽해요`,
      `\n\n가족들 반응도 좋아요ㅎㅎ 특히 아내가 청소 편해졌다고 만족해해요.`,
      `\n\n다른 차종용 제품도 있나 찾아봐야겠어요. 품질이 이정도면 믿고 살만하네요.`,
      `\n\n설치 영상도 유튜브에 올라와있어서 참고하기 좋았어요. 초보자도 쉽게 할 수 있을것 같아요.`,
      `\n\n가격대비 정말 만족스러워요. 처음엔 비싸다고 생각했는데 써보니 그만한 값어치를 하네요.`,
      `\n\n색상도 차 내부랑 잘 어울려요. 고급스러운 느낌이 확실히 나더라구요.`,
      `\n\n내구성도 좋아보여요. 두께감이 있어서 오래 쓸 수 있을것 같아요.`,
      `\n\n친구들한테도 추천했어요. 다들 어디서 샀냐고 물어보더라구요ㅋㅋ`,
      `\n\n세차할때도 편해졌어요. 매트만 빼서 물로 씻으면 되니까 관리가 쉬워요.`,
      `\n\n겨울철에 특히 유용할것 같아요. 눈이나 비 때문에 젖어도 걱정없을것 같네요.`,
      `\n\n브랜드 신뢰도도 높은것 같아요. 후기들 찾아보니까 다들 만족해하시더라구요.`,
      `\n\n주변 정비소에서도 이 제품 좋다고 하더라구요. 전문가들도 인정하는 품질인것 같아요.`,
      `\n\n주문부터 제작, 배송까지 약 10일 정도 걸렸는데 맞춤 제작 품질을 생각하면 기다릴만했어요.`,
      `\n\n차량 관리에 관심 많으신 분들한테 정말 추천드려요. 투자할만한 가치가 있어요.`,
      `\n\n처음 자동차 용품 온라인으로 사봤는데 생각보다 만족스러워요. 앞으로도 여기서 사려구요.`,
      `\n\n리뷰 쓰는게 귀찮아서 안 쓰는 편인데, 이건 정말 좋아서 후기 남겨요.`,
      `\n\n몇 달 써봐야 정확히 알겠지만 지금까지는 정말 만족해요. 나중에 또 후기 올릴게요.`,
      `\n\n고민하시는 분들 있으면 그냥 사세요. 후회 안 할거예요. 진짜 추천합니다!`,
      `\n\n도면 제작으로 만들어서 그런지 구석구석 딱 맞더라구요`,
      `\n\n주문 제작이라 시간은 좀 걸렸지만 그만한 가치가 있어요`,
      `\n\n파우치 포장으로 간편하게 왔고, 매트 자체가 묵직하더라구요.`,
      `\n\n3D 스캐너로 직접 스캔해서 만든다고 하더니 정말 핏감이 완벽해요`,
      `\n\n신차 출시되면 바로 3D 스캐닝해서 도면 만든다고 하는데 그래서 이렇게 정확한가봐요`,
      `\n\n수작업으로 제작해서 그런지 마감 처리가 정말 깔끔하더라구요`,
      `\n\n차량별 맞춤 제작이라 그런지 구석구석 빈틈없이 딱 맞아요`,
      `\n\n역설계 과정을 거쳐서 만든다고 하던데 그래서 이렇게 정밀한가봐요`,
      `\n\n첨단 3D 스캐닝 기술 덕분에 순정보다 더 정확한 핏감이에요`,
      `\n\n도면 제작부터 수작업까지 전 과정이 맞춤형이라 품질이 확실히 다르네요`,
      `\n\n3D 스캔 데이터로 만들어서 그런지 미세한 부분까지 완벽하게 커버돼요`,
      `\n\n수작업 제작의 장인정신이 느껴지는 제품이에요`,
      `\n\n차량 핏 정확성이 이 정도일 줄 몰랐어요. 3D 스캐닝 기술이 정말 대단하네요`,
    ]

    // 사용된 문장 추적을 위한 배열
    const usedSentences: string[] = []

    // 목표 길이에 도달할 때까지 중복 없이 추가
    while (content.length < length && usedSentences.length < additionalSentences.length) {
      // 아직 사용하지 않은 문장들만 필터링
      const availableSentences = additionalSentences.filter((sentence) => !usedSentences.includes(sentence))

      if (availableSentences.length === 0) break // 더 이상 추가할 문장이 없으면 중단

      const randomSentence = availableSentences[Math.floor(Math.random() * availableSentences.length)]
      content += randomSentence
      usedSentences.push(randomSentence)
    }

    // 최종 길이 조절 (목표 길이보다 길면 자르기)
    if (content.length > length) {
      content = content.substring(0, length)
      // 문장이 중간에 잘리지 않도록 마지막 완전한 문장까지만 포함
      const lastSentenceEnd = Math.max(
        content.lastIndexOf("."),
        content.lastIndexOf("!"),
        content.lastIndexOf("?"),
        content.lastIndexOf("요"),
        content.lastIndexOf("다"),
        content.lastIndexOf("네요"),
        content.lastIndexOf("어요"),
      )
      if (lastSentenceEnd > content.length * 0.8) {
        // 80% 이상이면 그 지점에서 자르기
        content = content.substring(0, lastSentenceEnd + 1)
      }
    }

    return content
  }

  // 후기 태그 생성
  const generateReviewTags = (title: string, type: string, brand: string) => {
    const baseTags = [type, brand, "후기", "리뷰"]
    const additionalTags = ["추천", "만족", "품질", "가성비", "실사용", "자동차인테리어튜닝", "수입차용품"]
    return [...baseTags, ...additionalTags.slice(0, 4)]
  }

  // 제목 편집 시작
  const startEditingTitle = (index: number) => {
    setEditingTitleIndex(index)
    setEditingTitleValue(titleList[index])
  }

  // 제목 편집 저장
  const saveEditingTitle = () => {
    if (editingTitleIndex !== null) {
      const newTitleList = [...titleList]
      newTitleList[editingTitleIndex] = editingTitleValue
      setTitleList(newTitleList)
      setEditingTitleIndex(null)
      setEditingTitleValue("")
    }
  }

  // 제목 편집 취소
  const cancelEditingTitle = () => {
    setEditingTitleIndex(null)
    setEditingTitleValue("")
  }

  // 후기 삭제
  const deleteReview = (reviewId: string) => {
    const updatedReviews = generatedReviews.filter((review) => review.id !== reviewId)
    setGeneratedReviews(updatedReviews)
  }

  // generateSingleReview 함수
  const generateSingleReview = async (title: string, index: number) => {
    const validConfigs = productConfigs.filter((config) => config.productName.trim() && config.category.trim())

    if (validConfigs.length === 0) {
      alert("최소 하나의 제품에 대해 제품명과 카테고리를 입력해주세요!")
      return
    }

    const matchingConfig = findMatchingConfig(title, validConfigs)

    const review: Review = {
      id: `review-${Date.now()}-${index}`,
      title: title,
      content: generateReviewContent(
        title,
        matchingConfig.productName,
        matchingConfig.productType,
        matchingConfig.carBrand,
        Number.parseInt(matchingConfig.textLength),
      ),
      tags: generateReviewTags(title, matchingConfig.productType, matchingConfig.carBrand),
      productConfig: matchingConfig,
    }

    setGeneratedReviews((prev) => [...prev, review])
    alert(`"${title}" 후기가 생성되었습니다!`)
  }

  // 전체 후기 발행
  const publishAllReviews = async () => {
    const titlesToPublish = generatedReviews.map((review) => review.title)
    setPublishedTitles((prev) => new Set([...prev, ...titlesToPublish]))
    alert(`${generatedReviews.length}개의 후기가 발행되었습니다!`)
  }

  // 단일 후기 발행
  const publishSingleReview = async (review: Review) => {
    setPublishedTitles((prev) => new Set([...prev, review.title]))
    alert(`"${review.title}" 후기가 발행되었습니다!`)
  }

  return (
    <AdminLayout>
      <div className="container mx-auto p-6 max-w-7xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">AI 후기 자동 생성</h1>
            <p className="text-gray-500 mt-1">AI를 활용하여 전문적인 상품 후기를 자동으로 생성합니다</p>
          </div>
          <Badge variant="secondary" className="bg-purple-100 text-purple-600">
            <Wand2 className="w-4 h-4 mr-1" />
            AI 기능
          </Badge>
        </div>

        <Tabs defaultValue="generate" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="generate">기본 설정</TabsTrigger>
            <TabsTrigger value="titles">제목 관리</TabsTrigger>
            <TabsTrigger value="batch">대량 생성</TabsTrigger>
          </TabsList>

          <TabsContent value="generate" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    기본 설정
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      min="1"
                      max="10"
                      value={addProductCount || ""}
                      onChange={(e) => setAddProductCount(Number.parseInt(e.target.value) || 0)}
                      className="w-16 h-8"
                      placeholder="개수"
                    />
                    <Button
                      onClick={addMultipleProductConfigs}
                      variant="outline"
                      size="sm"
                      disabled={addProductCount === 0}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      {addProductCount > 0 ? `${addProductCount}개 제품 추가` : "제품 추가"}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {productConfigs.map((config, index) => (
                  <div key={config.id} className="p-4 border rounded-lg bg-gray-50">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium">제품 {index + 1}</h4>
                      {productConfigs.length > 1 && (
                        <Button
                          onClick={() => removeProductConfig(config.id)}
                          variant="ghost"
                          size="sm"
                          className="text-red-500 hover:text-red-700"
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                      <div className="space-y-2">
                        <Label>제품명 *</Label>
                        <Input
                          placeholder="예: 아반떼 CN7 카매트"
                          value={config.productName}
                          onChange={(e) => updateProductConfig(config.id, "productName", e.target.value)}
                          className="transition-all duration-150"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>카테고리 *</Label>
                        <Input
                          placeholder="예: 카매트"
                          value={config.category}
                          onChange={(e) => updateProductConfig(config.id, "category", e.target.value)}
                          className="transition-all duration-150"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>제품 타입</Label>
                        <Select
                          value={config.productType}
                          onValueChange={(value) => updateProductConfig(config.id, "productType", value)}
                        >
                          <SelectTrigger className="transition-all duration-150">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>실내매트</SelectLabel>
                              <SelectItem value="카본매트">카본매트</SelectItem>
                              <SelectItem value="가죽자수매트">가죽자수매트</SelectItem>
                              <SelectItem value="카매트">일반 카매트</SelectItem>
                            </SelectGroup>
                            <SelectGroup>
                              <SelectLabel>트렁크매트</SelectLabel>
                              <SelectItem value="카본 트렁크매트">카본 트렁크매트</SelectItem>
                              <SelectItem value="가죽자수 트렁크매트">가죽자수 트렁크매트</SelectItem>
                              <SelectItem value="트렁크매트">일반 트렁크매트</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>차량 브랜드</Label>
                        <Select
                          value={config.carBrand}
                          onValueChange={(value) => updateProductConfig(config.id, "carBrand", value)}
                        >
                          <SelectTrigger className="transition-all duration-150">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>국산차</SelectLabel>
                              <SelectItem value="현대차">현대차</SelectItem>
                              <SelectItem value="국산차">기타 국산차</SelectItem>
                              <SelectItem value="제네시스">제네시스</SelectItem>
                            </SelectGroup>
                            <SelectGroup>
                              <SelectLabel>수입차</SelectLabel>
                              <SelectItem value="푸조">푸조</SelectItem>
                              <SelectItem value="재규어">재규어</SelectItem>
                              <SelectItem value="아우디">아우디</SelectItem>
                              <SelectItem value="수입차">기타 수입차</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>글자 수</Label>
                        <Input
                          type="number"
                          value={config.textLength}
                          onChange={(e) => updateProductConfig(config.id, "textLength", e.target.value)}
                          className="transition-all duration-150"
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <Separator />

                <div className="flex justify-center">
                  <Button
                    onClick={generateTitles}
                    disabled={isGenerating || getValidProductCount() === 0}
                    className="bg-purple-600 hover:bg-purple-700 transition-all duration-200"
                    size="lg"
                  >
                    {isGenerating ? (
                      <>
                        <Wand2 className="w-4 h-4 mr-2 animate-spin" />
                        제목 생성 중...
                      </>
                    ) : (
                      <>
                        <Wand2 className="w-4 h-4 mr-2" />
                        {getExpectedTitleCount()}개 제목 생성
                      </>
                    )}
                  </Button>
                </div>

                <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-medium text-green-800 mb-2">✅ 현재 설정 상태</h4>
                  <div className="text-sm text-green-700 space-y-1">
                    <div>전체 제품 수: {productConfigs.length}개</div>
                    <div>유효한 제품 수: {getValidProductCount()}개 (제품명+카테고리 입력완료)</div>
                    <div>예상 제목 수: {getExpectedTitleCount()}개 (전체 제품 × 20개)</div>
                    <div>실제 생성 가능: {getValidTitleCount()}개 (유효한 제품만)</div>
                    <div>발행된 제목 수: {publishedTitles.size}개</div>
                    <div>
                      설정된 제품:{" "}
                      {productConfigs
                        .filter((config) => config.productName.trim())
                        .map((config) => config.productName)
                        .join(", ") || "없음"}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="titles" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    제목 관리 ({titleList.length}개)
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => {
                        const selectedTitleTexts = getSelectedTitleTexts()
                        if (selectedTitleTexts.length === 0) {
                          alert("생성할 제목을 선택해주세요.")
                          return
                        }
                        generateBatchFromTitles(selectedTitleTexts)
                      }}
                      disabled={selectedTitles.length === 0 || isGeneratingBatch}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Wand2 className="w-4 h-4 mr-2" />
                      선택된 제목으로 후기 생성 ({selectedTitles.length}개)
                    </Button>
                    <Button
                      onClick={() => generateBatchFromTitles(titleList)}
                      disabled={titleList.length === 0 || isGeneratingBatch}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      <Wand2 className="w-4 h-4 mr-2" />
                      전체 제목으로 후기 생성 ({titleList.length}개)
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* 진행률 표시 */}
                  {isGeneratingBatch && (
                    <div className="space-y-2 p-4 bg-purple-50 rounded-lg">
                      <div className="flex justify-between text-sm">
                        <span>
                          후기 생성 중... ({currentBatch}/{Math.ceil(getSelectedTitleTexts().length / batchSize)} 배치)
                        </span>
                        <span>{Math.round(progress)}%</span>
                      </div>
                      <Progress value={progress} className="w-full" />
                    </div>
                  )}

                  {/* 전체 선택 체크박스 */}
                  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg border-2">
                    <input
                      type="checkbox"
                      id="select-all"
                      checked={selectedTitles.length === titleList.length && titleList.length > 0}
                      onChange={toggleAllTitles}
                      className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                    />
                    <label htmlFor="select-all" className="text-sm font-medium">
                      전체 선택 ({selectedTitles.length}/{titleList.length})
                    </label>
                  </div>

                  <div className="grid grid-cols-1 gap-2 max-h-[600px] overflow-y-auto">
                    {titleList.map((title, index) => (
                      <div
                        key={`${title}-${index}`}
                        className="flex items-center gap-2 p-3 border rounded-lg hover:bg-gray-50"
                      >
                        <input
                          type="checkbox"
                          id={`title-${index}`}
                          checked={selectedTitles.includes(index)}
                          onChange={() => toggleTitleSelection(index)}
                          className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500 transition-all duration-100"
                        />
                        <Badge variant="outline" className="min-w-[60px]">
                          #{index + 1}
                        </Badge>
                        {editingTitleIndex === index ? (
                          <div className="flex-1 flex gap-2">
                            <Input
                              value={editingTitleValue}
                              onChange={(e) => setEditingTitleValue(e.target.value)}
                              className="flex-1"
                            />
                            <Button size="sm" onClick={saveEditingTitle}>
                              저장
                            </Button>
                            <Button size="sm" variant="outline" onClick={cancelEditingTitle}>
                              취소
                            </Button>
                          </div>
                        ) : (
                          <>
                            <span className="flex-1 text-sm">{title}</span>
                            <div className="flex gap-1">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => generateSingleReview(title, index)}
                                disabled={isGeneratingBatch}
                                className="text-green-600 hover:text-green-700 border-green-200 hover:border-green-300"
                              >
                                후기 생성
                              </Button>
                              <Button size="sm" variant="ghost" onClick={() => startEditingTitle(index)}>
                                <Edit className="w-3 h-3" />
                              </Button>
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 생성된 후기 목록 */}
            {generatedReviews.length > 0 && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="w-5 h-5" />
                      생성된 후기 ({generatedReviews.length}개)
                    </CardTitle>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => publishAllReviews()}
                        className="bg-blue-600 hover:bg-blue-700"
                        disabled={generatedReviews.length === 0}
                      >
                        <Calendar className="w-4 h-4 mr-2" />
                        전체 발행 ({generatedReviews.length}개)
                      </Button>
                      <Button
                        onClick={() => setGeneratedReviews([])}
                        variant="outline"
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        전체 삭제
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[600px] overflow-y-auto">
                    {generatedReviews.map((review, index) => (
                      <Card key={review.id} className="border-2 hover:border-purple-200 transition-colors">
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between mb-2">
                            <Badge variant="outline" className="w-fit">
                              #{index + 1}
                            </Badge>
                            <div className="flex items-center justify-center gap-1">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setSelectedReview(review)}
                                className="text-blue-600 hover:text-blue-700 border-blue-200 hover:border-blue-300"
                              >
                                <Eye className="w-3 h-3 mr-1" />
                                미리보기
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => publishSingleReview(review)}
                                className="text-green-600 hover:text-green-700"
                              >
                                발행
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => deleteReview(review.id)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                          <div className="flex flex-col gap-1">
                            <Badge
                              variant="secondary"
                              className="w-fit text-xs whitespace-nowrap overflow-hidden text-ellipsis max-w-[150px]"
                            >
                              {review.productConfig.productName}
                            </Badge>
                          </div>
                          <h4 className="text-sm font-medium line-clamp-2">{review.title}</h4>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <p className="text-xs text-gray-600 line-clamp-3 mb-2">{review.content}</p>
                          <div className="flex flex-wrap gap-1">
                            {review.tags.slice(0, 3).map((tag, tagIndex) => (
                              <Badge key={tagIndex} variant="secondary" className="text-xs">
                                #{tag}
                              </Badge>
                            ))}
                            {review.tags.length > 3 && (
                              <Badge variant="secondary" className="text-xs">
                                +{review.tags.length - 3}
                              </Badge>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="batch" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wand2 className="w-5 h-5" />
                  대량 후기 생성 (한번에 여러개)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h4 className="font-medium text-blue-800 mb-2">💡 대량 생성이란?</h4>
                  <p className="text-sm text-blue-700">
                    선택한 제목들을 여러 개씩 나누어서 자동으로 후기를 생성하는 기능입니다. 예: 100개 제목을 5개씩
                    나누어 20번에 걸쳐 생성
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>한 번에 생성할 개수</Label>
                    <Input
                      type="number"
                      min="1"
                      max="10"
                      value={batchSize}
                      onChange={(e) => setBatchSize(Number.parseInt(e.target.value) || 5)}
                    />
                    <p className="text-xs text-gray-500">권장: 5개 (서버 부하 방지)</p>
                  </div>
                  <div className="space-y-2">
                    <Label>총 생성할 개수</Label>
                    <Input
                      type="number"
                      min="1"
                      max="500"
                      value={maxReviews}
                      onChange={(e) => setMaxReviews(Number.parseInt(e.target.value) || 25)}
                    />
                    <p className="text-xs text-gray-500">최대 500개까지</p>
                  </div>
                  <div className="space-y-2">
                    <Label>사용 가능한 제목</Label>
                    <div className="p-2 bg-gray-50 rounded text-center">
                      <Badge variant="outline">{titleList.length}개</Badge>
                    </div>
                    <p className="text-xs text-gray-500">생성된 제목 수</p>
                  </div>
                </div>

                {isGeneratingBatch && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>배치 {currentBatch} 생성 중...</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} className="w-full" />
                  </div>
                )}

                <Button
                  onClick={generateBatchReviews}
                  disabled={isGeneratingBatch || titleList.length === 0}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                  size="lg"
                >
                  {isGeneratingBatch ? (
                    <>
                      <Wand2 className="w-4 h-4 mr-2 animate-spin" />
                      대량 생성 중... ({currentBatch} 단계)
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-4 h-4 mr-2" />🚀 {Math.min(maxReviews, titleList.length)}개 후기 대량 생성
                      시작
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* 후기 상세 보기 모달 */}
        {selectedReview && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-4xl max-h-[80vh] overflow-y-auto">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1 pr-4">
                    <CardTitle className="mb-2">{selectedReview.title}</CardTitle>
                    <Badge variant="secondary" className="text-xs">
                      제품: {selectedReview.productConfig.productName}
                    </Badge>
                  </div>
                  <Button size="sm" variant="ghost" onClick={() => setSelectedReview(null)}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>콘텐츠</Label>
                  <Textarea value={selectedReview.content} readOnly className="min-h-[200px] mt-2" />
                </div>
                <div>
                  <Label>태그</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedReview.tags.map((tag, index) => (
                      <Badge key={index} variant="outline">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
