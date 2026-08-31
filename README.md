# Travel Trucks

A modern camper rental catalog built with Next.js. Browse, filter, and book campervans with a smooth infinite-scroll catalog, detailed vehicle pages, image galleries, and a booking request form.

**Live demo:** [Travel Trucks](https://travel-trucks-iota-one.vercel.app/)

## ✨ Features

- 🏠 Landing page with a call-to-action into the catalog
- 🔍 Camper catalog with server-driven filters (location, form, transmission, engine)
- ♾️ Infinite scroll / "Load more" pagination powered by TanStack Query
- 📄 Detailed camper page with gallery, specs, equipment list, and reviews
- 🖼️ Image gallery with thumbnail navigation (Swiper)
- 📝 Booking request form with client-side validation (Formik + Yup) and toast notifications
- ⚡ Empty/error/loading states for a polished UX
- 📱 Responsive layout
- 🔎 SEO-friendly metadata (per-page titles & descriptions)

## 🛠️ Tech Stack

- [Next.js 16](https://nextjs.org/) (App Router, Turbopack, React Compiler)
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [TanStack Query](https://tanstack.com/query) — data fetching & caching
- [Axios](https://axios-http.com/) — HTTP client
- [Formik](https://formik.org/) + [Yup](https://github.com/jquense/yup) — forms & validation
- [Swiper](https://swiperjs.com/) — image gallery/carousel
- [react-hot-toast](https://react-hot-toast.com/) — notifications
- CSS Modules
- [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/) — linting & formatting

## 🚀 Getting Started

### Prerequisites

- Node.js 18.18+ (or 20+)
- npm / yarn / pnpm / bun

### Installation

```bash
git clone https://github.com/TarasBilyi/travel-trucks.git
cd travel-trucks
npm install
```

### Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build & run in production mode

```bash
npm run build
npm run start
```

### Other scripts

| Command         | Description                   |
| --------------- | ----------------------------- |
| `npm run dev`   | Start the development server  |
| `npm run build` | Build the app for production  |
| `npm run start` | Run the production build      |
| `npm run lint`  | Lint the codebase with ESLint |

## 📁 Project Structure

```
travel-trucks/
├─ app/
│  ├─ page.tsx                       # Landing page
│  ├─ layout.tsx                     # Root layout (fonts, header, providers)
│  ├─ globals.css                    # Global styles & CSS variables
│  ├─ not-found.tsx                  # Custom 404 page
│  └─ catalog/
│     ├─ (list)/                     # Catalog list route group
│     │  ├─ page.tsx                 # Reads searchParams, passes filters down
│     │  ├─ CatalogClient.tsx        # Infinite query + list rendering
│     │  ├─ layout.tsx               # Sidebar filters layout
│     │  └─ loading.tsx              # Route-level loading state
│     └─ [camperId]/                 # Camper details route
│        ├─ page.tsx                 # Server-side data fetching + metadata
│        └─ CamperDetailsClient.tsx  # Details layout (gallery, specs, reviews, booking)
├─ components/
│  ├─ BookingForm/                   # Booking request form (Formik + Yup)
│  ├─ CamperCard/                    # Catalog list item card
│  ├─ CamperFilters/                 # Sidebar filters (location, form, transmission, engine)
│  ├─ CamperGallery/                 # Swiper-based image gallery
│  ├─ CamperReviews/                 # Reviews list
│  ├─ Container/                     # Layout width wrapper
│  ├─ EmptyState/                    # "No campers found" state
│  ├─ Header/                        # Site header & navigation
│  ├─ Icons/                         # SVG sprite icon components
│  ├─ LoadingOverlay/                # Full-screen loading indicator
│  ├─ RatingStars/                   # Star rating display
│  └─ TanStackProvider/              # React Query client provider
├─ lib/
│  ├─ api/
│  │  ├─ api.ts                      # Shared Axios instance
│  │  ├─ clientApi.ts                # Client-side fetch functions (React Query)
│  │  └─ serverApi.ts                # Server-side fetch functions (RSC)
│  └─ format.ts                      # Formatting helpers (e.g. humanize labels)
├─ types/
│  └─ camper.ts                      # Shared TypeScript types
├─ public/                           # Static assets (sprite.svg, images)
├─ eslint.config.mjs
├─ next.config.ts
├─ tsconfig.json
└─ package.json
```

## 🔌 API

The app consumes the [GoIT Campers API](https://campers-api.goit.study):

| Method | Endpoint                        | Description                          |
| ------ | ------------------------------- | ------------------------------------ |
| GET    | `/campers`                      | Paginated list with optional filters |
| GET    | `/campers/:id`                  | Camper details                       |
| GET    | `/campers/:id/reviews`          | Camper reviews                       |
| GET    | `/campers/filters`              | Available filter options             |
| POST   | `/campers/:id/booking-requests` | Submit a booking request             |

Query params supported by `GET /campers`: `page`, `perPage`, `location`, `form`, `transmission`, `engine`.
