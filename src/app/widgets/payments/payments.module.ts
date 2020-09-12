import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CodeDisplayModule } from '../code-display/code-display.module';
import { PaymentsComponent } from './payments.component';

@NgModule({
    declarations: [PaymentsComponent],
    imports: [
        CommonModule, CodeDisplayModule
    ],
    exports: [ PaymentsComponent ]
})
export class PaymentsModule { }