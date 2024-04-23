"use client"
import supabase from "@/src/supabase/supabase";
import { Bid } from "@/src/types/bid.types";
import { useSearchStore } from "@/src/zustand/search";
import { TrashBin } from "@gravity-ui/icons";
import { Button } from "@gravity-ui/uikit";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PropsWithoutRef } from "react";

export default function DeleteButton({bid, ...props}: PropsWithoutRef<{bid: Bid}>) {
    const queryClient = useQueryClient()
    const {search} = useSearchStore()


    

    const deleteBid = async (id: number): Promise<Bid[]>=>{
        let { data, error } = await supabase
        .from('bids')
        .delete()
        .eq('id', id)
    
      if(error) {
        throw new Error(error.message)
      }
    
      if(!data) {
        throw new Error("bid not found")
      }

      return data
    }

    const mutation = useMutation({
        mutationFn: ()=> deleteBid(bid.id),
        onSuccess: () => {
          setTimeout(()=> {
            queryClient.invalidateQueries({ queryKey: ['bids', search] })
          }, 1500)
        },
      })
    

    const clickHandler = ()=>{
        mutation.mutate()
    }

  return (
    <Button onClick={clickHandler}>
        <TrashBin/>
    </Button>
  )
}
