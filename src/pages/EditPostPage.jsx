import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Save, Eye, Loader2 } from "lucide-react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
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

  // Fetch blog data
  const {
    data: blogData,
    isLoading: isBlogLoading,
    error: blogError,
  } = useQuery({
    queryKey: ["blog", id],
    queryFn: () => getBlogById(id),
    enabled: !!id,
  });

  // Fetch categories
  const { data: categoriesData, isLoading: isCategoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  // Update blog mutation
  const updateBlogMutation = useMutation({
    mutationFn: ({ id, data }) => updateBlog(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["blogs"]);
      queryClient.invalidateQueries(["blog", id]);
      navigate("/dashboard?tab=blog", { replace: true });
    },
    onError: (error) => {
      console.error("Error updating blog:", error);
      setErrors({ submit: error.message });
    },
  });

  // Load blog data into form when fetched
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

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Handle content change from rich text editor
  const handleContentChange = (content) => {
    setFormData((prev) => ({
      ...prev,
      content,
    }));
    if (errors.content) {
      setErrors((prev) => ({ ...prev, content: "" }));
    }
  };

  // Handle tag input
  const handleTagInputChange = (e) => {
    setTagInput(e.target.value);
  };

  const handleTagInputKeyPress = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag();
    }
  };

  const addTag = () => {
    const tag = tagInput.trim();
    if (tag && !formData.tags.includes(tag)) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tag],
      }));
    }
    setTagInput("");
  };

  const removeTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Judul wajib diisi";
    }

    if (!formData.excerpt.trim()) {
      newErrors.excerpt = "Ringkasan wajib diisi";
    }

    if (!formData.content.trim()) {
      newErrors.content = "Konten wajib diisi";
    }

    if (!formData.categoryId) {
      newErrors.categoryId = "Kategori wajib dipilih";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e, status = "DRAFT") => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const submitData = {
      ...formData,
      status,
      categoryId: parseInt(formData.categoryId),
    };

    updateBlogMutation.mutate({ id, data: submitData });
  };

  const handleSaveDraft = (e) => handleSubmit(e, "DRAFT");
  const handlePublish = (e) => handleSubmit(e, "PUBLISHED");

  if (isBlogLoading || isCategoriesLoading || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Memuat data blog...</p>
        </div>
      </div>
    );
  }

  if (blogError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error: {blogError.message}</p>
          <Button onClick={() => navigate("/dashboard?tab=blog")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const categories = categoriesData || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="outline"
              onClick={() => navigate("/dashboard?tab=blog")}
              className="flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali ke Dashboard
            </Button>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={handleSaveDraft}
                disabled={updateBlogMutation.isPending}
              >
                {updateBlogMutation.isPending && formData.status === "DRAFT" ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Menyimpan...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Simpan Draft
                  </>
                )}
              </Button>

              <Button
                onClick={handlePublish}
                disabled={updateBlogMutation.isPending}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {updateBlogMutation.isPending &&
                formData.status === "PUBLISHED" ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Mempublikasi...
                  </>
                ) : (
                  <>
                    <Eye className="w-4 h-4 mr-2" />
                    Publikasikan
                  </>
                )}
              </Button>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-900">Edit Blog Post</h1>
          <p className="text-gray-600 mt-2">Perbarui konten blog post Anda</p>
        </div>

        {/* Error Message */}
        {errors.submit && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600">{errors.submit}</p>
          </div>
        )}

        <form onSubmit={handleSaveDraft} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Informasi Dasar</CardTitle>
              <CardDescription>
                Masukkan informasi dasar untuk blog post Anda
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Title */}
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Judul Post *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.title ? "border-red-300" : "border-gray-300"
                  }`}
                  placeholder="Masukkan judul blog post..."
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                )}
              </div>

              {/* Excerpt */}
              <div>
                <label
                  htmlFor="excerpt"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Ringkasan *
                </label>
                <textarea
                  id="excerpt"
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleInputChange}
                  rows={3}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.excerpt ? "border-red-300" : "border-gray-300"
                  }`}
                  placeholder="Masukkan ringkasan blog post..."
                />
                {errors.excerpt && (
                  <p className="mt-1 text-sm text-red-600">{errors.excerpt}</p>
                )}
              </div>

              {/* Category */}
              <div>
                <label
                  htmlFor="categoryId"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Kategori *
                </label>
                <select
                  id="categoryId"
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.categoryId ? "border-red-300" : "border-gray-300"
                  }`}
                >
                  <option value="">Pilih kategori...</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {errors.categoryId && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.categoryId}
                  </p>
                )}
              </div>

              {/* Featured Image */}
              <div>
                <label
                  htmlFor="featuredImage"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  URL Gambar Utama
                </label>
                <input
                  type="url"
                  id="featuredImage"
                  name="featuredImage"
                  value={formData.featuredImage}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              {/* Tags */}
              <div>
                <label
                  htmlFor="tags"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Tags
                </label>
                <div className="space-y-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={handleTagInputChange}
                    onKeyPress={handleTagInputKeyPress}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ketik tag dan tekan Enter atau koma..."
                  />
                  {formData.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {formData.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                        >
                          {tag}
                          <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="ml-2 text-blue-600 hover:text-blue-800"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Content */}
          <Card>
            <CardHeader>
              <CardTitle>Konten</CardTitle>
              <CardDescription>
                Tulis konten blog post Anda menggunakan editor di bawah ini
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className={
                  errors.content ? "border border-red-300 rounded-lg" : ""
                }
              >
                <RichTextEditor
                  content={formData.content}
                  onChange={handleContentChange}
                  placeholder="Mulai menulis konten blog post Anda di sini..."
                />
              </div>
              {errors.content && (
                <p className="mt-2 text-sm text-red-600">{errors.content}</p>
              )}
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
};

export default EditPostPage;
