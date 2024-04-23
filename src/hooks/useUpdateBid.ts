import supabase from "../supabase/supabase";

async function updateBid(id: number, bid: any){
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
    .eq('id', id)
    .select()
}

export default function useUpdateBid(data: any) {
    updateBid(data.id, data)
}