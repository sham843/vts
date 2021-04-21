import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonService } from 'src/app/services/common.service';
import { CallAPIService } from 'src/app/services/call-api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ExcelService } from 'src/app/services/excel.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-material-order',
  templateUrl: './material-order.component.html',
  styleUrls: ['./material-order.component.scss'],
  providers: [DatePipe]
})
export class MaterialOrderComponent implements OnInit {

  select: boolean = false;
  materialOrderFrom: any;
  date: any = new Date();
  vechileList: any;
  hideReport = false;
  materialOrderReportData: any;
  vehName: any;
  printBtn: boolean = false;
  submitted = false;
  maxDateOut: any = new Date();
  //emptyData = true;
  maxDate: any = this._commonService.toDate();
  dataSource: any;

  displayedColumns: string[] = ['rowNumber', 'materialOrderDate', 'projectOwnerName', 'projectName'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _callAPIService: CallAPIService,
    private _snackBar: MatSnackBar,
    private _commonService: CommonService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private _excelService:ExcelService,
    public datepipe: DatePipe,
  ) { }

  
  ngOnInit(): void {
    this.customForm();
  }

  customForm() {
    this.materialOrderFrom = this.formBuilder.group({
      fromDate: [this._commonService.fromDate()],
      toDate: [this._commonService.toDate()],
    });
  }

  clearForm() {
    this.hideReport = false;
    this.select = true;
    this.submitted = false;
    this.materialOrderFrom.reset({
      toDate: this._commonService.toDate(),
      fromDate: this._commonService.fromDate()
    });
  }

  
  onSubmit() {
    this.submitted = true;
    this.spinner.show();

    if (this.materialOrderFrom.invalid) {
      this.hideReport = false;
      this.spinner.hide();
      return;
    }
    else {
      let data = this.materialOrderFrom.value;
      data.fromDate = this.datepipe.transform(data.fromDate, 'yyyy-MM-dd') ;
      data.toDate = this.datepipe.transform(data.toDate, 'yyyy-MM-dd');
      this._callAPIService.callAPI('get', 'vehicle-tracking/mahakhanij/get-material-order-enquiry?UserId=' + this._commonService.loggedInUserId() + '&fromDate=' + data.fromDate + '&toDate=' + data.toDate, false, false , false,'vehicleTrackingBaseUrlApi');
      this._callAPIService.getResponse().subscribe((res: any) => {
        if (res.statusCode === "200") {
          this.materialOrderReportData = Object.assign(res.responseData, this.materialOrderFrom.value);
           this.dataSource = new MatTableDataSource(res.responseData);
          this.dataSource.paginator = this.paginator;
         // console.log(this.invoiceReportData);
          setTimeout(() => {
            this.dataSource.sort = this.sort; 
          })
          this.hideReport = true;
          this.spinner.hide();
        }
        else if (res.statusCode === "409") {
          this.spinner.hide();
          this._snackBar.open(res.statusMessage,'OK');
        }
        else {
          this.hideReport = false;
          this._snackBar.open(res.statusMessage,'OK');
          this.spinner.hide();
        }
      })
    }
  }

  downLoadExcel() {
    let keyExcelHeader = ["Sr No."," Date","Name","Project"];
    let key = ['rowNumber', 'materialOrderDate', 'projectOwnerName', 'projectName'];
    this.materialOrderFrom.value['pageName']="Material Order Enquiry Report";
    let formDataObj:any  =  this.materialOrderFrom.value;
    this._excelService.exportAsExcelFile(keyExcelHeader,key, this.materialOrderReportData,formDataObj);
  }

  downLoadPDF() {
    let keyPDFHeader = ["Sr No."," Date","Name","Project"];
    let key = ['rowNumber', 'materialOrderDate', 'projectOwnerName', 'projectName'];
    this.materialOrderFrom.value['pageName']="Material Order Enquiry Report";
    let formDataObj:any  =  this.materialOrderFrom.value;
    this._excelService.downLoadPdf(keyPDFHeader,key, this.materialOrderReportData,formDataObj);
  }


}
