import { Component, ViewEncapsulation, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';

import { ModalService } from './payments-modal.service';

@Component({ 
    selector: 'payments-modal', 
    templateUrl: 'payments-modal.component.html', 
    styleUrls: ['payments-modal.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class ModalComponent implements OnInit, OnDestroy {
    @Input() id: string;
    private element: any;

    constructor(private modalService: ModalService, private el: ElementRef) {
        this.element = el.nativeElement;
    }

    ngOnInit(): void {
        if (!this.id) {
            return;
        }

        this.modalService.add(this);
    }

    ngOnDestroy(): void {
        this.modalService.remove(this.id);
    }

    open(): void {
        this.element.style.display = 'block';
        document.body.classList.add('payments-modal-open');
    }

    close(): void {
        this.element.style.display = 'none';
        document.body.classList.remove('payments-modal-open');
    }
}