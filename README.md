# Product Dashboard

A product management dashboard built as part of a Senior Frontend Engineer take-home assignment. Lets users browse, search, filter, sort, and favorite products fetched from the [DummyJSON API](https://dummyjson.com/products).

**Live demo:** https://product-dashboard-task-pied.vercel.app/

## Tech Stack

- React 18 + TypeScript
- Vite
- React Router (routing)
- TanStack Query (server state / data fetching)
- MUI (Material UI) — UI components + custom theme
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
├── components/      # reusable, presentational components (ProductCard, SearchBar, etc.)
├── context/          # React Context providers (FavoritesContext)
├── hooks/             # custom hooks (useProducts, useProduct, useCategories, useDebounce)
├── layouts/          # app shell (Header, MainLayout)
├── pages/            # route-level components (Dashboard, ProductDetails, Favorites)
├── routes/           # React Router configuration
├── theme/            # MUI custom theme
└── types/             # shared TypeScript types
```

### State management

The app separates three kinds of state, on purpose:

- **Server state** (the product list, single product, categories) is handled entirely by **TanStack Query**. It takes care of caching, loading/error states, and refetching, so components don't need to manually track any of that.
- **UI state** (search input, selected category, selected sort option) lives as plain `useState` inside the `Dashboard` page, since it's local to that page and doesn't need to be shared anywhere else.
- **Persistent state** (favorites) lives in a small `FavoritesContext`. It started out as a plain custom hook, but since both the product cards and the Favorites page need to read and update the *same* favorites list, it had to move into Context — otherwise each component ends up with its own disconnected copy of the state, which actually happened during development (toggling a favorite from one page wouldn't reflect on another until a refresh). Context with `useState` + `useEffect` syncing to `localStorage` solved this cleanly without pulling in a separate state library like Zustand or Redux, which felt like overkill for one small piece of shared state.

## Assumptions

- Used `https://dummyjson.com/products?limit=0` to fetch the full product list at once (it returns ~194 products), rather than implementing server-side pagination, since the task doesn't require pagination and the dataset is small enough to filter/sort entirely on the client.
- Favorites are stored as an array of product IDs in `localStorage`, not full product objects, since the full product data is already available from the API and re-fetched on each load. This avoids storing stale/duplicate data.
- "Brand information (if available)" is shown conditionally since not every product in the API has a `brand` field.

## Design Decisions

- **MUI was a hard requirement**, so the whole UI is built with MUI components rather than Tailwind or custom CSS. A custom theme (colors, typography, shape, button/card overrides) was applied through `ThemeProvider` to avoid the default out-of-the-box MUI look.
- **Axios over plain fetch** for the API layer, mainly for cleaner error handling through interceptors instead of manually checking `res.ok` in every function.
- **Debounced search** (400ms) to avoid filtering on every keystroke, while keeping the input itself instant/responsive.
- **Search, filter, and sort all run client-side** on the already-fetched product list, combined together in `Dashboard.tsx`. This keeps the logic in one place and easy to follow, rather than spreading it across multiple API calls.

## Trade-offs

- Fetching all products at once instead of paginating is simple and fast for ~194 items, but wouldn't scale well to a dataset with thousands of products — at that point server-side pagination or infinite scroll would be necessary.
- Favorites state is shared through React Context rather than a dedicated state library. This works fine at the current scale (one piece of shared state), but if the app grew to have several pieces of cross-cutting UI state, something like Zustand would probably be a better fit than multiple Context providers.
- No automated tests were added, given the scope and time constraints of the assignment — testing was treated as a "nice to have" rather than core to the requirements.

## Potential Future Improvements

- Add pagination or infinite scroll if the product list were to grow significantly
- Add unit tests for hooks (`useFavorites`, `useDebounce`) and the filter/sort logic in `Dashboard.tsx`
- Add a quantity/cart system if this evolved from a "dashboard" into an actual storefront
- Add skeleton loaders instead of a single spinner for a smoother loading experience
- Persist search/filter/sort state in the URL (query params) so a filtered view is shareable via link

## Author

Ayat Khaled