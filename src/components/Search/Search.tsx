import { useSearchStore } from '@/src/zustand/search'
import { useQueryClient } from '@tanstack/react-query'
import React, { useEffect } from 'react'

export default function Search() {
  const {search, setSearch} = useSearchStore()
  const queryClient = useQueryClient()
  useEffect(()=>{
    queryClient.invalidateQueries({ queryKey: ['bids', search] })
  }, [search])
  return (
    <div style={{display: 'flex', justifyContent:'center'}}>
        <input type="text" placeholder='Поиск' style={{width: '90%', height: '30px', fontSize: '20px', borderRadius: '10px', padding: '5px', margin: '8px'}} 
        onChange={(e)=>setSearch(e.target.value)} value={search}/>
    </div>
  )
}
