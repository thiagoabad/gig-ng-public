import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CodeDisplayModule } from '../code-display/code-display.module';

import { GeneratorComponent } from './generator.component';

@NgModule({
    declarations: [GeneratorComponent],
    imports: [
        CommonModule,
        CodeDisplayModule
    ],
    exports: [ GeneratorComponent ]
})
export class GeneratorModule { }