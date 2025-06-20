"use client"

import { useState } from "react"
import { Share2, Facebook, MessageCircle, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface SocialShareProps {
  url: string
  title: string
  description: string
  image: string
}

export function SocialShare({ url, title, description, image }: SocialShareProps) {
  const [copied, setCopied] = useState(false)

  const shareData = {
    url: encodeURIComponent(url),
    title: encodeURIComponent(title),
    description: encodeURIComponent(description),
    image: encodeURIComponent(image),
  }

  const handleKakaoShare = () => {
    if (typeof window !== "undefined" && window.Kakao) {
      window.Kakao.Share.sendDefault({
        objectType: "commerce",
        content: {
          title: title,
          description: description,
          imageUrl: image,
          link: {
            mobileWebUrl: url,
            webUrl: url,
          },
        },
        commerce: {
          productName: title,
          regularPrice: 189000,
          discountPrice: 132300,
          discountRate: 30,
        },
        buttons: [
          {
            title: "구매하기",
            link: {
              mobileWebUrl: url,
              webUrl: url,
            },
          },
        ],
      })
    }
  }

  const handleFacebookShare = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${shareData.url}&quote=${shareData.title}`
    window.open(facebookUrl, "_blank", "width=600,height=400")
  }

  const handleInstagramShare = () => {
    // Instagram doesn't have direct sharing API, so we copy the link
    handleCopyLink()
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy: ", err)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <Share2 className="w-4 h-4 mr-2" />
          공유하기
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={handleKakaoShare} className="flex items-center">
          <MessageCircle className="w-4 h-4 mr-2 text-yellow-500" />
          카카오톡 공유
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleFacebookShare} className="flex items-center">
          <Facebook className="w-4 h-4 mr-2 text-blue-600" />
          페이스북 공유
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleInstagramShare} className="flex items-center">
          <div className="w-4 h-4 mr-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded"></div>
          인스타그램 공유
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleCopyLink} className="flex items-center">
          {copied ? <Check className="w-4 h-4 mr-2 text-green-500" /> : <Copy className="w-4 h-4 mr-2" />}
          {copied ? "복사됨!" : "링크 복사"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
