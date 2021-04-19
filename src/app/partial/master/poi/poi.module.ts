import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';
import { PoiRoutingModule } from './poi-routing.module';
import { PoiComponent } from './poi.component';


@NgModule({
  declarations: [
    PoiComponent
  ],
  imports: [
    CommonModule,
    AgmCoreModule,
    PoiRoutingModule
  ]
})
export class PoiModule { }
