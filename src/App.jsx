import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import PrivateRoute from './components/PrivateRoute'
import Header from './components/Header'
import Footer from './components/Footer'

const BlogPage = lazy(() => import('./pages/BlogPage'))
const BlogDetailPage = lazy(() => import('./pages/BlogDetailPage'))
const ServiceDetailPage = lazy(() => import('./pages/ServiceDetailPage'))
const AuthPage = lazy(() => import('./pages/AuthPage'))
const DashboardPage = lazy(() => import('./pages/DashboardPage'))
const AddPostPage = lazy(() => import('./pages/AddPostPage'))
const EditPostPage = lazy(() => import('./pages/EditPostPage'))
const CategoriesPage = lazy(() => import('./pages/dashboard/CategoriesPage'))
const MessagesPage = lazy(() => import('./pages/dashboard/MessagesPage'))
const MediaPage = lazy(() => import('./pages/dashboard/MediaPage'))

const RouteFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-white">
    <div className="w-10 h-10 rounded-full border-2 border-primary-blue/20 border-t-primary-blue animate-spin" />
  </div>
)

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Suspense fallback={<RouteFallback />}>
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
        </Suspense>
      </div>
    </Router>
  )
}

export default App
