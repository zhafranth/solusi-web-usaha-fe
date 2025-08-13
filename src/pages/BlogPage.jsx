import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Calendar, Clock, User, Tag, Search, Filter, ArrowLeft } from "lucide-react"
import { useState, useMemo } from "react"
import { Link } from "react-router-dom"
import { blogPosts, getAllCategories } from "../data/blogPosts"

const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 9

  const categories = ["All", ...getAllCategories()]

  // Filter dan search posts
  const filteredPosts = useMemo(() => {
    let filtered = blogPosts

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter(post => post.category === selectedCategory)
    }

    // Filter by search term
    if (searchTerm) {
      const lowercaseSearch = searchTerm.toLowerCase()
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(lowercaseSearch) ||
        post.excerpt.toLowerCase().includes(lowercaseSearch) ||
        post.tags.some(tag => tag.toLowerCase().includes(lowercaseSearch))
      )
    }

    return filtered.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
  }, [searchTerm, selectedCategory])

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)
  const startIndex = (currentPage - 1) * postsPerPage
  const currentPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage)

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString('id-ID', options)
  }

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
    setCurrentPage(1)
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-blue to-primary-green text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-6">
            <Link to="/" className="flex items-center text-white hover:text-blue-100 transition-colors mr-4">
              <ArrowLeft size={20} className="mr-2" />
              <span className="font-body">Kembali ke Beranda</span>
            </Link>
          </div>
          <h1 className="text-4xl lg:text-6xl font-heading font-bold mb-6">
            Blog & Artikel
          </h1>
          <p className="text-xl lg:text-2xl text-blue-100 font-body max-w-3xl leading-relaxed">
            Dapatkan insight terbaru tentang web development, digital marketing, dan tips bisnis online untuk mengembangkan usaha Anda.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Search and Filter */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search Bar */}
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Cari artikel..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent font-body bg-white"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`px-4 py-2 rounded-full font-body text-sm transition-colors ${
                    selectedCategory === category
                      ? 'bg-primary-blue text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Posts */}
        {searchTerm === "" && selectedCategory === "All" && (
          <div className="mb-16">
            <h2 className="text-3xl font-heading font-bold text-primary-blue mb-8">Artikel Unggulan</h2>
            <div className="grid lg:grid-cols-3 gap-8">
              {blogPosts.filter(post => post.featured).slice(0, 3).map((post) => (
                <Card key={post.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden bg-white">
                  <div className="relative overflow-hidden">
                    <div className="w-full h-48 bg-gradient-to-br from-primary-blue to-primary-green flex items-center justify-center">
                      <span className="text-white font-heading text-lg">Featured Article</span>
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="bg-primary-green text-white px-3 py-1 rounded-full text-xs font-body font-medium">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-xl font-heading font-bold text-gray-900 group-hover:text-primary-blue transition-colors line-clamp-2">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600 font-body line-clamp-3">
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between text-sm text-gray-500 font-body mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Calendar size={14} />
                          <span>{formatDate(post.publishedAt)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock size={14} />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1 text-sm text-gray-500">
                        <User size={14} />
                        <span className="font-body">{post.author}</span>
                      </div>
                      <Button variant="outline" size="sm" className="font-body">
                        Baca Selengkapnya
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* All Posts */}
        <div className="mb-12">
          <h2 className="text-3xl font-heading font-bold text-primary-blue mb-8">
            {searchTerm || selectedCategory !== "All" ? "Hasil Pencarian" : "Semua Artikel"}
            <span className="text-lg font-normal text-gray-600 ml-2">({filteredPosts.length} artikel)</span>
          </h2>
          
          {currentPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentPosts.map((post) => (
                <Card key={post.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden bg-white">
                  <div className="relative overflow-hidden">
                    <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                      <span className="text-gray-500 font-heading text-lg">Blog Article</span>
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="bg-primary-blue text-white px-3 py-1 rounded-full text-xs font-body font-medium">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-heading font-bold text-gray-900 group-hover:text-primary-blue transition-colors line-clamp-2">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600 font-body line-clamp-3">
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between text-sm text-gray-500 font-body mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Calendar size={14} />
                          <span>{formatDate(post.publishedAt)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock size={14} />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {post.tags.slice(0, 3).map((tag, index) => (
                        <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-body">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1 text-sm text-gray-500">
                        <User size={14} />
                        <span className="font-body">{post.author}</span>
                      </div>
                      <Button variant="outline" size="sm" className="font-body">
                        Baca Selengkapnya
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search size={64} className="mx-auto" />
              </div>
              <h3 className="text-xl font-heading font-bold text-gray-600 mb-2">Artikel tidak ditemukan</h3>
              <p className="text-gray-500 font-body">Coba gunakan kata kunci yang berbeda atau pilih kategori lain.</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2 mb-16">
            <Button
              variant="outline"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="font-body"
            >
              Sebelumnya
            </Button>
            
            <div className="flex space-x-1">
              {[...Array(totalPages)].map((_, index) => {
                const page = index + 1
                return (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 font-body ${
                      currentPage === page ? 'bg-primary-blue text-white' : ''
                    }`}
                  >
                    {page}
                  </Button>
                )
              })}
            </div>
            
            <Button
              variant="outline"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="font-body"
            >
              Selanjutnya
            </Button>
          </div>
        )}

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-primary-blue to-primary-green rounded-2xl p-12">
          <h3 className="text-3xl font-heading font-bold text-white mb-4">
            Butuh Konsultasi untuk Website Anda?
          </h3>
          <p className="text-xl text-blue-100 font-body mb-8 max-w-2xl mx-auto">
            Tim ahli kami siap membantu mewujudkan website impian untuk bisnis Anda. Konsultasi gratis tanpa komitmen!
          </p>
          <Link to="/#contact">
            <Button size="lg" className="bg-white text-primary-blue hover:bg-gray-100 font-body text-lg px-8 py-4">
              Konsultasi Gratis Sekarang
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default BlogPage