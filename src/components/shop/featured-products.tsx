import { formatCurrencyVND, translateUnitTime } from '@/lib/utils'
import { IProduct } from '@/models/product'
import { Eye, Heart, ShoppingCart, Star } from 'lucide-react'
import { useTranslations } from 'next-intl'
import React from 'react'

interface FeaturedProductsProps {
    products: IProduct[]
}
const FeaturedProducts = ({ products }: FeaturedProductsProps) => {
    const t = useTranslations("HomePage")
    const tp = useTranslations("Product")
    const tunit = useTranslations("TimeUnits")
    const latestProducts = products
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .slice(0, 6);
    return (
        <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h3 className="text-4xl font-bold text-gray-900 mb-4">
                        {t("featuredProducts.subtitle")}
                    </h3>
                    <p className="text-xl text-gray-600">
                        {t('featuredProducts.subtitle')}
                    </p>
                </div>

                <div className="grid gap-10 md:grid-cols-2">
                    {latestProducts.map((product, idx) => (
                        <div
                            key={idx}
                            className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-4xl mx-auto"
                        >
                            <div className="grid md:grid-cols-2 gap-0">
                                {/* Product Image */}
                                <div className="relative h-80 md:h-full bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center">
                                    <img
                                        src={product.image}
                                        alt={product.product_name as string}
                                        width={300}
                                        height={300}
                                        className="object-contain transform hover:scale-105 transition-transform duration-300"
                                    />

                                    {/* Badges */}
                                    <div className="absolute top-4 left-4 flex flex-col space-y-2">
                                        {product.categories.map((cat, index) => (
                                            <span key={index} className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                                {cat.name as string}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Wishlist */}
                                    <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg hover:bg-red-50 hover:text-red-600 transition-colors">
                                        <Heart className="w-5 h-5" />
                                    </button>
                                </div>

                                {/* Product Content */}
                                <div className="p-8">
                                    <div className="mb-4">
                                        <p className="text-sm text-red-600 font-semibold mb-1">{product.brand_id.name}</p>
                                        <h4 className="text-2xl font-bold text-gray-900 mb-2">
                                            {product.product_name as string}
                                        </h4>

                                        {/* Rating */}
                                        {/* <div className="flex items-center space-x-2 mb-4">
                                            <div className="flex space-x-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                                            }`}
                                                    />
                                                ))}
                                            </div>
                                            <span className="text-sm text-gray-600">
                                                ({product.reviews} {isVietnamese ? 'đánh giá' : 'reviews'})
                                            </span>
                                        </div> */}
                                    </div>

                                    {/* Price */}
                                    <div className="flex items-center space-x-3 mb-6">
                                        <span className="text-3xl font-bold text-red-600">
                                            {product.price === 0 ? tp("contact") : formatCurrencyVND(product.price)}
                                        </span>
                                        {/* <span className="text-lg text-gray-500 line-through">
                                            {product.originalPrice.toLocaleString('vi-VN')}₫
                                        </span>
                                        <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-semibold">
                                            -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                                        </span> */}
                                    </div>

                                    {/* Info */}
                                    <div className="space-y-2 mb-6 text-sm text-gray-600">
                                        <p>
                                            <strong>{tp("netWeight")}</strong>{' '}
                                            {product.net_weight.value}
                                            {product.net_weight.unit}
                                        </p>
                                        <p>
                                            <strong>{tp("shieldLife")}</strong>{' '}
                                            {product.shelf_life.value} {' '}
                                            {translateUnitTime(product.shelf_life.unit, tunit as (key: string) => string)}
                                        </p>
                                    </div>

                                    {/* Description */}
                                    {product?.description && <p className="text-gray-700 mb-6 line-clamp-3">
                                        {(product.description as string).split('\n\n')[0]}
                                    </p>}

                                    {/* Actions */}
                                    <div className="flex space-x-3">
                                        <button className="flex-1 bg-red-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-red-700 transition-colors flex items-center justify-center space-x-2">
                                            <ShoppingCart className="w-5 h-5" />
                                            <span>{tp("addToCart")}</span>
                                        </button>
                                        <button className="p-3 border-2 border-red-600 text-red-600 rounded-xl hover:bg-red-50 transition-colors">
                                            <Eye className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

    )
}

export default FeaturedProducts