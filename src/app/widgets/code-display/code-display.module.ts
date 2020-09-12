import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CodeDisplayComponent } from './code-display.component';

@NgModule({
    declarations: [CodeDisplayComponent],
    imports: [
        CommonModule
    ],
    exports: [ CodeDisplayComponent ]
})
export class CodeDisplayModule { }