import { useBidStore } from '@/src/zustand/bid';
import {Modal, TextArea, TextInput} from '@gravity-ui/uikit';

export default function BidForm() {
  const {modal, closeModal} = useBidStore()
  return (
    <Modal open={modal} onClose={() => closeModal()}>
        <form action="">
            <div>
                <TextInput size='m' label='Фирма клиента' placeholder='Введите фирму'/>
                <TextInput size='m' label='ФИО перевозчика' placeholder='Введите ФИО'/>
                <TextInput size='m' label='Телефон перевозчика' placeholder='Введите Телефон'/>
                <TextInput size='m' label='Компания' placeholder='Введите название компании'/>
                <TextInput size='m' label='ATI' placeholder='Введите код'/>
            </div>
            

            <TextArea size='m' placeholder='Комментарии'/>
        </form>
    </Modal>
  )
}
