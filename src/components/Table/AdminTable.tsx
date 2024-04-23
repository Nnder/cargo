"use client"
// import DataTable, { Column } from "@gravity-ui/react-data-table";
import useBids from "../../hooks/useBids";
import { Bid } from "../../types/bid.types";
import { Button, Loader } from "@gravity-ui/uikit";
import DataTable from "react-data-table-component";
import DeleteButton from "../Button/DeleteButton";
import UpdateButton from "../Button/UpdateButton";
import BidForm from "../Form/Bid";
import { useBidStore } from "@/src/zustand/bid";
import Search from "../Search/Search";
import Filter from "../Filter/Filter";

export default function AdminTable() {
  const {data, isLoading} = useBids()
  const {openModal} = useBidStore()

  const columns: any = [
      { name: '№ заявки', selector: (row:Bid) =>row.id, },
      { name: 'Дата и время получения', selector: (row:Bid) =>row.created_at,},
      { name: 'Фирма клиента', selector: (row:Bid) =>row.firm_name },
      { name: 'ФИО перевозчика', selector: (row:Bid) =>row.fio_carrier },
      { name: 'Телефон перевозчика', selector: (row:Bid) =>row.phone_carrier},
      { name: 'Комментарии', selector: (row:Bid) =>row.comments},
      { name: 'Статус', selector: (row:Bid) =>row.status},
      { name: 'ATI', selector: (row:Bid) =><a href={`https://ati.su/firms/${row.ati}/info`}>{row.ati}</a>},
      { name: 'Кнопки', selector: (row:Bid) => <div><UpdateButton bid={row}/> <DeleteButton bid={row}/></div>},
  ];
  const startIndex = 0;
    
  return (
    <>
      <BidForm/>
      
      <div style={{marginTop: '16px', display: 'flex', justifyContent: 'center', flexDirection: 'column', width: '100%'}}>
      <Search/>
      <div style={{display: 'flex', width: '600px', justifyContent: 'space-around', alignItems: 'center', margin: '8px'}}>
        <div style={{marginBottom: '8px', fontSize: '20px'}}>Количество заявок: {isLoading ? "..." : data && data.length}</div>
        <Filter/>
      </div>
      
        <Button view="action" size="l" style={{marginBottom: '8px', width: '100%'}} onClick={openModal}>Создать заявку</Button>
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%'}}>
              {isLoading ? <Loader/> : 
              data ? 
              <>
              {/* <DataTable theme="yandex-cloud" data={data} columns={columns} startIndex={startIndex}/>  */}
              <DataTable data={data} columns={columns} style={{maxWidth: '100vw'}}/></>
              : "Пусто"}
          </div>
      </div>
    </>
  )
}
