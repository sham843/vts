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
import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.scss']
})
export class TripComponent implements OnInit {

  select: boolean = false;
  tripFrom: any;
  date: any = new Date();
  vechileList: any;
  hideReport = false;
  tripReportData: any;
  vehName: any;
  printBtn: boolean = false;
  submitted = false;
  maxDateOut: any = new Date();
  //emptyData = true;
  maxDate: any = this._commonService.toDate();
  dataSource: any;
  p: number = 1;
  hideDateDiv = true;
  TripArray = ["Trip", "24hr", "Weekly"];
  dateTimeDiv: boolean = false;
  geoCoder: any;
  addressStart: any;
  addressEnd: any;
  latlngStart: any;
  latlngEnd: any;

  displayedColumns: string[] = ['index','travelledDistance', 'tripDurationInMins', 'startDateTime', 'startLatLong', 'endDateTime', 'endLatLong'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _callAPIService: CallAPIService,
    private _snackBar: MatSnackBar,
    private _commonService: CommonService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private _excelService: ExcelService,
    private mapsAPILoader: MapsAPILoader,
  ) { }

  ngOnInit(): void {
    this.mapsAPILoader.load().then(() => {
      this.geoCoder = new google.maps.Geocoder;
    });
    this.customForm();
    this.getVehiclesList();
    this.mapsAPILoader.load().then(() => {
      this.geoCoder = new google.maps.Geocoder;
    });
  }

  customForm() {
    this.tripFrom = this.formBuilder.group({
      VehicleNumber: ['', Validators.required],
      fromDate: [this._commonService.fromDate()],
      toDate: [this._commonService.toDate()],
      tripFormate: ["Trip", Validators.required],
    })
  }

  clearForm() {
    this.hideReport = false;
    this.select = true;
    this.submitted = false;
    this.tripFrom.reset({
      VehicleNumber: '',
      tripFormate: 'Trip',
      toDate: this._commonService.toDate(),
      fromDate: this._commonService.fromDate()
    });
  }

  onChange(event: any) {
    let gettriptype = event;
    if (gettriptype == "Weekly") {
        this.dateTimeDiv = true;
    } else {
        this.dateTimeDiv = false;
    }
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

  get f() { return this.tripFrom.controls };

  onSubmit() {
    this.submitted = true;
    this.spinner.show();
    this.vechileList.forEach((element: any) => { // get driver name from vehicleNo
      if (element.vehicleNo == this.tripFrom.value.VehicleNumber) {
        this.vehName = element.vehTypeName;
      }
    });

    let driversData = { // driver name obj
      vehTypeName: this.vehName
    };

    if (this.tripFrom.invalid) {
      this.hideReport = false;
      this.spinner.hide();
      return;
    }
    else {
      let data = this.tripFrom.value;

      let date1: any = new Date(data.fromDate);
      let timeStamp = Math.round(new Date(data.toDate).getTime() / 1000);
      let timeStampYesterday = timeStamp - (24 * 3600);
      let is24 = date1 >= new Date(timeStampYesterday * 1000).getTime();

      if (!is24) {
        this._snackBar.open("Date difference does not exceed 24hr.","Ok");
        this.spinner.hide();
        return
      }


      if (data.tripFormate == "Trip" || data.tripFormate == "24hr") {
        this._callAPIService.callAPI('get', 'vehicle-tracking/tracking/get-trip-report?UserId=' + this._commonService.loggedInUserId() + '&VehicleOwnerId=' + this._commonService.getVehicleOwnerId() + '&VehicleNumber=' + data.VehicleNumber + '&fromDate=' + data.fromDate + '&toDate=' + data.toDate, false, false, false, 'vehicleTrackingBaseUrlApi');
      } else if (data.tripFormate == "Weekly") {
        this._callAPIService.callAPI('get', 'vehicle-tracking/tracking/get-weekly-trip-report?UserId=' + this._commonService.loggedInUserId() + '&VehicleOwnerId=' + this._commonService.getVehicleOwnerId() + '&VehicleNumber=' + data.VehicleNumber + '&fromDate=' + data.fromDate + '&toDate=' + data.toDate, false, false, false, 'vehicleTrackingBaseUrlApi');
      }

      this._callAPIService.getResponse().subscribe((res: any) => {


        if (res.statusCode === "200") {
          this.tripReportData = Object.assign(res.responseData, this.tripFrom.value, driversData);
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
          this._snackBar.open("No data found", 'OK');
          this.spinner.hide();
        }
      })
    }
  }

  downLoadPDF() {
    debugger
    let keyPDFHeader = [" Distance", "Duration", "Start Date", " Start Address", "End Date", "End Address"];
    let key = ['travelledDistance', 'tripDurationInMins', 'startDateTime', 'startLatLong', 'endDateTime', 'endLatLong'];
    this.tripFrom.value['pageName'] = "trip Report";
    let formDataObj: any = this.tripFrom.value;
    this._excelService.downLoadPdf(keyPDFHeader, key, this.tripReportData, formDataObj);
  }

  downLoadExcel() {
    let keyExcelHeader = ["index","Distance", "Duration", "Start Date", " Start Address", "End Date", "End Address"];
    let key = ['index','travelledDistance', 'tripDurationInMins', 'startDateTime', 'startLatLong', 'endDateTime', 'endLatLong'];
    this.tripFrom.value['pageName'] = "Trip Report";
    let formDataObj: any = this.tripFrom.value;
    this._excelService.exportAsExcelFile(keyExcelHeader, key, this.tripReportData, formDataObj);
  }

}
