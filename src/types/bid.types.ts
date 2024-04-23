export type BidStatus = "новая" | "в работе" | "завершено";

export interface Bid {
    id: number
    created_at: number
    firm_name: string
    fio_carrier: string
    phone_carrier: string
    comments: string
    status: BidStatus
    ati: number
}