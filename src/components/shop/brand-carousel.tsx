'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Link from 'next/link';
import { IBrand } from '@/models/brand';
import { useTranslations } from 'next-intl';

interface BrandCarouselProps {
    brands: IBrand[];
}

export default function BrandCarousel({ brands }: BrandCarouselProps) {
    const t = useTranslations("BrandCarousel");
    return (
        <section className="py-16 px-4 max-w-7xl mx-auto">
            <div className="text-center mb-4">
                <h3 className="text-4xl font-bold text-gray-900 mb-4">
                    {t("title")}
                </h3>
                <p className="text-xl text-gray-600">
                    {t("subtitle")}
                </p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 w-full overflow-hidden">
                <Swiper
                    spaceBetween={24}
                    slidesPerView={1.2}
                    breakpoints={{
                        640: { slidesPerView: 2 },
                        768: { slidesPerView: 3 },
                        1024: { slidesPerView: 4 },
                    }}
                    grabCursor={true}
                >
                    {brands.map((brand, index) => (
                        <SwiperSlide key={index}>
                            <Link href={`/brand/${brand.slug}`} className="group block h-full">
                                <Card className="transition-shadow hover:shadow-xl h-full">
                                    <CardContent className="flex flex-col items-center text-center p-6 space-y-4">
                                        <img
                                            src={brand.logo || '/placeholder.png'}
                                            alt={brand.name}
                                            width={100}
                                            height={100}
                                            className="rounded-lg group-hover:scale-105 transition-transform duration-300"
                                        />
                                        <div>
                                            <h4 className="text-lg font-semibold text-gray-900 group-hover:text-red-600 transition-colors">
                                                {brand.name}
                                            </h4>
                                            <p className="text-sm text-gray-600">
                                                {brand.description}
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

        </section>
    );
}
