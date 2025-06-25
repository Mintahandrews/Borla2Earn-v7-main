"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Heart, Star, ShoppingCart, Coins, DollarSign, Gift, ArrowUpDown, Zap } from "lucide-react"

interface Product {
  id: string
  name: string
  description: string
  price: number
  tokenPrice: number
  image: string
  category: string
  rating: number
  reviews: number
  inStock: boolean
  featured: boolean
  sustainability: string
}

const products: Product[] = [
  {
    id: "1",
    name: "Borla2Earn Eco T-Shirt",
    description: "Premium organic cotton t-shirt with our signature logo. Made from 100% recycled materials.",
    price: 25,
    tokenPrice: 150,
    image: "/placeholder.svg?height=300&width=300",
    category: "Apparel",
    rating: 4.8,
    reviews: 124,
    inStock: true,
    featured: true,
    sustainability: "Made from 8 recycled plastic bottles",
  },
  {
    id: "2",
    name: "BORLA Token Hoodie",
    description: "Comfortable hoodie featuring the BORLA token design. Perfect for crypto enthusiasts.",
    price: 45,
    tokenPrice: 280,
    image: "/placeholder.svg?height=300&width=300",
    category: "Apparel",
    rating: 4.9,
    reviews: 89,
    inStock: true,
    featured: true,
    sustainability: "Carbon-neutral production",
  },
  {
    id: "3",
    name: "Recycled Water Bottle",
    description: "Borla2Earn branded stainless steel water bottle. Keep hydrated while saving the planet.",
    price: 18,
    tokenPrice: 95,
    image: "/placeholder.svg?height=300&width=300",
    category: "Accessories",
    rating: 4.7,
    reviews: 203,
    inStock: true,
    featured: false,
    sustainability: "Replaces 1000+ plastic bottles",
  },
  {
    id: "4",
    name: "Eco-Friendly Tote Bag",
    description: "Durable canvas tote bag with Borla2Earn branding. Perfect for grocery shopping.",
    price: 15,
    tokenPrice: 75,
    image: "/placeholder.svg?height=300&width=300",
    category: "Accessories",
    rating: 4.6,
    reviews: 156,
    inStock: true,
    featured: false,
    sustainability: "Made from recycled cotton",
  },
  {
    id: "5",
    name: "BORLA Coffee Mug",
    description: "Start your day with our ceramic coffee mug featuring the BORLA token logo.",
    price: 12,
    tokenPrice: 60,
    image: "/placeholder.svg?height=300&width=300",
    category: "Accessories",
    rating: 4.5,
    reviews: 78,
    inStock: true,
    featured: false,
    sustainability: "Dishwasher safe, long-lasting",
  },
  {
    id: "6",
    name: "Phone Case - Borla2Earn",
    description: "Protective phone case with our logo. Available for iPhone and Android devices.",
    price: 20,
    tokenPrice: 110,
    image: "/placeholder.svg?height=300&width=300",
    category: "Tech",
    rating: 4.4,
    reviews: 92,
    inStock: true,
    featured: false,
    sustainability: "Biodegradable materials",
  },
  {
    id: "7",
    name: "Limited Edition Cap",
    description: "Exclusive Borla2Earn cap with embroidered logo. Limited quantity available.",
    price: 22,
    tokenPrice: 120,
    image: "/placeholder.svg?height=300&width=300",
    category: "Apparel",
    rating: 4.9,
    reviews: 45,
    inStock: true,
    featured: true,
    sustainability: "Organic cotton, fair trade",
  },
  {
    id: "8",
    name: "Sustainability Sticker Pack",
    description: "Set of 10 waterproof stickers featuring Borla2Earn and eco-friendly messages.",
    price: 8,
    tokenPrice: 35,
    image: "/placeholder.svg?height=300&width=300",
    category: "Accessories",
    rating: 4.3,
    reviews: 167,
    inStock: true,
    featured: false,
    sustainability: "Eco-friendly vinyl",
  },
]

const categories = ["All", "Apparel", "Accessories", "Tech"]

