import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BreakDownRoutingModule } from './break-down-routing.module';
import { BreakDownComponent } from './break-down.component';


@NgModule({
  declarations: [
    BreakDownComponent
  ],
  imports: [
    CommonModule,
    BreakDownRoutingModule
  ]
})
export class BreakDownModule { }
