# Show Time - Music Show Management Platform

A production-oriented web app to help musicians and bands manage live show operations in one place: upcoming gigs, calendar visibility, and revenue tracking.

Built as a modern frontend architecture project using React + TypeScript + Supabase, with focus on clean UI, reusable components, and maintainable state management.

## Why this project matters

This project demonstrates practical product engineering skills:

- Domain-driven UI for a real workflow (show planning and gig control)
- Authentication and protected routes
- CRUD operations integrated with a cloud backend (Supabase)
- Component-first design system approach
- State management with predictable client-side updates
- Thoughtful UX details (confirmation modal, toasts, loading states, skeletons)

## Live product capabilities

- Secure sign up / login flow
- Responsive layout for different screen sizes (mobile, tablet, desktop)
- Dashboard with:
  - personalized greeting
  - monthly KPIs (shows this month, revenue, total shows)
  - upcoming shows preview
- Show management:
  - create show
  - edit show
  - delete show with confirmation modal
- Calendar view with:
  - month navigation
  - day-level show details
  - monthly summary stats

## Tech stack

- **Frontend:** React 19, TypeScript, Vite
- **Routing:** React Router
- **State Management:** Zustand
- **Backend/BaaS:** Supabase (Auth + Database)
- **Forms:** React Hook Form + Zod
- **UI/Styling:** Tailwind CSS, Lucide Icons
- **UX feedback:** Sonner (toast notifications)

## Architecture overview

The codebase is organized by responsibility:

- `src/pages` - page-level features and route entries
- `src/components` - reusable UI and domain components (`Dashboard`, `Calendar`, `Auth`, `Shared`, `ui`)
- `src/stores` - global client state and async actions (auth and shows)
- `src/lib` - helpers and infrastructure clients (e.g., Supabase client, utility functions)
- `src/types` - shared TypeScript contracts

### Main flow

1. User authenticates with Supabase Auth.
2. Protected routes gate authenticated application pages.
3. Show data is loaded and managed through Zustand stores.
4. UI renders derived metrics (dashboard + calendar) from canonical store state.

## Product highlights for recruiters

- **Business-focused UI:** The app solves a concrete problem for performers, not just a demo counter.
- **Full-stack integration mindset:** Handles frontend UX and backend integration concerns cleanly.
- **Scalable componentization:** Shared UI primitives and feature-based components keep growth manageable.
- **Type-safe development:** TypeScript contracts for better reliability and maintainability.
- **User experience details:** Loading skeletons, contextual toasts, and confirm modal reduce friction and errors.

## Getting started

### 1) Clone the repository

```bash
git clone <your-repo-url>
cd music-show
```

### 2) Install dependencies

```bash
yarn
```

### 3) Configure environment variables

Create a `.env` file in the project root:

```bash
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_SITE_URL=http://localhost:5173
```

### 4) Run locally

```bash
yarn dev
```

The app will be available at `http://localhost:5173`.

## Available scripts

- `yarn dev` - start development server
- `yarn build` - create production build
- `yarn preview` - preview production build
- `yarn lint` - run ESLint

## Database model (high level)

The core entity is `shows`, linked to authenticated users:

- `id`
- `user_id`
- `title`
- `venue`
- `date`
- `time`
- `fee`
- `notes`
- `created_at`
- `updated_at`

## Screens to include (recommended for GitHub)

For a stronger recruiter-facing README, add screenshots or GIFs:

1. Login / signup screen
2. Dashboard KPIs + upcoming shows
3. Add/Edit show form
4. Calendar month + selected day details
5. Delete confirmation modal

## Engineering roadmap

Planned improvements to push this project to the next level:

- Add automated tests (unit + integration + e2e)
- Improve TypeScript-aware lint configuration
- Refine selector usage to reduce unnecessary re-renders
- Introduce service layer boundaries for cleaner store/UI separation
- Add accessibility enhancements for keyboard and screen readers

## Author

Developed by **Saulo**.

If you are a recruiter or hiring manager, this project reflects hands-on frontend product engineering with real-world concerns: architecture, UX, scalability, and maintainability.
