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
 * Mengambil detail kategori berdasarkan ID
 * @param {number|string} id - ID kategori
 * @returns {Promise<Object>} - Data kategori
 */
export const getCategoryById = async (id) => {
  try {
    const response = await api.get(`/api/category/${id}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching category:", error);
    if (error.response) {
      throw new Error(error.response.data?.message || "Gagal mengambil data kategori");
    }
    throw new Error("Tidak dapat terhubung ke server");
  }
};

/**
 * Membuat kategori baru (admin only)
 * @param {Object} data - Data kategori
 * @param {string} data.name - Nama kategori
 * @returns {Promise<Object>} - Response dari server
 */
export const createCategory = async (data) => {
  try {
    const response = await api.post("/api/category", data);
    return response.data;
  } catch (error) {
    console.error("Error creating category:", error);
    if (error.response) {
      throw new Error(error.response.data?.message || "Gagal membuat kategori");
    }
    throw new Error("Tidak dapat terhubung ke server");
  }
};

/**
 * Memperbarui kategori berdasarkan ID (admin only)
 * @param {number|string} id - ID kategori
 * @param {Object} data - Data kategori yang diperbarui
 * @param {string} data.name - Nama kategori baru
 * @returns {Promise<Object>} - Response dari server
 */
export const updateCategory = async (id, data) => {
  try {
    const response = await api.put(`/api/category/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating category:", error);
    if (error.response) {
      throw new Error(error.response.data?.message || "Gagal memperbarui kategori");
    }
    throw new Error("Tidak dapat terhubung ke server");
  }
};

/**
 * Menghapus kategori berdasarkan ID (admin only)
 * @param {number|string} id - ID kategori
 * @returns {Promise<Object>} - Response dari server
 */
export const deleteCategory = async (id) => {
  try {
    const response = await api.delete(`/api/category/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting category:", error);
    if (error.response) {
      throw new Error(error.response.data?.message || "Gagal menghapus kategori");
    }
    throw new Error("Tidak dapat terhubung ke server");
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
