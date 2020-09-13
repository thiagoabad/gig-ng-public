import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NavbarModule } from 'src/app/navbar/navbar.module';
import { CodeDisplayModule } from '../code-display/code-display.module';

import { GeneratorComponent } from './generator.component';

@NgModule({
    declarations: [GeneratorComponent],
    imports: [
        CommonModule,
        CodeDisplayModule,
        NavbarModule
    ],
    exports: [ GeneratorComponent ]
})
export class GeneratorModule { }