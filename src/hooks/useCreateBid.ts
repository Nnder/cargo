import supabase from "../supabase/supabase"

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
}
