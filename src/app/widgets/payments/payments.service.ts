import { Injectable } from '@angular/core';
//import { HttpClient } from "@angular/common/http";
import { Payment } from './payment';
import { BehaviorSubject } from 'rxjs';

const API = 'http://localhost:3000';

@Injectable({ providedIn: 'root' })
export class PaymentsService {

    // constructor(private http: HttpClient) {}
    constructor(){}

    payments: Payment[] = [];
    private paymentsBS = new BehaviorSubject(this.payments);
    sharedPayments = this.paymentsBS.asObservable();

    // apiPut() {
    //     return this.http
    //         .put<Payment[]>(API + '/payments', this.payments);
    // }

    nextPayments(payments: Payment[]){
        this.paymentsBS.next(payments);
    }

}