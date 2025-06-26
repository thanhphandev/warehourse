import { axiosInstance } from '@/lib/axiosInstance';
import { IBrand } from '@/models/brand';
import { ICategory } from '@/models/category';
import { IManufacturer } from '@/models/manufacturer';
import { IProduct } from '@/models/product';
import { useQuery } from '@tanstack/react-query';


interface ApiResponse<T> {
  success: boolean;
  code: string;
  message: string;
  status: number;
  data: T;
  pagination?: {
    page: number;
    limit: number;
    total: number;
  };
}

// --- API functions ---
const fetchProducts = async (params?: {
  status?: string;
  brand_id?: string;
  category_id?: string;
  search?: string;
  page?: number;
  limit?: number;
}): Promise<ApiResponse<IProduct[]>> => {
  const response = await axiosInstance.get('/api/products', { params });
  return response.data;
};

const fetchProduct = async (id: string): Promise<ApiResponse<IProduct>> => {
  const response = await axiosInstance.get(`/api/products/${id}`);
  return response.data;
};

// utils/fetchers.ts

export const fetchCategories = async (): Promise<ApiResponse<ICategory[]>> => {
  const res = await fetch(`http://localhost:3000/api/category`, {
    // 🕒 ISR: Cache + revalidate mỗi 60s
    next: { revalidate: 60 },
  });

  if (!res.ok) throw new Error('Failed to fetch categories');
  return res.json();
};

export const fetchManufacturers = async (): Promise<ApiResponse<IManufacturer[]>> => {
  const res = await fetch(`http://localhost:3000/api/manufacturer`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    throw new Error('Failed to fetch manufacturers');
  }
  return res.json();
}

export const fetchBrands = async (): Promise<ApiResponse<IBrand[]>> => {
  const res = await fetch(`http://localhost:3000/api/brand`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) throw new Error('Failed to fetch brands');
  return res.json();
};

export const fetchProductBySlug = async (slug: string): Promise<ApiResponse<IProduct>> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/products/slug/${slug}`, {
    // 🕒 ISR: Cache + revalidate mỗi 60s
    next: { revalidate: 60 },
  });

  if (!res.ok) throw new Error('Failed to fetch product');
  return res.json();
};


// --- React Query hooks ---
export const useProducts = (params?: {
  status?: string;
  brand_id?: string;
  category_id?: string;
  search?: string;
  page?: number;
  limit?: number;
}) => {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => fetchProducts(params),
    staleTime: 5 * 60 * 1000,
  });
};

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProduct(id),
    enabled: !!id,
  });
};


export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    staleTime: 10 * 60 * 1000,
  });
};

export const useBrands = () => {
  return useQuery({
    queryKey: ['brands'],
    queryFn: fetchBrands,
    staleTime: 10 * 60 * 1000,
  });
};

export const useProductBySlug = (slug: string) => {
  return useQuery({
    queryKey: ['product-by-slug', slug],
    queryFn: () => fetchProductBySlug(slug),
    enabled: !!slug,
  });
};
