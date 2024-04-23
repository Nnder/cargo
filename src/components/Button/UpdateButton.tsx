import { Bid } from "@/src/types/bid.types";
import { useBidStore } from "@/src/zustand/bid";
import { Gear } from "@gravity-ui/icons";
import { Button } from "@gravity-ui/uikit";
import { PropsWithChildren } from "react";

export default function UpdateButton({bid, ...props}: PropsWithChildren<{bid: Bid}>) {
  const {openModal, setSelectedBid} = useBidStore()

  return (
    <Button onClick={()=>{
        openModal()
        setSelectedBid(bid)
        }}>
        <Gear/>
    </Button>
  )
}
