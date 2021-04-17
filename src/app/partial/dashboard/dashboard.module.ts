import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
<<<<<<< HEAD
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartsModule } from 'ng2-charts';
import {MatTableModule} from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';


=======
import { EtpDetailsDialogComponent } from './dialog/etp-details-dialog/etp-details-dialog.component';
import { BreakdownListDialogComponent } from './dialog/breakdown-list-dialog/breakdown-list-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
>>>>>>> master
@NgModule({
  declarations: [
    DashboardComponent,  BreakdownListDialogComponent, EtpDetailsDialogComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
<<<<<<< HEAD
    NgxChartsModule,
    ChartsModule,
    MatTableModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatSortModule,
=======
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    
>>>>>>> master
  ]
})
export class DashboardModule { }
