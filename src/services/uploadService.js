import { api } from "../lib/api";

/**
 * Upload gambar ke server
 * @param {File} file - File gambar yang akan diupload
 * @param {string} type - Tipe upload: 'featured' atau 'content'
 * @returns {Promise<{url: string}>} - URL gambar yang berhasil diupload
 */
export const uploadImage = async (file, type = "content") => {
  // Validasi file
  if (!file) {
    throw new Error("File tidak boleh kosong");
  }

  // Validasi tipe file
  const allowedTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/webp",
  ];
  if (!allowedTypes.includes(file.type)) {
    throw new Error(
      "Format file tidak didukung. Gunakan JPEG, PNG, GIF, atau WebP"
    );
  }

  // Validasi ukuran file (maksimal 5MB)
  const maxSize = 5 * 1024 * 1024; // 5MB dalam bytes
  if (file.size > maxSize) {
    throw new Error("Ukuran file terlalu besar. Maksimal 5MB");
  }

  // Validasi tipe upload
  if (!["featured", "content"].includes(type)) {
    throw new Error('Tipe upload harus "featured" atau "content"');
  }

  try {
    // Buat FormData untuk upload
    const formData = new FormData();
    formData.append("image", file);
    formData.append("type", type);

    // Upload ke server
    const response = await api.post("/api/upload/image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("response:", response);

    // Return URL gambar
    return {
      url: response.data?.data?.url,
      filename: response.data?.data?.filename || file.name,
      size: response.data?.data?.size,
      type: file.type,
    };
  } catch (error) {
    // Handle error response
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Gagal mengupload gambar. Silakan coba lagi.");
  }
};

/**
 * Upload gambar untuk featured image
 * @param {File} file - File gambar yang akan diupload
 * @returns {Promise<{url: string}>} - URL gambar yang berhasil diupload
 */
export const uploadFeaturedImage = async (file) => {
  return uploadImage(file, "featured");
};

/**
 * Upload gambar untuk content
 * @param {File} file - File gambar yang akan diupload
 * @returns {Promise<{url: string}>} - URL gambar yang berhasil diupload
 */
export const uploadContentImage = async (file) => {
  return uploadImage(file, "content");
};

/**
 * Upload multiple gambar sekaligus (maks 5 file)
 * @param {File[]} files - Array file gambar
 * @returns {Promise<Object>} - Response dengan array data gambar yang diupload
 */
export const uploadImages = async (files) => {
  if (!files || files.length === 0) {
    throw new Error("Tidak ada file yang dipilih");
  }

  if (files.length > 5) {
    throw new Error("Maksimal 5 file per upload");
  }

  try {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("images", file);
    });

    const response = await api.post("/api/upload/images", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Gagal mengupload gambar. Silakan coba lagi.");
  }
};

/**
 * Menghapus gambar dari server
 * @param {string} filename - Nama file yang akan dihapus
 * @param {string} [type='content'] - Tipe gambar: 'featured' atau 'content'
 * @returns {Promise<Object>} - Response dari server
 */
export const deleteImage = async (filename, type = "content") => {
  try {
    const response = await api.delete(`/api/upload/image/${filename}`, {
      params: { type },
    });
    return response.data;
  } catch (error) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Gagal menghapus gambar");
  }
};

/**
 * Mengambil daftar gambar yang sudah diupload
 * @param {Object} params - Parameter query
 * @param {string} [params.type] - Filter tipe gambar ('featured' atau 'content')
 * @param {number} [params.page=1] - Halaman
 * @param {number} [params.limit=20] - Jumlah per halaman
 * @returns {Promise<Object>} - Response dengan daftar gambar
 */
export const listImages = async (params = {}) => {
  try {
    const response = await api.get("/api/upload/images", { params });
    return response.data;
  } catch (error) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Gagal mengambil daftar gambar");
  }
};
