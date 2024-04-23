"use client"
import { useSearchStore } from "@/src/zustand/search"
import { useQueryClient } from "@tanstack/react-query"
import { useEffect, useState } from "react";
import Select from 'react-select';

type Option = {value: string, label: string}

const options: Option[] = [
  { value: '%%', label:'Все'},
  { value: 'новая', label: 'новая' },
  { value: 'в работе', label: 'в работе' },
  { value: 'завершено', label: 'завершено' },
];

export default function Filter() {
    const {search, status, setStatus} = useSearchStore()
  const queryClient = useQueryClient()
  const [value, setValue] = useState(options[0].value)

  useEffect(()=>{
    queryClient.invalidateQueries({ queryKey: ['bids', search, status] })
  }, [search, search])

  useEffect(()=>{
    setStatus(value)
  }, [value])

  return (
    <div style={{display: 'flex', flexDirection: 'column', width: '200px'}}>
      <div>Фильтр по статусу</div>
      <select onChange={(e)=>setValue(e.target.value)}>
        {options.map((data, index)=><option key={index} value={data.value}>{data.label}</option>)}
      </select>
      {/* <Select options={options} value={value} onChange={(option)=>setValue(option as Option)}/> */}
    </div>
  )
}
