import { useQuery } from "@tanstack/react-query";
import supabase from "../supabase/supabase";


const getBids = async (search: string)=>{
    let { data, error } = await supabase.from('bids').select('*')
        
    // .eq('id', 1)

  if(error) {
    throw new Error(error.message)
  }

  if(!data) {
    throw new Error("bid not found")
  }

  console.log(data)
  return data
}



export default function useBids(search = "") {
    return useQuery({ queryKey: ['bids', search], queryFn: ()=>getBids(search) })
  }