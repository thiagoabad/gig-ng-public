import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Payment } from './payment';
import { BehaviorSubject } from 'rxjs';

const API = 'https://localhost:3000';

@Injectable({ providedIn: 'root' })
export class PaymentsService {

    constructor(private http: HttpClient) {}

    payments: Payment[] = [];
    private paymentsBS = new BehaviorSubject(this.payments);
    sharedPayments = this.paymentsBS.asObservable();

    apiPut(): void {
         this.http
             .put<Payment[]>(API + '/payments', this.payments).subscribe();
    }

    nextPayments(payments: Payment[]): void{
        this.paymentsBS.next(payments);
    }

}
