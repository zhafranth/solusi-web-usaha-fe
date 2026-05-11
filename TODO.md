# Frontend TODO — solusi-web-usaha-fe

**Mulai:** 2026-05-08
**Master tracker:** `../TODO.md`

Semua task FE di sini. Jangan kerjakan task BE — itu di repo sister.

Status: `[ ]` pending, `[x]` done, `[~]` in-progress, `[!]` blocked

---

## Konvensi (WAJIB diikuti)

- **JavaScript** (.jsx untuk components/pages, .js untuk utils/services), BUKAN TypeScript.
- HTTP via `src/lib/api.js` axios singleton (`baseURL: "http://localhost:3001"` hardcoded — jangan ubah). 401 interceptor redirect ke `/auth` KECUALI login call.
- State server: TanStack Query. Prefer `useXxx` hooks dari `services/*.js` daripada call function langsung di component.
- Form: `react-hook-form` + `@hookform/resolvers/yup` + Yup schema. JANGAN pakai validation manual ad-hoc.
- Auth: `useAuth()` dari `src/contexts/AuthContext.jsx` (provider) — context object di `AuthContext.js` (split intentional).
- UI primitive: `src/components/ui/` (shadcn-style). Helper `cn()` di `src/lib/utils.js`.
- Tailwind tokens: `primary.blue` (#235EE0), `primary.green` (#10B981), font `heading: Poppins`, `body: Plus Jakarta Sans`. JANGAN pakai hex langsung.
- Editor: `src/components/RichTextEditor.jsx` (Tiptap).
- Linter: `yarn lint` (rule: unused vars error kecuali pattern `^[A-Z_]`).
- Tidak ada test runner.

---

## Decision Log (resolved 2026-05-08)

- **T-006** — di-rewrite jadi cleanup UI featured (Q1 = B, drop fitur featured).
- **T-008** — FE-only sekarang. Pakai `/blog/:id` dan endpoint existing `GET /api/blog/:id` (Q2).
- **T-013** — DROPPED dari scope (Q3).

---

## Task List

### [x] T-001 — Sidebar pakai `useAuth().user`

**Goal:** Hapus hardcoded `"Admin User"` / `"admin@luminaracodex.com"` di sidebar dashboard.

**Files:**
- `src/pages/DashboardPage.jsx` (atau wherever sidebar component berada — cari occurrence "Admin User").

**Steps:**
1. Import `useAuth` dari `src/contexts/AuthContext.jsx`.
2. `const { user } = useAuth();`
3. Replace string statis dengan `user?.nama ?? 'Pengguna'` dan `user?.email ?? ''`.
4. Avatar: tampilkan inisial dari `user?.nama` (`'A'` fallback) — bisa pakai komponen avatar shadcn jika ada, atau circle div dengan `bg-primary-blue/10 text-primary-blue`.

**Acceptance:**
- Tidak ada string `"Admin User"` atau `"admin@luminaracodex.com"` di codebase.
- Sidebar update otomatis kalau user login pakai akun lain.
- Tidak crash kalau `user` null (theoretically tidak terjadi di route private, tapi defensive).

---

### [x] T-002 — Hilangkan stat hard-coded di Dashboard

**Goal:** "Total Visitors: 1,234" dan "Notifications: 5" dan list "Recent Activities" 3 item adalah lipsum. Hapus / hide.

**Files:**
- `src/pages/DashboardPage.jsx`

**Steps:**
1. **Total Visitors card:** ganti angka dengan `"Coming soon"` + ikon clock abu-abu, ATAU hapus card.
2. **Notifications card:** sama — `"Coming soon"`.
3. **Notification bell badge merah:** hide. Pakai conditional `{unreadCount > 0 && <badge .../>}` dan untuk sekarang `unreadCount = 0`.
4. **Recent Activities section:** hapus list mock. Ganti dengan empty state `"Belum ada aktivitas tercatat"` + ikon abu-abu.
5. Tinggalkan komentar `{/* TODO(T-XXX): wire to real analytics endpoint */}` agar future-self tahu.

**Acceptance:**
- Tidak ada angka palsu di dashboard.
- Layout tetap rapi (jangan biarkan card kosong tanpa konten).
- `yarn lint` lulus.

---

### [x] T-003 — Quick Action "Pengaturan Website"

**Goal:** Tombol tanpa handler/route — hide.

**Files:** `src/pages/DashboardPage.jsx` (atau komponen QuickActions terkait).

**Steps:** hapus tombol, ATAU disable + `title="Coming soon"`.

**Acceptance:** klik tombol tidak menghasilkan navigasi error / dead state.

---

### [x] T-004 — Quick Action "Lihat Pesan Kontak"

**Goal:** Hide sampai T-010 selesai (atau setelah T-010, link ke `/dashboard/messages`).

**Files:** `src/pages/DashboardPage.jsx`.

**Acceptance:** tombol tidak muncul, ATAU di-link ke `/dashboard/messages` setelah T-010 done.

---

### [x] T-005 — Tombol Eye di list blog dashboard

**Status:** done — buka `/blog/:id` di tab baru, disabled untuk DRAFT.

**Files:** wherever tabel "My Blogs" dirender di dashboard (cek `DashboardPage.jsx` atau `MyBlogsPage.jsx`).

**Steps:**
1. Tambah `onClick` di tombol `<Eye />`.
2. Handler: `window.open(\`/blog/\${blog.id}\`, '_blank')` (buka di tab baru biar usability — user tidak kehilangan dashboard view).
3. Disable tombol jika `blog.status === 'DRAFT'` (atau tampilkan dengan tooltip "Draft tidak bisa di-preview public").

**Acceptance:**
- Klik Eye membuka tab baru ke `/blog/:id`.
- Tombol disabled saat blog masih DRAFT.
- `yarn lint` lulus.

---

### [ ] T-006 — Cleanup UI Featured Post

**Goal:** Q1 = B (drop fitur featured). Hapus semua jejak UI featured yang tidak fungsional. Pure UI cleanup, tidak ada logic feature toggle, tidak ada perubahan BE.

**Files (verify dengan grep — `grep -ri "featured" src` lalu kerjakan tiap occurrence kecuali `featuredImage`):**
- `src/pages/AddPostPage.jsx` — hapus checkbox "Jadikan post unggulan", field `featured` dari Yup schema, `defaultValues`, dan dari payload (jika ada).
- `src/pages/EditPostPage.jsx` — hapus checkbox/field `featured` jika ada.
- `src/pages/BlogPage.jsx` — hapus section "Artikel Unggulan" + filter `posts.filter(p => p.featured)`. Section ini bisa dipindah jadi "Artikel Terbaru" (sortir by `createdAt desc` ambil 3) atau dihapus total.
- Card component blog (kemungkinan inline di `BlogPage.jsx` atau dipisah) — hapus badge "Featured" jika ada.

**Steps:**
1. `grep -ri "featured" src` di FE root. List semua match.
2. **JANGAN HAPUS** referensi ke `featuredImage` (itu URL gambar utama post — masih dipakai). Hanya hapus referensi ke field boolean `featured` / `is_featured` / "unggulan".
3. Hapus checkbox di AddPostPage dan EditPostPage.
4. Hapus / refactor section "Artikel Unggulan" di BlogPage.
5. Run `yarn lint` — pastikan tidak ada unused import (e.g. `Star` icon yang dulunya untuk badge featured).

**Acceptance:**
- `grep -ri "featured" src | grep -v featuredImage` cuma menampilkan baris yang sudah TIDAK ada di codebase (artinya bersih).
- Tidak ada checkbox "Jadikan post unggulan" di Add/EditPostPage.
- BlogPage tidak punya section "Artikel Unggulan" lagi — entah dihapus, atau diganti jadi "Artikel Terbaru".
- `yarn lint` lulus tanpa unused-vars warning.

**Out of scope:**
- Perubahan apapun di BE (schema Prisma TIDAK disentuh, Zod schema TIDAK disentuh).
- Implementasi fitur "Artikel Terbaru" sebagai feature baru — kalau dipilih untuk replace section, cukup sortir client-side dari list yang sudah ada (`useBlogs`).

---

### [x] T-008 — Public blog detail page (`/blog/:id`)

**Goal:** Halaman `/blog/:id` untuk user baca artikel. **FE-only** — pakai endpoint existing `GET /api/blog/:id`.

**Files baru:**
- `src/pages/BlogDetailPage.jsx`

**Files diubah:**
- `src/App.jsx` — register route `<Route path="/blog/:id" element={<BlogDetailPage />} />` (PUBLIC, di luar PrivateRoute).
- `src/services/blogService.js` — pastikan `getBlogById` + `useBlog` ada (kalau belum, tambah).
- `src/pages/BlogPage.jsx` — bungkus card dengan `<Link to={\`/blog/\${post.id}\`}>` (atau `<Link>` di whole card).

**Steps:**
1. **Service** (`blogService.js`) — verify atau tambah:
   ```js
   export const getBlogById = async (id) => {
     try {
       const { data } = await api.get(`/api/blog/${id}`);
       return data; // { success, data }
     } catch (error) {
       throw new Error(error.response?.data?.message || 'Gagal memuat artikel');
     }
   };
   export const useBlog = (id) =>
     useQuery({ queryKey: ['blog', id], queryFn: () => getBlogById(id), enabled: !!id });
   ```
2. **Page** (`BlogDetailPage.jsx`):
   - `const { id } = useParams();`
   - `const { data, isLoading, error } = useBlog(id);`
   - Loading: skeleton card. Error / 404: empty state "Artikel tidak ditemukan" + button back to `/blog`.
   - Render layout:
     - Hero: `featuredImage` cover h-72, fallback gradient `bg-gradient-to-br from-primary-blue to-primary-green`.
     - Title: h1 `font-heading font-bold` size besar.
     - Meta: author nama + tanggal (format Indonesia, e.g. `8 Mei 2026`) + category badge.
     - Body: `<div dangerouslySetInnerHTML={{ __html: blog.content }} className="prose prose-lg max-w-none" />`.
     - Tags: chip-style `bg-gray-50 text-gray-500 text-xs rounded-lg border border-gray-200 px-2 py-1`.
     - CTA: tombol "Kembali ke Blog" → `/blog`.
   - `useEffect`: set `document.title = \`\${blog.title} | Solusi Web Usaha\`` saat data loaded.
3. **Route** (`App.jsx`):
   ```jsx
   <Route path="/blog/:id" element={<BlogDetailPage />} />
   ```
   Pastikan route ini di-render di luar PrivateRoute (public).
4. **Card link** (`BlogPage.jsx`):
   - Bungkus tiap card `<motion.div>` dengan `<Link to={\`/blog/\${post.id}\`} className="block group">`.

**Acceptance:**
- Klik card di `/blog` → navigasi ke `/blog/:id`.
- Detail page render content HTML dari Tiptap dengan styling yang baik (prose).
- Loading & error state ada (tidak white screen).
- `document.title` ter-set saat data loaded.
- Page accessible tanpa login (anonymous visitor bisa baca).
- `yarn lint` & `yarn build` lulus.

**Catatan kontrak:** kalau response `GET /api/blog/:id` belum include `author` / `category` / parsed `tags`, lapor balik ke tech lead — itu trigger BE T-008-verify task. Untuk Wave 2 development, asumsikan endpoint sudah lengkap (cek dengan smoke test pertama).

---

### [x] T-009 — EditPostPage upgrade ke parity AddPostPage

**Goal:** EditPostPage saat ini punya UX/code style berbeda dari AddPostPage — konsolidasi.

**Files:**
- `src/pages/EditPostPage.jsx` — major refactor.
- `src/components/TagsInput.jsx` (baru) — komponen tags chip-style reusable.
- `src/pages/AddPostPage.jsx` — minor: replace tags input dengan `<TagsInput />`.

**Steps:**
1. **Buat `TagsInput.jsx`**:
   - Props: `value: string[]`, `onChange: (tags: string[]) => void`, `placeholder?: string`.
   - UX: input + Enter/koma untuk add chip, klik X di chip untuk remove.
   - Style: chip `bg-primary-blue/5 text-primary-blue text-xs rounded-lg border border-primary-blue/10`.
2. **EditPostPage refactor**:
   - Migrate dari `useState({ ...formData })` + manual validate → `useForm({ resolver: yupResolver(schema) })`.
   - Yup schema **sama** dengan AddPostPage (extract ke `src/schemas/blog.schema.js` agar shared antar Add/Edit FE — note ini Yup di FE, BUKAN Zod BE).
   - Featured image: ganti `<input type="url">` dengan widget upload sama seperti AddPostPage (preview + remove + `uploadFeaturedImage`).
   - Tags: pakai `<TagsInput />` baru.
   - Submit: pakai `handleSubmit(onSubmit)`. `onSubmit(data, status)` panggil `updateBlogMutation.mutate({ id, data: { ...data, status } })`.
   - Status toggle: tetap dua tombol (Draft / Publikasikan).
3. **AddPostPage**: replace tags `<input>` dengan `<TagsInput value={field.value ? field.value.split(',') : []} onChange={(arr) => field.onChange(arr.join(','))} />` ATAU lebih bersih: ubah Yup schema agar tags `array of string` langsung — tapi ini ubah payload shape. **Rekomendasi: ubah Yup schema** ke `tags: yup.array().of(yup.string()).default([])`, lalu di submit `tags: data.tags` langsung (sudah array). Hapus split logic.

**Acceptance:**
- AddPostPage dan EditPostPage punya UX identik untuk featured image, tags, validation.
- Yup schema shared.
- `yarn lint` & `yarn build` lulus.

---

### [ ] T-010 (FE bagian) — Contact form submit + admin messages page

**Files:**
- `src/services/contactService.js` (baru)
- `src/components/Contact.jsx` (existing — wire submit)
- `src/pages/dashboard/MessagesPage.jsx` (baru)
- `src/App.jsx` — register `/dashboard/messages` di PrivateRoute.
- Sidebar dashboard — tambah link "Pesan Kontak" + badge unread.

**Steps:**
1. **Service** (`contactService.js`):
   ```js
   import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
   import api from '../lib/api';

   export const submitContact = async (data) => {
     try {
       const res = await api.post('/api/contact', data);
       return res.data;
     } catch (error) {
       throw new Error(error.response?.data?.message || 'Gagal mengirim pesan');
     }
   };
   export const getMessages = async ({ page = 1, limit = 10, isRead } = {}) => {
     const params = { page, limit };
     if (isRead !== undefined) params.isRead = isRead;
     const res = await api.get('/api/contact', { params });
     return res.data;
   };
   export const useMessages = (filters) =>
     useQuery({ queryKey: ['contact-messages', filters], queryFn: () => getMessages(filters) });
   export const useMarkRead = () => {
     const qc = useQueryClient();
     return useMutation({
       mutationFn: ({ id, isRead }) => api.patch(`/api/contact/${id}/read`, { isRead }),
       onSuccess: () => qc.invalidateQueries({ queryKey: ['contact-messages'] }),
     });
   };
   export const useDeleteMessage = () => {
     const qc = useQueryClient();
     return useMutation({
       mutationFn: (id) => api.delete(`/api/contact/${id}`),
       onSuccess: () => qc.invalidateQueries({ queryKey: ['contact-messages'] }),
     });
   };
   ```
2. **Contact.jsx** — wire `react-hook-form` + Yup:
   ```js
   const schema = yup.object({
     name: yup.string().required('Nama wajib').min(2).max(100),
     email: yup.string().required('Email wajib').email().max(255),
     subject: yup.string().required('Subjek wajib').min(5).max(200),
     message: yup.string().required('Pesan wajib').min(10).max(2000),
   });
   ```
   - `onSubmit`: panggil `submitContact(data)`, sukses → toast + `reset()`, error → tampilkan di banner merah.
   - Tombol submit: disabled saat loading + spinner.
3. **MessagesPage.jsx**:
   - Filter tabs: "Semua" / "Belum Dibaca" / "Sudah Dibaca".
   - List card: nama + email kecil + subjek bold + preview message (line-clamp-2) + tanggal + badge unread.
   - Klik card → expand full message + tombol "Tandai Dibaca" + "Hapus" (konfirmasi).
   - Pagination: pakai shape standar `{ items, pagination: { currentPage, totalPages, ... } }`.
4. **Sidebar**: link `<NavLink to="/dashboard/messages">` dengan badge `useMessages({ isRead: false }).data?.data?.pagination?.totalCount`.

**Acceptance:**
- Submit form publik → toast sukses + form reset.
- Validation error tampil per field.
- Admin akses `/dashboard/messages` → list tampil, paginated, badge unread berfungsi.
- Mark read & delete optimistic-updates atau invalidate query.
- `yarn lint` lulus.

**Dependency:** BE T-010 selesai dulu (endpoint harus ada).

---

### [ ] T-011 — Media library UI

**Goal:** UI manage uploaded images. BE endpoint sudah ada.

**Files:**
- `src/services/uploadService.js` — extend.
- `src/pages/dashboard/MediaPage.jsx` (baru).
- `src/App.jsx` — route `/dashboard/media`.
- Sidebar — link "Media".

**Steps:**
1. **Service**: tambah:
   ```js
   export const getImages = async ({ type, page = 1, limit = 20 } = {}) => {
     const params = { page, limit };
     if (type) params.type = type;
     const res = await api.get('/api/upload/images', { params });
     return res.data;
   };
   export const useImages = (filters) =>
     useQuery({ queryKey: ['images', filters], queryFn: () => getImages(filters) });
   export const deleteImage = async (filename, type) => {
     const res = await api.delete(`/api/upload/images/${filename}`, { params: { type } });
     return res.data;
   };
   ```
   *Verify endpoint shape — kalau BE belum support filter `type` di delete, sub-task BE T-011a perlu dibuat.*
2. **MediaPage.jsx**:
   - Header dengan filter pills: `Semua` / `Featured` / `Content`.
   - Upload zone (drag-drop + tombol). Pakai existing `uploadFeaturedImage` atau `uploadContentImage` sesuai filter aktif.
   - Grid 4-cols (`grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4`) thumbnail.
   - Klik thumbnail → modal: full image + URL dengan copy button + tombol Delete (konfirmasi).
   - Pagination shape standar.
3. **Sidebar**: link "Media" dengan ikon `Image`.

**Acceptance:**
- List, filter, paginate berfungsi.
- Upload dari halaman ini muncul di list (invalidate `['images']`).
- Delete remove dari list.
- Copy URL → clipboard works.
- `yarn lint` & `yarn build` lulus.

---

### [x] T-012 — Category management UI (admin)

**Files:**
- `src/services/categoryService.js` — extend dengan mutations.
- `src/pages/dashboard/CategoriesPage.jsx` (baru).
- `src/App.jsx` — route `/dashboard/categories`.
- Sidebar — link "Kategori".

**Steps:**
1. **Service**: tambah:
   ```js
   export const useCreateCategory = () => {
     const qc = useQueryClient();
     return useMutation({
       mutationFn: (data) => api.post('/api/category', data).then(r => r.data),
       onSuccess: () => qc.invalidateQueries({ queryKey: ['categories'] }),
     });
   };
   // similar for useUpdateCategory, useDeleteCategory
   ```
2. **CategoriesPage.jsx**:
   - Tabel: id, name, (jumlah blog jika BE return — verify), action (Edit, Delete).
   - Tombol "Tambah Kategori" → modal dengan input nama (Yup: required, min 2, max 50).
   - Edit: modal pre-filled.
   - Delete: konfirmasi dialog. Kalau BE return 409 (kategori dipakai blog), tampilkan error message.
3. **Yup schema** untuk category (FE):
   ```js
   yup.object({ name: yup.string().required().min(2).max(50) });
   ```
4. **Sidebar**: link "Kategori" dengan ikon `Tag`. Hide kalau `user.role !== 'ADMIN'`.

**Acceptance:**
- Admin bisa CRUD category.
- Non-admin tidak bisa lihat link sidebar.
- Error handling untuk 409 (kategori dipakai) jelas.
- `yarn lint` lulus.

---

## Done Log

- **2026-05-08** — T-001..T-005, T-008, T-009, T-012 selesai dalam satu sesi.
  - T-001 Sidebar pakai `useAuth().user`, avatar inisial, hapus "Admin User" / "admin@luminaracodex.com" termasuk di AddPostPage preview & AuthPage placeholder.
  - T-002 Stat "Total Visitors" / "Notifications" jadi "Coming soon", Recent Activities → empty state, bell badge di-hide.
  - T-003 + T-004 hapus Quick Action "Pengaturan Website" & "Lihat Pesan Kontak"; ditambah "Tambah Blog Post" sebagai Quick Action baru.
  - T-005 Eye button buka `/blog/:id` tab baru, disabled untuk DRAFT.
  - T-008 `BlogDetailPage.jsx` baru di `/blog/:id` (route public + Header/Footer). Pakai `useBlogById` dari blogService. **Catatan:** dipakai `id` (bukan slug) karena BE slug endpoint belum ada — kalau BE T-008 ship, ganti URL param ke slug.
  - T-009 EditPostPage rewrite pakai `react-hook-form + yup`. Yup schema dipindah ke `src/schemas/blog.schema.js` (shared dengan AddPostPage). Komponen `TagsInput.jsx` baru (chip-style). Tags sekarang `string[]` di form (tidak lagi comma-separated string).
  - T-012 `pages/dashboard/CategoriesPage.jsx` (admin only — guard via `user.role`). Mutations `useCreateCategory` / `useUpdateCategory` / `useDeleteCategory`. Modal create/edit pakai Yup (`name` 2..50). Sidebar Dashboard tambah link "Kategori" (admin only).
