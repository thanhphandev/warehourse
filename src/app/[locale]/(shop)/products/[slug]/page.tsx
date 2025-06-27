'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ShoppingCart, 
  Heart, 
  Share2, 
  Star, 
  Plus, 
  Minus, 
  Shield, 
  Truck, 
  RotateCcw, 
  Award,
  ChevronRight,
  Info,
  Package,
  Clock,
  Leaf,
  AlertTriangle,
  CheckCircle,
  Eye,
  ArrowLeft
} from 'lucide-react';

// Mock data based on your schema - in production this would come from your API
const mockProduct = {
  sku: "PN-BTMDN-40G",
  slug: "banh-trang-me-den-nuong-40g",
  product_name: {
    vi: "Bánh tráng mè đen nướng (40g)",
    en: "Grilled black sesame rice crackers (40g)"
  },
  brand: {
    name: "SAO KHUE FOODS JSC",
    slug: "sao-khue-foods-jsc",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9zI44ttkLoJcF6xUWWbhuDOqvblLLdWW-Lw&s"
  },
  categories: [
    { name_vi: "Bánh tráng & Bánh phồng", name_en: "Rice Crackers & Chips", slug: "rice-crackers" }
  ],
  description: {
    vi: "Bánh được làm từ thành phần chính là gạo, mè đen, bột mì, muối,…\n\nBánh được sản xuất và đóng gói trong dây chuyền khép kín với công nghệ hiện đại nên bánh giữ được độ giòn lâu, vị thơm của gạo, vị béo của mè và đặc biệt là đảm bảo an toàn vệ sinh thực phẩm.\n\nSản phẩm mang hương vị truyền thống Việt Nam, thích hợp làm món ăn vặt hoặc kết hợp với các món ăn khác.",
    en: "The cake is made primarily from rice, black sesame, wheat flour, salt, and other ingredients.\n\nIt is produced and packaged on a closed-loop production line using modern technology, which helps the cake maintain its crispiness, the fragrant aroma of rice, the rich taste of sesame, and most importantly, ensures food safety and hygiene.\n\nThe product carries traditional Vietnamese flavors, suitable as a snack or combined with other dishes."
  },
  ingredients: {
    vi: "Gạo, mè đen, bột mì, muối, dầu thực vật, đường, gia vị tự nhiên",
    en: "Rice, black sesame, wheat flour, salt, vegetable oil, sugar, natural spices"
  },
  image: "https://i.postimg.cc/LXWr50kM/gaomeden.png",
  images: [
    "https://i.postimg.cc/LXWr50kM/gaomeden.png",
    "https://images.pexels.com/photos/1633525/pexels-photo-1633525.jpeg",
    "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
    "https://images.pexels.com/photos/884600/pexels-photo-884600.jpeg"
  ],
  net_weight: { value: 40, unit: "g" },
  shelf_life: { value: 5, unit: "months" },
  usage_instructions: {
    vi: [
      "Dùng ngay sau khi mở bì để giữ độ giòn tốt nhất",
      "Có thể ăn trực tiếp hoặc kết hợp với nước chấm",
      "Thích hợp làm món ăn vặt cho cả gia đình"
    ],
    en: [
      "Consume immediately after opening the package to maintain optimal crispiness",
      "Can be eaten directly or combined with dipping sauce",
      "Suitable as a snack for the whole family"
    ]
  },
  storage_instructions: {
    vi: "Bảo quản nơi khô ráo thoáng mát, tránh ánh nắng mặt trời trực tiếp. Sau khi mở bao bì, nên bảo quản trong hộp kín để giữ độ giòn.",
    en: "Store in a cool, dry place, away from direct sunlight. After opening the package, store in an airtight container to maintain crispiness."
  },
  dietary_info: {
    suitability: {
      vi: ["Phù hợp cho người ăn chay", "Không chứa chất bảo quản", "Sản phẩm tự nhiên"],
      en: ["Suitable for vegetarians", "No preservatives", "Natural product"]
    },
    allergen_warnings: {
      vi: ["Chứa gluten (bột mì)", "Có thể chứa vết mè"],
      en: ["Contains gluten (wheat flour)", "May contain traces of sesame"]
    }
  },
  packaging_details: {
    vi: "Đóng gói trong túi nhựa an toàn thực phẩm, có thể tái chế. Thiết kế bao bì hiện đại, tiện lợi mang theo.",
    en: "Packaged in food-safe plastic bags that are recyclable. Modern packaging design, convenient to carry."
  },
  additional_info: [
    {
      key_vi: "Xuất xứ",
      key_en: "Origin",
      value_vi: "Việt Nam",
      value_en: "Vietnam"
    },
    {
      key_vi: "Nhà sản xuất",
      key_en: "Manufacturer",
      value_vi: "SAO KHUE FOODS JSC",
      value_en: "SAO KHUE FOODS JSC"
    },
    {
      key_vi: "Chứng nhận",
      key_en: "Certification",
      value_vi: "HACCP, ISO 22000",
      value_en: "HACCP, ISO 22000"
    }
  ],
  price: 25000,
  originalPrice: 30000,
  rating: 4.8,
  reviews: 124,
  inStock: true,
  stockQuantity: 150,
  is_best_seller: true
};

