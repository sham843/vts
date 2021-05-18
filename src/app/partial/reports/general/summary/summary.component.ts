import { Component, NgZone, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CallAPIService } from 'src/app/services/call-api.service';
import { CommonService } from 'src/app/services/common.service';
import { FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ExcelService } from 'src/app/services/excel.service';
import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
  select: boolean = false;
  summaryFrom: any;
  date: any = new Date();
  vechileList: any;
  driverName: any;
  hideReport = false;
  summaryReportData: any;
  driverMobile: any;
  vehName: any;
  printBtn: boolean = false;
  submitted = false;
  maxDateOut: any = new Date();
  emptyData = true;
  maxDate:any = this._commonService.toDate();
  geoCoder: any;
  addressStart: any;
  addressEnd: any;
  latlngStart: any;
  latlngEnd: any;
  loading = false;

  constructor(private _callAPIService: CallAPIService,
    private _snackBar: MatSnackBar,
    private _commonService: CommonService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private _excelService:ExcelService,
    private mapsAPILoader: MapsAPILoader,
    private zone: NgZone
  ) { }

  ngOnInit(): void {
    this.mapsAPILoader.load().then(() => {
      this.geoCoder = new google.maps.Geocoder;
    });

    this.getVehiclesList();
    this.customForm();
  }

  customForm() {
    this.summaryFrom = this.formBuilder.group({
      VehicleNumber: ['', Validators.required],
      fromDate: [this._commonService.fromDate()],
      toDate: [this._commonService.toDate()],
    });
  }

  clearForm() {
    this.hideReport = false;
    this.select = true;
    this.submitted = false;
    this.summaryFrom.reset({
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

  get f() { return this.summaryFrom.controls };

  onSubmit() {
    this.submitted = true;
    this.spinner.show();
    if (this.summaryFrom.invalid) {
      this.hideReport = false;
      this.spinner.hide();
      return;
    }
    else {
      this.vechileList.forEach((element: any) => { // get driver name from vehicleNo
        if (element.vehicleNo == this.summaryFrom.value.VehicleNumber) {
          this.driverName = element.driverName;
          this.driverMobile = element.driverMobileNo;
          this.vehName = element.vehTypeName;
        }
      });

      let driversData = { // driver name obj
        driverName: this.driverName,
        driverMobileNo: this.driverMobile,
        vehTypeName: this.vehName
      };

      let data = this.summaryFrom.value;

      let date1: any = new Date(data.fromDate);
      let timeStamp = Math.round(new Date(data.toDate).getTime() / 1000);
      let timeStampYesterday = timeStamp - (24 * 3600);
      let is24 = date1 >= new Date(timeStampYesterday * 1000).getTime();

      if (!is24) {
        this._snackBar.open("Date difference does not exceed 24hr.","Ok");
        this.spinner.hide();
        return
      }

      this._callAPIService.callAPI('get', 'vehicle-tracking/tracking/get-summary-report?VehicleNumber=' + data.VehicleNumber + '&fromDate=' + data.fromDate + '&toDate=' + data.toDate, false, false, false, 'vehicleTrackingBaseUrlApi');
      this._callAPIService.getResponse().subscribe((res: any) => {
        if (res.statusCode === "200") {
          this.spinner.hide();
          this.addressStart= "";
          this.addressEnd ="";
          this.getAddress(res.responseData.startLatLong,'startAddress');
          this.getAddress(res.responseData.endLatLong,'endAddress');

          this.summaryReportData = Object.assign(res.responseData, this.summaryFrom.value, driversData);
          this.hideReport = true;
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

  getAddress(getLatlng:any, address:any) {
    debugger;
    if(getLatlng != null){
      this.loading = true;
        let latlng:any = getLatlng.split(",")
        this.geoCoder.geocode({ 'location': { lat: Number(latlng[0]), lng: Number(latlng[1]) } }, (results: any) => {
          if(address == 'startAddress'){
            this.addressStart = results[0].formatted_address;
            this.loading = false;
          }else{
            this.addressEnd= results[0].formatted_address;
            this.loading = false;
          }
      });
    }
    
    else{
      this.addressStart = "Unknown location";
      this.addressEnd = "Unknown location"
    }
  }

  downLoadExcel() {
    let row:any = [];
    row.push(this.summaryReportData)
    let keyExcelHeader = ["Driver Name","Dr. MOb. No.","Veh. Type","From Date", "To Date", "Travelled Distance"];
    let key = ['driverName', 'driverMobileNo', 'vehTypeName', 'fromDate', 'toDate', 'travelledDistance'];
    this.summaryFrom.value['pageName']="Summary Report";
    let formDataObj:any  =  this.summaryFrom.value;
    this._excelService.exportAsExcelFile(keyExcelHeader,key, row, formDataObj);
  }

  downLoadPDF() {
    let row:any = [];
    row.push(this.summaryReportData)
    let keyPDFHeader = ["Driver Name","Dr. MOb. No.","Veh. Type","From Date", "To Date", "Travelled Distance"];
    let key = ['driverName', 'driverMobileNo', 'vehTypeName', 'fromDate', 'toDate', 'travelledDistance'];
    this.summaryFrom.value['pageName']="Summary Report";
    let formDataObj:any  =  this.summaryFrom.value;
    this._excelService.downLoadPdf(keyPDFHeader,key, row, formDataObj);
  }
    
}
