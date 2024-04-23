import DataTable, { Column } from "@gravity-ui/react-data-table";
import useBids from "../../hooks/useBids";
import { Bid } from "../../types/bid.types";
import { Button, Loader } from "@gravity-ui/uikit";
import { Gear, TrashBin } from "@gravity-ui/icons";

export default function Table() {
    const {data, isLoading} = useBids()
    const columns: Column<Bid>[] = [
        { header: '№ заявки', name: 'id' },
        { header: 'Дата и время получения', name: 'created_at' },
        { header: 'Фирма клиента', name: 'firm_name' },
        { header: 'ФИО перевозчика', name: 'fio_carrier' },
        { header: 'Телефон перевозчика', name: 'phone_carrier' },
        { header: 'Комментарии', name: 'comments' },
        { header: 'Статус', name: 'status' },
        { header: 'ATI', name: 'ati' , render: ({ value, row, index }) => <a href={`https://ati.su/firms/${value}/info`}>{value as string}</a> },
    ];
    const startIndex = 0;
    
  return (
    <div style={{marginTop: '16px', display: 'flex', justifyContent: 'center'}}>
        <div>
            {isLoading ? <Loader/> : 
            data ? 
            <DataTable theme="yandex-cloud" data={data} columns={columns} startIndex={startIndex}/> 
            : "Пусто"}
        </div>
    </div>
  )
}