const relatedProducts = [
  {
    slug: "banh-trang-nuong-me-trang",
    name_vi: "Bánh tráng nướng mè trắng",
    name_en: "Grilled white sesame rice crackers",
    image: "https://images.pexels.com/photos/1633525/pexels-photo-1633525.jpeg",
    price: 22000,
    originalPrice: 28000,
    rating: 4.6
  },
  {
    slug: "banh-trang-tom-cay",
    name_vi: "Bánh tráng tôm cay",
    name_en: "Spicy shrimp rice crackers",
    image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
    price: 28000,
    originalPrice: 35000,
    rating: 4.7
  },
  {
    slug: "banh-phong-tom",
    name_vi: "Bánh phồng tôm truyền thống",
    name_en: "Traditional shrimp crackers",
    image: "https://images.pexels.com/photos/884600/pexels-photo-884600.jpeg",
    price: 32000,
    originalPrice: 40000,
    rating: 4.9
  }
];

export default function ProductPage({ params }: { params: { slug: string } }) {
  const [isVietnamese, setIsVietnamese] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState('description');
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const product = mockProduct; // In production, fetch based on params.slug

  const increaseQuantity = () => {
    if (quantity < product.stockQuantity) {
      setQuantity(prev => prev + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const addToCart = () => {
    // Add to cart logic
    console.log(`Added ${quantity} of ${product.sku} to cart`);
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  const shareProduct = () => {
    if (navigator.share) {
      navigator.share({
        title: isVietnamese ? product.product_name.vi : product.product_name.en,
        url: window.location.href,
      });
    }
  };

  const tabs = [
    { id: 'description', label_vi: 'Mô tả', label_en: 'Description' },
    { id: 'ingredients', label_vi: 'Thành phần', label_en: 'Ingredients' },
    { id: 'instructions', label_vi: 'Hướng dẫn', label_en: 'Instructions' },
    { id: 'reviews', label_vi: 'Đánh giá', label_en: 'Reviews' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-4">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9zI44ttkLoJcF6xUWWbhuDOqvblLLdWW-Lw&s"
                  alt="SAO KHUE FOODS"
                  width={40}
                  height={40}
                  className="rounded-lg"
                />
                <h1 className="text-xl font-bold text-gray-900">SAO KHUE FOODS</h1>
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setIsVietnamese(!isVietnamese)}
                className="px-3 py-1 text-sm bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
              >
                {isVietnamese ? 'EN' : 'VI'}
              </button>
              <button className="p-2 text-gray-600 hover:text-red-600 transition-colors relative">
                <ShoppingCart className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  3
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center space-x-2 text-sm text-gray-600">
          <Link href="/" className="hover:text-red-600 transition-colors">
            {isVietnamese ? 'Trang chủ' : 'Home'}
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link href={`/category/${product.categories[0].slug}`} className="hover:text-red-600 transition-colors">
            {isVietnamese ? product.categories[0].name_vi : product.categories[0].name_en}
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-medium">
            {isVietnamese ? product.product_name.vi : product.product_name.en}
          </span>
        </nav>
      </div>

      {/* Product Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-white rounded-2xl shadow-lg overflow-hidden">
              <img
                src={product.images[selectedImage]}
                alt={isVietnamese ? product.product_name.vi : product.product_name.en}
                className="object-contain p-8"
              />
              
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col space-y-2">
                {product.is_best_seller && (
                  <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {isVietnamese ? 'Bán chạy' : 'Bestseller'}
                  </span>
                )}
                {product.originalPrice > product.price && (
                  <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                  </span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="absolute top-4 right-4 flex flex-col space-y-2">
                <button 
                  onClick={toggleWishlist}
                  className={`p-2 rounded-full shadow-lg transition-colors ${
                    isWishlisted ? 'bg-red-600 text-white' : 'bg-white text-gray-600 hover:text-red-600'
                  }`}
                >
                  <Heart className="w-5 h-5" fill={isWishlisted ? 'currentColor' : 'none'} />
                </button>
                <button 
                  onClick={shareProduct}
                  className="p-2 bg-white text-gray-600 rounded-full shadow-lg hover:text-red-600 transition-colors"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index ? 'border-red-600' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img
                    src={image}
                    alt={`Product image ${index + 1}`}
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            {/* Brand */}
            <div className="flex items-center space-x-3">
              <img
                src={product.brand.logo}
                alt={product.brand.name}
                width={32}
                height={32}
                className="rounded"
              />
              <Link 
                href={`/brand/${product.brand.slug}`}
                className="text-red-600 font-semibold hover:text-red-700 transition-colors"
              >
                {product.brand.name}
              </Link>
            </div>

            {/* Product Name */}
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
              {isVietnamese ? product.product_name.vi : product.product_name.en}
            </h1>

            {/* SKU */}
            <p className="text-sm text-gray-500">
              {isVietnamese ? 'Mã sản phẩm:' : 'SKU:'} {product.sku}
            </p>

            {/* Rating */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating) 
                        ? 'text-yellow-400 fill-current' 
                        : 'text-gray-300'
                    }`} 
                  />
                ))}
              </div>
              <span className="text-lg font-semibold text-gray-900">{product.rating}</span>
              <span className="text-gray-600">
                ({product.reviews} {isVietnamese ? 'đánh giá' : 'reviews'})
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-4">
              <span className="text-4xl font-bold text-red-600">
                {product.price.toLocaleString('vi-VN')}₫
              </span>
              {product.originalPrice > product.price && (
                <span className="text-xl text-gray-500 line-through">
                  {product.originalPrice.toLocaleString('vi-VN')}₫
                </span>
              )}
            </div>

            {/* Key Features */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Package className="w-4 h-4 text-red-600" />
                <span>
                  {product.net_weight.value}{product.net_weight.unit}
                </span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Clock className="w-4 h-4 text-red-600" />
                <span>
                  {product.shelf_life.value} {isVietnamese ? 'tháng' : 'months'}
                </span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Leaf className="w-4 h-4 text-green-600" />
                <span>
                  {isVietnamese ? 'Tự nhiên' : 'Natural'}
                </span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Shield className="w-4 h-4 text-blue-600" />
                <span>
                  {isVietnamese ? 'An toàn thực phẩm' : 'Food Safe'}
                </span>
              </div>
            </div>

            {/* Stock Status */}
            <div className="flex items-center space-x-2">
              {product.inStock ? (
                <>
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-green-600 font-semibold">
                    {isVietnamese ? 'Còn hàng' : 'In Stock'} ({product.stockQuantity} {isVietnamese ? 'sản phẩm' : 'items'})
                  </span>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  <span className="text-red-600 font-semibold">
                    {isVietnamese ? 'Hết hàng' : 'Out of Stock'}
                  </span>
                </>
              )}
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center space-x-4">
              <span className="text-gray-700 font-medium">
                {isVietnamese ? 'Số lượng:' : 'Quantity:'}
              </span>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1}
                  className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 py-2 font-semibold min-w-[60px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={increaseQuantity}
                  disabled={quantity >= product.stockQuantity}
                  className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button
                onClick={addToCart}
                disabled={!product.inStock}
                className="flex-1 bg-red-600 text-white py-4 px-6 rounded-xl font-semibold hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>
                  {isVietnamese ? 'Thêm vào giỏ hàng' : 'Add to Cart'}
                </span>
              </button>
              <button className="px-6 py-4 border-2 border-red-600 text-red-600 rounded-xl font-semibold hover:bg-red-50 transition-colors">
                {isVietnamese ? 'Mua ngay' : 'Buy Now'}
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
              <div className="text-center">
                <Shield className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900">
                  {isVietnamese ? 'Đảm bảo chất lượng' : 'Quality Guaranteed'}
                </p>
              </div>
              <div className="text-center">
                <Truck className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900">
                  {isVietnamese ? 'Giao hàng nhanh' : 'Fast Delivery'}
                </p>
              </div>
              <div className="text-center">
                <RotateCcw className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900">
                  {isVietnamese ? 'Đổi trả dễ dàng' : 'Easy Returns'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-red-600 text-red-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {isVietnamese ? tab.label_vi : tab.label_en}
                </button>
              ))}
            </nav>
          </div>

          <div className="py-8">
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {isVietnamese ? 'Mô tả sản phẩm' : 'Product Description'}
                  </h3>
                  <div className="text-gray-700 leading-relaxed">
                    {(isVietnamese ? product.description.vi : product.description.en)
                      ?.split('\n\n')
                      .slice(0, showFullDescription ? undefined : 2)
                      .map((paragraph, index) => (
                        <p key={index} className="mb-4">
                          {paragraph}
                        </p>
                      ))}
                  </div>
                  {(isVietnamese ? product.description.vi : product.description.en)
                    ?.split('\n\n').length > 2 && (
                    <button
                      onClick={() => setShowFullDescription(!showFullDescription)}
                      className="text-red-600 font-semibold hover:text-red-700 transition-colors"
                    >
                      {showFullDescription 
                        ? (isVietnamese ? 'Thu gọn' : 'Show Less')
                        : (isVietnamese ? 'Xem thêm' : 'Show More')
                      }
                    </button>
                  )}
                </div>

                {/* Additional Information */}
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h4 className="text-lg font-bold text-gray-900 mb-4">
                      {isVietnamese ? 'Thông tin bổ sung' : 'Additional Information'}
                    </h4>
                    <dl className="space-y-3">
                      {product.additional_info.map((info, index) => (
                        <div key={index} className="flex justify-between">
                          <dt className="text-gray-600">
                            {isVietnamese ? info.key_vi : info.key_en}:
                          </dt>
                          <dd className="font-medium text-gray-900">
                            {isVietnamese ? info.value_vi : info.value_en}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h4 className="text-lg font-bold text-gray-900 mb-4">
                      {isVietnamese ? 'Thông tin dinh dưỡng' : 'Dietary Information'}
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-semibold text-green-600 mb-2">
                          {isVietnamese ? 'Phù hợp cho:' : 'Suitable for:'}
                        </h5>
                        <ul className="space-y-1">
                          {(isVietnamese ? product.dietary_info.suitability.vi : product.dietary_info.suitability.en).map((item, index) => (
                            <li key={index} className="flex items-center space-x-2">
                              <CheckCircle className="w-4 h-4 text-green-600" />
                              <span className="text-gray-700">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold text-orange-600 mb-2">
                          {isVietnamese ? 'Cảnh báo dị ứng:' : 'Allergen Warnings:'}
                        </h5>
                        <ul className="space-y-1">
                          {(isVietnamese ? product.dietary_info.allergen_warnings.vi : product.dietary_info.allergen_warnings.en).map((item, index) => (
                            <li key={index} className="flex items-center space-x-2">
                              <AlertTriangle className="w-4 h-4 text-orange-600" />
                              <span className="text-gray-700">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'ingredients' && (
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {isVietnamese ? 'Thành phần' : 'Ingredients'}
                </h3>
                <p className="text-gray-700 text-lg leading-relaxed">
                  {isVietnamese ? product.ingredients.vi : product.ingredients.en}
                </p>
              </div>
            )}

            {activeTab === 'instructions' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {isVietnamese ? 'Hướng dẫn sử dụng' : 'Usage Instructions'}
                  </h3>
                  <ul className="space-y-3">
                    {(isVietnamese ? product.usage_instructions.vi : product.usage_instructions.en).map((instruction, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                          {index + 1}
                        </span>
                        <span className="text-gray-700">{instruction}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {isVietnamese ? 'Hướng dẫn bảo quản' : 'Storage Instructions'}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {isVietnamese ? product.storage_instructions.vi : product.storage_instructions.en}
                  </p>
                </div>

                {product.packaging_details && (
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      {isVietnamese ? 'Thông tin đóng gói' : 'Packaging Details'}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {isVietnamese ? product.packaging_details.vi : product.packaging_details.en}
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  {isVietnamese ? 'Đánh giá khách hàng' : 'Customer Reviews'}
                </h3>
                
                {/* Review Summary */}
                <div className="flex items-center space-x-6 mb-8 p-6 bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-gray-900">{product.rating}</div>
                    <div className="flex items-center justify-center space-x-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-5 h-5 ${
                            i < Math.floor(product.rating) 
                              ? 'text-yellow-400 fill-current' 
                              : 'text-gray-300'
                          }`} 
                        />
                      ))}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      {product.reviews} {isVietnamese ? 'đánh giá' : 'reviews'}
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    {[5, 4, 3, 2, 1].map((stars) => (
                      <div key={stars} className="flex items-center space-x-3 mb-1">
                        <span className="text-sm text-gray-600 w-8">{stars}★</span>
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-yellow-400 h-2 rounded-full" 
                            style={{ width: `${Math.random() * 80 + 10}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600 w-8">
                          {Math.floor(Math.random() * 30 + 5)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sample Reviews */}
                <div className="space-y-6">
                  {[
                    {
                      name: "Nguyễn Thị Mai",
                      rating: 5,
                      date: "2024-01-15",
                      comment_vi: "Sản phẩm rất ngon, giòn tan và thơm mùi mè. Cả gia đình đều thích. Sẽ mua lại!",
                      comment_en: "Very delicious product, crispy and fragrant with sesame. The whole family loves it. Will buy again!"
                    },
                    {
                      name: "Trần Văn Hùng",
                      rating: 4,
                      date: "2024-01-10",
                      comment_vi: "Chất lượng tốt, đóng gói cẩn thận. Vị hơi nhạt so với mong đợi nhưng vẫn ổn.",
                      comment_en: "Good quality, carefully packaged. The taste is a bit mild compared to expectations but still okay."
                    },
                    {
                      name: "Lê Thị Hoa",
                      rating: 5,
                      date: "2024-01-08",
                      comment_vi: "Bánh tráng mè đen này rất đặc biệt, vị mè đậm đà. Giao hàng nhanh, đóng gói đẹp.",
                      comment_en: "This black sesame rice cracker is very special, rich sesame flavor. Fast delivery, beautiful packaging."
                    }
                  ].map((review, index) => (
                    <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
                      <div className="flex items-center space-x-4 mb-3">
                        <div className="w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center font-semibold">
                          {review.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{review.name}</div>
                          <div className="flex items-center space-x-2">
                            <div className="flex space-x-1">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`w-4 h-4 ${
                                    i < review.rating 
                                      ? 'text-yellow-400 fill-current' 
                                      : 'text-gray-300'
                                  }`} 
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-500">{review.date}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700">
                        {isVietnamese ? review.comment_vi : review.comment_en}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 text-center">
                  <button className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors">
                    {isVietnamese ? 'Xem tất cả đánh giá' : 'View All Reviews'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            {isVietnamese ? 'Sản phẩm liên quan' : 'Related Products'}
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {relatedProducts.map((relatedProduct, index) => (
              <Link
                key={index}
                href={`/product/${relatedProduct.slug}`}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={relatedProduct.image}
                    alt={isVietnamese ? relatedProduct.name_vi : relatedProduct.name_en}
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-red-600 text-white px-2 py-1 rounded-full text-sm font-semibold">
                    -{Math.round((1 - relatedProduct.price / relatedProduct.originalPrice) * 100)}%
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                    {isVietnamese ? relatedProduct.name_vi : relatedProduct.name_en}
                  </h3>
                  
                  <div className="flex items-center space-x-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${
                          i < Math.floor(relatedProduct.rating) 
                            ? 'text-yellow-400 fill-current' 
                            : 'text-gray-300'
                        }`} 
                      />
                    ))}
                    <span className="text-sm text-gray-600 ml-2">({relatedProduct.rating})</span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <span className="text-xl font-bold text-red-600">
                      {relatedProduct.price.toLocaleString('vi-VN')}₫
                    </span>
                    <span className="text-sm text-gray-500 line-through">
                      {relatedProduct.originalPrice.toLocaleString('vi-VN')}₫
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9zI44ttkLoJcF6xUWWbhuDOqvblLLdWW-Lw&s"
                  alt="SAO KHUE FOODS"
                  width={40}
                  height={40}
                  className="rounded-lg"
                />
                <h4 className="text-xl font-bold">SAO KHUE FOODS</h4>
              </div>
              <p className="text-gray-400">
                {isVietnamese 
                  ? 'Thương hiệu thực phẩm uy tín, mang đến hương vị truyền thống Việt Nam.'
                  : 'Trusted food brand bringing traditional Vietnamese flavors.'
                }
              </p>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4">
                {isVietnamese ? 'Sản phẩm' : 'Products'}
              </h5>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/category/rice-crackers" className="hover:text-white transition-colors">
                  {isVietnamese ? 'Bánh tráng' : 'Rice Crackers'}
                </Link></li>
                <li><Link href="/category/noodles" className="hover:text-white transition-colors">
                  {isVietnamese ? 'Mì gói' : 'Instant Noodles'}
                </Link></li>
                <li><Link href="/category/spices" className="hover:text-white transition-colors">
                  {isVietnamese ? 'Gia vị' : 'Spices'}
                </Link></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4">
                {isVietnamese ? 'Hỗ trợ' : 'Support'}
              </h5>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/contact" className="hover:text-white transition-colors">
                  {isVietnamese ? 'Liên hệ' : 'Contact'}
                </Link></li>
                <li><Link href="/shipping" className="hover:text-white transition-colors">
                  {isVietnamese ? 'Vận chuyển' : 'Shipping'}
                </Link></li>
                <li><Link href="/returns" className="hover:text-white transition-colors">
                  {isVietnamese ? 'Đổi trả' : 'Returns'}
                </Link></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4">
                {isVietnamese ? 'Kết nối' : 'Connect'}
              </h5>
              <p className="text-gray-400 mb-2">
                {isVietnamese ? 'Theo dõi chúng tôi để cập nhật những sản phẩm mới nhất' : 'Follow us for the latest product updates'}
              </p>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 SAO KHUE FOODS JSC. {isVietnamese ? 'Tất cả quyền được bảo lưu.' : 'All rights reserved.'}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}