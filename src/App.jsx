import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import BlogPage from './pages/BlogPage'
import AuthPage from './pages/AuthPage'
import DashboardPage from './pages/DashboardPage'
import AddPostPage from './pages/AddPostPage'
import EditPostPage from './pages/EditPostPage'
import PrivateRoute from './components/PrivateRoute'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={
            <>
              <Header />
              <BlogPage />
              <Footer />
            </>
          } />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/dashboard" element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          } />
          <Route path="/dashboard/add-post" element={
            <PrivateRoute>
              <AddPostPage />
            </PrivateRoute>
          } />
          <Route path="/dashboard/edit-post/:id" element={
            <PrivateRoute>
              <EditPostPage />
            </PrivateRoute>
          } />
        </Routes>
      </div>
    </Router>
  )
}

export default App
