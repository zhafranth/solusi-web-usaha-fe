import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Calendar, User, Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '../components/ui/button'
import { useBlogById } from '../services/blogService'

const formatDate = (dateString) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const BlogDetailPage = () => {
  const { id } = useParams()
  const { data, isLoading, error } = useBlogById(id)

  const blog = data?.data || null

  useEffect(() => {
    if (blog?.title) {
      document.title = `${blog.title} | Solusi Web Usaha`
    }
    return () => {
      document.title = 'Solusi Web Usaha'
    }
  }, [blog?.title])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50/50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-primary-blue mx-auto mb-3 animate-spin" />
          <p className="text-gray-400 text-sm">Memuat artikel...</p>
        </div>
      </div>
    )
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-gray-50/50 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-2xl bg-gray-100 mx-auto mb-4 flex items-center justify-center">
            <ArrowLeft className="w-6 h-6 text-gray-400" />
          </div>
          <h1 className="text-2xl font-heading font-bold text-gray-900 mb-2">
            Artikel tidak ditemukan
          </h1>
          <p className="text-gray-500 text-sm mb-6">
            Artikel yang Anda cari tidak tersedia atau telah dihapus.
          </p>
          <Link to="/blog">
            <Button className="bg-primary-blue hover:bg-primary-blue/90 rounded-xl">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali ke Blog
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Hero */}
      <div className="relative w-full h-72 md:h-96 overflow-hidden">
        {blog.featuredImage ? (
          <img
            src={blog.featuredImage}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary-blue to-primary-green" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute top-6 left-6 right-6">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-white/90 hover:text-white text-sm bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-xl transition-colors"
          >
            <ArrowLeft size={16} />
            Kembali ke Blog
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10 pb-16">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl border border-gray-100 shadow-glass p-6 md:p-10"
        >
          {blog.category?.name && (
            <span className="inline-block bg-primary-blue/10 text-primary-blue px-3 py-1 rounded-lg text-xs font-medium mb-4">
              {blog.category.name}
            </span>
          )}

          <h1 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4 leading-tight">
            {blog.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 pb-6 mb-8 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary-blue to-primary-green flex items-center justify-center">
                <User size={10} className="text-white" />
              </div>
              <span>{blog.author?.nama || 'Anonim'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar size={12} />
              <span>{formatDate(blog.publishedAt || blog.createdAt)}</span>
            </div>
          </div>

          {blog.excerpt && (
            <p className="text-base md:text-lg text-gray-600 italic mb-8 leading-relaxed">
              {blog.excerpt}
            </p>
          )}

          <div
            className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-primary-blue prose-strong:text-gray-900 prose-img:rounded-xl"
            dangerouslySetInnerHTML={{ __html: blog.content || '' }}
          />

          {blog.tags && blog.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-10 pt-6 border-t border-gray-100">
              {blog.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-gray-50 text-gray-500 px-3 py-1 rounded-lg text-xs border border-gray-100"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </motion.article>

        <div className="mt-8 text-center">
          <Link to="/blog">
            <Button variant="outline" className="rounded-xl">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali ke Daftar Artikel
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default BlogDetailPage
