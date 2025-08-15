import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth()

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-blue mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // Jika tidak authenticated, redirect ke halaman auth
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />
  }

  // Jika authenticated, render children (dashboard page)
  return children
}

export default PrivateRoute