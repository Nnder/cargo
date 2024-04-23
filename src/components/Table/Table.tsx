"use client"
import DataTable from "react-data-table-component";
// import DataTable, { Column } from "@gravity-ui/react-data-table";
import useBids from "../../hooks/useBids";
import { Bid } from "../../types/bid.types";
import { Loader } from "@gravity-ui/uikit";

export default function Table() {
    const {data, isLoading} = useBids()
    const columns: any = [
      { name: '№ заявки', selector: (row:Bid) =>row.id, },
      { name: 'Дата и время получения', selector: (row:Bid) =>row.created_at,},
      { name: 'Фирма клиента', selector: (row:Bid) =>row.firm_name },
      { name: 'ФИО перевозчика', selector: (row:Bid) =>row.fio_carrier },
      { name: 'Телефон перевозчика', selector: (row:Bid) =>row.phone_carrier},
      { name: 'Комментарии', selector: (row:Bid) =>row.comments},
      { name: 'Статус', selector: (row:Bid) =>row.status},
      { name: 'ATI', selector: (row:Bid) =><a href={`https://ati.su/firms/${row.ati}/info`}>{row.ati}</a>},
  ];
    const startIndex = 0;

    
    return (
      <div style={{marginTop: '16px', display: 'flex', justifyContent: 'center'}}>
          <div>
          {isLoading ? <Loader/> : 
            data ? 
            // <DataTable theme="yandex-cloud" data={data} columns={columns} startIndex={startIndex}/> 
            <DataTable data={data} columns={columns}/>
            : "Пусто"}
          </div>
      </div>
    )
  
  
}
