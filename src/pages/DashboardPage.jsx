import { useState, useEffect, useCallback } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import {
  LayoutDashboard,
  FileText,
  Menu,
  X,
  LogOut,
  User,
  Settings,
  Bell,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Calendar,
  Loader2,
  Plus,
  TrendingUp,
  MessageSquare,
  ExternalLink,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '../components/ui/button'
import { useBlogs, deleteBlog } from '../services/blogService'

const DashboardPage = () => {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeMenu, setActiveMenu] = useState('dashboard')
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '')
  const [statusFilter, setStatusFilter] = useState(searchParams.get('status') || 'all')
  const [currentPage, setCurrentPage] = useState(1)
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchParams.get('search') || '')
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [blogToDelete, setBlogToDelete] = useState(null)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery)
    }, 1500)
    return () => clearTimeout(timer)
  }, [searchQuery])

  useEffect(() => {
    const params = new URLSearchParams(searchParams)
    if (debouncedSearchQuery) {
      params.set('search', debouncedSearchQuery)
    } else {
      params.delete('search')
    }
    if (statusFilter && statusFilter !== 'all') {
      params.set('status', statusFilter)
    } else {
      params.delete('status')
    }
    setSearchParams(params, { replace: true })
  }, [debouncedSearchQuery, statusFilter, searchParams, setSearchParams])

  const {
    data: blogsData,
    isLoading: isBlogsLoading,
    error: blogsError,
    refetch: refetchBlogs
  } = useBlogs({
    page: currentPage,
    limit: 10,
    search: debouncedSearchQuery || undefined,
    status: statusFilter !== 'all' ? statusFilter.toUpperCase() : undefined
  })

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'blog', label: 'Blog Posts', icon: FileText },
  ]

  const handleMenuClick = (menuId) => {
    setActiveMenu(menuId)
    setSidebarOpen(false)
  }

  const handleLogout = () => {
    logout()
    navigate('/auth', { replace: true })
  }

  const blogs = blogsData?.data?.blogs || []
  const pagination = blogsData?.data?.pagination || {}

  const handleSearchChange = useCallback((e) => {
    setSearchQuery(e.target.value)
    setCurrentPage(1)
  }, [])

  const handleStatusFilterChange = (newStatus) => {
    setStatusFilter(newStatus)
    setCurrentPage(1)
  }

  const handleEditClick = (blog) => {
    navigate(`/dashboard/edit-post/${blog.id}`)
  }

  const handleDeleteClick = (blog) => {
    setBlogToDelete(blog)
    setShowDeleteModal(true)
  }

  const handleDeleteConfirm = async () => {
    if (!blogToDelete) return
    setIsDeleting(true)
    try {
      await deleteBlog(blogToDelete.id)
      setShowDeleteModal(false)
      setBlogToDelete(null)
      refetchBlogs()
    } catch (error) {
      console.error('Error deleting blog:', error)
      alert('Gagal menghapus blog post: ' + error.message)
    } finally {
      setIsDeleting(false)
    }
  }

  const handleDeleteCancel = () => {
    setShowDeleteModal(false)
    setBlogToDelete(null)
  }

  const renderBlogList = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-gray-900">Blog Posts</h1>
          <p className="text-sm text-gray-500 mt-1">Kelola semua artikel blog Anda</p>
        </div>
        <Link to="/dashboard/add-post">
          <Button className="bg-primary-blue hover:bg-primary-blue/90 rounded-xl shadow-md shadow-primary-blue/20">
            <Plus className="w-4 h-4 mr-2" />
            Tambah Post
          </Button>
        </Link>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Cari blog post..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-blue/20 focus:border-primary-blue text-sm outline-none transition-all"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <select
            value={statusFilter}
            onChange={(e) => handleStatusFilterChange(e.target.value)}
            className="px-3 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-blue/20 focus:border-primary-blue text-sm outline-none"
          >
            <option value="all">Semua Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </div>

      {/* Blog List */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-900">
            Daftar Blog Posts ({pagination.totalCount || 0})
          </h3>
        </div>

        {isBlogsLoading && (
          <div className="p-12 text-center">
            <Loader2 className="w-6 h-6 text-primary-blue mx-auto mb-3 animate-spin" />
            <p className="text-gray-400 text-sm">Memuat blog posts...</p>
          </div>
        )}

        {blogsError && (
          <div className="p-12 text-center">
            <FileText className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="text-red-500 text-sm mb-3">Gagal memuat blog posts</p>
            <Button onClick={() => refetchBlogs()} variant="outline" size="sm" className="rounded-xl">
              Coba Lagi
            </Button>
          </div>
        )}

        {!isBlogsLoading && !blogsError && blogs.length === 0 && (
          <div className="p-12 text-center">
            <FileText className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-400 text-sm">Tidak ada blog post ditemukan</p>
          </div>
        )}

        {!isBlogsLoading && !blogsError && blogs.length > 0 && (
          <div className="divide-y divide-gray-50">
            {blogs.map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="px-6 py-4 hover:bg-gray-50/50 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <h4 className="text-sm font-semibold text-gray-900 truncate hover:text-primary-blue cursor-pointer transition-colors">
                        {post.title}
                      </h4>
                      <span className={`px-2 py-0.5 text-xs font-medium rounded-lg flex-shrink-0 ${
                        post.status === 'PUBLISHED'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                          : 'bg-amber-50 text-amber-700 border border-amber-100'
                      }`}>
                        {post.status}
                      </span>
                    </div>
                    <p className="text-gray-500 text-xs mb-2 line-clamp-1">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-gray-400">
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        <span>{post.author?.nama || 'Unknown'}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(post.createdAt).toLocaleDateString('id-ID')}</span>
                      </div>
                      <span className="px-2 py-0.5 bg-primary-blue/5 text-primary-blue text-xs rounded-lg">
                        {post.category?.name || 'Uncategorized'}
                      </span>
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex gap-1">
                          {post.tags.slice(0, 2).map((tag, index) => (
                            <span key={index} className="px-2 py-0.5 bg-gray-50 text-gray-500 text-xs rounded-lg border border-gray-100">
                              {tag}
                            </span>
                          ))}
                          {post.tags.length > 2 && (
                            <span className="text-xs text-gray-400">+{post.tags.length - 2}</span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <button className="p-2 rounded-lg text-gray-400 hover:text-primary-blue hover:bg-primary-blue/5 transition-all">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleEditClick(post)}
                      className="p-2 rounded-lg text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 transition-all"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(post)}
                      className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {!isBlogsLoading && !blogsError && pagination.totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
            <p className="text-xs text-gray-400">
              Halaman {pagination.currentPage} dari {pagination.totalPages} ({pagination.totalCount} total)
            </p>
            <div className="flex gap-1.5">
              <Button
                variant="outline"
                size="sm"
                disabled={!pagination.hasPrevPage}
                onClick={() => setCurrentPage(currentPage - 1)}
                className="rounded-lg text-xs"
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={!pagination.hasNextPage}
                onClick={() => setCurrentPage(currentPage + 1)}
                className="rounded-lg text-xs"
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )

  const renderDashboard = () => (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-heading font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Selamat datang di panel admin SolusiWeb Usaha</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Total Blog Posts", value: pagination.totalCount || 0, icon: FileText, color: "from-primary-blue to-blue-400", change: null },
          { label: "Total Visitors", value: "1,234", icon: TrendingUp, color: "from-primary-green to-emerald-400", change: "+15%" },
          { label: "Notifications", value: "5", icon: Bell, color: "from-amber-500 to-orange-400", change: null },
        ].map((stat, i) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-glass transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-sm`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                {stat.change && (
                  <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
                    {stat.change}
                  </span>
                )}
              </div>
              <div className="text-2xl font-heading font-bold text-gray-900 mb-0.5">{stat.value}</div>
              <p className="text-xs text-gray-400">{stat.label}</p>
            </motion.div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h3 className="text-sm font-heading font-bold text-gray-900 mb-4">Recent Activities</h3>
          <div className="space-y-4">
            {[
              { text: "Blog post baru dipublikasi", time: "2 jam lalu", color: "bg-primary-blue" },
              { text: "Pesan kontak baru diterima", time: "4 jam lalu", color: "bg-primary-green" },
              { text: "Website backup completed", time: "1 hari lalu", color: "bg-amber-500" },
            ].map((activity, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${activity.color} flex-shrink-0`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-700 truncate">{activity.text}</p>
                  <p className="text-xs text-gray-400">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h3 className="text-sm font-heading font-bold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-2.5">
            <Button
              onClick={() => handleMenuClick('blog')}
              className="w-full justify-start bg-primary-blue hover:bg-primary-blue/90 text-white rounded-xl"
            >
              <FileText className="w-4 h-4 mr-2" />
              Kelola Blog Posts
            </Button>
            <Button variant="outline" className="w-full justify-start rounded-xl">
              <MessageSquare className="w-4 h-4 mr-2" />
              Lihat Pesan Kontak
            </Button>
            <Button variant="outline" className="w-full justify-start rounded-xl">
              <Settings className="w-4 h-4 mr-2" />
              Pengaturan Website
            </Button>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50/80">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-100 transform transition-transform duration-300 ease-out lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-100">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-blue to-primary-green flex items-center justify-center">
              <span className="text-white font-heading font-bold text-xs">SW</span>
            </div>
            <span className="text-sm font-heading font-bold text-gray-900">SolusiWeb</span>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>

        <nav className="mt-4 px-3">
          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = activeMenu === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => handleMenuClick(item.id)}
                  className={`w-full flex items-center px-3 py-2.5 text-sm rounded-xl transition-all ${
                    isActive
                      ? 'bg-primary-blue text-white shadow-md shadow-primary-blue/20'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-3" />
                  {item.label}
                </button>
              )
            })}
          </div>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-blue to-primary-green flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">Admin User</p>
              <p className="text-xs text-gray-400 truncate">admin@solusiweb.com</p>
            </div>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            size="sm"
            className="w-full justify-start text-red-500 border-red-100 hover:bg-red-50 hover:border-red-200 rounded-xl text-xs"
          >
            <LogOut className="w-3.5 h-3.5 mr-2" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="lg:ml-64">
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-100/50">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-gray-500 hover:text-gray-700 p-1"
              >
                <Menu size={20} />
              </button>
              <h2 className="text-sm font-heading font-semibold text-gray-900">
                {activeMenu === 'dashboard' ? 'Dashboard' : menuItems.find(item => item.id === activeMenu)?.label}
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <Link
                to="/"
                className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-primary-blue transition-colors"
              >
                <ExternalLink size={14} />
                Lihat Website
              </Link>
              <div className="relative">
                <Bell className="w-5 h-5 text-gray-400" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
              </div>
            </div>
          </div>
        </header>

        <main className="p-6 lg:p-8">
          {activeMenu === 'blog' ? renderBlogList() : renderDashboard()}
        </main>
      </div>

      {/* Delete Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center">
                  <Trash2 className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <h3 className="text-base font-heading font-bold text-gray-900">Hapus Blog Post</h3>
                  <p className="text-xs text-gray-500">Tindakan ini tidak dapat dibatalkan</p>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-6">
                Apakah Anda yakin ingin menghapus{' '}
                <span className="font-semibold">"{blogToDelete?.title}"</span>?
              </p>

              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={handleDeleteCancel}
                  disabled={isDeleting}
                  className="rounded-xl"
                >
                  Batal
                </Button>
                <Button
                  onClick={handleDeleteConfirm}
                  disabled={isDeleting}
                  className="bg-red-500 hover:bg-red-600 text-white rounded-xl"
                >
                  {isDeleting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Menghapus...
                    </>
                  ) : (
                    'Hapus'
                  )}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default DashboardPage
