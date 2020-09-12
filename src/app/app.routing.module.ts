import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotFoundComponent } from './errors/not-found/not-found.component';
import { GeneratorComponent } from './widgets/generator/generator.component';
import { PaymentsComponent } from './widgets/payments/payments.component';


const routes: Routes = [
    { path: 'generator', component: GeneratorComponent },
    { path: 'payments', component: PaymentsComponent },
    { path: '**', component: NotFoundComponent  }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule { }