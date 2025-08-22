import { api } from "../lib/api";
import { useQuery } from "@tanstack/react-query";

/**
 * Membuat blog post baru
 * @param {Object} blogData - Data blog yang akan dibuat
 * @param {string} blogData.title - Judul post (wajib)
 * @param {string} blogData.excerpt - Ringkasan/excerpt (wajib)
 * @param {string} blogData.content - Konten blog (wajib)
 * @param {number} blogData.categoryId - ID kategori (wajib, integer positif)
 * @param {string} [blogData.featuredImage] - URL gambar utama (opsional)
 * @param {string[]} [blogData.tags] - Array tag (opsional)
 * @param {string} [blogData.status='DRAFT'] - Status publikasi (opsional, default: 'DRAFT')
 * @returns {Promise<Object>} - Response dari server
 */
export const createBlog = async (blogData) => {
  try {
    // Validasi field wajib
    if (
      !blogData.title ||
      !blogData.excerpt ||
      !blogData.content ||
      !blogData.categoryId
    ) {
      throw new Error(
        "Field title, excerpt, content, dan categoryId wajib diisi"
      );
    }

    // Validasi categoryId harus berupa integer positif
    if (!Number.isInteger(blogData.categoryId) || blogData.categoryId <= 0) {
      throw new Error("categoryId harus berupa integer positif");
    }

    // Prepare payload sesuai dengan schema
    const payload = {
      title: blogData.title.trim(),
      excerpt: blogData.excerpt.trim(),
      content: blogData.content.trim(),
      categoryId: blogData.categoryId,
      ...(blogData.featuredImage && { featuredImage: blogData.featuredImage }),
      ...(blogData.tags &&
        Array.isArray(blogData.tags) &&
        blogData.tags.length > 0 && { tags: blogData.tags }),
      status: blogData.status || "DRAFT",
    };

    const response = await api.post("/api/blog", payload);
    return response.data;
  } catch (error) {
    console.error("Error creating blog:", error);

    // Handle different types of errors
    if (error.response) {
      // Server responded with error status
      const errorMessage =
        error.response.data?.message || "Gagal membuat blog post";
      throw new Error(errorMessage);
    } else if (error.request) {
      // Network error
      throw new Error(
        "Tidak dapat terhubung ke server. Periksa koneksi internet Anda."
      );
    } else {
      // Other errors (validation, etc.)
      throw error;
    }
  }
};

/**
 * Mengambil detail blog berdasarkan ID
 * @param {number|string} id - ID blog yang akan diambil
 * @returns {Promise<Object>} - Response dari server
 */
export const getBlogById = async (id) => {
  try {
    if (!id) {
      throw new Error('ID blog wajib diisi')
    }

    const response = await api.get(`/api/blog/${id}`)
    return response.data
  } catch (error) {
    console.error('Error fetching blog:', error)
    
    // Handle different types of errors
    if (error.response) {
      // Server responded with error status
      const errorMessage = error.response.data?.message || 'Gagal mengambil blog post'
      throw new Error(errorMessage)
    } else if (error.request) {
      // Network error
      throw new Error('Tidak dapat terhubung ke server')
    } else {
      // Other error
      throw error
    }
  }
}

/**
 * Memperbarui blog post berdasarkan ID
 * @param {number|string} id - ID blog yang akan diperbarui
 * @param {Object} blogData - Data blog yang akan diperbarui
 * @param {string} blogData.title - Judul post (wajib)
 * @param {string} blogData.excerpt - Ringkasan/excerpt (wajib)
 * @param {string} blogData.content - Konten blog (wajib)
 * @param {number} blogData.categoryId - ID kategori (wajib, integer positif)
 * @param {string} [blogData.featuredImage] - URL gambar utama (opsional)
 * @param {string[]} [blogData.tags] - Array tag (opsional)
 * @param {string} [blogData.status] - Status publikasi (opsional)
 * @returns {Promise<Object>} - Response dari server
 */
