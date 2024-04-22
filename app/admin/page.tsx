'use client'
import useBids from "@/src/hooks/useBids"

export default function page() {
    const {data, isLoading} = useBids()
  return (
    <div>
        {isLoading ? <div>...Loading</div> : JSON.stringify(data)}
    </div>
  )
}
