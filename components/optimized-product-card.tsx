"use client"

import { memo } from "react"
import Image from "next/image"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

interface Product {
  id: number
  name: string
  price: string
  originalPrice?: string
  rating: number
  reviews: number
  image: string
  badge: string
  category: string
  brand: string
  isNew: boolean
}

interface ProductCardProps {
  product: Product
  viewMode: "grid" | "list"
  onClick: () => void
}

const OptimizedProductCard = memo(({ product, viewMode, onClick }: ProductCardProps) => {
  return (
    <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer" onClick={onClick}>
      <CardContent className="p-0">
        {viewMode === "grid" ? (
          <>
            <div className="relative overflow-hidden rounded-t-lg">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={`${product.name} - ${product.brand}`}
                width={300}
                height={300}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              />
              <Badge className="absolute top-2 left-2 bg-orange-500 hover:bg-orange-600">{product.badge}</Badge>
              {product.isNew && <Badge className="absolute top-2 right-2 bg-green-500 hover:bg-green-600">NEW</Badge>}
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-500 mb-1">{product.brand}</p>
              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
              <div className="flex items-center mb-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500 ml-2">({product.reviews})</span>
              </div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-lg font-bold text-gray-900">{product.price}원</span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through ml-2">{product.originalPrice}원</span>
                  )}
                </div>
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">장바구니 담기</Button>
            </div>
          </>
        ) : (
          <div className="flex p-4 gap-4">
            <div className="relative flex-shrink-0">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={`${product.name} - ${product.brand}`}
                width={150}
                height={150}
                className="w-32 h-32 object-cover rounded-lg"
                loading="lazy"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              />
              <Badge className="absolute top-2 left-2 bg-orange-500 hover:bg-orange-600 text-xs">{product.badge}</Badge>
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-500 mb-1">{product.brand}</p>
              <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
              <div className="flex items-center mb-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500 ml-2">({product.reviews})</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xl font-bold text-gray-900">{product.price}원</span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through ml-2">{product.originalPrice}원</span>
                  )}
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700">장바구니 담기</Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
})

OptimizedProductCard.displayName = "OptimizedProductCard"

export default OptimizedProductCard