export const updateBlog = async (id, blogData) => {
  try {
    if (!id) {
      throw new Error('ID blog wajib diisi')
    }

    // Validasi field wajib
    if (!blogData.title || !blogData.excerpt || !blogData.content || !blogData.categoryId) {
      throw new Error('Field title, excerpt, content, dan categoryId wajib diisi')
    }

    // Validasi categoryId harus berupa integer positif
    if (!Number.isInteger(blogData.categoryId) || blogData.categoryId <= 0) {
      throw new Error('categoryId harus berupa integer positif')
    }

    // Prepare payload sesuai dengan schema
    const payload = {
      title: blogData.title.trim(),
      excerpt: blogData.excerpt.trim(),
      content: blogData.content.trim(),
      categoryId: blogData.categoryId,
      ...(blogData.featuredImage && { featuredImage: blogData.featuredImage }),
      ...(blogData.tags && Array.isArray(blogData.tags) && blogData.tags.length > 0 && { tags: blogData.tags }),
      ...(blogData.status && { status: blogData.status })
    }

    const response = await api.put(`/api/blog/${id}`, payload)
    return response.data
  } catch (error) {
    console.error('Error updating blog:', error)
    
    // Handle different types of errors
    if (error.response) {
      // Server responded with error status
      const errorMessage = error.response.data?.message || 'Gagal memperbarui blog post'
      throw new Error(errorMessage)
    } else if (error.request) {
      // Network error
      throw new Error('Tidak dapat terhubung ke server')
    } else {
      // Other error
      throw error
    }
  }
}

/**
 * Mengambil list blog posts dari server
 * @param {Object} params - Parameter query
 * @param {number} [params.page=1] - Halaman yang diminta
 * @param {number} [params.limit=10] - Jumlah item per halaman
 * @param {string} [params.search] - Query pencarian
 * @param {string} [params.status] - Filter status (DRAFT, PUBLISHED)
 * @param {number} [params.categoryId] - Filter berdasarkan kategori
 * @returns {Promise<Object>} - Response dengan data blogs dan pagination
 */
export const getBlogs = async (params = {}) => {
  try {
    const queryParams = new URLSearchParams();

    // Set default values
    queryParams.append("page", params.page || 1);
    queryParams.append("limit", params.limit || 10);

    // Add optional parameters
    if (params.search) queryParams.append("search", params.search);
    if (params.status) queryParams.append("status", params.status);
    if (params.categoryId) queryParams.append("categoryId", params.categoryId);

    const response = await api.get(`/api/blog?${queryParams.toString()}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching blogs:", error);

    if (error.response) {
      const errorMessage =
        error.response.data?.message || "Gagal mengambil data blog";
      throw new Error(errorMessage);
    } else if (error.request) {
      throw new Error(
        "Tidak dapat terhubung ke server. Periksa koneksi internet Anda."
      );
    } else {
      throw error;
    }
  }
};

/**
 * Custom hook untuk mengambil list blog menggunakan React Query
 * @param {Object} params - Parameter query
 * @returns {Object} - Query result dengan data, loading, error states
 */
export const useBlogs = (params = {}) => {
  return useQuery({
    queryKey: ["blogs", params],
    queryFn: () => getBlogs(params),
    staleTime: 2 * 60 * 1000, // 2 menit
    cacheTime: 5 * 60 * 1000, // 5 menit
    retry: 2,
    refetchOnWindowFocus: false,
  });
};

/**
 * Membuat blog post dengan status DRAFT
 * @param {Object} blogData - Data blog
 * @returns {Promise<Object>} - Response dari server
 */
export const saveDraft = async (blogData) => {
  return createBlog({ ...blogData, status: "DRAFT" });
};

/**
 * Membuat blog post dengan status PUBLISHED
 * @param {Object} blogData - Data blog
 * @returns {Promise<Object>} - Response dari server
 */
export const publishBlog = async (blogData) => {
  return createBlog({ ...blogData, status: "PUBLISHED" });
};

/**
 * Menghapus blog post berdasarkan ID
 * @param {number|string} id - ID blog yang akan dihapus
 * @returns {Promise<Object>} - Response dari server
 */
export const deleteBlog = async (id) => {
  try {
    if (!id) {
      throw new Error("ID blog wajib diisi");
    }

    const response = await api.delete(`/api/blog/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting blog:", error);

    // Handle different types of errors
    if (error.response) {
      // Server responded with error status
      const errorMessage =
        error.response.data?.message || "Gagal menghapus blog post";
      throw new Error(errorMessage);
    } else if (error.request) {
      // Network error
      throw new Error("Tidak dapat terhubung ke server");
    } else {
      // Other error
      throw error;
    }
  }
};