export default function ShopPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("featured")
  const [favorites, setFavorites] = useState<string[]>([])
  const [paymentMode, setPaymentMode] = useState<"fiat" | "tokens">("fiat")

  const filteredProducts = products
    .filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .filter((product) => selectedCategory === "All" || product.category === selectedCategory)
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return paymentMode === "fiat" ? a.price - b.price : a.tokenPrice - b.tokenPrice
        case "price-high":
          return paymentMode === "fiat" ? b.price - a.price : b.tokenPrice - a.tokenPrice
        case "rating":
          return b.rating - a.rating
        case "featured":
        default:
          return b.featured ? 1 : -1
      }
    })

  const toggleFavorite = (productId: string) => {
    setFavorites((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

  const featuredProducts = products.filter((product) => product.featured)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Borla2Earn Official Store</h1>
            <p className="text-xl mb-6">Get exclusive branded merchandise with cash or BORLA tokens</p>
            <div className="flex justify-center gap-4">
              <Badge variant="secondary" className="text-lg px-4 py-2">
                <Coins className="w-5 h-5 mr-2" />
                Pay with BORLA Tokens
              </Badge>
              <Badge variant="secondary" className="text-lg px-4 py-2">
                <DollarSign className="w-5 h-5 mr-2" />
                Traditional Payment
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Payment Mode Toggle */}
        <div className="mb-8">
          <Card className="max-w-md mx-auto">
            <CardContent className="p-4">
              <div className="flex items-center justify-center gap-4">
                <span className="font-medium">Payment Method:</span>
                <Tabs value={paymentMode} onValueChange={(value) => setPaymentMode(value as "fiat" | "tokens")}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="fiat" className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4" />
                      Cash
                    </TabsTrigger>
                    <TabsTrigger value="tokens" className="flex items-center gap-2">
                      <Coins className="w-4 h-4" />
                      BORLA
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Featured Products */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Featured Items</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="border-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50">
                <CardContent className="p-6">
                  <div className="relative mb-4">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <Badge className="absolute top-2 left-2 bg-yellow-500">
                      <Zap className="w-3 h-3 mr-1" />
                      Featured
                    </Badge>
                  </div>
                  <h3 className="font-bold text-lg mb-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">{product.sustainability}</p>
                  <div className="flex justify-between items-center">
                    <div className="text-lg font-bold">
                      {paymentMode === "fiat" ? (
                        <span className="text-green-600">${product.price}</span>
                      ) : (
                        <span className="text-blue-600">{product.tokenPrice} BORLA</span>
                      )}
                    </div>
                    <Button size="sm">
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search for branded merchandise..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-48">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured First</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="group hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="relative mb-4">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-lg group-hover:scale-105 transition-transform"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                    onClick={() => toggleFavorite(product.id)}
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        favorites.includes(product.id) ? "fill-red-500 text-red-500" : "text-gray-500"
                      }`}
                    />
                  </Button>
                  {!product.inStock && (
                    <Badge variant="destructive" className="absolute bottom-2 left-2">
                      Out of Stock
                    </Badge>
                  )}
                </div>

                <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>

                <div className="flex items-center gap-1 mb-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">({product.reviews})</span>
                </div>

                <div className="mb-3">
                  <Badge variant="outline" className="text-xs">
                    {product.sustainability}
                  </Badge>
                </div>

                <div className="flex justify-between items-center mb-4">
                  <div>
                    {paymentMode === "fiat" ? (
                      <div>
                        <span className="text-xl font-bold text-green-600">${product.price}</span>
                        <div className="text-xs text-gray-500">or {product.tokenPrice} BORLA</div>
                      </div>
                    ) : (
                      <div>
                        <span className="text-xl font-bold text-blue-600">{product.tokenPrice} BORLA</span>
                        <div className="text-xs text-gray-500">or ${product.price}</div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Button
                    className="w-full"
                    disabled={!product.inStock}
                    variant={paymentMode === "tokens" ? "default" : "outline"}
                  >
                    {paymentMode === "tokens" ? (
                      <>
                        <Coins className="w-4 h-4 mr-2" />
                        Pay with BORLA
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Add to Cart
                      </>
                    )}
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full"
                    onClick={() => setPaymentMode(paymentMode === "fiat" ? "tokens" : "fiat")}
                  >
                    <ArrowUpDown className="w-4 h-4 mr-2" />
                    Switch to {paymentMode === "fiat" ? "BORLA" : "Cash"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Community Section */}
        <section className="mt-16 text-center">
          <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Join Our Community</h3>
              <p className="text-gray-600 mb-6">
                Connect with other eco-warriors and stay updated on new merchandise releases
              </p>
              <div className="flex justify-center gap-4">
                <Button variant="outline">
                  <Gift className="w-4 h-4 mr-2" />
                  Join Telegram Community
                </Button>
                <Button>Subscribe to Newsletter</Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
