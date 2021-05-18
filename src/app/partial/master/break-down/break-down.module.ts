import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BreakDownRoutingModule } from './break-down-routing.module';
import { BreakDownComponent } from './break-down.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';

import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { NgxSelectModule } from 'ngx-select-ex';

@NgModule({
  declarations: [
    BreakDownComponent
  ],
  imports: [
    CommonModule,
    BreakDownRoutingModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatRadioModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    NgxMatSelectSearchModule,
    NgxSelectModule,
  ]
})
export class BreakDownModule { }
