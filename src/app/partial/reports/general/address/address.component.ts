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

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {

  select: boolean = false;
  addressFrom: any;
  date: any = new Date();
  vechileList: any;
  hideReport = false;
  addressData: any;
  vehName: any;
  vechId:any;
  printBtn: boolean = false;
  submitted = false;
  maxDateOut: any = new Date();
  //emptyData = true;
  maxDate: any = this._commonService.toDate();
  dataSource: any;

  displayedColumns: string[] = ['index','deviceDatetime', 'latitude'];

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
    this.addressFrom = this.formBuilder.group({
      VehicleNumber: ['', Validators.required],
      fromDate: [this._commonService.fromDate()],
      toDate: [this._commonService.toDate()],
    });
  }

  clearForm() {
    this.hideReport = false;
    this.select = true;
    this.submitted = false;
    this.addressFrom.reset({
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

  get f() { return this.addressFrom.controls };

  onSubmit() {
    this.submitted = true;
    this.spinner.show();
    this.vechileList.forEach((element: any) => { // get driver name from vehicleNo
      if (element.vehicleNo == this.addressFrom.value.VehicleNumber) {
        this.vehName = element.vehTypeName;
        this.vechId = element?.vehicleId
      }
    });

    let driversData = { // driver name obj
      vehTypeName: this.vehName,
      
    };

    if (this.addressFrom.invalid) {
      this.hideReport = false;
      this.spinner.hide();
      return;
    }
    else {
      let data = this.addressFrom.value;

      let date1: any = new Date(data.fromDate);
      let timeStamp = Math.round(new Date(data.toDate).getTime() / 1000);
      let timeStampYesterday = timeStamp - (24 * 3600);
      let is24 = date1 >= new Date(timeStampYesterday * 1000).getTime();

      if (!is24) {
        this._snackBar.open("Date difference does not exceed 24hr.","Ok");
        this.spinner.hide();
        return
      }

      this._callAPIService.callAPI('get', 'vehicle-tracking/tracking/get-tracking-address-mob?VehicleNo='+ data.VehicleNumber+'&VehicleId='+this.vechId + '&FromDate=' + data.fromDate + '&toDate=' + data.toDate, false, false , false,'vehicleTrackingBaseUrlApi');
      this._callAPIService.getResponse().subscribe((res: any) => {
        if (res.statusCode === "200") {
          this.addressData = Object.assign(res.responseData, this.addressFrom.value, driversData);
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
          this._snackBar.open(res.statusMessage,'OK');
        }
        else {
          this.hideReport = false;
          this._snackBar.open(res.statusMessage,'OK')
          this.spinner.hide();
        }
      })
    }
  }

  downLoadExcel() {
    let keyExcelHeader =  ["Date","Address"];
    let key = ['deviceDatetime', 'latitude'];
    this.addressFrom.value['pageName']="Address Report";
    let formDataObj:any  =  this.addressFrom.value;
    this._excelService.exportAsExcelFile(keyExcelHeader,key, this.addressData,formDataObj);
  }

  downLoadPDF() {
    let keyPDFHeader = ["Date","Address"];
    let key = ['deviceDatetime', 'latitude'];
    this.addressFrom.value['pageName']="Address Report";
    let formDataObj:any  =  this.addressFrom.value;
    this._excelService.downLoadPdf(keyPDFHeader,key, this.addressData,formDataObj);
  }
}


