import { useQuery } from "@tanstack/react-query";
import { Bid } from "../types/bid.types";
import { getBids } from "../api/bid";
import { useSearchStore } from "../zustand/search";

export default function useBids(a="") {
  const {search} = useSearchStore()
  return useQuery(
    { queryKey: ['bids', search], 
    queryFn: (): Promise<Bid[]>=>getBids(search),
    enabled: true,
    staleTime: 15000,
    refetchInterval: 16000,
    gcTime: 15000,
  })
}