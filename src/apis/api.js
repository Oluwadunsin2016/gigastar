// src/api/index.js
import { useQuery, useMutation } from "@tanstack/react-query";
import http from "./http";

// Registration
export const useSignupMutation = () => {
  return useMutation({
    mutationFn: (payload) => http.post("/auth/register", payload),
  });
};

export const useResendOtpMutation = () => {
  return useMutation({
    mutationFn: async (payload) => {
      return http.post("/auth/resend-otp", payload);
    }
  });
};

// Email Verification
export const useVerifyEmailMutation = () => {
  return useMutation({
    mutationFn: (payload) => http.post("/auth/verify-email", payload),
    onSuccess: (data) => {
      localStorage.setItem("gigastarToken", data.token);
    }
  });
};

// Login
export const useLoginMutation = () => {
  return useMutation({
    mutationFn: (payload) => http.post("/auth/login", payload),
    onSuccess: (data) => {
      localStorage.setItem("gigastarToken", data.token);
    }
  });
};

// Profile
export const useGetProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const res = await http.get("/auth/profile");
      return res.data.user;
    },
    enabled: !!localStorage.getItem("gigastarToken"),
    staleTime: 5 * 60 * 1000,
  });
};