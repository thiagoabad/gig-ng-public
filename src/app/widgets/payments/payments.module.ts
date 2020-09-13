import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NavbarModule } from 'src/app/navbar/navbar.module';

import { CodeDisplayModule } from '../code-display/code-display.module';
import { PaymentsComponent } from './payments.component';

@NgModule({
    declarations: [PaymentsComponent],
    imports: [
        CommonModule, CodeDisplayModule, NavbarModule
    ],
    exports: [ PaymentsComponent ]
})
export class PaymentsModule { }