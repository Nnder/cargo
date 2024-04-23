import { useQuery } from "@tanstack/react-query";
import { Bid } from "../types/bid.types";
import { getBids } from "../api/bid";

export default function useBids(search = "") {
  return useQuery(
    { queryKey: ['bids', search], 
    queryFn: (): Promise<Bid[]>=>getBids(search),
    enabled: true,
    staleTime: 5000,
    refetchInterval: 6000,
    gcTime: 5000,
  })
}