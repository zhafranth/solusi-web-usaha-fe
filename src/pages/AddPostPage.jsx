import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Save, Eye, Upload, X } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import RichTextEditor from '../components/RichTextEditor'

const AddPostPage = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    tags: '',
    featured: false,
    image: ''
  })
  const [isPreview, setIsPreview] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const categories = [
    'Teknologi',
    'Bisnis',
    'Marketing',
    'Design',
    'Tutorial',
    'Tips & Tricks',
    'Berita',
    'Lainnya'
  ]

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleContentChange = (content) => {
    setFormData(prev => ({
      ...prev,
      content
    }))
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Simulasi upload gambar - dalam implementasi nyata, upload ke server
      const imageUrl = URL.createObjectURL(file)
      setFormData(prev => ({
        ...prev,
        image: imageUrl
      }))
    }
  }

  const removeImage = () => {
    setFormData(prev => ({
      ...prev,
      image: ''
    }))
  }

  const handleSave = async (isDraft = false) => {
    setIsSaving(true)
    
    // Validasi form
    if (!formData.title.trim()) {
      alert('Judul post harus diisi!')
      setIsSaving(false)
      return
    }
    
    if (!formData.content.trim()) {
      alert('Konten post harus diisi!')
      setIsSaving(false)
      return
    }

    try {
      // Simulasi save ke server
      const postData = {
        ...formData,
        id: Date.now(),
        author: 'Admin User',
        publishedAt: isDraft ? null : new Date().toISOString(),
        status: isDraft ? 'draft' : 'published',
        readTime: Math.ceil(formData.content.length / 1000) + ' min read',
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      }
      
      // Simulasi delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      console.log('Post saved:', postData)
      alert(`Post berhasil ${isDraft ? 'disimpan sebagai draft' : 'dipublikasikan'}!`)
      navigate('/dashboard')
    } catch (error) {
      console.error('Error saving post:', error)
      alert('Gagal menyimpan post. Silakan coba lagi.')
    } finally {
      setIsSaving(false)
    }
  }

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
            
            {formData.image && (
              <div className="mb-6">
                <img
                  src={formData.image}
                  alt={formData.title}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
            )}
            
            <CardTitle className="text-3xl font-bold mb-2">
              {formData.title || 'Judul Post'}
            </CardTitle>
            
            <CardDescription className="text-lg text-gray-600 mb-4">
              {formData.excerpt || 'Excerpt akan muncul di sini...'}
            </CardDescription>
            
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
              <span>By Admin User</span>
              <span>•</span>
              <span>{new Date().toLocaleDateString('id-ID')}</span>
              <span>•</span>
              <span>{Math.ceil(formData.content.length / 1000)} min read</span>
              {formData.category && (
                <>
                  <span>•</span>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    {formData.category}
                  </span>
                </>
              )}
            </div>
          </CardHeader>
          
          <CardContent>
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: formData.content || '<p>Konten akan muncul di sini...</p>' }}
            />
            
            {formData.tags && (
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Tags:</h4>
                <div className="flex flex-wrap gap-2">
                  {formData.tags.split(',').map((tag, index) => (
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
    )
  }

  if (isPreview) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          {renderPreview()}
        </div>
      </div>
    )
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
                onClick={() => navigate('/dashboard')}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Kembali
              </Button>
              <h1 className="text-2xl font-bold text-gray-900">Tambah Post Baru</h1>
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
                onClick={() => handleSave(true)}
                disabled={isSaving}
                className="flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Simpan Draft
              </Button>
              <Button
                onClick={() => handleSave(false)}
                disabled={isSaving}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
              >
                <Save className="w-4 h-4" />
                {isSaving ? 'Menyimpan...' : 'Publikasikan'}
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
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Masukkan judul post..."
                    className="w-full p-3 text-xl font-semibold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  <textarea
                    name="excerpt"
                    value={formData.excerpt}
                    onChange={handleInputChange}
                    placeholder="Masukkan excerpt..."
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </CardContent>
              </Card>

              {/* Content Editor */}
              <Card>
                <CardHeader>
                  <CardTitle>Konten</CardTitle>
                </CardHeader>
                <CardContent>
                  <RichTextEditor
                    content={formData.content}
                    onChange={handleContentChange}
                    placeholder="Mulai menulis konten post..."
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
                  {formData.image ? (
                    <div className="relative">
                      <img
                        src={formData.image}
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
                  ) : (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 mb-2">Upload gambar utama</p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <label
                        htmlFor="image-upload"
                        className="cursor-pointer text-blue-600 hover:text-blue-700 text-sm"
                      >
                        Pilih file
                      </label>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Category */}
              <Card>
                <CardHeader>
                  <CardTitle>Kategori</CardTitle>
                </CardHeader>
                <CardContent>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Pilih kategori</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </CardContent>
              </Card>

              {/* Tags */}
              <Card>
                <CardHeader>
                  <CardTitle>Tags</CardTitle>
                  <CardDescription>
                    Pisahkan dengan koma (,)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <input
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={handleInputChange}
                    placeholder="react, javascript, tutorial"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </CardContent>
              </Card>

              {/* Featured */}
              <Card>
                <CardHeader>
                  <CardTitle>Pengaturan</CardTitle>
                </CardHeader>
                <CardContent>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="featured"
                      checked={formData.featured}
                      onChange={handleInputChange}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm">Jadikan post unggulan</span>
                  </label>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddPostPage