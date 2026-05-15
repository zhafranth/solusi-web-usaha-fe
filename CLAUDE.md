# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Marketing site for "Solusi Web Usaha" — a web-dev agency targeting UMKM/SMEs. SPA built with React 19 + Vite 7 + Tailwind 3. This directory is its own git repo.

**Current state: pure frontend, no backend integration yet.** All content shown on the public-facing pages (Hero, Services, About, Contact, Service detail, etc.) is hardcoded in components or sourced from `src/i18n/translations.js`. There is no live API call wired up to anything the visitor sees. Treat this as the active surface.

The sibling `solusi-web-usaha-be/` exists as a separate repo and a partial integration layer (`src/lib/api.js`, `src/services/*.js`, `src/contexts/AuthContext*`, the `/dashboard*` routes, `/auth`, `/blog*`) was scaffolded against it — but **it is not in use** and should be considered dormant/aspirational. When asked to add a feature, default to hardcoded data unless the user explicitly asks for backend wiring.

**JavaScript, not TypeScript** — `.jsx` for components, `.js` for everything else. Don't introduce `.ts`/`.tsx`. `@types/react` is present only to satisfy editor tooling.

## Commands

Yarn-based (yarn.lock is the lockfile of record; `.yarnrc` pins behavior).

- `yarn dev` — Vite dev server (default port 5173)
- `yarn build` — production build to `dist/`
- `yarn preview` — preview the built bundle
- `yarn lint` — ESLint (flat config in `eslint.config.js`)

No test runner is configured. Lint is the only static check.

ESLint rule worth knowing: `no-unused-vars` errors **except** identifiers matching `^[A-Z_]` — i.e. unused PascalCase/CONST imports are tolerated (useful for React component re-exports), but unused camelCase locals are not.

## Architecture

### Entry & providers (`src/main.jsx`)

`StrictMode` → `QueryClientProvider` (TanStack Query, `retry: 1`, `refetchOnWindowFocus: false` globally) → `AuthProvider` → `App`. The Query and Auth providers are mounted in anticipation of the dormant BE integration; today they're effectively no-ops for the live marketing pages. Global client state lives in Zustand (currently just `languageStore`).

### Routing (`src/App.jsx`)

`react-router-dom` v7. `Header` and `Footer` are **composed inline per-route**, not globally — `HomePage` renders its own chrome, and `/auth` deliberately has no chrome.

Live (pure-FE, hardcoded): `/`, `/services/:slug`. The blog (`/blog`, `/blog/:id`), auth (`/auth`), and dashboard (`/dashboard*`) routes exist but depend on the dormant backend — leave them alone unless explicitly asked to wire BE integration.

### Dormant BE-integration scaffolding

The following exist in the tree but are **not** the active surface today. Don't extend them for hardcoded marketing-site work; if a task touches them, ask whether the user actually wants BE integration enabled.

- `src/lib/api.js` — axios instance with **hardcoded** `baseURL: "http://localhost:3001"`. No Vite env wiring. Has a 401 interceptor that redirects to `/auth` except on `/login` requests.
- `src/services/*.js` — `authService`, `blogService`, `categoryService`, `contactService`, `uploadService`. Each wraps `api.*` calls, re-throws `new Error(message)` after extracting `error.response.data.message`, and some files also export TanStack Query hooks (`useBlogs`, `useMyBlogs`, `useBlogById`, …) with their own `staleTime`/`retry` overrides. QueryKey convention: `["resource", params]` or `["resource", id]`.
- `src/contexts/AuthContext.{js,jsx}` — context object and provider are split into two files on purpose (to satisfy `react-refresh/only-export-components`). State is persisted to `localStorage` keys `auth_token` and `user_data`. Don't merge them. `useAuth` hook lives in `src/hooks/useAuth.js`.
- `src/components/PrivateRoute.jsx` — guards `/dashboard*` via `useAuth()`.
- `src/schemas/*.schema.js` — Yup schemas for forms that talk to BE.
- `src/components/RichTextEditor.jsx` — Tiptap editor used by Add/Edit post pages. All the `@tiptap/extension-*` packages in `package.json` are wired here; if you ever activate this, **pin all `@tiptap/*` versions together** when upgrading — mismatched versions break silently at runtime.

### i18n (`src/i18n/translations.js` + `src/store/languageStore.js` + `src/hooks/useTranslation.js`)

Hand-rolled, not a library. Two locales: `id` (Indonesian, default) and `en`.
- `languageStore` — Zustand with `persist` middleware, stored under key `app_language` in `localStorage`.
- `useTranslation()` returns `{ t, language }`. `t("path.to.key")` does dotted-path lookup, falls back to `id`, then returns the key itself if missing.

Add new copy by editing both locale trees in `translations.js`. Don't introduce `react-i18next` etc. without discussion.

### Styling

Tailwind 3 with custom theme tokens in `tailwind.config.js`:

- Brand colors: `primary.blue` (`#235EE0`), `primary.green` (`#10B981`)
- Custom shadows: `glass`, `glass-lg`, `card-hover`, `inner-glow`
- Custom gradients: `hero-gradient`, `blue-mesh`
- Fonts: `heading` (Poppins), `body` (Plus Jakarta Sans)

Use these tokens, not ad-hoc hex values. UI primitives in `src/components/ui/` (currently `button.jsx`, `card.jsx`) are shadcn-style, built with `class-variance-authority` + the `cn()` helper in `src/lib/utils.js` (clsx + tailwind-merge).

Animations: `framer-motion` is the standard. `three` + `postprocessing` are used only by `PixelBlast` (a hero visual) — avoid pulling them into other components.

## Backend contract notes (for if/when integration is enabled)

The sibling backend exists but is not connected today. If a task explicitly switches the FE to consume it, payloads must match the backend's Zod schemas exactly:
- `categoryId` is a positive integer (not a string)
- `status` is the literal `"DRAFT" | "PUBLISHED"`
- `tags` is `string[]` on the wire (the backend stores it as a JSON-encoded string internally, but always serializes back to an array)

Upload responses return **absolute URLs** built from the request host (e.g. `http://localhost:3001/uploads/images/...`); render them directly without prepending a base URL.

List endpoints return `{ items, pagination: { currentPage, totalPages, totalCount, hasNextPage, hasPrevPage } }` — match this shape when building paginated UIs.

Until then: do not introduce new API calls, axios usage, or TanStack Query hooks for marketing-site work. Use hardcoded data or extend `src/i18n/translations.js`.
