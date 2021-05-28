import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RechargeRoutingModule } from './recharge-routing.module';
import { RechargeComponent } from './recharge.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

@NgModule({
  declarations: [
    RechargeComponent
  ],
  imports: [
    CommonModule,
    RechargeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatTableModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
  ]
})
export class RechargeModule { }
