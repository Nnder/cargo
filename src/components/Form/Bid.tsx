"use client"
import { useBidStore } from '@/src/zustand/bid';
import {Button, Modal, TextArea, TextInput} from '@gravity-ui/uikit';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import Select from 'react-select';
import styles from './Bid.module.css'

export default function BidForm() {
  const {modal, closeModal, selectedBid} = useBidStore()

  const options = [
    { value: 'новая', label: 'новая' },
    { value: 'в работе', label: 'в работе' },
    { value: 'завершено', label: 'завершено' },
  ];

  

  return (
    <Modal open={modal} onClose={() => closeModal()}>
        <form className={styles.form}>
            <div>
              <h3 className={styles.number}>
                {selectedBid && `Заявка № ${selectedBid.id}`}
              </h3>
            </div>
            <div style={{display: 'flex', flexDirection:'column', justifyContent: 'space-evenly', alignItems:'center', height: '450px',}}>
                <Select className={styles.select} options={options}/>
                <TextInput className={styles.input} size='xl'  label='Фирма клиента'
                  value={selectedBid ? selectedBid.firm_name : ""}/>
                <TextInput className={styles.input} size='xl' label='ФИО перевозчика'
                  value={selectedBid ? selectedBid.firm_name : ""}/>
                <TextInput className={styles.input} size='xl' label='Телефон перевозчика'
                  value={selectedBid ? selectedBid.firm_name : ""}/>
                <TextInput className={styles.input} size='xl' label='Компания'
                  value={selectedBid ? selectedBid.firm_name : ""}/>
                <TextInput className={styles.input} size='xl' label='ATI'
                  value={selectedBid ? selectedBid.ati.toString() : ""}/>
                <TextArea className={styles.input} size='xl' rows={3} value={selectedBid ? selectedBid.comments : "Комментарии"}/>
                <div>
                  <DatePicker className={styles.datepicker} selected={new Date()} showTimeSelect onChange={(data)=> console.log(data)} dateFormat="Pp"/>
                </div>
                
                
            </div>

            <div>
              <Button view="action" type='submit'>{selectedBid ? "Сохранить" : "Создать"}</Button>
            </div>
            

            
        </form>
    </Modal>
  )
}
