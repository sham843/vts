import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import { SummaryRoutingModule } from './summary-routing.module';
import { SummaryComponent } from './summary.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
// import { MAT_DATE_LOCALE, DateAdapter } from '@angular/material';
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';

@NgModule({
  declarations: [
    SummaryComponent
  ],
  imports: [
    CommonModule,
    SummaryRoutingModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    NgxMatTimepickerModule,
    NgxMatDatetimePickerModule
  
  ],

})
export class SummaryModule { }
