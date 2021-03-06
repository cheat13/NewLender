import { HttpHeaders } from "@angular/common/http";

export class Item {
    id: string;
    name: string;
    locker: string;
    lockerName: string;
    amount: number;
    totalAmount: number;
    borrowAmount: number;
    returnAmount: number;
    img:string;
}

export class Lender {
    id: string;
    name: string;
    password : string;
}

export class Locker {
    id: string;
    name: string;
    layer: string;
    cate: string;
}

export class BorrowList {
    id: string
    lockerId: string;
    lockerName: string;
    lockerCate: string;
    lenderId: string;
    lenderName: string;
    buddyId: string;
    buddyName: string;
    date: string;
    items: Item[];
}

export class ReturnList {
    id: string;
    borrowListId:string;
    lockerId: string;
    lockerName: string;
    lockerCate: string;
    returnerId: string;
    returnerName: string;
    buddyId: string;
    buddyName: string;
    date: string;
    items: Item[];
}

export class GlobalVarible {
    static host: string = "http://kritna.azurewebsites.net";

    static httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    static lender: Lender;

}