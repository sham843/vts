import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-etp-details-dialog',
  templateUrl: './etp-details-dialog.component.html',
  styleUrls: ['./etp-details-dialog.component.css']
})
export class EtpDetailsDialogComponent implements OnInit {
  dataSource:any;
  etpDetailsList: any;
  getetpDetailsListData:any;
  displayedColumns: string[] = ['rownumber','invoiceNo', 'vehicle','driverName','quantity','destination','validityFrom','validityUpto'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialogRef: MatDialogRef<EtpDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.etpDetailsList = this.data;
    this.getetpDetailsList();
  }

  getetpDetailsList() {
     this.getetpDetailsListData = this.etpDetailsList;
     this.dataSource = new MatTableDataSource(this.getetpDetailsListData);
     this.dataSource.paginator = this.paginator;
     setTimeout(() => {
      this.dataSource.sort = this.sort; 
    })
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
