import { useState, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
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
  Clock
} from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { blogPosts } from '../data/blogPosts'

const DashboardPage = () => {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeMenu, setActiveMenu] = useState('dashboard')
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard
    },
    {
      id: 'blog',
      label: 'Blog Posts',
      icon: FileText
    }
  ]

  const handleMenuClick = (menuId) => {
    setActiveMenu(menuId)
    setSidebarOpen(false)
  }

  const handleLogout = () => {
    logout()
    navigate('/auth', { replace: true })
  }

  // Filter dan search blog posts
  const filteredBlogPosts = useMemo(() => {
    let filtered = blogPosts
    
    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    
    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(post => {
        if (statusFilter === 'published') return true // Semua post dianggap published untuk demo
        if (statusFilter === 'draft') return false // Tidak ada draft untuk demo
        if (statusFilter === 'featured') return post.featured
        return true
      })
    }
    
    return filtered
  }, [searchQuery, statusFilter])

  const renderBlogList = () => {
    return (
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Blog Posts Management</h1>
          <p className="text-gray-600">Kelola semua artikel blog Anda</p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Cari berdasarkan judul..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            {/* Status Filter */}
            <div className="md:w-48">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                >
                  <option value="all">Semua Status</option>
                  <option value="published">Published</option>
                  <option value="featured">Featured</option>
                </select>
              </div>
            </div>
            
            {/* Add New Button */}
            <Link to="/dashboard/add-post">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <FileText className="w-4 h-4 mr-2" />
                Tambah Post
              </Button>
            </Link>
          </div>
        </div>

        {/* Blog Posts List */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Daftar Blog Posts ({filteredBlogPosts.length})
            </h3>
          </div>
          
          {filteredBlogPosts.length === 0 ? (
            <div className="p-8 text-center">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Tidak ada blog post yang ditemukan</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredBlogPosts.map((post) => (
                <div key={post.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="text-lg font-semibold text-gray-900 hover:text-blue-600 cursor-pointer">
                          {post.title}
                        </h4>
                        {post.featured && (
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
                            Featured
                          </span>
                        )}
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(post.publishedAt).toLocaleDateString('id-ID')}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{post.readTime}</span>
                        </div>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                          {post.category}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 ml-4">
                      <Button variant="outline" size="sm" className="text-blue-600 hover:text-blue-700">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="text-green-600 hover:text-green-700">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }

  const renderContent = () => {
    if (activeMenu === 'blog') {
      return renderBlogList()
    }

    return (
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Dashboard Admin
          </h1>
          <p className="text-gray-600">
            Selamat datang di panel admin SolusiWeb Usaha
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-bold text-gray-900 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-blue-600" />
                Total Blog Posts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600 mb-2">12</div>
              <p className="text-sm text-gray-600">+2 dari bulan lalu</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-bold text-gray-900 flex items-center">
                <User className="w-5 h-5 mr-2 text-green-600" />
                Total Visitors
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600 mb-2">1,234</div>
              <p className="text-sm text-gray-600">+15% dari bulan lalu</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-bold text-gray-900 flex items-center">
                <Bell className="w-5 h-5 mr-2 text-orange-500" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-500 mb-2">5</div>
              <p className="text-sm text-gray-600">Pesan baru menunggu</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900">
                Recent Activities
              </CardTitle>
              <CardDescription>
                Aktivitas terbaru di website
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">Blog post baru dipublikasi</p>
                    <p className="text-xs text-gray-500">2 jam yang lalu</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">Pesan kontak baru diterima</p>
                    <p className="text-xs text-gray-500">4 jam yang lalu</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">Website backup completed</p>
                    <p className="text-xs text-gray-500">1 hari yang lalu</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900">
                Quick Actions
              </CardTitle>
              <CardDescription>
                Aksi cepat untuk mengelola website
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button 
                  onClick={() => handleMenuClick('blog')}
                  className="w-full justify-start bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Kelola Blog Posts
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                >
                  <User className="w-4 h-4 mr-2" />
                  Lihat Pesan Kontak
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Pengaturan Website
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const sidebarClasses = `fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
    sidebarOpen ? 'translate-x-0' : '-translate-x-full'
  }`

  return (
    <div className="min-h-screen bg-gray-50">
      <div className={sidebarClasses}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <Link to="/" className="text-xl font-bold text-blue-600">
            SolusiWeb Admin
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>
        
        <nav className="mt-6 px-3">
          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = activeMenu === item.id
              const buttonClasses = `w-full flex items-center px-3 py-2 text-sm rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleMenuClick(item.id)}
                  className={buttonClasses}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.label}
                </button>
              )
            })}
          </div>
        </nav>
        
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-green-600 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">Admin User</p>
              <p className="text-xs text-gray-500">admin@solusiweb.com</p>
            </div>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            size="sm"
            className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      <div className="flex-1 lg:ml-64">
        <header className="fixed top-0 right-0 left-0 lg:left-64 bg-white shadow-sm border-b border-gray-200 z-40">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-gray-500 hover:text-gray-700 mr-4"
              >
                <Menu size={24} />
              </button>
              <h2 className="text-lg font-semibold text-gray-900 capitalize">
                {activeMenu === 'dashboard' ? 'Dashboard' : menuItems.find(item => item.id === activeMenu)?.label}
              </h2>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link 
                to="/"
                className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
              >
                Lihat Website
              </Link>
              <div className="relative">
                <Bell className="w-5 h-5 text-gray-500" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs flex items-center justify-center">
                  <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                </span>
              </div>
            </div>
          </div>
        </header>

        <main className="pt-16 min-h-screen">
          <div className="p-6">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  )
}

export default DashboardPage