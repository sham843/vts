import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-breakdown-list-dialog',
  templateUrl: './breakdown-list-dialog.component.html',
  styleUrls: ['./breakdown-list-dialog.component.css']
})

export class BreakdownListDialogComponent implements OnInit {
  breakdownList: any;
  getbreakdownData:any;
  filterDataCount: any;
  dataSource: any;
  breakdownData:any;
  displayedColumns: string[] = ['srNo','vehicleNo', 'invoiceNo','quantity','destination','validityFrom','validityUpto','breakdownDatetime','restartDatetime'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialogRef: MatDialogRef<BreakdownListDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) { }

  ngOnInit(): void {
    this.breakdownList = this.data;
    console.log(this.breakdownList);
    this.getBreakdownList();

  }

  generateExcel() {
     console.log('called');
    // this._excelService.generateExcel();
   }

  getBreakdownList() {
     this.getbreakdownData = this.breakdownList;
     this.dataSource = new MatTableDataSource(this.getbreakdownData);
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

