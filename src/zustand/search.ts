import { create } from 'zustand'

interface SearchStore {
    search: string
    status: string
    setSearch: (newSearch: string)=>void 
    setStatus: (newStatus: string)=>void 
}

export const useSearchStore = create<SearchStore>((set, get) => ({
  search: "",
  status: "",
  setSearch: (newSearch: string) => set((state) => ({ search: newSearch })),
  setStatus: (newStatus: string) => set((state) => ({ status: newStatus }))
}))
