import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Save, Eye, Loader2, X } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import RichTextEditor from "../components/RichTextEditor";
import { getBlogById, updateBlog } from "../services/blogService";
import { getCategories } from "../services/categoryService";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const EditPostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    categoryId: "",
    featuredImage: "",
    tags: [],
    status: "DRAFT",
  });
  const [tagInput, setTagInput] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const {
    data: blogData,
    isLoading: isBlogLoading,
    error: blogError,
  } = useQuery({
    queryKey: ["blog", id],
    queryFn: () => getBlogById(id),
    enabled: !!id,
  });

  const { data: categoriesData, isLoading: isCategoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const updateBlogMutation = useMutation({
    mutationFn: ({ id, data }) => updateBlog(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["blogs"]);
      queryClient.invalidateQueries(["blog", id]);
      navigate("/dashboard?tab=blog", { replace: true });
    },
    onError: (error) => {
      setErrors({ submit: error.message });
    },
  });

  useEffect(() => {
    if (blogData?.data) {
      const blog = blogData.data;
      setFormData({
        title: blog.title || "",
        excerpt: blog.excerpt || "",
        content: blog.content || "",
        categoryId: blog.category?.id || blog.categoryId || "",
        featuredImage: blog.featuredImage || "",
        tags: blog.tags || [],
        status: blog.status || "DRAFT",
      });
      setIsLoading(false);
    }
  }, [blogData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleContentChange = (content) => {
    setFormData((prev) => ({ ...prev, content }));
    if (errors.content) {
      setErrors((prev) => ({ ...prev, content: "" }));
    }
  };

  const handleTagInputKeyPress = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const tag = tagInput.trim();
      if (tag && !formData.tags.includes(tag)) {
        setFormData((prev) => ({ ...prev, tags: [...prev.tags, tag] }));
      }
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Judul wajib diisi";
    if (!formData.excerpt.trim()) newErrors.excerpt = "Ringkasan wajib diisi";
    if (!formData.content.trim()) newErrors.content = "Konten wajib diisi";
    if (!formData.categoryId) newErrors.categoryId = "Kategori wajib dipilih";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e, status = "DRAFT") => {
    e.preventDefault();
    if (!validateForm()) return;
    const submitData = {
      ...formData,
      status,
      categoryId: parseInt(formData.categoryId),
    };
    updateBlogMutation.mutate({ id, data: submitData });
  };

  const handleSaveDraft = (e) => handleSubmit(e, "DRAFT");
  const handlePublish = (e) => handleSubmit(e, "PUBLISHED");

  const inputClasses = (hasError) =>
    `w-full px-4 py-3 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-primary-blue/20 focus:border-primary-blue focus:bg-white text-sm transition-all outline-none ${
      hasError ? "border-red-400" : "border-gray-200"
    }`;

  if (isBlogLoading || isCategoriesLoading || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50/80 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary-blue" />
          <p className="text-gray-500 text-sm">Memuat data blog...</p>
        </div>
      </div>
    );
  }

  if (blogError) {
    return (
      <div className="min-h-screen bg-gray-50/80 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-sm mb-4">Error: {blogError.message}</p>
          <Button onClick={() => navigate("/dashboard?tab=blog")} className="rounded-xl">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const categories = categoriesData || [];

  return (
    <div className="min-h-screen bg-gray-50/80">
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <Button
              variant="outline"
              onClick={() => navigate("/dashboard?tab=blog")}
              className="rounded-xl w-fit"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali ke Dashboard
            </Button>

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={handleSaveDraft}
                disabled={updateBlogMutation.isPending}
                className="rounded-xl text-sm"
              >
                {updateBlogMutation.isPending && formData.status === "DRAFT" ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-1.5 animate-spin" />
                    Menyimpan...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-1.5" />
                    Simpan Draft
                  </>
                )}
              </Button>
              <Button
                onClick={handlePublish}
                disabled={updateBlogMutation.isPending}
                className="bg-primary-blue hover:bg-primary-blue/90 rounded-xl text-sm shadow-md shadow-primary-blue/20"
              >
                {updateBlogMutation.isPending && formData.status === "PUBLISHED" ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-1.5 animate-spin" />
                    Mempublikasi...
                  </>
                ) : (
                  <>
                    <Eye className="w-4 h-4 mr-1.5" />
                    Publikasikan
                  </>
                )}
              </Button>
            </div>
          </div>

          <div>
            <h1 className="text-xl font-heading font-bold text-gray-900">Edit Blog Post</h1>
            <p className="text-xs text-gray-500 mt-0.5">Perbarui konten blog post Anda</p>
          </div>
        </motion.div>

        {/* Error */}
        {errors.submit && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl"
          >
            <p className="text-sm text-red-600">{errors.submit}</p>
          </motion.div>
        )}

        <form onSubmit={handleSaveDraft} className="space-y-6">
          {/* Basic Information */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl border border-gray-100 p-6 lg:p-8"
          >
            <h3 className="text-sm font-heading font-bold text-gray-900 mb-1">Informasi Dasar</h3>
            <p className="text-xs text-gray-400 mb-6">Masukkan informasi dasar untuk blog post</p>

            <div className="space-y-5">
              {/* Title */}
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                  Judul Post *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className={`${inputClasses(errors.title)} font-heading font-semibold`}
                  placeholder="Masukkan judul blog post..."
                />
                {errors.title && <p className="mt-1.5 text-xs text-red-500">{errors.title}</p>}
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                  Ringkasan *
                </label>
                <textarea
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleInputChange}
                  rows={3}
                  className={`${inputClasses(errors.excerpt)} resize-none`}
                  placeholder="Masukkan ringkasan blog post..."
                />
                {errors.excerpt && <p className="mt-1.5 text-xs text-red-500">{errors.excerpt}</p>}
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                  Kategori *
                </label>
                <select
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleInputChange}
                  className={inputClasses(errors.categoryId)}
                >
                  <option value="">Pilih kategori...</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {errors.categoryId && <p className="mt-1.5 text-xs text-red-500">{errors.categoryId}</p>}
              </div>

              {/* Featured Image */}
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                  URL Gambar Utama
                </label>
                <input
                  type="url"
                  name="featuredImage"
                  value={formData.featuredImage}
                  onChange={handleInputChange}
                  className={inputClasses(false)}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              {/* Tags */}
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                  Tags
                </label>
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={handleTagInputKeyPress}
                  className={inputClasses(false)}
                  placeholder="Ketik tag dan tekan Enter atau koma..."
                />
                {formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {formData.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1.5 bg-primary-blue/5 text-primary-blue text-xs rounded-lg border border-primary-blue/10"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="ml-2 text-primary-blue/60 hover:text-primary-blue transition-colors"
                        >
                          <X size={12} />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl border border-gray-100 p-6 lg:p-8"
          >
            <h3 className="text-sm font-heading font-bold text-gray-900 mb-1">Konten</h3>
            <p className="text-xs text-gray-400 mb-4">Tulis konten blog post menggunakan editor di bawah</p>
            <div className={errors.content ? "border border-red-200 rounded-xl overflow-hidden" : ""}>
              <RichTextEditor
                content={formData.content}
                onChange={handleContentChange}
                placeholder="Mulai menulis konten blog post Anda di sini..."
              />
            </div>
            {errors.content && <p className="mt-2 text-xs text-red-500">{errors.content}</p>}
          </motion.div>
        </form>
      </div>
    </div>
  );
};

export default EditPostPage;
