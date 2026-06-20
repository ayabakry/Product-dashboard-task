import { useState, type ReactNode } from 'react';
import { SearchContext } from './searchContextDefinition';

export function SearchProvider({ children }: { children: ReactNode }) {
  const [search, setSearch] = useState('');

  return <SearchContext.Provider value={{ search, setSearch }}>{children}</SearchContext.Provider>;
}
