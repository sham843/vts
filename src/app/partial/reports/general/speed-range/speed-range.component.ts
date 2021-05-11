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
  selector: 'app-speed-range',
  templateUrl: './speed-range.component.html',
  styleUrls: ['./speed-range.component.scss'],

})
export class SpeedRangeComponent implements OnInit {

  select: boolean = false;
  speedRangeFrom: any;
  date: any = new Date();
  vechileList: any;
  driverName: any;
  hideReport = false;
  speedRangeReportData: any;
  driverMobile: any;
  vehName: any;
  printBtn: boolean = false;
  submitted = false;
  maxDateOut: any = new Date();
  //emptyData = true;
  maxDate: any = this._commonService.toDate();
  dataSource: any;

  displayedColumns: string[] = ['rowNumber', 'deviceDateTime', 'speed', 'latitude'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _callAPIService: CallAPIService,
    private _snackBar: MatSnackBar,
    private _commonService: CommonService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private _excelService: ExcelService,
  ) { }

  ngOnInit(): void {
    this.getVehiclesList();
    this.customForm();
  }

  customForm() {
    this.speedRangeFrom = this.formBuilder.group({
      VehicleNumber: ['', Validators.required],
      fromDate: [this._commonService.fromDate()],
      toDate: [this._commonService.toDate()],
      fromRange: ['', Validators.required],
      toRange: ['', Validators.required],
    });
  }

  clearForm() {
    this.hideReport = false;
    this.select = true;
    this.submitted = false;
    this.speedRangeFrom.reset({
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

  get f() { return this.speedRangeFrom.controls };

  onSubmit() {
    this.submitted = true;
    this.spinner.show();
    this.vechileList.forEach((element: any) => { // get driver name from vehicleNo
      if (element.vehicleNo == this.speedRangeFrom.value.VehicleNumber) {
        this.vehName = element.vehTypeName;
      }
    });

    let driversData = { // driver name obj
      vehTypeName: this.vehName
    };

    if (this.speedRangeFrom.invalid) {
      this.hideReport = false;
      this.spinner.hide();
      return;
    }
    else {
      let data = this.speedRangeFrom.value;

      let date1: any = new Date(data.fromDate);
      let timeStamp = Math.round(new Date(data.toDate).getTime() / 1000);
      let timeStampYesterday = timeStamp - (24 * 3600);
      let is24 = date1 >= new Date(timeStampYesterday * 1000).getTime();

      if (!is24) {
        this._snackBar.open("Date difference does not exceed 24hr.","Ok");
        this.spinner.hide();
        return
      }


      this._callAPIService.callAPI('get', 'vehicle-tracking/reports/get-overspeed-report-speedrange?UserId=' + this._commonService.loggedInUserId() + '&VehicleNo=' + data.VehicleNumber + '&FromDate=' + data.fromDate + '&toDate=' + data.toDate, false, false, false, 'vehicleTrackingBaseUrlApi');
      this._callAPIService.getResponse().subscribe((res: any) => {
        if (res.statusCode === "200") {
          this.speedRangeReportData = Object.assign(res.responseData, this.speedRangeFrom.value, driversData);
          this.dataSource = new MatTableDataSource(res.responseData);
          setTimeout(() => {
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          })
          this.hideReport = true;
          this.spinner.hide();
        }
        else if (res.statusCode === "409") {
          this.spinner.hide();
          this._snackBar.open(res.statusMessage, 'OK');
        }
        else {
          this.hideReport = false;
          this._snackBar.open(res.statusMessage, 'OK');
          this.spinner.hide();
        }
      })
    }
  }

  downLoadExcel() {
    let keyExcelHeader = ["Sr No.", " Date", "Speed", "Address"];
    let key = ['rowNumber', 'deviceDateTime', 'speed', 'latitude'];
    this.speedRangeFrom.value['pageName'] = "Over Speed Report";
    let formDataObj: any = this.speedRangeFrom.value;
    this._excelService.exportAsExcelFile(keyExcelHeader, key, this.speedRangeReportData, formDataObj);
  }

  downLoadPDF() {
    let keyPDFHeader = ["Sr No.", " Date", "Speed", "Address"];
    let key = ['rowNumber', 'deviceDateTime', 'speed', 'latitude'];
    this.speedRangeFrom.value['pageName'] = "Over Speed Report";
    let formDataObj: any = this.speedRangeFrom.value;
    this._excelService.downLoadPdf(keyPDFHeader, key, this.speedRangeReportData, formDataObj);
  }

}
