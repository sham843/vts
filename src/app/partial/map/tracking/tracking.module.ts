import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';
import { TrackingRoutingModule } from './tracking-routing.module';
import { TrackingComponent } from './tracking.component';


@NgModule({
  declarations: [
    TrackingComponent
  ],
  imports: [
    CommonModule,
    TrackingRoutingModule,
    AgmCoreModule
  ]
})
export class TrackingModule { }
