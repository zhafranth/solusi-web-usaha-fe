import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ArrowLeft, Save, Eye, Upload, X } from "lucide-react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import RichTextEditor from "../components/RichTextEditor";
import { uploadFeaturedImage } from "../services/uploadService";
import { useCategories } from "../services/categoryService";
import { saveDraft, publishBlog } from "../services/blogService";

// Validation schema
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
      console.log("result:", result);
      setValue("image", result.url, { shouldValidate: true });
    } catch (error) {
      alert(`Error upload gambar: ${error.message}`);
      console.error("Upload error:", error);
    } finally {
      setIsUploadingImage(false);
      // Reset input file
      e.target.value = "";
    }
  };

  const removeImage = () => {
    setValue("image", "", { shouldValidate: true });
  };

  const onSubmit = async (data, isDraft = false) => {
    setIsSaving(true);

    try {
      // Prepare data untuk API
      const blogData = {
        title: data.title.trim(),
        excerpt: data.excerpt.trim(),
        content: data.content.trim(),
        categoryId: parseInt(data.category), // Convert ke integer
        featuredImage: data.image || undefined,
        tags: data.tags
          ? data.tags
              .split(",")
              .map((tag) => tag.trim())
              .filter((tag) => tag)
          : undefined,
      };

      // Panggil API sesuai dengan status (draft atau published)
      let response;
      if (isDraft) {
        response = await saveDraft(blogData);
      } else {
        response = await publishBlog(blogData);
      }

      console.log("Post saved:", response);
      alert(
        `Post berhasil ${
          isDraft ? "disimpan sebagai draft" : "dipublikasikan"
        }!`
      );
      navigate("/dashboard");
    } catch (error) {
      console.error("Error saving post:", error);
      alert(error.message || "Gagal menyimpan post. Silakan coba lagi.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveDraft = handleSubmit((data) => onSubmit(data, true));
  const handlePublish = handleSubmit((data) => onSubmit(data, false));

  const renderPreview = () => {
    return (
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              <Button
                variant="outline"
                onClick={() => setIsPreview(false)}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Kembali ke Editor
              </Button>
            </div>

            {watchedValues.image && (
              <div className="mb-6">
                <img
                  src={watchedValues.image}
                  alt={watchedValues.title}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
            )}

            <CardTitle className="text-3xl font-bold mb-2">
              {watchedValues.title || "Judul Post"}
            </CardTitle>

            <CardDescription className="text-lg text-gray-600 mb-4">
              {watchedValues.excerpt || "Excerpt akan muncul di sini..."}
            </CardDescription>

            <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
              <span>By Admin User</span>
              <span>•</span>
              <span>{new Date().toLocaleDateString("id-ID")}</span>
              <span>•</span>
              <span>{Math.ceil(watchedValues.content.length / 1000)} min read</span>
              {watchedValues.category && (
                <>
                  <span>•</span>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    {watchedValues.category}
                  </span>
                </>
              )}
            </div>
          </CardHeader>

          <CardContent>
            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{
                __html:
                  watchedValues.content || "<p>Konten akan muncul di sini...</p>",
              }}
            />

            {watchedValues.tags && (
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">
                  Tags:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {watchedValues.tags.split(",").map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                    >
                      {tag.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  };

  if (isPreview) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">{renderPreview()}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => navigate("/dashboard")}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Kembali
              </Button>
              <h1 className="text-2xl font-bold text-gray-900">
                Tambah Post Baru
              </h1>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => setIsPreview(true)}
                className="flex items-center gap-2"
              >
                <Eye className="w-4 h-4" />
                Preview
              </Button>
              <Button
                variant="outline"
                onClick={handleSaveDraft}
                disabled={isSaving}
                className="flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Simpan Draft
              </Button>
              <Button
                onClick={handlePublish}
                disabled={isSaving}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
              >
                <Save className="w-4 h-4" />
                {isSaving ? "Menyimpan..." : "Publikasikan"}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Title */}
              <Card>
                <CardHeader>
                  <CardTitle>Judul Post</CardTitle>
                </CardHeader>
                <CardContent>
                  <Controller
                    name="title"
                    control={control}
                    render={({ field }) => (
                      <div>
                        <input
                          {...field}
                          type="text"
                          placeholder="Masukkan judul post..."
                          className={`w-full p-3 text-xl font-semibold border rounded-lg focus:outline-none focus:ring-2 ${
                            errors.title
                              ? "border-red-500 focus:ring-red-500"
                              : "border-gray-300 focus:ring-blue-500"
                          }`}
                        />
                        {errors.title && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.title.message}
                          </p>
                        )}
                      </div>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Excerpt */}
              <Card>
                <CardHeader>
                  <CardTitle>Excerpt</CardTitle>
                  <CardDescription>
                    Ringkasan singkat yang akan muncul di daftar blog
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Controller
                    name="excerpt"
                    control={control}
                    render={({ field }) => (
                      <div>
                        <textarea
                          {...field}
                          placeholder="Masukkan excerpt..."
                          rows={3}
                          className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 resize-none ${
                            errors.excerpt
                              ? "border-red-500 focus:ring-red-500"
                              : "border-gray-300 focus:ring-blue-500"
                          }`}
                        />
                        {errors.excerpt && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.excerpt.message}
                          </p>
                        )}
                      </div>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Content Editor */}
              <Card>
                <CardHeader>
                  <CardTitle>Konten</CardTitle>
                </CardHeader>
                <CardContent>
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
                          <p className="mt-1 text-sm text-red-600">
                            {errors.content.message}
                          </p>
                        )}
                      </div>
                    )}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Featured Image */}
              <Card>
                <CardHeader>
                  <CardTitle>Gambar Utama</CardTitle>
                </CardHeader>
                <CardContent>
                  {watchedValues.image ? (
                    <div className="relative">
                      <img
                        src={watchedValues.image}
                        alt="Preview"
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={removeImage}
                        className="absolute top-2 right-2 h-6 w-6 p-0"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ) : isUploadingImage ? (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                      <p className="text-sm text-gray-600">
                        Mengupload gambar...
                      </p>
                    </div>
                  ) : (
                    <div className={`border-2 border-dashed rounded-lg p-6 text-center ${
                      errors.image ? 'border-red-500' : 'border-gray-300'
                    }`}>
                      <Upload className={`w-8 h-8 mx-auto mb-2 ${
                        errors.image ? 'text-red-400' : 'text-gray-400'
                      }`} />
                      <p className="text-sm text-gray-600 mb-2">
                        Upload gambar utama
                      </p>
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
                        className="cursor-pointer text-blue-600 hover:text-blue-700 text-sm"
                      >
                        Pilih file
                      </label>
                    </div>
                  )}
                  {errors.image && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.image.message}
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Category */}
              <Card>
                <CardHeader>
                  <CardTitle>Kategori</CardTitle>
                </CardHeader>
                <CardContent>
                  {isCategoriesLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900"></div>
                      <p>Memuat kategori...</p>
                    </div>
                  ) : categoriesError ? (
                    <div className="text-red-500">
                      <p>Gagal memuat kategori. Silakan coba lagi nanti.</p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-2"
                        onClick={() => window.location.reload()}
                      >
                        Coba lagi
                      </Button>
                    </div>
                  ) : (
                    <Controller
                      name="category"
                      control={control}
                      render={({ field }) => (
                        <div>
                          <select
                            {...field}
                            className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 ${
                              errors.category
                                ? "border-red-500 focus:ring-red-500"
                                : "border-gray-300 focus:ring-blue-500"
                            }`}
                          >
                            <option value="">Pilih kategori</option>
                            {categories?.map((category) => (
                              <option
                                key={category.id || category}
                                value={category.id || category}
                              >
                                {category.name || category}
                              </option>
                            ))}
                          </select>
                          {errors.category && (
                            <p className="mt-1 text-sm text-red-600">
                              {errors.category.message}
                            </p>
                          )}
                        </div>
                      )}
                    />
                  )}
                </CardContent>
              </Card>

              {/* Tags */}
              <Card>
                <CardHeader>
                  <CardTitle>Tags</CardTitle>
                  <CardDescription>Pisahkan dengan koma (,)</CardDescription>
                </CardHeader>
                <CardContent>
                  <Controller
                    name="tags"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        placeholder="react, javascript, tutorial"
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    )}
                  />
                </CardContent>
              </Card>

              {/* Featured */}
              <Card>
                <CardHeader>
                  <CardTitle>Pengaturan</CardTitle>
                </CardHeader>
                <CardContent>
                  <Controller
                    name="featured"
                    control={control}
                    render={({ field }) => (
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          {...field}
                          type="checkbox"
                          checked={field.value}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm">Jadikan post unggulan</span>
                      </label>
                    )}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPostPage;
