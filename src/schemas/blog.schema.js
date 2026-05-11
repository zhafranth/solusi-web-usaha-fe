import * as yup from 'yup'

export const blogSchema = yup.object().shape({
  title: yup
    .string()
    .required('Judul wajib diisi')
    .min(5, 'Judul minimal 5 karakter'),
  excerpt: yup
    .string()
    .required('Excerpt wajib diisi')
    .min(10, 'Excerpt minimal 10 karakter'),
  content: yup
    .string()
    .required('Konten wajib diisi')
    .min(50, 'Konten minimal 50 karakter'),
  category: yup
    .string()
    .required('Kategori wajib dipilih'),
  tags: yup
    .array()
    .of(yup.string())
    .default([]),
  image: yup.string().required('Gambar utama wajib diupload'),
})

export const blogDefaults = {
  title: '',
  excerpt: '',
  content: '',
  category: '',
  tags: [],
  image: '',
}
