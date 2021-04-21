import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialOrderRoutingModule } from './material-order-routing.module';
import { MaterialOrderComponent } from './material-order.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [
    MaterialOrderComponent
  ],
  imports: [
    CommonModule,
    MaterialOrderRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
  ]
})
export class MaterialOrderModule { }
