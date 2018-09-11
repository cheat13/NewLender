import { HttpHeaders } from "@angular/common/http";

export class Item {
    id: string
    name: string
    locker: string
    amount: number
    totalAmount: number
    borrow: number
}

export class Lender {
    id: string
    name: string
}

export class Locker {
    id: string
    name: string
    cate: string
}

export class Borrow {
    id: string
    lockerId: string
    lockerName: string
    lockerCate: string
    lenderId: string
    lenderName: string
    buddyId: string
    buddyName: string
    date: string
    items: Item[]
}

export class GlobalVarible {
    static host: string = "http://kritna.azurewebsites.net";

    static httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    static lender: Lender;

}