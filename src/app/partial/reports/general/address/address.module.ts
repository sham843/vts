import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddressRoutingModule } from './address-routing.module';
import { AddressComponent } from './address.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

import { NgxMatDatetimePickerModule, NgxMatTimepickerModule, NgxMatNativeDateModule } from '@angular-material-components/datetime-picker';


@NgModule({
  declarations: [
    AddressComponent
  ],
  imports: [
    CommonModule,
    AddressRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule
  ]
})
export class AddressModule { }
