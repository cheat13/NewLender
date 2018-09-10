import { HttpHeaders } from "@angular/common/http";

export class Item {
    id: string
    name: string
    amount: number
    bamount: number
    totalAmount: number
    locker: string
    status: boolean
    borrow: boolean
}

export class Lender {
    id: string;
    name: string
    items: Item[]
}

export class Locker {
    id: string
    name: string
    cate: string
}

export class GlobalVarible {
    static host: string = "http://kritna.azurewebsites.net";

    static httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    static lender: Lender;
}