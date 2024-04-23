import { create } from 'zustand'
import { Bid } from '../types/bid.types'

interface BidStore {
    selectedBid: Bid | null
    modal: boolean
    openModal: ()=>void 
    closeModal: ()=>void 
    setSelectedBid: (bid: Bid)=>void
}

export const useBidStore = create<BidStore>((set, get) => ({
  selectedBid: null,
  modal: false,
  openModal: ()=>set((state)=>({modal: true})),
  closeModal: ()=>set((state)=>({modal: false, selectedBid: null})),
  setSelectedBid: (bid: Bid)=>set((state)=>({selectedBid: bid}))
}))
