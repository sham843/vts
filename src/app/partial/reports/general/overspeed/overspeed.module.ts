import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverspeedRoutingModule } from './overspeed-routing.module';
import { OverspeedComponent } from './overspeed.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [
    OverspeedComponent
  ],
  imports: [
    CommonModule,
    OverspeedRoutingModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
  ]
})
export class OverspeedModule { }
