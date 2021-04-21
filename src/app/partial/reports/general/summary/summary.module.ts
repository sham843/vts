import { NgModule } from '@angular/core';
<<<<<<< HEAD
import { CommonModule, DatePipe } from '@angular/common';

import { SummaryRoutingModule } from './summary-routing.module';
import { SummaryComponent } from './summary.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


=======
import { CommonModule } from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import { SummaryRoutingModule } from './summary-routing.module';
import { SummaryComponent } from './summary.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
>>>>>>> master
@NgModule({
  declarations: [
    SummaryComponent
  ],
  imports: [
    CommonModule,
    SummaryRoutingModule,
<<<<<<< HEAD
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [DatePipe]
=======
    MatSelectModule,
    ReactiveFormsModule,
    MatInputModule
  ]
>>>>>>> master
})
export class SummaryModule { }
