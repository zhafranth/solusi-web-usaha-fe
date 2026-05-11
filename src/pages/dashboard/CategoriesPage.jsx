import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Plus, Edit, Trash2, Tag, Loader2, X } from 'lucide-react'
import { Button } from '../../components/ui/button'
import {
  useCategories,
  useCreateCategory,
  useUpdateCategory,
  useDeleteCategory,
} from '../../services/categoryService'
import { useAuth } from '../../hooks/useAuth'

const categorySchema = yup.object().shape({
  name: yup
    .string()
    .required('Nama kategori wajib diisi')
    .min(2, 'Nama minimal 2 karakter')
    .max(50, 'Nama maksimal 50 karakter'),
})

const CategoryFormModal = ({ open, onClose, initial, onSubmit, isPending }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(categorySchema),
    defaultValues: { name: initial?.name || '' },
    values: { name: initial?.name || '' },
  })

  const close = () => {
    reset()
    onClose()
  }

  const submit = (data) => {
    onSubmit(data, () => {
      reset()
      onClose()
    })
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl"
          >
            <div className="flex items-start justify-between mb-5">
              <div>
                <h3 className="text-base font-heading font-bold text-gray-900">
                  {initial ? 'Edit Kategori' : 'Tambah Kategori'}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  {initial ? 'Perbarui nama kategori' : 'Buat kategori baru untuk artikel'}
                </p>
              </div>
              <button
                type="button"
                onClick={close}
                className="text-gray-400 hover:text-gray-600 p-1"
                disabled={isPending}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit(submit)} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                  Nama Kategori
                </label>
                <input
                  type="text"
                  autoFocus
                  {...register('name')}
                  placeholder="Contoh: Tutorial"
                  className={`w-full px-4 py-3 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-primary-blue/20 focus:border-primary-blue focus:bg-white text-sm outline-none transition-all ${
                    errors.name ? 'border-red-400' : 'border-gray-200'
                  }`}
                />
                {errors.name && (
                  <p className="mt-1.5 text-xs text-red-500">{errors.name.message}</p>
                )}
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={close}
                  disabled={isPending}
                  className="rounded-xl"
                >
                  Batal
                </Button>
                <Button
                  type="submit"
                  disabled={isPending}
                  className="bg-primary-blue hover:bg-primary-blue/90 text-white rounded-xl"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Menyimpan...
                    </>
                  ) : initial ? (
                    'Simpan'
                  ) : (
                    'Buat'
                  )}
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

const DeleteConfirmModal = ({ open, target, onClose, onConfirm, isPending, error }) => (
  <AnimatePresence>
    {open && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center">
              <Trash2 className="w-5 h-5 text-red-500" />
            </div>
            <div>
              <h3 className="text-base font-heading font-bold text-gray-900">Hapus Kategori</h3>
              <p className="text-xs text-gray-500">Tindakan ini tidak dapat dibatalkan</p>
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Hapus kategori <span className="font-semibold">"{target?.name}"</span>?
          </p>
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-xl">
              <p className="text-xs text-red-600">{error}</p>
            </div>
          )}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose} disabled={isPending} className="rounded-xl">
              Batal
            </Button>
            <Button
              onClick={onConfirm}
              disabled={isPending}
              className="bg-red-500 hover:bg-red-600 text-white rounded-xl"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Menghapus...
                </>
              ) : (
                'Hapus'
              )}
            </Button>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
)

