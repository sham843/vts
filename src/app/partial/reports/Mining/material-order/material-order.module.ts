import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialOrderRoutingModule } from './material-order-routing.module';
import { MaterialOrderComponent } from './material-order.component';


@NgModule({
  declarations: [
    MaterialOrderComponent
  ],
  imports: [
    CommonModule,
    MaterialOrderRoutingModule
  ]
})
export class MaterialOrderModule { }
