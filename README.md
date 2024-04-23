## REST API

#### Использовал supabase

### Получение заявок (GET)
```
link/bids

результат: 

[
    {
        id: number
        created_at: number
        firm_name: string
        fio_carrier: string
        phone_carrier: string
        comments: string
        status: BidStatus
        ati: number
    }, ...
]

link/bids/:id

результат: 

{
    id: number
    created_at: number
    firm_name: string
    fio_carrier: string
    phone_carrier: string
    comments: string
    status: BidStatus
    ati: number
}


```

### Создание заявки (POST)

```
body: {
    created_at: number
    firm_name: string
    fio_carrier: string
    phone_carrier: string
    comments: string
    status: BidStatus
    ati: number
}

link/bids

результат:

{
    id: number
    created_at: number
    firm_name: string
    fio_carrier: string
    phone_carrier: string
    comments: string
    status: BidStatus
    ati: number
}

```


### Обновление заявки (PUT)
```
body: {
    created_at: number
    firm_name: string
    fio_carrier: string
    phone_carrier: string
    comments: string
    status: BidStatus
    ati: number
}

link/bids/:id

результат:

// измененный обьект

{
    id: number
    created_at: number
    firm_name: string
    fio_carrier: string
    phone_carrier: string
    comments: string
    status: BidStatus
    ati: number
}
```

### Удаление заявки (DELETE)
```
link/bids/:id

результат:

{
    id: number
    created_at: number
    firm_name: string
    fio_carrier: string
    phone_carrier: string
    comments: string
    status: BidStatus
    ati: number
}


или 

body: {
    id: number
}

link/bids

результат:

{
    id: number
    created_at: number
    firm_name: string
    fio_carrier: string
    phone_carrier: string
    comments: string
    status: BidStatus
}

```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.