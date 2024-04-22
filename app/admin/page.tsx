'use client'
import useBids from "@/src/hooks/useBids"
import {Button, Loader} from '@gravity-ui/uikit';


export default function Admin() {
    const {data, isLoading} = useBids()
  return (
    <div>
        {isLoading ? <Loader size="l"/> : JSON.stringify(data)}
        <Button view="action" size="l" />
    </div>
  )
}
