import { useQuery } from "@tanstack/react-query";
import { Bid } from "../types/bid.types";
import { getBids } from "../api/bid";
import { useSearchStore } from "../zustand/search";

export default function useBids() {
  const {search, status} = useSearchStore()
  return useQuery(
    { queryKey: ['bids', search, status], 
    queryFn: (): Promise<Bid[]>=>getBids(search, status),
    enabled: true,
    staleTime: 15000,
    refetchInterval: 16000,
    gcTime: 15000,
  })
}