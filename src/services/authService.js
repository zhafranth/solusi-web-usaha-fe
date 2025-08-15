import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../lib/api";
import { useAuth } from "../hooks/useAuth";

// Login API call
export const loginUser = async (credentials) => {
  const response = await api.post("/api/auth/login", credentials);
  return response.data;
};

// Logout API call
export const logoutUser = async () => {
  const response = await api.post("/auth/logout");
  return response.data;
};

// Custom hook for login mutation
export const useLogin = () => {
  const { login } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      // Assuming the API returns { token, user } or similar structure
      const { token, user, ...userData } = data;
      login(user || userData, token);

      // Invalidate and refetch any user-related queries
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });
};

// Custom hook for logout mutation
export const useLogout = () => {
  const { logout } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      logout();

      // Clear all cached queries
      queryClient.clear();
    },
    onError: (error) => {
      console.error("Logout failed:", error);
      // Even if logout fails on server, clear local state
      logout();
      queryClient.clear();
    },
  });
};
