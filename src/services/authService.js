import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../lib/api";
import { useAuth } from "../hooks/useAuth";

// Register API call
export const registerUser = async (data) => {
  const response = await api.post("/api/auth/register", data);
  return response.data;
};

// Login API call
export const loginUser = async (credentials) => {
  const response = await api.post("/api/auth/login", credentials);
  return response.data;
};

// Custom hook for login mutation
export const useLogin = () => {
  const { login } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (response) => {
      const { token, user } = response.data;
      login(user, token);

      // Invalidate and refetch any user-related queries
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });
};

// Custom hook for logout — JWT auth means logout is client-side only
export const useLogout = () => {
  const { logout } = useAuth();
  const queryClient = useQueryClient();

  const handleLogout = () => {
    logout();
    queryClient.clear();
  };

  return { logout: handleLogout };
};
