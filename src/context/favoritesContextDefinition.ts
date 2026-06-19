import { createContext } from 'react';

export interface FavoritesContextType {
  favorites: number[];
  isFavorite: (id: number) => boolean;
  toggleFavorite: (id: number) => void;
}

export const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);
