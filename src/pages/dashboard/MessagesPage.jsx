import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft,
  Mail,
  MailOpen,
  Inbox,
  Loader2,
  Trash2,
  CheckCheck,
  RotateCcw,
  ChevronDown,
} from 'lucide-react'
import { Button } from '../../components/ui/button'
import { useAuth } from '../../hooks/useAuth'
import {
  useMessages,
  useMarkRead,
  useDeleteMessage,
} from '../../services/contactService'

const FILTERS = [
  { id: 'all', label: 'Semua', isRead: undefined },
  { id: 'unread', label: 'Belum Dibaca', isRead: false },
  { id: 'read', label: 'Sudah Dibaca', isRead: true },
]

const PAGE_LIMIT = 10

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

const DeleteMessageModal = ({ open, target, onClose, onConfirm, isPending, error }) => (
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
              <h3 className="text-base font-heading font-bold text-gray-900">Hapus Pesan</h3>
              <p className="text-xs text-gray-500">Tindakan ini tidak dapat dibatalkan</p>
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Hapus pesan dari <span className="font-semibold">{target?.name}</span> dengan subjek{' '}
            <span className="font-semibold">"{target?.subject}"</span>?
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

const MessagesPage = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const isAdmin = user?.role === 'ADMIN'

  const [filterId, setFilterId] = useState('all')
  const [page, setPage] = useState(1)
  const [expandedId, setExpandedId] = useState(null)
  const [deleting, setDeleting] = useState(null)
  const [deleteError, setDeleteError] = useState('')

  const activeFilter = useMemo(
    () => FILTERS.find((f) => f.id === filterId) || FILTERS[0],
    [filterId],
  )

  const { data, isLoading, error, refetch, isFetching } = useMessages({
    page,
    limit: PAGE_LIMIT,
    isRead: activeFilter.isRead,
  })

  const markReadMutation = useMarkRead()
  const deleteMutation = useDeleteMessage()

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50/80 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <Inbox className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h1 className="text-xl font-heading font-bold text-gray-900 mb-2">Akses ditolak</h1>
          <p className="text-sm text-gray-500 mb-6">Halaman ini hanya tersedia untuk admin.</p>
          <Button onClick={() => navigate('/dashboard')} className="rounded-xl">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Dashboard
          </Button>
        </div>
      </div>
    )
  }

  const messages = data?.data?.messages || []
  const pagination = data?.data?.pagination || {}

  const handleFilterChange = (id) => {
    setFilterId(id)
    setPage(1)
    setExpandedId(null)
  }

  const handleToggleExpand = (message) => {
    const willExpand = expandedId !== message.id
    setExpandedId(willExpand ? message.id : null)
    if (willExpand && !message.isRead) {
      markReadMutation.mutate({ id: message.id, isRead: true })
    }
  }

  const handleToggleRead = (message) => {
    markReadMutation.mutate(
      { id: message.id, isRead: !message.isRead },
      {
        onError: (err) => alert(err.message || 'Gagal memperbarui status pesan'),
      },
    )
  }

  const askDelete = (message) => {
    setDeleting(message)
    setDeleteError('')
  }

  const confirmDelete = () => {
    if (!deleting) return
    setDeleteError('')
    deleteMutation.mutate(deleting.id, {
      onSuccess: () => {
        if (expandedId === deleting.id) setExpandedId(null)
        setDeleting(null)
      },
      onError: (err) => setDeleteError(err.message || 'Gagal menghapus pesan'),
    })
  }

  return (
    <div className="min-h-screen bg-gray-50/80 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
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
                <h1 className="text-xl font-heading font-bold text-gray-900">Pesan Kontak</h1>
                <p className="text-xs text-gray-500 mt-0.5">
                  Pesan masuk dari halaman kontak publik
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={() => refetch()}
              disabled={isFetching}
              className="rounded-xl"
            >
              {isFetching ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <RotateCcw className="w-4 h-4 mr-2" />
              )}
              Muat Ulang
            </Button>
          </motion.div>

          <div className="flex flex-wrap gap-2 mb-6">
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

          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            {isLoading && (
              <div className="p-12 text-center">
                <Loader2 className="w-6 h-6 text-primary-blue mx-auto mb-3 animate-spin" />
                <p className="text-gray-400 text-sm">Memuat pesan...</p>
              </div>
            )}

            {error && !isLoading && (
              <div className="p-12 text-center">
                <Inbox className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                <p className="text-red-500 text-sm mb-3">Gagal memuat pesan</p>
                <Button onClick={() => refetch()} variant="outline" size="sm" className="rounded-xl">
                  Coba Lagi
                </Button>
              </div>
            )}

            {!isLoading && !error && messages.length === 0 && (
              <div className="p-12 text-center">
                <Inbox className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-400 text-sm">Tidak ada pesan</p>
              </div>
            )}

            {!isLoading && !error && messages.length > 0 && (
              <div className="divide-y divide-gray-50">
                {messages.map((message) => {
                  const isExpanded = expandedId === message.id
                  const Icon = message.isRead ? MailOpen : Mail
                  return (
                    <div key={message.id} className="transition-colors">
                      <button
                        type="button"
                        onClick={() => handleToggleExpand(message)}
                        className="w-full text-left px-6 py-4 hover:bg-gray-50/50 transition-colors flex items-start gap-3"
                      >
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                            message.isRead
                              ? 'bg-gray-100 text-gray-400'
                              : 'bg-primary-blue/10 text-primary-blue'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <p
                              className={`text-sm truncate ${
                                message.isRead
                                  ? 'font-medium text-gray-700'
                                  : 'font-semibold text-gray-900'
                              }`}
                            >
                              {message.subject}
                            </p>
                            {!message.isRead && (
                              <span className="px-2 py-0.5 text-[10px] font-medium rounded-lg bg-primary-blue/10 text-primary-blue flex-shrink-0">
                                Baru
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-500 mb-1 truncate">
                            <span className="font-medium text-gray-700">{message.name}</span>
                            <span className="mx-1.5 text-gray-300">·</span>
                            <span>{message.email}</span>
                          </p>
                          {!isExpanded && (
                            <p className="text-xs text-gray-500 line-clamp-2">
                              {message.message}
                            </p>
                          )}
                          <p className="text-[11px] text-gray-400 mt-1">
                            {formatDate(message.createdAt)}
                          </p>
                        </div>
                        <ChevronDown
                          className={`w-4 h-4 text-gray-300 flex-shrink-0 mt-1.5 transition-transform ${
                            isExpanded ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-5 pl-[4.5rem]">
                              <div className="bg-gray-50/70 rounded-xl p-4 border border-gray-100 mb-4">
                                <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                                  {message.message}
                                </p>
                              </div>
                              <div className="flex flex-wrap items-center gap-2">
                                <a
                                  href={`mailto:${message.email}?subject=Re: ${encodeURIComponent(message.subject)}`}
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg border border-gray-200 text-gray-700 hover:border-primary-blue hover:text-primary-blue transition-colors"
                                >
                                  <Mail className="w-3.5 h-3.5" />
                                  Balas via Email
                                </a>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="rounded-lg text-xs"
                                  disabled={markReadMutation.isPending}
                                  onClick={() => handleToggleRead(message)}
                                >
                                  <CheckCheck className="w-3.5 h-3.5 mr-1.5" />
                                  {message.isRead ? 'Tandai Belum Dibaca' : 'Tandai Sudah Dibaca'}
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="rounded-lg text-xs text-red-600 border-red-100 hover:bg-red-50 hover:border-red-200"
                                  onClick={() => askDelete(message)}
                                >
                                  <Trash2 className="w-3.5 h-3.5 mr-1.5" />
                                  Hapus
                                </Button>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                })}
              </div>
            )}

            {!isLoading && !error && pagination.totalPages > 1 && (
              <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
                <p className="text-xs text-gray-400">
                  Halaman {pagination.currentPage} dari {pagination.totalPages} ({pagination.totalCount} total)
                </p>
                <div className="flex gap-1.5">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={!pagination.hasPrevPage}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    className="rounded-lg text-xs"
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={!pagination.hasNextPage}
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

      <DeleteMessageModal
        open={!!deleting}
        target={deleting}
        onClose={() => {
          setDeleting(null)
          setDeleteError('')
        }}
        onConfirm={confirmDelete}
        isPending={deleteMutation.isPending}
        error={deleteError}
      />
    </div>
  )
}

export default MessagesPage
