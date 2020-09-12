import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeDisplayModule } from './code-display/code-display.module';
import { GeneratorModule } from './generator/generator.module';
import { PaymentsModule } from './payments/payments.module';

@NgModule({
  imports: [
    CommonModule,
    CodeDisplayModule,
    GeneratorModule,
    PaymentsModule
  ]
})
export class WidgetsModule { }
