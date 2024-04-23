import { useQuery } from "@tanstack/react-query";
import supabase from "../supabase/supabase";
import { Bid } from "../types/bid.types";


export const getBids = async (search: string): Promise<Bid[]>=>{
    let { data, error } = await supabase
    .from('bids')
    .select('*')

  if(error) {
    throw new Error(error.message)
  }

  if(!data) {
    throw new Error("bid not found")
  }

  return data
}



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