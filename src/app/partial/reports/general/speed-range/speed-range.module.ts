import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpeedRangeRoutingModule } from './speed-range-routing.module';
import { SpeedRangeComponent } from './speed-range.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';


@NgModule({
  declarations: [
    SpeedRangeComponent
  ],
  imports: [
    CommonModule,
    SpeedRangeRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule


  ]
})
export class SpeedRangeModule { }
