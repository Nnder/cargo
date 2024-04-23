"use client"
import { useBidStore } from '@/src/zustand/bid';
import {Button, Modal} from '@gravity-ui/uikit';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import Select from 'react-select';
import styles from './Bid.module.css'
import { Controller, FieldValues, FormProvider, useForm } from 'react-hook-form';
import { useEffect } from 'react';
import useUpdateBid from '@/src/hooks/useUpdateBid';
import useCreateBid from '@/src/hooks/useCreateBid';

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
  const methods = useForm({defaultValues: defaultValues});
  const { control, handleSubmit, reset } = methods

  const options = [
    { value: 'новая', label: 'новая' },
    { value: 'в работе', label: 'в работе' },
    { value: 'завершено', label: 'завершено' },
  ];

  const getCurrentOption = ()=>
    options.find((item, index)=>{selectedBid?.status === item.value}) || { value: 'новая', label: 'новая' }

  const HandleData = (data: FieldValues) => {
    if(data.id)
      useUpdateBid(data)
    else 
      useCreateBid(data)
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
        status: getCurrentOption(),
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
                  <input className={styles.input}  placeholder='№ заявки' value={value} onChange={onChange} disabled={true}/>
              )}/>

              <Controller name='status' control={control}
                render={ ({field: {value, onChange}}) => (
                  <Select className={styles.select} options={options} value={value} onChange={onChange} required/>
              )}/>

              <Controller name='firm_name' control={control}
                render={ ({field: {value, onChange}}) => (
                  <input className={styles.input} placeholder='Фирма клиента' value={value} onChange={onChange} required/>
              )}/>

              <Controller name='fio_carrier' control={control}
                render={ ({field: {value, onChange}}) => (
                  <input className={styles.input}  placeholder='ФИО перевозчика' value={value} onChange={onChange} required/>
              )}/>

              <Controller name='phone_carrier' control={control}
                render={ ({field: {value, onChange}}) => (
                  <input className={styles.input} placeholder='Телефон перевозчика' value={value} onChange={onChange} required/>
              )}/>

              <Controller name='ati' control={control}
                render={ ({field: {value, onChange}}) => (
                  <input className={styles.input} placeholder='ATI' value={value} onChange={onChange} required/>
              )}/>

              <Controller name='comments' control={control}
                render={ ({field: {value, onChange}}) => (
                  <textarea className={styles.input} placeholder='Комментарии' rows={3} value={value} onChange={onChange} required/>
              )}/>

              <Controller name='created_at' control={control}
                render={ ({field: {value, onChange}}) => (
                  <div><DatePicker className={styles.datepicker} selected={value} showTimeSelect onChange={onChange} dateFormat="Pp"/></div>
              )}/>
              
            </div>
            <div>
              <Button onClick={handleSubmit(HandleData)} view="action" type='submit'>{selectedBid ? "Сохранить" : "Создать"}</Button>
            </div>
        </FormProvider>
        </div>
    </Modal>
  )
}