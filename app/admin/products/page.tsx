"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, Search, Edit, Trash2, RefreshCw, Truck } from "lucide-react"
import AdminLayout from "@/components/admin-layout"

interface Product {
  id: string
  name: string
  category: string
  price: number
  stock: number
  status: string
  image: string
  description: string
  featured: boolean
  createdAt: string
  sales: number
}

export default function ProductsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [products, setProducts] = useState<Product[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortBy, setSortBy] = useState("newest")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: "",
    category: "카매트",
    price: 0,
    stock: 0,
    status: "판매중",
    description: "",
    featured: false,
  })

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [productToDelete, setProductToDelete] = useState<string | null>(null)

  // 데모 데이터 생성
  useEffect(() => {
    const generateDemoProducts = () => {
      setIsLoading(true)

      const categories = ["카매트", "세차용품", "차량용품", "인테리어", "익스테리어", "전자기기"]
      const statuses = ["판매중", "품절", "입고예정", "판매중지"]

      const demoProducts: Product[] = Array.from({ length: 50 }, (_, i) => {
        const id = `PROD-${String(i + 1).padStart(3, "0")}`
        const category = categories[Math.floor(Math.random() * categories.length)]
        const status = statuses[Math.floor(Math.random() * statuses.length)]
        const price = Math.floor(Math.random() * 200000) + 10000
        const stock = status === "품절" ? 0 : Math.floor(Math.random() * 100) + 1
        const featured = Math.random() > 0.8
        const date = new Date()
        date.setDate(date.getDate() - Math.floor(Math.random() * 60))
        const sales = Math.floor(Math.random() * 500) + 10 // 10-510개 판매

        return {
          id,
          name: `${category} ${["프리미엄", "스탠다드", "베이직"][Math.floor(Math.random() * 3)]} ${
            ["A", "B", "C", "S", "X", "Pro", "Plus"][Math.floor(Math.random() * 7)]
          }`,
          category,
          price,
          stock,
          status,
          image: `/placeholder.svg?height=80&width=80&text=${encodeURIComponent(category)}`,
          description: `고품질 ${category} 제품입니다. 다양한 차종에 적합하며 내구성이 뛰어납니다.`,
          featured,
          createdAt: date.toISOString().split("T")[0],
          sales,
        }
      })

      setTimeout(() => {
        setProducts(demoProducts)
        setIsLoading(false)
      }, 800)
    }

    generateDemoProducts()
  }, [])

  const handleRefresh = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 800)
  }

  const handleAddProduct = () => {
    const id = `PROD-${String(products.length + 1).padStart(3, "0")}`
    const newProductWithId = {
      ...newProduct,
      id,
      image: `/placeholder.svg?height=80&width=80&text=${encodeURIComponent(newProduct.category || "")}`,
      createdAt: new Date().toISOString().split("T")[0],
      sales: 0,
    } as Product

    setProducts([newProductWithId, ...products])
    setIsAddDialogOpen(false)
    setNewProduct({
      name: "",
      category: "카매트",
      price: 0,
      stock: 0,
      status: "판매중",
      description: "",
      featured: false,
    })
  }

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product)
    setIsEditDialogOpen(true)
  }

  const handleUpdateProduct = () => {
    if (!editingProduct) return

    setProducts(products.map((p) => (p.id === editingProduct.id ? editingProduct : p)))
    setIsEditDialogOpen(false)
    setEditingProduct(null)
  }

  const handleDeleteProduct = (id: string) => {
    setProductToDelete(id)
    setDeleteConfirmOpen(true)
  }

  const confirmDelete = () => {
    if (productToDelete) {
      setProducts(products.filter((product) => product.id !== productToDelete))
      setDeleteConfirmOpen(false)
      setProductToDelete(null)
    }
  }

  const filteredProducts = products
    .filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((product) => (categoryFilter === "all" ? true : product.category === categoryFilter))
    .filter((product) => (statusFilter === "all" ? true : product.status === statusFilter))
    .sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      } else if (sortBy === "oldest") {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      } else if (sortBy === "price-high") {
        return b.price - a.price
      } else if (sortBy === "price-low") {
        return a.price - b.price
      } else if (sortBy === "name-asc") {
        return a.name.localeCompare(b.name)
      } else if (sortBy === "name-desc") {
        return b.name.localeCompare(a.name)
      } else if (sortBy === "sales-desc") {
        return b.sales - a.sales
      } else if (sortBy === "popularity") {
        // 인기도 = 판매량 + 조회수 + 추천여부 가중치
        const aPopularity = a.sales + (a.featured ? 100 : 0) + Math.random() * 50
        const bPopularity = b.sales + (b.featured ? 100 : 0) + Math.random() * 50
        return bPopularity - aPopularity
      } else if (sortBy === "reviews") {
        // 리뷰 개수 (임시로 판매량 기반 계산)
        const aReviews = Math.floor(a.sales * 0.3) + Math.floor(Math.random() * 20)
        const bReviews = Math.floor(b.sales * 0.3) + Math.floor(Math.random() * 20)
        return bReviews - aReviews
      } else {
        return b.name.localeCompare(a.name)
      }
    })

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW",
    }).format(amount)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "판매중":
        return "text-green-600 bg-green-100"
      case "품절":
        return "text-red-600 bg-red-100"
      case "입고예정":
        return "text-blue-600 bg-blue-100"
      case "판매중지":
        return "text-gray-600 bg-gray-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  const uniqueCategories = ["all", ...new Set(products.map((product) => product.category))]

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">상품 관리</h1>
          <p className="text-gray-500">총 {products.length}개의 상품이 등록되어 있습니다.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={handleRefresh} variant="outline" size="icon" disabled={isLoading}>
            <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                상품 등록
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>새 상품 등록</DialogTitle>
                <DialogDescription>새로운 상품 정보를 입력하세요. 모든 필드는 필수입니다.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">상품명</Label>
                    <Input
                      id="name"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">카테고리</Label>
                    <Select
                      value={newProduct.category}
                      onValueChange={(value) => setNewProduct({ ...newProduct, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="카테고리 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="카매트">카매트</SelectItem>
                        <SelectItem value="세차용품">세차용품</SelectItem>
                        <SelectItem value="차량용품">차량용품</SelectItem>
                        <SelectItem value="인테리어">인테리어</SelectItem>
                        <SelectItem value="익스테리어">익스테리어</SelectItem>
                        <SelectItem value="전자기기">전자기기</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">가격</Label>
                    <Input
                      id="price"
                      type="number"
                      value={newProduct.price || ""}
                      onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stock">재고</Label>
                    <Input
                      id="stock"
                      type="number"
                      value={newProduct.stock || ""}
                      onChange={(e) => setNewProduct({ ...newProduct, stock: Number(e.target.value) })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">상태</Label>
                  <Select
                    value={newProduct.status}
                    onValueChange={(value) => setNewProduct({ ...newProduct, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="상태 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="판매중">판매중</SelectItem>
                      <SelectItem value="품절">품절</SelectItem>
                      <SelectItem value="입고예정">입고예정</SelectItem>
                      <SelectItem value="판매중지">판매중지</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">상품 설명</Label>
                  <Textarea
                    id="description"
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="featured"
                    checked={newProduct.featured}
                    onCheckedChange={(checked) => setNewProduct({ ...newProduct, featured: !!checked })}
                  />
                  <Label htmlFor="featured">추천 상품으로 표시</Label>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  취소
                </Button>
                <Button onClick={handleAddProduct}>등록</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* 상품 수정 다이얼로그 */}
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>상품 수정</DialogTitle>
                <DialogDescription>상품 정보를 수정하세요.</DialogDescription>
              </DialogHeader>
              {editingProduct && (
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="edit-name">상품명</Label>
                      <Input
                        id="edit-name"
                        value={editingProduct.name}
                        onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-category">카테고리</Label>
                      <Select
                        value={editingProduct.category}
                        onValueChange={(value) => setEditingProduct({ ...editingProduct, category: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="카테고리 선택" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="카매트">카매트</SelectItem>
                          <SelectItem value="세차용품">세차용품</SelectItem>
                          <SelectItem value="차량용품">차량용품</SelectItem>
                          <SelectItem value="인테리어">인테리어</SelectItem>
                          <SelectItem value="익스테리어">익스테리어</SelectItem>
                          <SelectItem value="전자기기">전자기기</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="edit-price">가격</Label>
                      <Input
                        id="edit-price"
                        type="number"
                        value={editingProduct.price || ""}
                        onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-stock">재고</Label>
                      <Input
                        id="edit-stock"
                        type="number"
                        value={editingProduct.stock || ""}
                        onChange={(e) => setEditingProduct({ ...editingProduct, stock: Number(e.target.value) })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-status">상태</Label>
                    <Select
                      value={editingProduct.status}
                      onValueChange={(value) => setEditingProduct({ ...editingProduct, status: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="상태 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="판매중">판매중</SelectItem>
                        <SelectItem value="품절">품절</SelectItem>
                        <SelectItem value="입고예정">입고예정</SelectItem>
                        <SelectItem value="판매중지">판매중지</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-description">상품 설명</Label>
                    <Textarea
                      id="edit-description"
                      value={editingProduct.description}
                      onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="edit-featured"
                      checked={editingProduct.featured}
                      onCheckedChange={(checked) => setEditingProduct({ ...editingProduct, featured: !!checked })}
                    />
                    <Label htmlFor="edit-featured">추천 상품으로 표시</Label>
                  </div>
                </div>
              )}
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  취소
                </Button>
                <Button onClick={handleUpdateProduct}>수정 완료</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* 삭제 확인 다이얼로그 */}
          <Dialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>상품 삭제 확인</DialogTitle>
                <DialogDescription>정말로 이 상품을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.</DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDeleteConfirmOpen(false)}>
                  취소
                </Button>
                <Button variant="destructive" onClick={confirmDelete}>
                  삭제
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex items-center gap-2 flex-1">
            <Search className="h-4 w-4 text-gray-400" />
            <Input
              placeholder="상품명 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="카테고리" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">모든 카테고리</SelectItem>
                {uniqueCategories
                  .filter((cat) => cat !== "all")
                  .map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="상태" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">모든 상태</SelectItem>
                <SelectItem value="판매중">판매중</SelectItem>
                <SelectItem value="품절">품절</SelectItem>
                <SelectItem value="입고예정">입고예정</SelectItem>
                <SelectItem value="판매중지">판매중지</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="정렬" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">최신 등록순</SelectItem>
                <SelectItem value="oldest">오래된순</SelectItem>
                <SelectItem value="price-low">낮은 가격순</SelectItem>
                <SelectItem value="price-high">높은 가격순</SelectItem>
                <SelectItem value="sales-desc">누적 판매순</SelectItem>
                <SelectItem value="popularity">인기도순</SelectItem>
                <SelectItem value="reviews">리뷰 많은순</SelectItem>
                <SelectItem value="name-asc">이름 (가나다)</SelectItem>
                <SelectItem value="name-desc">이름 (다나가)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="grid" className="space-y-4">
          <TabsList>
            <TabsTrigger value="grid">그리드 보기</TabsTrigger>
            <TabsTrigger value="list">리스트 보기</TabsTrigger>
            <TabsTrigger value="sales">누적판매순</TabsTrigger>
            <TabsTrigger value="shipping">배송 설정</TabsTrigger>
          </TabsList>

          <TabsContent value="grid" className="space-y-4">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <CardContent className="p-4">
                      <div className="flex flex-col space-y-3">
                        <div className="w-full h-[80px] bg-gray-200 rounded-md" />
                        <div className="h-4 bg-gray-200 rounded w-3/4" />
                        <div className="h-4 bg-gray-200 rounded w-1/2" />
                        <div className="h-4 bg-gray-200 rounded w-1/4" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredProducts.map((product) => (
                  <Card key={product.id}>
                    <CardContent className="p-4">
                      <div className="flex flex-col space-y-3">
                        <div className="flex items-center justify-center h-[120px] bg-gray-50 rounded-md mb-2">
                          <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            className="max-h-full max-w-full object-contain"
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(product.status)}`}>
                            {product.status}
                          </span>
                          {product.featured && (
                            <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">추천</span>
                          )}
                        </div>
                        <h3 className="font-medium text-sm line-clamp-1">{product.name}</h3>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">{product.category}</span>
                          <span className="font-bold">{formatCurrency(product.price)}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span>재고: {product.stock}개</span>
                          <span className="text-gray-500">{product.id}</span>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">판매량: {product.sales}개</span>
                        </div>
                        <div className="flex items-center justify-end space-x-2 pt-2">
                          <Button variant="outline" size="sm" onClick={() => handleEditProduct(product)}>
                            <Edit className="h-3.5 w-3.5 mr-1" />
                            수정
                          </Button>
                          <Button variant="destructive" size="sm" onClick={() => handleDeleteProduct(product.id)}>
                            <Trash2 className="h-3.5 w-3.5 mr-1" />
                            삭제
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="list">
            {isLoading ? (
              <div className="space-y-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="p-4 border rounded-md animate-pulse">
                    <div className="flex items-center space-x-4">
                      <div className="w-[80px] h-[80px] bg-gray-200 rounded-md" />
                      <div className="space-y-2 flex-1">
                        <div className="h-4 bg-gray-200 rounded w-1/4" />
                        <div className="h-4 bg-gray-200 rounded w-1/2" />
                      </div>
                      <div className="h-4 bg-gray-200 rounded w-[100px]" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="p-4 border rounded-md hover:bg-gray-50">
                    <div className="flex items-center space-x-4">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-[80px] h-[80px] object-contain bg-gray-50 rounded-md"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-medium">{product.name}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(product.status)}`}>
                            {product.status}
                          </span>
                          {product.featured && (
                            <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">추천</span>
                          )}
                        </div>
                        <div className="text-sm text-gray-500">
                          {product.category} | 재고: {product.stock}개 | {product.id}
                        </div>
                        <div className="text-sm line-clamp-1 text-gray-500 mt-1">{product.description}</div>
                        <div>
                          <span className="text-sm text-gray-500">판매량: {product.sales}개</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">{formatCurrency(product.price)}</div>
                        <div className="text-sm text-gray-500">{product.createdAt}</div>
                        <div className="flex items-center justify-end space-x-2 mt-2">
                          <Button variant="outline" size="sm" onClick={() => handleEditProduct(product)}>
                            <Edit className="h-3.5 w-3.5 mr-1" />
                            수정
                          </Button>
                          <Button variant="destructive" size="sm" onClick={() => handleDeleteProduct(product.id)}>
                            <Trash2 className="h-3.5 w-3.5 mr-1" />
                            삭제
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
          <TabsContent value="sales" className="space-y-4">
            {isLoading ? (
              <div className="space-y-2">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div key={i} className="p-4 border rounded-md animate-pulse">
                    <div className="flex items-center space-x-4">
                      <div className="w-[60px] h-[60px] bg-gray-200 rounded-md" />
                      <div className="space-y-2 flex-1">
                        <div className="h-4 bg-gray-200 rounded w-1/3" />
                        <div className="h-4 bg-gray-200 rounded w-1/4" />
                      </div>
                      <div className="h-6 bg-gray-200 rounded w-[80px]" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                <div className="mb-4 p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">📊 누적 판매량 기준 상품 순위</h3>
                  <p className="text-sm text-blue-700">판매량이 높은 순서대로 정렬된 상품 목록입니다.</p>
                </div>
                {filteredProducts
                  .sort((a, b) => b.sales - a.sales)
                  .map((product, index) => (
                    <div key={product.id} className="p-4 border rounded-md hover:bg-gray-50">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-800 rounded-full font-bold text-sm">
                          {index + 1}
                        </div>
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-[60px] h-[60px] object-contain bg-gray-50 rounded-md"
                        />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-medium">{product.name}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(product.status)}`}>
                              {product.status}
                            </span>
                            {product.featured && (
                              <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">추천</span>
                            )}
                          </div>
                          <div className="text-sm text-gray-500">
                            {product.category} | 재고: {product.stock}개 | {product.id}
                          </div>
                          <div className="text-sm text-gray-500 mt-1">{formatCurrency(product.price)}</div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center space-x-2">
                            <div className="text-right">
                              <div className="font-bold text-lg text-green-600">{product.sales}개</div>
                              <div className="text-xs text-gray-500">누적 판매</div>
                            </div>
                            {index < 3 && (
                              <div className="text-2xl">
                                {index === 0 && "🥇"}
                                {index === 1 && "🥈"}
                                {index === 2 && "🥉"}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </TabsContent>
          <TabsContent value="shipping" className="space-y-4">
            <div className="text-center py-8">
              <Truck className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">제품별 배송비 설정</h3>
              <p className="text-gray-600 mb-6">각 상품별로 개별 배송비를 설정하고 관리할 수 있습니다.</p>
              <Button
                onClick={() => window.open("/admin/products/shipping", "_blank")}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Truck className="mr-2 h-4 w-4" />
                배송비 설정 페이지로 이동
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}
