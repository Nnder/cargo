import supabase from "../supabase/supabase"
import useBids from "./useBids"

async function createBid(bid: any) {
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
  }

export default function useCreateBid(data: any, search = "") {
    createBid(data)
    return useBids(search)
}