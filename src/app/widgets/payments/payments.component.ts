import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { EventEmitterService } from 'src/app/event-emitter.service';
import { Payment } from './payment';
import { PaymentForm } from './paymentForm';
import { PaymentsService } from './payments.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {

  grid: string[][] = [];
  payments: Payment[] = [];
  code1: number;
  code2: number;
  gridNeedsRefresh = true;
  debounce: Subject<PaymentForm> = new Subject<PaymentForm>();

  constructor(private eventEmitterService: EventEmitterService, private paymentsService: PaymentsService, private router: Router) { }

  ngOnInit() {
    this.eventEmitterService.sharedCode1.subscribe(code1 => this.code1 = code1);
    this.eventEmitterService.sharedCode2.subscribe(code2 => this.code2 = code2);
    this.eventEmitterService.sharedGridNeedsRefresh.subscribe(gridNeedsRefresh => this.gridNeedsRefresh = gridNeedsRefresh);
    this.eventEmitterService.sharedGrid.subscribe(grid => this.grid = grid);
    this.paymentsService.sharedPayments.subscribe(payments => this.payments = payments);
    this.debounce
      .pipe(debounceTime(300))
      .subscribe(filter => this.onClick(filter.name , filter.ammount));
  }

  onClick(inputPayment: string, inputAmmount: number) {
      
    let payment: Payment = {
      name: inputPayment,
      ammount: inputAmmount,
      code: this.code1 * 10 + this.code2,
      grid: this.grid,
    }
    this.payments.push(payment);

  }

  btnClick= function () {
    this.router.navigateByUrl('/generator');
  };
}
