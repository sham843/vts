import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PoiRoutingModule } from './poi-routing.module';
import { PoiComponent } from './poi.component';


@NgModule({
  declarations: [
    PoiComponent
  ],
  imports: [
    CommonModule,
    PoiRoutingModule
  ]
})
export class PoiModule { }
