import { useCallback, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft,
  Upload,
  Loader2,
  Image as ImageIcon,
  Trash2,
  X,
  Copy,
  Check,
  AlertCircle,
} from 'lucide-react'
import { Button } from '../../components/ui/button'
import {
  useImages,
  useUploadImage,
  useDeleteImage,
} from '../../services/uploadService'

const FILTERS = [
  { id: 'all', label: 'Semua', type: undefined },
  { id: 'featured', label: 'Featured', type: 'featured' },
  { id: 'content', label: 'Content', type: 'content' },
]

const PAGE_LIMIT = 20

const ALLOWED_MIMES = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
const MAX_SIZE = 5 * 1024 * 1024

const formatBytes = (bytes) => {
  if (!bytes && bytes !== 0) return '-'
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`
}

const formatDate = (value) => {
  if (!value) return ''
  try {
    return new Date(value).toLocaleString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  } catch {
    return ''
  }
}

const PreviewModal = ({ image, onClose, onDeleted }) => {
  const deleteMutation = useDeleteImage()
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [copied, setCopied] = useState(false)
  const [actionError, setActionError] = useState('')

  if (!image) return null

  const handleCopy = async () => {
    setActionError('')
    try {
      await navigator.clipboard.writeText(image.url)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      setActionError('Gagal menyalin URL ke clipboard')
    }
  }

  const handleConfirmDelete = () => {
    setActionError('')
    deleteMutation.mutate(
      { filename: image.filename, type: image.type },
      {
        onSuccess: () => {
          onDeleted()
        },
        onError: (err) => {
          setActionError(err.message || 'Gagal menghapus gambar')
        },
      },
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="min-w-0">
            <h3 className="text-base font-heading font-bold text-gray-900 truncate">
              {image.filename}
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              {image.type === 'featured' ? 'Featured' : 'Content'} ·{' '}
              {formatBytes(image.size)} · {formatDate(image.createdAt)}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1 flex-shrink-0"
            aria-label="Tutup"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="bg-gray-50 flex items-center justify-center p-4 max-h-[60vh] overflow-auto">
          <img
            src={image.url}
            alt={image.filename}
            className="max-w-full max-h-[55vh] object-contain rounded-lg"
          />
        </div>

        <div className="px-6 py-4 space-y-4 border-t border-gray-100">
          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
              URL Gambar
            </label>
            <div className="flex items-stretch gap-2">
              <input
                type="text"
                readOnly
                value={image.url}
                onFocus={(e) => e.currentTarget.select()}
                className="flex-1 min-w-0 px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-700 font-mono outline-none focus:border-primary-blue"
              />
              <Button
                type="button"
                variant="outline"
                onClick={handleCopy}
                className="rounded-xl text-xs"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 mr-1.5 text-primary-green" />
                    Tersalin
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 mr-1.5" />
                    Salin
                  </>
                )}
              </Button>
            </div>
          </div>

          {actionError && (
            <div className="flex items-start gap-2 px-3 py-2 bg-red-50 border border-red-100 rounded-xl">
              <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-red-600">{actionError}</p>
            </div>
          )}

          {confirmDelete ? (
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 bg-red-50 border border-red-100 rounded-xl">
              <p className="text-sm text-red-700 flex-1">
                Yakin ingin menghapus gambar ini? Tindakan ini tidak dapat dibatalkan.
              </p>
              <div className="flex gap-2 flex-shrink-0">
                <Button
                  variant="outline"
                  onClick={() => setConfirmDelete(false)}
                  disabled={deleteMutation.isPending}
                  className="rounded-xl"
                >
                  Batal
                </Button>
                <Button
                  onClick={handleConfirmDelete}
                  disabled={deleteMutation.isPending}
                  className="bg-red-500 hover:bg-red-600 text-white rounded-xl"
                >
                  {deleteMutation.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Menghapus...
                    </>
                  ) : (
                    'Hapus'
                  )}
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex justify-end">
              <Button
                variant="outline"
                onClick={() => setConfirmDelete(true)}
                className="rounded-xl text-red-600 border-red-100 hover:bg-red-50 hover:border-red-200"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Hapus Gambar
              </Button>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

const MediaPage = () => {
  const navigate = useNavigate()
  const [filterId, setFilterId] = useState('all')
  const [page, setPage] = useState(1)
  const [selected, setSelected] = useState(null)
  const [dragActive, setDragActive] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const fileInputRef = useRef(null)

  const activeFilter = useMemo(
    () => FILTERS.find((f) => f.id === filterId) || FILTERS[0],
    [filterId],
  )

  const uploadType = activeFilter.type === 'featured' ? 'featured' : 'content'

  const { data, isLoading, error, refetch, isFetching } = useImages({
    type: activeFilter.type,
    page,
    limit: PAGE_LIMIT,
  })

  const uploadMutation = useUploadImage()

  const images = data?.data?.images || []
  const pagination = data?.data?.pagination || {}

  const validateFile = (file) => {
    if (!ALLOWED_MIMES.includes(file.type)) {
      return 'Format file tidak didukung. Gunakan JPEG, PNG, GIF, atau WebP.'
    }
    if (file.size > MAX_SIZE) {
      return 'Ukuran file terlalu besar. Maksimal 5MB.'
    }
    return null
  }

  const handleFiles = useCallback(
    async (fileList) => {
      const files = Array.from(fileList || [])
      if (!files.length) return

      setUploadError('')
      const errors = []
      for (const file of files) {
        const message = validateFile(file)
        if (message) {
          errors.push(`${file.name}: ${message}`)
          continue
        }
        try {
          await uploadMutation.mutateAsync({ file, type: uploadType })
        } catch (err) {
          errors.push(`${file.name}: ${err.message || 'Gagal upload'}`)
        }
      }
      if (errors.length) setUploadError(errors.join(' · '))
    },
    [uploadMutation, uploadType],
  )

  const handleFilterChange = (id) => {
    setFilterId(id)
    setPage(1)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setDragActive(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setDragActive(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragActive(false)
    handleFiles(e.dataTransfer.files)
  }

  return (
    <div className="min-h-screen bg-gray-50/80 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6"
          >
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => navigate('/dashboard')}
                className="rounded-xl"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Kembali
              </Button>
              <div>
                <h1 className="text-xl font-heading font-bold text-gray-900">Media</h1>
                <p className="text-xs text-gray-500 mt-0.5">
                  Kelola gambar yang sudah diupload
                </p>
              </div>
            </div>
          </motion.div>

          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div className="flex flex-wrap gap-2">
              {FILTERS.map((f) => {
                const active = f.id === filterId
                return (
                  <button
                    key={f.id}
                    onClick={() => handleFilterChange(f.id)}
                    className={`px-4 py-2 text-xs rounded-xl border transition-all ${
                      active
                        ? 'bg-primary-blue text-white border-primary-blue shadow-md shadow-primary-blue/20'
                        : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {f.label}
                  </button>
                )
              })}
            </div>
            <p className="text-xs text-gray-400">
              {pagination.totalCount || 0} gambar · upload type:{' '}
              <span className="font-medium text-gray-600">{uploadType}</span>
            </p>
          </div>

          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`relative mb-6 rounded-2xl border-2 border-dashed transition-all ${
              dragActive
                ? 'border-primary-blue bg-primary-blue/5'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <div className="px-6 py-8 text-center">
              <div className="w-12 h-12 rounded-2xl bg-primary-blue/10 text-primary-blue flex items-center justify-center mx-auto mb-3">
                <Upload className="w-5 h-5" />
              </div>
              <p className="text-sm font-medium text-gray-900 mb-1">
                Tarik & lepas gambar di sini, atau klik untuk pilih file
              </p>
              <p className="text-xs text-gray-500 mb-4">
                JPEG, PNG, GIF, WebP · maksimal 5MB · upload sebagai{' '}
                <span className="font-semibold">{uploadType}</span>
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept={ALLOWED_MIMES.join(',')}
                multiple
                hidden
                onChange={(e) => {
                  handleFiles(e.target.files)
                  e.target.value = ''
                }}
              />
              <Button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploadMutation.isPending}
                className="bg-primary-blue hover:bg-primary-blue/90 rounded-xl"
              >
                {uploadMutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Mengupload...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 mr-2" />
                    Pilih File
                  </>
                )}
              </Button>
              {uploadError && (
                <div className="mt-4 mx-auto max-w-xl px-3 py-2 bg-red-50 border border-red-100 rounded-xl">
                  <p className="text-xs text-red-600">{uploadError}</p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            {isLoading && (
              <div className="p-12 text-center">
                <Loader2 className="w-6 h-6 text-primary-blue mx-auto mb-3 animate-spin" />
                <p className="text-gray-400 text-sm">Memuat gambar...</p>
              </div>
            )}

            {error && !isLoading && (
              <div className="p-12 text-center">
                <ImageIcon className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                <p className="text-red-500 text-sm mb-3">Gagal memuat gambar</p>
                <Button onClick={() => refetch()} variant="outline" size="sm" className="rounded-xl">
                  Coba Lagi
                </Button>
              </div>
            )}

            {!isLoading && !error && images.length === 0 && (
              <div className="p-12 text-center">
                <ImageIcon className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-400 text-sm">Belum ada gambar</p>
              </div>
            )}

            {!isLoading && !error && images.length > 0 && (
              <div className="p-4 sm:p-6">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {images.map((image) => (
                    <button
                      key={`${image.type}-${image.filename}`}
                      type="button"
                      onClick={() => setSelected(image)}
                      className="group relative aspect-square rounded-xl overflow-hidden bg-gray-100 border border-gray-100 hover:border-primary-blue/30 hover:shadow-md transition-all"
                    >
                      <img
                        src={image.url}
                        alt={image.filename}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <p className="text-[11px] text-white font-medium truncate">
                          {image.filename}
                        </p>
                        <p className="text-[10px] text-white/80">
                          {image.type} · {formatBytes(image.size)}
                        </p>
                      </div>
                      <span
                        className={`absolute top-2 left-2 px-2 py-0.5 text-[10px] font-medium rounded-lg ${
                          image.type === 'featured'
                            ? 'bg-primary-blue text-white'
                            : 'bg-white/90 text-gray-700'
                        }`}
                      >
                        {image.type}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {!isLoading && !error && pagination.totalPages > 1 && (
              <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
                <p className="text-xs text-gray-400">
                  Halaman {pagination.currentPage} dari {pagination.totalPages} (
                  {pagination.totalCount} total)
                </p>
                <div className="flex gap-1.5">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={!pagination.hasPrevPage || isFetching}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    className="rounded-lg text-xs"
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={!pagination.hasNextPage || isFetching}
                    onClick={() => setPage((p) => p + 1)}
                    className="rounded-lg text-xs"
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <PreviewModal
            image={selected}
            onClose={() => setSelected(null)}
            onDeleted={() => setSelected(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default MediaPage
