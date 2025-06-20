"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  ImageIcon,
  Video,
  Save,
  Eye,
  X,
  Plus,
  LinkIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function WriteReviewPage() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [category, setCategory] = useState("")
  const [rating, setRating] = useState(5)
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")
  const [images, setImages] = useState<File[]>([])
  const [videos, setVideos] = useState<File[]>([])
  const [textAlign, setTextAlign] = useState("left")
  const [isPreview, setIsPreview] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoInputRef = useRef<HTMLInputElement>(null)
  const contentRef = useRef<HTMLTextAreaElement>(null)

  // useState에 링크 관련 상태 추가 (selectedImageForLink 제거)
  const [showLinkModal, setShowLinkModal] = useState(false)
  const [linkText, setLinkText] = useState("")
  const [linkUrl, setLinkUrl] = useState("")
  // const [selectedImageForLink, setSelectedImageForLink] = useState<number | null>(null) // 이 상태는 제거됨

  // 텍스트 포맷팅 함수들
  const formatText = (format: string) => {
    const textarea = contentRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = content.substring(start, end)

    let formattedText = ""
    switch (format) {
      case "bold":
        formattedText = `**${selectedText}**`
        break
      case "italic":
        formattedText = `*${selectedText}*`
        break
      case "underline":
        // 밑줄은 마크다운 표준이 아니므로 HTML 태그 사용
        formattedText = `<u>${selectedText}</u>`
        break
      default:
        formattedText = selectedText
    }

    const newContent = content.substring(0, start) + formattedText + content.substring(end)
    setContent(newContent)
  }

  // 정렬 변경
  const changeAlignment = (align: string) => {
    setTextAlign(align)
    const textarea = contentRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = content.substring(start, end)

    let alignedText = ""
    switch (align) {
      case "center":
        alignedText = `<div style="text-align: center">${selectedText}</div>`
        break
      case "right":
        alignedText = `<div style="text-align: right">${selectedText}</div>`
        break
      default:
        alignedText = selectedText
    }

    const newContent = content.substring(0, start) + alignedText + content.substring(end)
    setContent(newContent)
  }

  // 링크 삽입 함수 추가
  const insertLink = () => {
    const textarea = contentRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = content.substring(start, end)

    // 선택된 텍스트가 있으면 그것을 링크 텍스트로 사용
    if (selectedText) {
      setLinkText(selectedText)
    } else {
      setLinkText(""); // 선택된 텍스트 없으면 초기화
    }
    setLinkUrl(""); // URL도 항상 초기화
    setShowLinkModal(true)
  }

  // 링크 적용 함수 (applyImageLink 로직 제거)
  const applyLink = () => {
    if (!linkText.trim() || !linkUrl.trim()) {
      alert("링크 텍스트와 URL을 모두 입력해주세요.")
      return
    }

    const textarea = contentRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd

    // 마크다운 링크 형식으로 삽입
    const linkMarkdown = `[${linkText}](${linkUrl})`
    // 선택된 텍스트가 있었다면, 그 텍스트를 대체
    // 선택된 텍스트가 없었다면, 커서 위치에 삽입
    const newContent = content.substring(0, start) + linkMarkdown + content.substring(end)
    setContent(newContent)

    // 모달 닫기 및 상태 초기화
    setShowLinkModal(false)
    setLinkText("")
    setLinkUrl("")
  }

  // 이미지에 링크 추가 함수 (제거됨)
  // const addImageLink = (imageIndex: number) => {
  //   setSelectedImageForLink(imageIndex)
  //   setShowLinkModal(true)
  // }

  // 이미지 링크 적용 함수 (제거됨)
  // const applyImageLink = () => {
  //   if (!linkUrl.trim()) {
  //     alert("링크 URL을 입력해주세요.")
  //     return
  //   }
  //
  //   if (selectedImageForLink !== null) {
  //     const imageFile = images[selectedImageForLink]
  //     const imageUrl = URL.createObjectURL(imageFile)
  //
  //     // 클릭 가능한 이미지 링크 마크다운
  //     const imageLinkMarkdown = `\n[![${imageFile.name}](${imageUrl})](${linkUrl})\n`
  //     setContent((prev) => prev + imageLinkMarkdown)
  //   }
  //
  //   // 모달 닫기 및 상태 초기화
  //   setShowLinkModal(false)
  //   setLinkUrl("")
  //   setSelectedImageForLink(null)
  // }

  // 이미지 업로드
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setImages((prev) => [...prev, ...files])

    // 에디터에 이미지 삽입
    files.forEach((file) => {
      const imageUrl = URL.createObjectURL(file)
      const imageMarkdown = `\n![${file.name}](${imageUrl})\n`
      setContent((prev) => prev + imageMarkdown)
    })
  }

  // 동영상 업로드
  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setVideos((prev) => [...prev, ...files])

    // 에디터에 동영상 삽입
    files.forEach((file) => {
      const videoUrl = URL.createObjectURL(file)
      const videoMarkdown = `\n<video controls width="100%"><source src="${videoUrl}" type="${file.type}"></video>\n`
      setContent((prev) => prev + videoMarkdown)
    })
  }

  // 태그 추가
  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim()) && tags.length < 10) {
      setTags((prev) => [...prev, newTag.trim()])
      setNewTag("")
    }
  }

  // 태그 제거
  const removeTag = (tagToRemove: string) => {
    setTags((prev) => prev.filter((tag) => tag !== tagToRemove))
  }

  // 미리보기 렌더링
  const renderPreview = () => {
    return content
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // **굵게**
      .replace(/\*(.*?)\*/g, "<em>$1</em>") // *기울임*
      .replace(/<u>(.*?)<\/u>/g, "<u>$1</u>") // <u>밑줄</u> (HTML 태그는 그대로 유지)
      .replace(
        /\[([^\]]+)\]\(([^)]+)\)/g, // 올바른 마크다운 링크 정규표현식
        '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">$1</a>',
      )
      .replace(
        /!\[([^\]]*)\]\(([^)]+)\)/g, // 올바른 마크다운 이미지 정규표현식
        '<img src="$2" alt="$1" class="max-w-full rounded" />',
      )
      .replace(/<div style="text-align: (left|center|right)">(.*?)<\/div>/g, '<div style="text-align: $1">$2</div>') // 정렬
      .replace(/<video controls width="100%"><source src="(.*?)" type="(.*?)"><\/video>/g, '<video controls width="100%"><source src="$1" type="$2"></video>') // 동영상 (HTML 태그는 그대로 유지)
      .replace(/\n/g, "<br>") // 줄바꿈
  }

  // 저장
  const handleSave = async () => {
    if (!title.trim() || !content.trim() || !category) {
      alert("제목, 내용, 카테고리를 모두 입력해주세요.")
      return
    }

    // 실제로는 API 호출
    const reviewData = {
      title,
      content,
      category,
      rating,
      tags,
      images: images.map((img) => img.name),
      videos: videos.map((vid) => vid.name),
    }

    console.log("후기 저장:", reviewData)

    // 성공 시 목록 페이지로 이동
    router.push("/reviews")
  }

  return (
    <>
      <head>
        <title>후기 작성하기 - 스타일카 실제구매후기</title>
        <meta
          name="description"
          content="스타일카 자동차용품 실제구매후기를 작성해보세요. 네이버 블로그 스타일 에디터로 사진, 동영상과 함께 생생한 후기를 공유하고 적립금도 받으세요!"
        />
        {/* SEO 최적화를 위해 noindex, nofollow는 제거하는 것이 좋습니다.
            사용자가 작성한 후기 페이지가 검색 엔진에 노출되어야 의미가 있습니다.
            <meta name="robots" content="noindex, nofollow" />
        */}
      </head>

      <div className="min-h-screen bg-gray-50">
        <Header />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* 헤더 */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">실제구매후기 작성</h1>
            <p className="text-gray-600">
              생생한 사용 경험을 공유하고 다른 고객들에게 도움을 주세요!
              <span className="text-blue-600 font-medium ml-1">우수 후기 시 적립금 지급</span>
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>후기 작성</span>
                <div className="flex space-x-2">
                  <Button variant="outline" onClick={() => setIsPreview(!isPreview)} className="flex items-center">
                    <Eye className="w-4 h-4 mr-2" />
                    {isPreview ? "편집" : "미리보기"}
                  </Button>
                  <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
                    <Save className="w-4 h-4 mr-2" />
                    저장하기
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* 기본 정보 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">카테고리 *</label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="카테고리를 선택하세요" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="카매트">카매트</SelectItem>
                      <SelectItem value="세차용품">세차용품</SelectItem>
                      <SelectItem value="차량용품">차량용품</SelectItem>
                      <SelectItem value="방향제">방향제</SelectItem>
                      <SelectItem value="보호용품">보호용품</SelectItem>
                      <SelectItem value="주차용품">주차용품</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">평점 *</label>
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setRating(star)}
                        className={`text-2xl ${
                          star <= rating ? "text-yellow-400" : "text-gray-300"
                        } hover:text-yellow-400 transition-colors`}
                      >
                        ★
                      </button>
                    ))}
                    <span className="ml-2 text-sm text-gray-600">{rating}.0점</span>
                  </div>
                </div>
              </div>

              {/* 제목 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">제목 *</label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="후기 제목을 입력하세요 (예: 아반떼 CN7 3D 카매트 6개월 사용 후기)"
                  className="text-lg"
                />
                <p className="text-xs text-gray-500 mt-1">SEO 최적화를 위해 제품명과 사용기간을 포함해주세요</p>
              </div>

              {/* 에디터 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">후기 내용 *</label>

                {!isPreview && (
                  <>
                    {/* 툴바 */}
                    <div className="border border-gray-300 rounded-t-lg bg-gray-50 p-2 flex flex-wrap items-center gap-2">
                      {/* 텍스트 포맷팅 */}
                      <div className="flex items-center border-r pr-2 mr-2">
                        <Button variant="ghost" size="sm" onClick={() => formatText("bold")} title="굵게">
                          <Bold className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => formatText("italic")} title="기울임">
                          <Italic className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => formatText("underline")} title="밑줄">
                          <Underline className="w-4 h-4" />
                        </Button>
                      </div>

                      {/* 정렬 */}
                      <div className="flex items-center border-r pr-2 mr-2">
                        <Button variant="ghost" size="sm" onClick={() => changeAlignment("left")} title="왼쪽 정렬">
                          <AlignLeft className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => changeAlignment("center")} title="가운데 정렬">
                          <AlignCenter className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => changeAlignment("right")} title="오른쪽 정렬">
                          <AlignRight className="w-4 h-4" />
                        </Button>
                      </div>

                      {/* 링크 */}
                      <div className="flex items-center border-r pr-2 mr-2">
                        <Button variant="ghost" size="sm" onClick={insertLink} title="링크 삽입">
                          <LinkIcon className="w-4 h-4" />
                        </Button>
                      </div>

                      {/* 미디어 */}
                      <div className="flex items-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => fileInputRef.current?.click()}
                          title="이미지 첨부"
                        >
                          <ImageIcon className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => videoInputRef.current?.click()}
                          title="동영상 첨부"
                        >
                          <Video className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {/* 에디터 */}
                    <Textarea
                      ref={contentRef}
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="상세한 사용 후기를 작성해주세요. 사진과 동영상을 첨부하면 더욱 생생한 후기가 됩니다!"
                      className="min-h-[400px] rounded-t-none border-t-0 resize-none"
                      style={{ textAlign: textAlign as any }}
                    />
                  </>
                )}

                {/* 미리보기 */}
                {isPreview && (
                  <div
                    className="min-h-[400px] p-4 border border-gray-300 rounded-lg bg-white prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: renderPreview() }}
                  />
                )}
                {/* 파일 입력 */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <input
                  ref={videoInputRef}
                  type="file"
                  accept="video/*"
                  multiple
                  onChange={handleVideoUpload}
                  className="hidden"
                />
              </div>

              {/* 첨부된 미디어 미리보기 */}
              {(images.length > 0 || videos.length > 0) && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">첨부된 파일</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {images.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={URL.createObjectURL(image) || "/placeholder.svg"}
                          alt={`첨부 이미지 ${index + 1}`}
                          className="w-full h-24 object-cover rounded border"
                        />
                        <button
                          onClick={() => setImages((prev) => prev.filter((_, i) => i !== index))}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                        >
                          <X className="w-3 h-3" />
                        </button>
                        {/* 이미지에 링크 추가 버튼 제거됨 */}
                        {/* <button
                          onClick={() => addImageLink(index)}
                          className="absolute bottom-1 right-1 bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                          title="이미지에 링크 추가"
                        >
                          <LinkIcon className="w-3 h-3" />
                        </button> */}
                      </div>
                    ))}
                    {videos.map((video, index) => (
                      <div key={index} className="relative">
                        <video src={URL.createObjectURL(video)} className="w-full h-24 object-cover rounded border" />
                        <button
                          onClick={() => setVideos((prev) => prev.filter((_, i) => i !== index))}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 태그 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">태그 (최대 10개)</label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center">
                      #{tag}
                      <button onClick={() => removeTag(tag)} className="ml-1 text-gray-500 hover:text-red-500">
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="태그 입력 (예: 아반떼CN7, 실사용후기)"
                    onKeyPress={(e) => e.key === "Enter" && addTag()}
                    className="flex-1"
                  />
                  <Button onClick={addTag} variant="outline" disabled={tags.length >= 10}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  검색 최적화를 위해 제품명, 차종, 특징 등을 태그로 추가해주세요
                </p>
              </div>

              {/* 작성 가이드 */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-medium text-blue-900 mb-2">좋은 후기 작성 팁</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• 제품의 장단점을 솔직하게 작성해주세요</li>
                  <li>• 설치/사용 과정을 사진이나 동영상으로 보여주세요</li>
                  <li>• 사용 기간과 구체적인 경험을 포함해주세요</li>
                  <li>• 다른 제품과의 비교나 개선점을 제안해주세요</li>
                  <li>• 검색에 도움이 되는 키워드를 태그로 추가해주세요</li>
                  <li>• 자연스러운 문체로 작성하고 과도한 이모지는 피해주세요</li>
                </ul>
              </div>
              {showLinkModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white rounded-lg p-6 w-96 max-w-[90vw]">
                    <h3 className="text-lg font-semibold mb-4">
                      {/* selectedImageForLink 조건 제거 */}
                      링크 삽입
                    </h3>

                    {/* selectedImageForLink 조건 제거 */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">링크 텍스트</label>
                      <Input
                        value={linkText}
                        onChange={(e) => setLinkText(e.target.value)}
                        placeholder="링크로 표시될 텍스트를 입력하세요"
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">링크 URL</label>
                      <Input
                        value={linkUrl}
                        onChange={(e) => setLinkUrl(e.target.value)}
                        placeholder="https://example.com"
                        type="url"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        제품 구매 링크, 관련 정보 링크 등을 추가할 수 있습니다
                      </p>
                    </div>

                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setShowLinkModal(false)
                          setLinkText("")
                          setLinkUrl("")
                          // setSelectedImageForLink(null) // 이 상태 초기화도 제거
                        }}
                      >
                        취소
                      </Button>
                      <Button
                        // onClick={selectedImageForLink !== null ? applyImageLink : applyLink} // 조건 제거
                        onClick={applyLink}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        적용
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Footer />
      </div>
    </>
  )
}
