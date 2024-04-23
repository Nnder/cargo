import supabase from "../supabase/supabase"
import { Bid } from "../types/bid.types"

export const getBids = async (search: string): Promise<Bid[]>=>{
    let { data, error } = await supabase
    .from('bids')
    .select('*')
    .ilike('firm_name', `%${search}%`)
    

  if(error) {
    throw new Error(error.message)
  }

  if(!data) {
    throw new Error("bid not found")
  }

  return data
}

export async function createBid(bid: any) {
    const { data, error } = await supabase
    .from('bids')
    .insert([
      {
        fio_carrier: bid.fio_carrier,
        firm_name: bid.firm_name,
        phone_carrier: bid.phone_carrier,
        comments: bid.comments,
        created_at: bid.created_at,
        ati: bid.ati,
        status: bid.status.value,
      },
    ])
    .select()

    if(error) {
        throw new Error(error.message)
      }
    
      if(!data) {
        throw new Error("bid not found")
      }
    
      return data
  }

  export async function updateBid(bid: any){
    const { data, error } = await supabase
    .from('bids')
    .update({
      fio_carrier: bid.fio_carrier,
      firm_name: bid.firm_name,
      phone_carrier: bid.phone_carrier,
      comments: bid.comments,
      created_at: bid.created_at,
      ati: bid.ati,
      status: bid.status.value,
    },)
    .eq('id', bid.id)
    .select()

    if(error) {
        throw new Error(error.message)
      }
    
      if(!data) {
        throw new Error("bid not found")
      }
    
      return data
  }