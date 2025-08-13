import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ children }) => {
  // Untuk sementara, kita simulasikan authentication check
  // Nanti bisa diganti dengan logic authentication yang sebenarnya
  const isAuthenticated = () => {
    // Simulasi: cek apakah user sudah login
    // Bisa menggunakan localStorage, sessionStorage, atau state management
    const authToken = localStorage.getItem('authToken')
    return authToken !== null
  }

  // Jika tidak authenticated, redirect ke halaman auth
  if (!isAuthenticated()) {
    return <Navigate to="/auth" replace />
  }

  // Jika authenticated, render children (dashboard page)
  return children
}

export default PrivateRoute