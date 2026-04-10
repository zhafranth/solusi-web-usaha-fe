import { Button } from "../components/ui/button";
import {
  Calendar,
  User,
  Search,
  ArrowLeft,
  Loader2,
  ArrowRight,
} from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useBlogs } from "../services/blogService";
import { useCategories } from "../services/categoryService";

const BlogPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );
  const [selectedCategoryId, setSelectedCategoryId] = useState(
    searchParams.get("categoryId") || ""
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(
    searchParams.get("search") || ""
  );
  const postsPerPage = 9;

  const { data: categoriesData } = useCategories();
  const categories = categoriesData || [];

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 1500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (debouncedSearchTerm) {
      params.set("search", debouncedSearchTerm);
    } else {
      params.delete("search");
    }
    if (selectedCategoryId) {
      params.set("categoryId", selectedCategoryId);
    } else {
      params.delete("categoryId");
    }
    setSearchParams(params, { replace: true });
  }, [debouncedSearchTerm, selectedCategoryId, searchParams, setSearchParams]);

  const {
    data: blogsData,
    isLoading: isBlogsLoading,
    error: blogsError,
    refetch: refetchBlogs,
  } = useBlogs({
    page: currentPage,
    limit: postsPerPage,
    search: debouncedSearchTerm || undefined,
    categoryId: selectedCategoryId || undefined,
    status: "PUBLISHED",
  });

  const blogs = blogsData?.data?.blogs || [];
  const pagination = blogsData?.data?.pagination || {};
  const totalPages = Math.ceil((pagination.totalCount || 0) / postsPerPage);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategoryId(categoryId);
    setCurrentPage(1);
  };

  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.08, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
    }),
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-gray-900 text-white">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary-blue/15 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-green/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `radial-gradient(rgba(255,255,255,0.5) 1px, transparent 1px)`,
              backgroundSize: '24px 24px'
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm mb-8"
            >
              <ArrowLeft size={16} />
              <span>Kembali ke Beranda</span>
            </Link>
            <h1 className="text-4xl lg:text-6xl font-heading font-bold mb-4 tracking-tight">
              Blog & Artikel
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl leading-relaxed">
              Dapatkan insight terbaru tentang web development, digital marketing,
              dan tips bisnis online.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            <div className="relative w-full lg:w-96">
              <Search
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Cari artikel..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full pl-11 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-blue/20 focus:border-primary-blue font-body text-sm transition-all outline-none shadow-sm"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleCategoryChange("")}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  selectedCategoryId === ""
                    ? "bg-primary-blue text-white shadow-md shadow-primary-blue/20"
                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                Semua
              </button>
              {categories?.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id.toString())}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    selectedCategoryId === category.id.toString()
                      ? "bg-primary-blue text-white shadow-md shadow-primary-blue/20"
                      : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Featured Posts */}
        {searchTerm === "" && selectedCategoryId === "" && blogs.filter(p => p.featured).length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-heading font-bold text-gray-900 mb-8">
              Artikel Unggulan
            </h2>
            <div className="grid lg:grid-cols-3 gap-6">
              {blogs
                .filter((post) => post.featured)
                .slice(0, 3)
                .map((post, i) => (
                  <motion.div
                    key={post.id}
                    custom={i}
                    initial="hidden"
                    animate="visible"
                    variants={cardVariants}
                    className="group"
                  >
                    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-glass-lg hover:border-gray-200/50 hover:-translate-y-1 transition-all duration-500 flex flex-col h-full">
                      <div className="relative overflow-hidden">
                        <div className="w-full h-48 bg-gradient-to-br from-primary-blue to-primary-green flex items-center justify-center">
                          <span className="text-white/60 font-heading text-sm">Featured</span>
                        </div>
                        <div className="absolute top-3 left-3">
                          <span className="bg-primary-green text-white px-3 py-1 rounded-lg text-xs font-medium">
                            {post.category?.name || post.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-6 flex flex-col flex-grow">
                        <h3 className="text-lg font-heading font-bold text-gray-900 group-hover:text-primary-blue transition-colors line-clamp-2 mb-2">
                          {post.title}
                        </h3>
                        <p className="text-gray-500 text-sm line-clamp-2 mb-4">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-xs text-gray-400 mt-auto">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1">
                              <Calendar size={12} />
                              <span>{formatDate(post.publishedAt || post.createdAt)}</span>
                            </div>
                          </div>
                          <span className="text-primary-blue font-medium text-xs group-hover:underline">
                            Baca
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>
        )}

        {/* All Posts */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-heading font-bold text-gray-900">
              {searchTerm || selectedCategoryId !== ""
                ? "Hasil Pencarian"
                : "Semua Artikel"}
              <span className="text-sm font-normal text-gray-400 ml-2">
                ({pagination.totalCount || 0})
              </span>
            </h2>
          </div>

          {/* Loading */}
          {isBlogsLoading && (
            <div className="text-center py-20">
              <Loader2 className="w-8 h-8 text-primary-blue mx-auto mb-4 animate-spin" />
              <p className="text-gray-400 text-sm">Memuat artikel...</p>
            </div>
          )}

          {/* Error */}
          {blogsError && (
            <div className="text-center py-20">
              <Search size={48} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-heading font-bold text-gray-600 mb-2">
                Gagal memuat artikel
              </h3>
              <p className="text-gray-400 text-sm mb-4">Terjadi kesalahan.</p>
              <Button onClick={() => refetchBlogs()} variant="outline" className="rounded-xl">
                Coba Lagi
              </Button>
            </div>
          )}

          {!isBlogsLoading && !blogsError && blogs.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.map((post, i) => (
                <motion.div
                  key={post.id}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={cardVariants}
                  className="group"
                >
                  <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-glass-lg hover:border-gray-200/50 hover:-translate-y-1 transition-all duration-500 flex flex-col h-full">
                    <div className="relative overflow-hidden">
                      {post.featuredImage ? (
                        <img
                          src={post.featuredImage}
                          alt={post.title}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      ) : (
                        <img
                          src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1920&auto=format&fit=crop"
                          alt="Blog"
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      )}
                      <div className="absolute top-3 left-3">
                        <span className="bg-white/90 backdrop-blur-sm text-primary-blue px-3 py-1 rounded-lg text-xs font-medium border border-white/50">
                          {post.category?.name}
                        </span>
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-lg font-heading font-bold text-gray-900 group-hover:text-primary-blue transition-colors line-clamp-2 mb-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-500 text-sm line-clamp-2 mb-4">
                        {post.excerpt}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {post.tags && post.tags.length > 0 ? (
                          post.tags.slice(0, 3).map((tag, idx) => (
                            <span
                              key={idx}
                              className="bg-gray-50 text-gray-500 px-2.5 py-1 rounded-lg text-xs border border-gray-100"
                            >
                              #{tag}
                            </span>
                          ))
                        ) : (
                          <div className="h-6" />
                        )}
                      </div>

                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary-blue to-primary-green flex items-center justify-center">
                            <User size={10} className="text-white" />
                          </div>
                          <span>{post.author?.nama}</span>
                          <span className="text-gray-300">|</span>
                          <span>{formatDate(post.createdAt)}</span>
                        </div>
                        <ArrowRight size={14} className="text-gray-300 group-hover:text-primary-blue group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            !isBlogsLoading &&
            !blogsError && (
              <div className="text-center py-20">
                <Search size={48} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-heading font-bold text-gray-600 mb-2">
                  Artikel tidak ditemukan
                </h3>
                <p className="text-gray-400 text-sm">
                  Coba kata kunci lain atau pilih kategori berbeda.
                </p>
              </div>
            )
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mb-16">
            <Button
              variant="outline"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="rounded-xl text-sm"
            >
              Sebelumnya
            </Button>
            <div className="flex gap-1">
              {[...Array(totalPages)].map((_, index) => {
                const page = index + 1;
                return (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 rounded-xl text-sm ${
                      currentPage === page
                        ? "bg-primary-blue text-white shadow-md shadow-primary-blue/20"
                        : ""
                    }`}
                  >
                    {page}
                  </Button>
                );
              })}
            </div>
            <Button
              variant="outline"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="rounded-xl text-sm"
            >
              Selanjutnya
            </Button>
          </div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-gray-900 rounded-3xl p-12 lg:p-16 overflow-hidden text-center"
        >
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary-blue/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-green/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
          </div>
          <div className="relative z-10 max-w-2xl mx-auto">
            <h3 className="text-3xl font-heading font-bold text-white mb-4">
              Butuh Konsultasi untuk Website Anda?
            </h3>
            <p className="text-gray-400 text-lg mb-8">
              Tim ahli kami siap membantu mewujudkan website impian untuk bisnis Anda.
            </p>
            <Link to="/#contact">
              <Button
                size="lg"
                className="bg-primary-green hover:bg-primary-green/90 text-white px-8 py-5 rounded-2xl shadow-lg shadow-primary-green/25 group text-base"
              >
                Konsultasi Gratis Sekarang
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BlogPage;
