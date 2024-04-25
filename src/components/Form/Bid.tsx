"use client"
import { useBidStore } from '@/src/zustand/bid';
import {Button, Modal} from '@gravity-ui/uikit';
import DatePicker from "react-datepicker";
import Select from 'react-select';
import styles from './Bid.module.css'
import { Controller, FieldValues, FormProvider, useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { createBid, updateBid } from '@/src/api/bid';
import { useSearchStore } from '@/src/zustand/search';
import { Bid } from '@/src/types/bid.types';
import "react-datepicker/dist/react-datepicker.css";

const defaultValues = {
  id: "",
  created_at: new Date(),
  firm_name: "",
  fio_carrier: "",
  phone_carrier: "",
  comments: "",
  status: { value: 'новая', label: 'новая' },
  ati: "",
}

export default function BidForm() {
  const {modal, closeModal, selectedBid} = useBidStore()
  const {search, status} = useSearchStore()
  const queryClient = useQueryClient()
  const methods = useForm({defaultValues: defaultValues});
  const { control, handleSubmit, reset, formState: {errors} } = methods

  const options = [
    { value: 'новая', label: 'новая' },
    { value: 'в работе', label: 'в работе' },
    { value: 'завершено', label: 'завершено' },
  ];

  const getCurrentOption = (selectedBid: Bid)=>
    options.find((item, index)=>selectedBid.status === item.value) || { value: 'новая', label: 'новая' }

  const handleCreate = async (data: FieldValues) => {
    
    const newBid: Bid[] = await createBid(data)
    queryClient.setQueryData(
      ['bids', search, status],
      (oldData:any) =>[...oldData, ...newBid] )
    queryClient.invalidateQueries({ queryKey: ['bids', search, status] })
    closeModal()
  }

  const handleUpdate = async (data: FieldValues) => {
    const updatedBid: Bid[] = await updateBid(data)
    queryClient.setQueryData(
      ['bids', search, status],
      (oldData:Bid[]) =>{
        const newData = [...oldData].filter((bid)=> bid.id != data.id)
        return [...newData, ...updatedBid]
      })
    queryClient.invalidateQueries({ queryKey: ['bids', search, status] })
    closeModal()
  }
  
  useEffect(()=>{
    if(selectedBid){
      reset(
        {
        id: selectedBid.id.toString(),
        created_at: new Date(selectedBid.created_at.toString()),
        firm_name: selectedBid.firm_name,
        fio_carrier: selectedBid.fio_carrier,
        phone_carrier: selectedBid.phone_carrier,
        comments: selectedBid.comments,
        status: getCurrentOption(selectedBid),
        ati: selectedBid.ati.toString(),
      })
    } else 
      reset(defaultValues)
  }, [selectedBid])

  return (
    <Modal open={modal} onClose={() => closeModal()}>
      <div className={styles.form}>
          <FormProvider {...methods}>
            <div style={{display: 'flex', flexDirection:'column', justifyContent: 'space-evenly', alignItems:'center', height: '450px',}}>
              <Controller name='id' control={control}
                render={ ({field: {value, onChange}}) => (
                  <input className={styles.input} placeholder='№ заявки' value={value} onChange={onChange} disabled={true}/>
              )}/>

              <Controller name='status' control={control} rules={{required: true}}
                render={ ({field: {value, onChange}}) => (
                  <Select className={styles.select} options={options} value={value} onChange={onChange} />
              )}/>

              <Controller name='firm_name' control={control} rules={{required: true}}
                render={ ({field: {value, onChange}}) => (
                  <input className={styles.input} style={{borderColor: errors.firm_name ? 'red' : 'black'}} placeholder='Фирма клиента' value={value} onChange={onChange}/>
              )}/>

              <Controller name='fio_carrier' control={control} rules={{required: true}}
                render={ ({field: {value, onChange}}) => (
                  <input className={styles.input} style={{borderColor: errors.fio_carrier ? 'red' : 'black'}}  placeholder='ФИО перевозчика' value={value} onChange={onChange}/>
              )}/>

              <Controller name='phone_carrier' control={control} rules={{required: true}}
                render={ ({field: {value, onChange}}) => (
                  <input className={styles.input} style={{borderColor: errors.phone_carrier ? 'red' : 'black'}} placeholder='Телефон перевозчика' value={value} onChange={onChange}/>
              )}/>

              <Controller name='ati' control={control} rules={{required: true}}
                render={ ({field: {value, onChange}}) => (
                  <input className={styles.input} style={{borderColor: errors.ati ? 'red' : 'black'}} placeholder='ATI' value={value} onChange={onChange} type='number'/>
              )}/>

              <Controller name='comments' control={control} rules={{required: true}}
                render={ ({field: {value, onChange}}) => (
                  <textarea className={styles.input} style={{borderColor: errors.comments ? 'red' : 'black'}} placeholder='Комментарии' rows={3} value={value} onChange={onChange}/>
              )}/>

              {errors.created_at && <span style={{color: '#fff'}}>Выберите дату</span>}
              <Controller name='created_at' control={control} rules={{required: true}}
                render={ ({field: {value, onChange}}) => (
                  <div><DatePicker className={styles.datepicker} selected={value} showTimeSelect onChange={onChange} dateFormat="Pp"/></div>
              )}/>
              
            </div>
            <div>
              <Button onClick={handleSubmit((data)=> data.id ? handleUpdate(data) : handleCreate(data))} view="action" type='submit'>{selectedBid ? "Сохранить" : "Создать"}</Button>
            </div>
          </FormProvider>
        </div>
    </Modal>
  )
}