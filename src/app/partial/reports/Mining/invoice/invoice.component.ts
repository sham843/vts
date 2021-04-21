import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
//import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/services/common.service';
import { CallAPIService } from 'src/app/services/call-api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ExcelService } from 'src/app/services/excel.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {

  select: boolean = false;
  invoiceFrom: any;
  date: any = new Date();
  vechileList: any;
  hideReport = false;
  invoiceReportData: any;
  vehName: any;
  printBtn: boolean = false;
  submitted = false;
  maxDateOut: any = new Date();
  //emptyData = true;
  maxDate: any = this._commonService.toDate();
  dataSource: any;

  displayedColumns: string[] = ['rownumber', 'invoiceNo', 'validityFrom', 'validityUpto', 'plotName', 'destination', 'driverName', 'distance', 'quantity'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _callAPIService: CallAPIService,
    private _snackBar: MatSnackBar,
    private _commonService: CommonService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private _excelService:ExcelService,
  ) { }

  ngOnInit(): void {
    this.getVehiclesList();
    this.customForm();
  }

  customForm() {
    this.invoiceFrom = this.formBuilder.group({
      VehicleNumber: ['', Validators.required],
      fromDate: [this._commonService.fromDate()],
      toDate: [this._commonService.toDate()],
    });
  }

  clearForm() {
    this.hideReport = false;
    this.select = true;
    this.submitted = false;
    this.invoiceFrom.reset({
      VehicleNumber: '',
      toDate: this._commonService.toDate(),
      fromDate: this._commonService.fromDate()
    });
  }

  getVehiclesList() {
    this._callAPIService.callAPI('get', 'vehicle-tracking/dashboard/get-vehicles-list?UserId=' + this._commonService.loggedInUserId(), false, false, false, 'vehicleTrackingBaseUrlApi');
    this._callAPIService.getResponse().subscribe((res: any) => {
      if (res.statusCode === "200") {
        this.vechileList = res;
        this.vechileList = this.vechileList.responseData;
      }
      else if (res.statusCode === "409") {
        this._snackBar.open(res.statusMessage);
      }
      else {
        this._snackBar.open(res.statusMessage);
      }
    })
  }

  get f() { return this.invoiceFrom.controls };

  onSubmit() {
    this.submitted = true;
    this.spinner.show();

    this.vechileList.forEach((element: any) => { // get driver name from vehicleNo
      if (element.vehicleNo == this.invoiceFrom.value.VehicleNumber) {
        this.vehName = element.vehTypeName;
      }
    });

    let driversData = { // driver name obj
      vehTypeName: this.vehName
    };

    if (this.invoiceFrom.invalid) {
      this.hideReport = false;
      this.spinner.hide();
      return;
    }
    else {
      let data = this.invoiceFrom.value;
      this._callAPIService.callAPI('get', 'vehicle-tracking/reports/get-invoice-history?UserId=' + this._commonService.loggedInUserId() + '&FromDate=' + data.fromDate + '&toDate=' + data.toDate, false, false, false, 'vehicleTrackingBaseUrlApi');
      this._callAPIService.getResponse().subscribe((res: any) => {
        if (res.statusCode === "200") {
          this.invoiceReportData = Object.assign(res.responseData.data, this.invoiceFrom.value, driversData);
           this.dataSource = new MatTableDataSource(res.responseData.data);
          this.dataSource.paginator = this.paginator;
          console.log(this.invoiceReportData);
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
    let keyExcelHeader = ["Sr No.", "eTP", "From", "To", "Plot Name", "Destination", "Driver Name", "Distance", "Quantity"];
    let key = ['rownumber', 'invoiceNo', 'validityFrom', 'validityUpto', 'plotName', 'destination', 'driverName', 'distance', 'quantity'];
    this.invoiceFrom.value['pageName'] = "eTP Report";
    let formDataObj: any = this.invoiceFrom.value;
    this._excelService.exportAsExcelFile(keyExcelHeader, key, this.invoiceReportData, formDataObj);
  }

  downLoadPDF() {
    let keyPDFHeader = ["Sr No.", "eTP", "From", "To", "Plot Name", "Destination", "Driver Name", "Distance", "Quantity"];
    let key = ['rownumber', 'invoiceNo', 'validityFrom', 'validityUpto', 'plotName', 'destination', 'driverName', 'distance', 'quantity'];
    this.invoiceFrom.value['pageName'] = "eTP Report";
    let formDataObj: any = this.invoiceFrom.value;
    this._excelService.downLoadPdf(keyPDFHeader, key, this.invoiceReportData, formDataObj);
  }

}


