import { create } from 'zustand'

interface SearchStore {
    search: string
    setSearch: (newSearch: string)=>void 
}

export const useSearchStore = create<SearchStore>((set, get) => ({
  search: "",
  setSearch: (newSearch: string) => set((state) => ({ search: newSearch })),
}))
