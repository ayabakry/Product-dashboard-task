# ProductHub

A product management dashboard built as part of a Senior Frontend Engineer take-home assignment. Lets users browse, search, filter, sort, paginate, and favorite products fetched from the [DummyJSON API](https://dummyjson.com/products), with dark mode support.

**Live demo:** https://product-dashboard-task-pied.vercel.app/

## Tech Stack

- React 18 + TypeScript
- Vite
- React Router (routing, with route-based code splitting)
- TanStack Query (server state / data fetching)
- MUI (Material UI) — UI components + custom light/dark theme
- Axios (HTTP client)
- ESLint + Prettier

## Setup Instructions

```bash
git clone https://github.com/ayabakry/Product-dashboard-task.git
cd product-dashboard
npm install
npm run dev
```

The app will run on `http://localhost:5173`.

Other available scripts:

```bash
npm run build         # type-check and build for production
npm run preview        # preview the production build locally
npm run lint            # run ESLint
npm run format         # format files with Prettier
```

## Architecture Overview

The project is organized by responsibility rather than by feature, to keep things predictable as the app grows:

```
src/
├── api/            # axios instance + API call functions
├── components/      # reusable, presentational components (ProductCard, Hero, CategoryFilter, etc.)
├── context/          # React Context providers (Favorites, Search, Color Mode)
├── hooks/             # custom hooks (useProducts, useProduct, useCategories, useDebounce, useFavorites, useSearch, useColorMode)
├── layouts/          # app shell (Header, MainLayout)
├── pages/            # route-level components (Dashboard, ProductDetails, Favorites)
├── routes/           # React Router configuration + lazy-loaded page bindings
├── theme/            # MUI custom theme (light/dark aware)
└── types/             # shared TypeScript types
```

### State management

The app separates three kinds of state, on purpose:

- **Server state** (the product list, single product, categories) is handled entirely by **TanStack Query**. It takes care of caching, loading/error states, and refetching, so components don't need to manually track any of that.
- **UI state** (selected category, selected sort option, current page) lives as plain `useState` inside the `Dashboard` page, since it's local to that page and doesn't need to be shared anywhere else.
- **Shared/persistent state** (favorites, search, color mode) lives in small Context providers:
  - `FavoritesContext` — started as a plain custom hook, but since product cards, the details page, and the Favorites page all need to read and update the *same* favorites list, it had to move into Context. Otherwise each component ends up with its own disconnected copy of the state, which actually happened during development (toggling a favorite from one page wouldn't reflect on another until a refresh).
  - `SearchContext` — search moved from the Dashboard into the navbar, so it needed to be shared the same way as favorites.
  - `ColorModeContext` — holds the current light/dark mode and persists the choice to `localStorage`.

  All three follow the same pattern (a separate file for `createContext`, a separate file for the Provider component, and a separate file for the consuming hook) to satisfy React's Fast Refresh rules, which require files to export either only components or only non-component values.

  This avoided pulling in a separate state library like Zustand or Redux, which felt like overkill for a few small pieces of shared state.

## Assumptions

- Used `https://dummyjson.com/products?limit=0` to fetch the full product list at once (it returns ~194 products), rather than implementing server-side pagination. Pagination is instead handled client-side over the already-fetched list (see Bonus Features below).
- Favorites are stored as an array of product IDs in `localStorage`, not full product objects, since the full product data is already available from the API and re-fetched on each load. This avoids storing stale/duplicate data.
- "Brand information (if available)" is shown conditionally since not every product in the API has a `brand` field.

## Design Decisions

- **MUI was a hard requirement**, so the whole UI is built with MUI components rather than Tailwind or custom CSS. A custom theme (colors, typography, shape, button/card/chip overrides) was applied through `ThemeProvider`, with separate light and dark palettes, to avoid the default out-of-the-box MUI look in either mode.
- **Axios over plain fetch** for the API layer, mainly for cleaner error handling through interceptors instead of manually checking `res.ok` in every function.
- **Debounced search** (400ms) to avoid filtering on every keystroke, while keeping the input itself instant/responsive.
- **Search, filter, and sort all run client-side** on the already-fetched product list, combined together in `Dashboard.tsx`. This keeps the logic in one place and easy to follow, rather than spreading it across multiple API calls.
- **Search lives in the navbar** rather than on the Dashboard page itself, expandable on click, so it's accessible from any page and feels like a persistent part of the app shell rather than a page-specific control.

## Trade-offs

- Fetching all products at once instead of paginating server-side is simple and fast for ~194 items, but wouldn't scale well to a dataset with thousands of products — at that point true server-side pagination would be necessary instead of the current client-side slicing.
- Shared state (favorites, search, color mode) is handled through multiple small React Context providers rather than a single dedicated state library. This works fine at the current scale, but if the app grew to have many more pieces of cross-cutting state, something like Zustand would probably consolidate things more cleanly than several separate Context providers.
- No automated tests were added, given the scope and time constraints of the assignment — testing was treated as a "nice to have" rather than core to the requirements.

## Bonus Features Implemented

- **Pagination** — client-side pagination (12 products per page) over the filtered/sorted product list, using MUI's `Pagination` component. Resets to page 1