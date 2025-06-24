import { axiosInstance } from '@/lib/axiosInstance';
import { IBrand } from '@/models/brand';
import { ICategory } from '@/models/category';
import { IProduct } from '@/models/product2';
import { IProductVariant } from '@/models/product_variant';
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

const fetchProductVariants = async (productId: string): Promise<ApiResponse<IProductVariant[]>> => {
  const response = await axiosInstance.get(`/api/products/${productId}/variants`);
  return response.data;
};

export const fetchCategories = async (): Promise<ApiResponse<ICategory[]>> => {
  const response = await axiosInstance.get('/api/category');
  return response.data;
};

const fetchBrands = async (): Promise<ApiResponse<IBrand[]>> => {
  const response = await axiosInstance.get('/api/brand');
  return response.data;
};

const fetchProductBySlug = async (slug: string): Promise<ApiResponse<IProduct>> => {
  const response = await axiosInstance.get(`/api/products/slug/${slug}`);
  return response.data;
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

export const useProductVariants = (productId: string) => {
  return useQuery({
    queryKey: ['product-variants', productId],
    queryFn: () => fetchProductVariants(productId),
    enabled: !!productId,
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
