import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useLogin } from '../services/authService'

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

const LoginForm = ({ onClose }) => {
  const loginMutation = useLogin()
  
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: ''
    },
    mode: 'onChange',
  })

  const onSubmit = (data) => {
    loginMutation.mutate(data, {
      onSuccess: () => {
        if (onClose) onClose()
      }
    })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Login</h2>
          {onClose && (
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <div>
                  <input
                    {...field}
                    type="email"
                    id="email"
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent ${
                      errors.email
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-gray-300 focus:ring-primary-blue'
                    }`}
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              )}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <div>
                  <input
                    {...field}
                    type="password"
                    id="password"
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent ${
                      errors.password
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-gray-300 focus:ring-primary-blue'
                    }`}
                    placeholder="Enter your password"
                  />
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.password.message}
                    </p>
                  )}
                </div>
              )}
            />
          </div>

          {loginMutation.isError && (
            <div className="text-red-600 text-sm">
              {loginMutation.error?.response?.data?.message || 'Login failed. Please try again.'}
            </div>
          )}

          <button
            type="submit"
            disabled={loginMutation.isPending}
            className="w-full bg-primary-blue text-white py-2 px-4 rounded-md hover:bg-primary-blue/90 focus:outline-none focus:ring-2 focus:ring-primary-blue focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loginMutation.isPending ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="#" className="text-primary-blue hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginForm