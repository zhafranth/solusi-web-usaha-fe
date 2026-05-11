import { api } from "../lib/api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

/**
 * Submit pesan kontak dari pengunjung publik.
 * @param {Object} data
 * @param {string} data.name
 * @param {string} data.email
 * @param {string} data.subject
 * @param {string} data.message
 * @returns {Promise<Object>} - { success, message, data }
 */
export const submitContact = async (data) => {
  try {
    const response = await api.post("/api/contact", data);
    return response.data;
  } catch (error) {
    console.error("Error submitting contact:", error);
    if (error.response) {
      throw new Error(error.response.data?.message || "Gagal mengirim pesan");
    }
    if (error.request) {
      throw new Error("Tidak dapat terhubung ke server. Periksa koneksi internet Anda.");
    }
    throw error;
  }
};

/**
 * Mengambil daftar pesan kontak (admin).
 * @param {Object} [params]
 * @param {number} [params.page=1]
 * @param {number} [params.limit=10]
 * @param {boolean} [params.isRead] - filter status dibaca; undefined = semua
 * @returns {Promise<Object>} - { success, data: { messages, pagination } }
 */
export const getMessages = async (params = {}) => {
  try {
    const queryParams = new URLSearchParams();
    queryParams.append("page", params.page || 1);
    queryParams.append("limit", params.limit || 10);
    if (typeof params.isRead === "boolean") {
      queryParams.append("isRead", params.isRead ? "true" : "false");
    }

    const response = await api.get(`/api/contact?${queryParams.toString()}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching messages:", error);
    if (error.response) {
      throw new Error(error.response.data?.message || "Gagal mengambil pesan kontak");
    }
    if (error.request) {
      throw new Error("Tidak dapat terhubung ke server");
    }
    throw error;
  }
};

/**
 * Memperbarui status read pesan (admin).
 * @param {number|string} id
 * @param {boolean} isRead
 */
export const markMessageRead = async (id, isRead) => {
  try {
    const response = await api.patch(`/api/contact/${id}/read`, { isRead });
    return response.data;
  } catch (error) {
    console.error("Error updating message read status:", error);
    if (error.response) {
      throw new Error(error.response.data?.message || "Gagal memperbarui status pesan");
    }
    throw new Error("Tidak dapat terhubung ke server");
  }
};

/**
 * Menghapus pesan (admin).
 * @param {number|string} id
 */
export const deleteMessage = async (id) => {
  try {
    const response = await api.delete(`/api/contact/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting message:", error);
    if (error.response) {
      throw new Error(error.response.data?.message || "Gagal menghapus pesan");
    }
    throw new Error("Tidak dapat terhubung ke server");
  }
};

/**
 * Hook React Query: list pesan kontak (paginated, optional isRead filter).
 * @param {Object} [filters]
 * @param {Object} [options] - { enabled }
 */
export const useMessages = (filters = {}, options = {}) => {
  return useQuery({
    queryKey: ["contact-messages", filters],
    queryFn: () => getMessages(filters),
    staleTime: 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    enabled: options.enabled !== undefined ? options.enabled : true,
  });
};

/**
 * Hook React Query: mutate read status, lalu invalidate list.
 */
export const useMarkRead = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, isRead }) => markMessageRead(id, isRead),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["contact-messages"] }),
  });
};

/**
 * Hook React Query: delete pesan, lalu invalidate list.
 */
export const useDeleteMessage = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id) => deleteMessage(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["contact-messages"] }),
  });
};
