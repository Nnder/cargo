"use client"
import supabase from "@/src/supabase/supabase";
import { Bid } from "@/src/types/bid.types";
import { TrashBin } from "@gravity-ui/icons";
import { Button } from "@gravity-ui/uikit";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PropsWithoutRef } from "react";

export default function DeleteButton({bid, ...props}: PropsWithoutRef<{bid: Bid}>) {
    const queryClient = useQueryClient()

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
          queryClient.invalidateQueries({ queryKey: ['bids'] })
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
