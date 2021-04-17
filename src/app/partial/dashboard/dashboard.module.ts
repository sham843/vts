import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { EtpDetailsDialogComponent } from './dialog/etp-details-dialog/etp-details-dialog.component';
import { BreakdownListDialogComponent } from './dialog/breakdown-list-dialog/breakdown-list-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
@NgModule({
  declarations: [
    DashboardComponent,  BreakdownListDialogComponent, EtpDetailsDialogComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    
  ]
})
export class DashboardModule { }