const CategoriesPage = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { data: categories = [], isLoading, error } = useCategories()
  const createMutation = useCreateCategory()
  const updateMutation = useUpdateCategory()
  const deleteMutation = useDeleteCategory()

  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [deleting, setDeleting] = useState(null)
  const [deleteError, setDeleteError] = useState('')

  const isAdmin = user?.role === 'ADMIN'

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50/80 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <Tag className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h1 className="text-xl font-heading font-bold text-gray-900 mb-2">
            Akses ditolak
          </h1>
          <p className="text-sm text-gray-500 mb-6">
            Halaman ini hanya tersedia untuk admin.
          </p>
          <Button onClick={() => navigate('/dashboard')} className="rounded-xl">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Dashboard
          </Button>
        </div>
      </div>
    )
  }

  const openCreate = () => {
    setEditing(null)
    setFormOpen(true)
  }

  const openEdit = (category) => {
    setEditing(category)
    setFormOpen(true)
  }

  const handleSubmit = (data, done) => {
    if (editing) {
      updateMutation.mutate(
        { id: editing.id, data: { name: data.name.trim() } },
        {
          onSuccess: () => done(),
          onError: (err) => alert(err.message || 'Gagal memperbarui kategori'),
        },
      )
    } else {
      createMutation.mutate(
        { name: data.name.trim() },
        {
          onSuccess: () => done(),
          onError: (err) => alert(err.message || 'Gagal membuat kategori'),
        },
      )
    }
  }

  const handleDelete = () => {
    if (!deleting) return
    setDeleteError('')
    deleteMutation.mutate(deleting.id, {
      onSuccess: () => {
        setDeleting(null)
      },
      onError: (err) => {
        setDeleteError(err.message || 'Gagal menghapus kategori')
      },
    })
  }

  return (
    <div className="min-h-screen bg-gray-50/80 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8"
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
                <h1 className="text-xl font-heading font-bold text-gray-900">Kategori</h1>
                <p className="text-xs text-gray-500 mt-0.5">Kelola kategori artikel blog</p>
              </div>
            </div>
            <Button
              onClick={openCreate}
              className="bg-primary-blue hover:bg-primary-blue/90 rounded-xl shadow-md shadow-primary-blue/20"
            >
              <Plus className="w-4 h-4 mr-2" />
              Tambah Kategori
            </Button>
          </motion.div>

          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            {isLoading && (
              <div className="p-12 text-center">
                <Loader2 className="w-6 h-6 text-primary-blue mx-auto mb-3 animate-spin" />
                <p className="text-gray-400 text-sm">Memuat kategori...</p>
              </div>
            )}

            {error && !isLoading && (
              <div className="p-12 text-center">
                <Tag className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                <p className="text-red-500 text-sm">Gagal memuat kategori</p>
              </div>
            )}

            {!isLoading && !error && categories.length === 0 && (
              <div className="p-12 text-center">
                <Tag className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-400 text-sm mb-4">Belum ada kategori</p>
                <Button onClick={openCreate} variant="outline" size="sm" className="rounded-xl">
                  <Plus className="w-3.5 h-3.5 mr-1.5" />
                  Tambah Kategori Pertama
                </Button>
              </div>
            )}

            {!isLoading && !error && categories.length > 0 && (
              <div className="divide-y divide-gray-50">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className="flex items-center justify-between px-6 py-4 hover:bg-gray-50/50 transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-xl bg-primary-blue/10 text-primary-blue flex items-center justify-center flex-shrink-0">
                        <Tag className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">{category.name}</p>
                        <p className="text-xs text-gray-400">ID #{category.id}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <button
                        onClick={() => openEdit(category)}
                        className="p-2 rounded-lg text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 transition-all"
                        aria-label="Edit kategori"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          setDeleting(category)
                          setDeleteError('')
                        }}
                        className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all"
                        aria-label="Hapus kategori"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <CategoryFormModal
        open={formOpen}
        initial={editing}
        onClose={() => setFormOpen(false)}
        onSubmit={handleSubmit}
        isPending={createMutation.isPending || updateMutation.isPending}
      />

      <DeleteConfirmModal
        open={!!deleting}
        target={deleting}
        onClose={() => {
          setDeleting(null)
          setDeleteError('')
        }}
        onConfirm={handleDelete}
        isPending={deleteMutation.isPending}
        error={deleteError}
      />
    </div>
  )
}

export default CategoriesPage
