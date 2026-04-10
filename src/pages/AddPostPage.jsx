import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ArrowLeft, Save, Eye, Upload, X, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import RichTextEditor from "../components/RichTextEditor";
import { uploadFeaturedImage } from "../services/uploadService";
import { useCategories } from "../services/categoryService";
import { saveDraft, publishBlog } from "../services/blogService";

const schema = yup.object().shape({
  title: yup.string().required("Judul wajib diisi").min(5, "Judul minimal 5 karakter"),
  excerpt: yup.string().required("Excerpt wajib diisi").min(10, "Excerpt minimal 10 karakter"),
  content: yup.string().required("Konten wajib diisi").min(50, "Konten minimal 50 karakter"),
  category: yup.string().required("Kategori wajib dipilih"),
  tags: yup.string().optional(),
  featured: yup.boolean().default(false),
  image: yup.string().required("Gambar utama wajib diupload"),
});

const AddPostPage = () => {
  const navigate = useNavigate();
  const {
    data: categories = [],
    isLoading: isCategoriesLoading,
    error: categoriesError,
  } = useCategories();

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      excerpt: "",
      content: "",
      category: "",
      tags: "",
      featured: false,
      image: "",
    },
    mode: "onChange",
  });

  const watchedValues = watch();
  const [isPreview, setIsPreview] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const handleContentChange = (content) => {
    setValue("content", content, { shouldValidate: true });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setIsUploadingImage(true);
    try {
      const result = await uploadFeaturedImage(file);
      setValue("image", result.url, { shouldValidate: true });
    } catch (error) {
      alert(`Error upload gambar: ${error.message}`);
    } finally {
      setIsUploadingImage(false);
      e.target.value = "";
    }
  };

  const removeImage = () => {
    setValue("image", "", { shouldValidate: true });
  };

  const onSubmit = async (data, isDraft = false) => {
    setIsSaving(true);
    try {
      const blogData = {
        title: data.title.trim(),
        excerpt: data.excerpt.trim(),
        content: data.content.trim(),
        categoryId: parseInt(data.category),
        featuredImage: data.image || undefined,
        tags: data.tags
          ? data.tags.split(",").map((tag) => tag.trim()).filter((tag) => tag)
          : undefined,
      };

      if (isDraft) {
        await saveDraft(blogData);
      } else {
        await publishBlog(blogData);
      }

      alert(`Post berhasil ${isDraft ? "disimpan sebagai draft" : "dipublikasikan"}!`);
      navigate("/dashboard");
    } catch (error) {
      alert(error.message || "Gagal menyimpan post. Silakan coba lagi.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveDraft = handleSubmit((data) => onSubmit(data, true));
  const handlePublish = handleSubmit((data) => onSubmit(data, false));

  const inputClasses = (hasError) =>
    `w-full px-4 py-3 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-primary-blue/20 focus:border-primary-blue focus:bg-white text-sm transition-all outline-none ${
      hasError ? "border-red-400" : "border-gray-200"
    }`;

  const renderPreview = () => (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <Button
            variant="outline"
            onClick={() => setIsPreview(false)}
            className="rounded-xl"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Editor
          </Button>
        </div>

        <div className="p-8 lg:p-12">
          {watchedValues.image && (
            <img
              src={watchedValues.image}
              alt={watchedValues.title}
              className="w-full h-64 object-cover rounded-2xl mb-8"
            />
          )}

          <h1 className="text-3xl font-heading font-bold text-gray-900 mb-3">
            {watchedValues.title || "Judul Post"}
          </h1>

          <p className="text-lg text-gray-500 mb-6">
            {watchedValues.excerpt || "Excerpt akan muncul di sini..."}
          </p>

          <div className="flex items-center gap-3 text-sm text-gray-400 mb-8 pb-8 border-b border-gray-100">
            <span>By Admin User</span>
            <span className="text-gray-300">|</span>
            <span>{new Date().toLocaleDateString("id-ID")}</span>
            <span className="text-gray-300">|</span>
            <span>{Math.ceil(watchedValues.content.length / 1000)} min read</span>
            {watchedValues.category && (
              <>
                <span className="text-gray-300">|</span>
                <span className="bg-primary-blue/5 text-primary-blue px-2.5 py-1 rounded-lg text-xs font-medium">
                  {watchedValues.category}
                </span>
              </>
            )}
          </div>

          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{
              __html: watchedValues.content || "<p>Konten akan muncul di sini...</p>",
            }}
          />

          {watchedValues.tags && (
            <div className="mt-8 pt-6 border-t border-gray-100">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">Tags</p>
              <div className="flex flex-wrap gap-2">
                {watchedValues.tags.split(",").map((tag, index) => (
                  <span key={index} className="bg-gray-50 text-gray-600 px-3 py-1.5 rounded-lg text-sm border border-gray-100">
                    {tag.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  if (isPreview) {
    return (
      <div className="min-h-screen bg-gray-50/80 py-8">
        <div className="container mx-auto px-4">{renderPreview()}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/80 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8"
          >
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => navigate("/dashboard")}
                className="rounded-xl"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Kembali
              </Button>
              <div>
                <h1 className="text-xl font-heading font-bold text-gray-900">Tambah Post Baru</h1>
                <p className="text-xs text-gray-500 mt-0.5">Tulis dan publikasikan artikel baru</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => setIsPreview(true)}
                className="rounded-xl text-sm"
              >
                <Eye className="w-4 h-4 mr-1.5" />
                Preview
              </Button>
              <Button
                variant="outline"
                onClick={handleSaveDraft}
                disabled={isSaving}
                className="rounded-xl text-sm"
              >
                <Save className="w-4 h-4 mr-1.5" />
                Draft
              </Button>
              <Button
                onClick={handlePublish}
                disabled={isSaving}
                className="bg-primary-blue hover:bg-primary-blue/90 rounded-xl text-sm shadow-md shadow-primary-blue/20"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-1.5 animate-spin" />
                    Menyimpan...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-1.5" />
                    Publikasikan
                  </>
                )}
              </Button>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Title */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl border border-gray-100 p-6"
              >
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                  Judul Post
                </label>
                <Controller
                  name="title"
                  control={control}
                  render={({ field }) => (
                    <div>
                      <input
                        {...field}
                        type="text"
                        placeholder="Masukkan judul post..."
                        className={`${inputClasses(errors.title)} text-lg font-heading font-semibold`}
                      />
                      {errors.title && (
                        <p className="mt-1.5 text-xs text-red-500">{errors.title.message}</p>
                      )}
                    </div>
                  )}
                />
              </motion.div>

              {/* Excerpt */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="bg-white rounded-2xl border border-gray-100 p-6"
              >
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                  Excerpt
                </label>
                <p className="text-xs text-gray-400 mb-2">Ringkasan singkat yang muncul di daftar blog</p>
                <Controller
                  name="excerpt"
                  control={control}
                  render={({ field }) => (
                    <div>
                      <textarea
                        {...field}
                        placeholder="Masukkan excerpt..."
                        rows={3}
                        className={`${inputClasses(errors.excerpt)} resize-none`}
                      />
                      {errors.excerpt && (
                        <p className="mt-1.5 text-xs text-red-500">{errors.excerpt.message}</p>
                      )}
                    </div>
                  )}
                />
              </motion.div>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl border border-gray-100 p-6"
              >
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
                  Konten
                </label>
                <Controller
                  name="content"
                  control={control}
                  render={({ field }) => (
                    <div>
                      <RichTextEditor
                        content={field.value}
                        onChange={handleContentChange}
                        placeholder="Mulai menulis konten post..."
                      />
                      {errors.content && (
                        <p className="mt-1.5 text-xs text-red-500">{errors.content.message}</p>
                      )}
                    </div>
                  )}
                />
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Featured Image */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="bg-white rounded-2xl border border-gray-100 p-6"
              >
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
                  Gambar Utama
                </label>
                {watchedValues.image ? (
                  <div className="relative group">
                    <img
                      src={watchedValues.image}
                      alt="Preview"
                      className="w-full h-36 object-cover rounded-xl"
                    />
                    <button
                      onClick={removeImage}
                      className="absolute top-2 right-2 w-7 h-7 bg-red-500 text-white rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ) : isUploadingImage ? (
                  <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center">
                    <Loader2 className="w-6 h-6 text-primary-blue mx-auto mb-2 animate-spin" />
                    <p className="text-xs text-gray-500">Mengupload gambar...</p>
                  </div>
                ) : (
                  <div className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                    errors.image ? 'border-red-300 bg-red-50/50' : 'border-gray-200 hover:border-primary-blue/30 hover:bg-primary-blue/[0.02]'
                  }`}>
                    <Upload className={`w-6 h-6 mx-auto mb-2 ${errors.image ? 'text-red-400' : 'text-gray-400'}`} />
                    <p className="text-xs text-gray-500 mb-1">Upload gambar utama</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                      disabled={isUploadingImage}
                    />
                    <label
                      htmlFor="image-upload"
                      className="cursor-pointer text-primary-blue hover:text-primary-blue/80 text-xs font-medium"
                    >
                      Pilih file
                    </label>
                  </div>
                )}
                {errors.image && (
                  <p className="mt-2 text-xs text-red-500">{errors.image.message}</p>
                )}
              </motion.div>

              {/* Category */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-2xl border border-gray-100 p-6"
              >
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
                  Kategori
                </label>
                {isCategoriesLoading ? (
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Memuat...</span>
                  </div>
                ) : categoriesError ? (
                  <div className="text-red-500 text-sm">
                    <p>Gagal memuat kategori.</p>
                    <Button variant="outline" size="sm" className="mt-2 rounded-lg" onClick={() => window.location.reload()}>
                      Coba lagi
                    </Button>
                  </div>
                ) : (
                  <Controller
                    name="category"
                    control={control}
                    render={({ field }) => (
                      <div>
                        <select {...field} className={inputClasses(errors.category)}>
                          <option value="">Pilih kategori</option>
                          {categories?.map((category) => (
                            <option key={category.id || category} value={category.id || category}>
                              {category.name || category}
                            </option>
                          ))}
                        </select>
                        {errors.category && (
                          <p className="mt-1.5 text-xs text-red-500">{errors.category.message}</p>
                        )}
                      </div>
                    )}
                  />
                )}
              </motion.div>

              {/* Tags */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="bg-white rounded-2xl border border-gray-100 p-6"
              >
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                  Tags
                </label>
                <p className="text-xs text-gray-400 mb-2">Pisahkan dengan koma (,)</p>
                <Controller
                  name="tags"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      placeholder="react, javascript, tutorial"
                      className={inputClasses(false)}
                    />
                  )}
                />
              </motion.div>

              {/* Featured */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-2xl border border-gray-100 p-6"
              >
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
                  Pengaturan
                </label>
                <Controller
                  name="featured"
                  control={control}
                  render={({ field }) => (
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input
                        {...field}
                        type="checkbox"
                        checked={field.value}
                        className="w-4 h-4 rounded border-gray-300 text-primary-blue focus:ring-primary-blue/20"
                      />
                      <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                        Jadikan post unggulan
                      </span>
                    </label>
                  )}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPostPage;
