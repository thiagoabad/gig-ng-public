import { Component, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { StorageService } from 'src/app/storage.service';
import { TimerService } from 'src/app/timer.service';
import { Payment } from './payment';
import { PaymentForm } from './paymentForm';
import { PaymentsService } from './payments.service';
import { ModalService } from './modal/payments-modal.service';

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
  live: boolean;
  debounce: Subject<PaymentForm> = new Subject<PaymentForm>();
  errors: string[] = [];

  constructor(private storageService: StorageService,
              private paymentsService: PaymentsService,
              private timer: TimerService,
              private modalService: ModalService)
  { }

  ngOnInit(): void {
    this.storageService.sharedCode1.subscribe(code1 => this.code1 = code1);
    this.storageService.sharedCode2.subscribe(code2 => this.code2 = code2);
    this.storageService.sharedGrid.subscribe(grid => this.grid = grid);
    this.timer.setLive.subscribe(live => this.live = live);
    this.paymentsService.sharedPayments.subscribe(payments => this.payments = payments);
    this.debounce
      .pipe(debounceTime(300))
      .subscribe(filter => this.onClick(filter.name , filter.ammount));
  }

  onClick(inputPayment: string, inputAmmount: number): void {
    this.errors = [];
    if (!this.live) { this.errors.push('Code has expired'); }
    if (inputPayment.trim() === '') { this.errors.push('Payment cannot be empty'); }
    if (!inputAmmount) { this.errors.push('Ammount cannot be empty'); }

    if (this.errors.length > 0){
      this.openModal('payments-modal');
      return;
    }

    const payment: Payment = {
      name: inputPayment,
      ammount: inputAmmount,
      code: this.code1 * 10 + this.code2,
      grid: this.grid,
    };
    this.payments.push(payment);
    this.paymentsService.apiPut();

  }

  openModal(id: string): void {
    this.modalService.open(id);
  }

  closeModal(id: string): void {
    this.modalService.close(id);
  }

}
