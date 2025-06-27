import { ICategory } from '@/models/category';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import React from 'react';

interface CategorySectionProps {
    categories: ICategory[];
}

const CategoriesSection = ({ categories }: CategorySectionProps) => {
    const t = useTranslations('HomePage');
    const tp = useTranslations('Product');

    return (
        <section className="py-16 px-4 max-w-7xl mx-auto">
            <div className="text-center mb-12">
                <h3 className="text-4xl font-bold text-gray-900 mb-4">
                    {t('categoriesSection.subtitle')}
                </h3>
                <p className="text-xl text-gray-600">
                    {t('categoriesSection.description')}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {categories.map((category, idx) => (
                    <Link
                        key={idx}
                        href={`/category/${category.slug}`}
                        className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden hover:-translate-y-2"
                    >
                        <div className="relative h-48 overflow-hidden">
                            <img
                                src={category.image || 'https://huongvique.vn/wp-content/uploads/2022/07/banh-phong-mi-sua-trang-9-600x476.jpg'}
                                alt={category.name as string}
                                loading="lazy"
                                className="w-full h-full "
                            />

                            <span className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full text-sm font-semibold text-gray-700">
                                {category.products} {tp('products')}
                            </span>
                        </div>

                        <div className="p-6">
                            <h4 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                                {category.name as string}
                            </h4>
                            <p className="text-gray-600 text-sm line-clamp-2">
                                {category.description as string}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default CategoriesSection;
