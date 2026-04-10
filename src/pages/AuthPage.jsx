import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "../components/ui/button";
import { Eye, EyeOff, Lock, Mail, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useLogin } from "../services/authService";
import { useAuth } from "../hooks/useAuth";

const schema = yup.object().shape({
  email: yup
    .string()
    .required("Email wajib diisi")
    .email("Format email tidak valid"),
  password: yup
    .string()
    .required("Password wajib diisi")
    .min(6, "Password minimal 6 karakter"),
});

const AuthPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const loginMutation = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { email: "", password: "" },
    mode: "onChange",
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = (data) => {
    setError("root", null);
    loginMutation.mutate(data, {
      onSuccess: (response) => {
        console.log("Login successful:", response);
        navigate("/dashboard");
      },
      onError: (error) => {
        let errorMessage = "Login gagal. Silakan coba lagi.";
        if (error?.response?.data) {
          const { message, error: errorType, details } = error.response.data;
          if (message) errorMessage = message;
          else if (details) errorMessage = details;
          else if (errorType) errorMessage = errorType;
        } else if (error?.message) {
          if (error.message.includes("Network Error")) {
            errorMessage = "Tidak dapat terhubung ke server.";
          } else if (error.message.includes("timeout")) {
            errorMessage = "Koneksi timeout. Silakan coba lagi.";
          } else {
            errorMessage = error.message;
          }
        }
        setError("root", { type: "manual", message: errorMessage });
      },
    });
  };

  const inputClasses = (hasError) =>
    `w-full pl-11 pr-4 py-3.5 border rounded-xl focus:ring-2 focus:ring-primary-blue/20 focus:border-primary-blue font-body text-sm transition-all outline-none ${
      hasError ? "border-red-400 bg-red-50/50" : "border-gray-200 bg-gray-50 focus:bg-white"
    }`;

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-blue/15 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary-green/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(rgba(255,255,255,0.5) 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }}
        />
      </div>

      <div className="relative w-full max-w-md z-10">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-sm"
          >
            <ArrowLeft size={16} />
            Kembali ke Beranda
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="bg-white rounded-3xl p-8 lg:p-10 shadow-2xl border border-gray-100"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary-blue to-primary-green flex items-center justify-center shadow-lg shadow-primary-blue/20">
              <span className="text-white font-heading font-bold text-lg">SW</span>
            </div>
            <h1 className="text-2xl font-heading font-bold text-gray-900 mb-1">
              Masuk ke Dashboard
            </h1>
            <p className="text-gray-500 text-sm">
              Kelola website dan konten Anda dengan mudah
            </p>
          </div>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              handleSubmit(onSubmit)();
            }}
            className="space-y-5"
          >
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-600 uppercase tracking-wider">
                Email Address
              </label>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <div>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        {...field}
                        type="email"
                        className={inputClasses(errors.email)}
                        placeholder="admin@solusiweb.com"
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-1.5 text-xs text-red-500">{errors.email.message}</p>
                    )}
                  </div>
                )}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-600 uppercase tracking-wider">
                Password
              </label>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <div>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        {...field}
                        type={showPassword ? "text" : "password"}
                        className={`${inputClasses(errors.password)} !pr-12`}
                        placeholder="Masukkan password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="mt-1.5 text-xs text-red-500">{errors.password.message}</p>
                    )}
                  </div>
                )}
              />
            </div>

            {errors.root && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-red-50 border border-red-100 rounded-xl"
              >
                <p className="text-sm text-red-600 font-medium">{errors.root.message}</p>
              </motion.div>
            )}

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-primary-blue rounded border-gray-300 focus:ring-primary-blue/20"
                />
                <span className="text-sm text-gray-600">Ingat saya</span>
              </label>
              <button
                type="button"
                className="text-sm text-primary-blue hover:text-primary-blue/80 font-medium transition-colors"
              >
                Lupa password?
              </button>
            </div>

            <Button
              type="submit"
              disabled={loginMutation.isPending}
              className="w-full bg-primary-blue hover:bg-primary-blue/90 text-white py-3.5 rounded-xl font-medium shadow-md shadow-primary-blue/20 transition-all disabled:opacity-50"
            >
              {loginMutation.isPending ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Memproses...
                </div>
              ) : (
                "Masuk ke Dashboard"
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Belum punya akses?{" "}
              <Link
                to="/#contact"
                className="text-primary-blue hover:text-primary-blue/80 font-medium transition-colors"
              >
                Hubungi Admin
              </Link>
            </p>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 text-center text-gray-600 text-xs"
        >
          &copy; {new Date().getFullYear()} Solusi Web Usaha. Semua hak dilindungi.
        </motion.p>
      </div>
    </div>
  );
};

export default AuthPage;
