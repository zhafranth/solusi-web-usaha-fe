import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import BlogPage from './pages/BlogPage'
import BlogDetailPage from './pages/BlogDetailPage'
import ServiceDetailPage from './pages/ServiceDetailPage'
import AuthPage from './pages/AuthPage'
import DashboardPage from './pages/DashboardPage'
import AddPostPage from './pages/AddPostPage'
import EditPostPage from './pages/EditPostPage'
import CategoriesPage from './pages/dashboard/CategoriesPage'
import MessagesPage from './pages/dashboard/MessagesPage'
import MediaPage from './pages/dashboard/MediaPage'
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
          <Route path="/blog/:id" element={
            <>
              <Header />
              <BlogDetailPage />
              <Footer />
            </>
          } />
          <Route path="/services/:slug" element={
            <>
              <Header />
              <ServiceDetailPage />
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
          <Route path="/dashboard/categories" element={
            <PrivateRoute>
              <CategoriesPage />
            </PrivateRoute>
          } />
          <Route path="/dashboard/messages" element={
            <PrivateRoute>
              <MessagesPage />
            </PrivateRoute>
          } />
          <Route path="/dashboard/media" element={
            <PrivateRoute>
              <MediaPage />
            </PrivateRoute>
          } />
        </Routes>
      </div>
    </Router>
  )
}

export default App
