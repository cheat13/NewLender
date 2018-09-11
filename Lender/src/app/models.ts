import { HttpHeaders } from "@angular/common/http";

export class Item {
    id: string
    name: string
    locker: string
    amount: number
    totalAmount: number
    lenders: Lender[]

}

export class Lender {
    id: string
    friendID: string
    name: string
    borrow: number
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