# ELOMK Projects - Technical Documentation

## Overview
ELOMK Projects is a high-performance, modern web application for a technical services company. It features a high-tech, dark-themed aesthetic (with light mode support), smooth scroll animations, and a component-based architecture.

---

## Tech Stack

### Core
- **React 19:** UI library (using Functional Components and Hooks).
- **Vite:** Next-generation frontend tooling for fast development and optimized builds.
- **TypeScript:** Static typing for better developer experience and code reliability.
- **React Router DOM (v7):** For client-side routing and navigation.


### Styling & UI
- **Tailwind CSS:** Utility-first CSS framework for rapid UI development.
- **Framer Motion:** Powerful animation library for scroll-linked animations and transitions.
- **Lucide React:** Clean and consistent icon set.
- **PostCSS / Autoprefixer:** For modern CSS processing and vendor prefixing.

### Performance & SEO
- **React Helmet Async:** Manages the `<head>` of the document for SEO (meta tags, titles).
- **Lazy Loading (`React.lazy`):** Pages are split into separate chunks to improve initial load time.
- **Intersection Observer:** Used in the Navbar for section tracking.

---

## Architecture

The application follows a **Modular Component-Based Architecture**.

### Component Hierarchy
1.  **Entry Point (`main.tsx`):** Initializes the React application and wraps it in `HelmetProvider`.
2.  **Root Container (`App.tsx`):** Sets up the `ThemeProvider`, `Router`, and global layout (Navbar, Footer, Background).
3.  **Pages (`src/pages/`):** High-level containers for different routes.
4.  **Components (`src/components/`):** Reusable UI building blocks (Buttons, Cards, Modals).
5.  **Data Layer (`src/data/`):** Centralized data (e.g., `pagesData.ts`) to drive dynamic content.

### Routing Strategy
- **Static Routes:** Defined for core pages like Home, Services, and Contact.
- **Dynamic Routes:** Generated from `corporateData` to allow easy expansion of service-specific pages without modifying `App.tsx` structure.
- **Lazy Loading:** All pages are imported using `Suspense` and `lazy` to ensure users only download the code they need.

### Theme System
The app uses a custom `ThemeContext` located in `src/context/ThemeContext.tsx`. Themes are applied via CSS variables defined in `src/index.css`. This allows for seamless transitions between Dark and Light modes.

---

## Folder Structure

```text
src/
├── assets/             # Images, logos, and static assets
├── components/         # Reusable UI components
├── context/            # React Context providers (e.g., ThemeContext)
├── data/               # Static data and configuration files
├── pages/              # Route-level components
├── App.tsx             # Main layout and routing configuration
├── index.css           # Global styles and Tailwind directives
└── main.tsx            # Application entry point
```

---

## Maintenance & Updates

### How to Add a New Page
1.  Create a new component in `src/pages/`.
2.  In `src/App.tsx`, import it using `lazy(() => import('./pages/NewPage'))`.
3.  Add a `<Route />` inside the `<Routes>` component.
4.  If it's a corporate/service page, consider adding its data to `src/data/pagesData.ts` instead.

### How to Update Branding
- **Logo:** Replace `src/assets/Elomk - Logo PNG2.png`.
- **Colors:** Update the CSS variables in `src/index.css` under the `:root` and `.dark` selectors.
- **Fonts:** The project uses 'Rajdhani' and 'Inter'. These can be adjusted in `tailwind.config.js`.

### Deployment
The project is configured for **Vercel** (see `vercel.json`).
- Run `npm run build` to generate the production-ready `dist/` folder.
- Ensure all environment variables are set in your hosting provider.

### Development Commands
- `npm run dev`: Start local development server.
- `npm run build`: Build for production.
- `npm run lint`: Run ESLint to check for code quality issues.
- `npm run preview`: Preview the production build locally.

---

## Best Practices for Developers
- **Memoization:** Use `React.memo` for components that receive static props to prevent unnecessary re-renders (see `Homepage.tsx`).
- **Scroll Performance:** When using Framer Motion's `useScroll`, ensure `will-change-transform` is applied to animated elements.
- **Accessibility:** Always include `aria-label` on buttons and maintain a logical heading structure.
- **Naming Conventions:** Use PascalCase for components and camelCase for functions/variables.
