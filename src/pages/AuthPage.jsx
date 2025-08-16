import { useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Eye, EyeOff, Lock, Mail, Shield } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useLogin } from '../services/authService'
import { useAuth } from '../hooks/useAuth'

// Validation schema
const schema = yup.object().shape({
  email: yup
    .string()
    .required('Email wajib diisi')
    .email('Format email tidak valid'),
  password: yup
    .string()
    .required('Password wajib diisi')
    .min(6, 'Password minimal 6 karakter'),
})

const AuthPage = () => {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const loginMutation = useLogin()
  const [showPassword, setShowPassword] = useState(false)
  
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: ''
    },
    mode: 'onChange',
  })

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true })
    }
  }, [isAuthenticated, navigate])

  const onSubmit = async (data) => {
    loginMutation.mutate(data, {
      onSuccess: () => {
        navigate('/dashboard')
      },
      onError: (error) => {
        setError('root', {
          type: 'manual',
          message: error?.response?.data?.message || 'Login gagal. Silakan coba lagi.'
        })
      }
    })
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-blue via-blue-600 to-primary-green flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/10">
        <div className="absolute inset-0 opacity-50"></div>
      </div>
      
      <div className="relative w-full max-w-md">
        <div className="mb-6">
          <Link 
            to="/" 
            className="inline-flex items-center text-white/80 hover:text-white transition-colors font-body text-sm"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Kembali ke Beranda
          </Link>
        </div>

        <Card className="backdrop-blur-sm bg-white/95 shadow-2xl border-0">
          <CardHeader className="space-y-1 pb-6">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-primary-blue/10 rounded-full">
                <Shield className="h-8 w-8 text-primary-blue" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-center text-gray-900 font-heading">
              Masuk ke Dashboard
            </CardTitle>
            <CardDescription className="text-center text-gray-600 font-body">
              Kelola website dan konten Anda dengan mudah
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-700 font-body">
                  Email Address
                </label>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <div>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          {...field}
                          id="email"
                          type="email"
                          className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent font-body transition-colors ${
                            errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white'
                          }`}
                          placeholder="admin@solusiweb.com"
                        />
                      </div>
                      {errors.email && (
                        <p className="text-sm text-red-600 font-body">{errors.email.message}</p>
                      )}
                    </div>
                  )}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-gray-700 font-body">
                  Password
                </label>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <div>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Lock className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          {...field}
                          id="password"
                          type={showPassword ? 'text' : 'password'}
                          className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent font-body transition-colors ${
                            errors.password ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white'
                          }`}
                          placeholder="Masukkan password"
                        />
                        <button
                          type="button"
                          onClick={togglePasswordVisibility}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                      {errors.password && (
                        <p className="text-sm text-red-600 font-body">{errors.password.message}</p>
                      )}
                    </div>
                  )}
                />
              </div>

              {errors.root && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600 font-body">{errors.root.message}</p>
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-primary-blue focus:ring-primary-blue border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 font-body">
                    Ingat saya
                  </label>
                </div>
                <button
                  type="button"
                  className="text-sm text-primary-blue hover:text-primary-blue/80 font-body transition-colors"
                >
                  Lupa password?
                </button>
              </div>

              <Button
                type="submit"
                disabled={loginMutation.isPending}
                className="w-full bg-primary-blue hover:bg-primary-blue/90 text-white py-3 rounded-lg font-medium font-body transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loginMutation.isPending ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Memproses...
                  </div>
                ) : (
                  'Masuk ke Dashboard'
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 font-body">
                Belum punya akses?{' '}
                <Link 
                  to="/contact" 
                  className="text-primary-blue hover:text-primary-blue/80 font-medium transition-colors"
                >
                  Hubungi Admin
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <p className="text-white/70 text-xs font-body">
            © 2024 Solusi Web Usaha. Semua hak dilindungi.
          </p>
        </div>
      </div>
    </div>
  )
}

export default AuthPage