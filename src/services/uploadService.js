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
