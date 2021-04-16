import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OverspeedRoutingModule } from './overspeed-routing.module';
import { OverspeedComponent } from './overspeed.component';


@NgModule({
  declarations: [
    OverspeedComponent
  ],
  imports: [
    CommonModule,
    OverspeedRoutingModule
  ]
})
export class OverspeedModule { }
