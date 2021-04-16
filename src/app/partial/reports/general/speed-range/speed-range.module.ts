import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpeedRangeRoutingModule } from './speed-range-routing.module';
import { SpeedRangeComponent } from './speed-range.component';


@NgModule({
  declarations: [
    SpeedRangeComponent
  ],
  imports: [
    CommonModule,
    SpeedRangeRoutingModule
  ]
})
export class SpeedRangeModule { }
