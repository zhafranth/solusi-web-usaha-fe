import { api } from "../lib/api";
import { useQuery } from "@tanstack/react-query";

/**
 * Mengambil semua kategori dari server
 * @returns {Promise<Array>} - Array kategori
 */
export const getCategories = async () => {
  try {
    const response = await api.get("/api/category");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw new Error("Gagal mengambil data kategori");
  }
};

/**
 * Custom hook untuk mengambil kategori menggunakan React Query
 * @returns {Object} - Query result dengan data, loading, error states
 */
export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    staleTime: 5 * 60 * 1000, // 5 menit
    cacheTime: 10 * 60 * 1000, // 10 menit
    retry: 2,
    refetchOnWindowFocus: false,
  });
};
