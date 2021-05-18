import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
// import { ToastrService } from 'ngx-toastr/toastr/toastr.service';
import { CommonService } from 'src/app/services/common.service';
import { CallAPIService } from 'src/app/services/call-api.service';
import { MatSelect } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-break-down',
  templateUrl: './break-down.component.html',
  styleUrls: ['./break-down.component.scss']
})
export class BreakDownComponent implements OnInit {

 vechileList: any;
  breakDownForm: any;
  submitted = false;
  select: boolean = false;
  emptyData = true;
  // VStatus = [{ "fullName": "Breakdown", "shortName": 'BKD' }, { "fullName": "Start", "shortName": 'RESTART' }];
  Breakdown = true;

  constructor(
    private _commonService: CommonService,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    public datepipe: DatePipe,
    // private toastrService: ToastrService,
    private _callAPIService: CallAPIService,
    private _snackBar: MatSnackBar,

  ) { }

  ngOnInit(): void {
    this.getVehiclesList();
    this.customForm();
  }




  getVehiclesList() {
    this.spinner.show();
    this._callAPIService.callAPI('get', 'vehicle-tracking/dashboard/get-vehicles-list?UserId=' + this._commonService.loggedInUserId(), false, false, false, 'vehicleTrackingBaseUrlApi');
    this._callAPIService.getResponse().subscribe((res: any) => {
      if (res.statusCode === "200") {
        this.emptyData = false;
        this.spinner.hide();
        this.vechileList = res;
        this.vechileList = this.vechileList.responseData;
        console.log(this.vechileList)
      }
      else if (res.statusCode === "409") {
        this.spinner.hide();
        // this.toastrService.error(res.statusMessage);
        this._snackBar.open(res.statusMessage);
      }
      else {
        this.spinner.hide();
        this.emptyData = true;
      }

    })
  }
  change(event: any) {
    console.log(event)
  }
  customForm() {
    this.breakDownForm = this.fb.group({
      vehicleId: ['', Validators.required],
      invoiceNo: ['', Validators.required],
      breakDownStatus: ['Breakdown'],
    })
  }

  get f() { return this.breakDownForm.controls };

  onSubmit() {
    console.log(this.breakDownForm.value)
    this.submitted = true;
    this.spinner.show();

    if (this.breakDownForm.invalid) {
      this.spinner.hide();
      return;
    }
    else {
      debugger
      let selVechObj = this.vechileList.find((item: any) => {
        if (item.vehicleNo == this.breakDownForm.value.vehicleId) {
          return item
        }
      });
      this._callAPIService.callAPI('get', 'vehicle-tracking/mahakhanij/register-breakdown?UserId=' + this._commonService.loggedInUserId() + '&InvoiceNo=' + this.breakDownForm.value.invoiceNo.toString() + '&VehicleId=' + selVechObj.vehicleId + '&MobileNo=' + selVechObj.driverMobileNo + '&SubKeyword=' + this.breakDownForm.value.breakDownStatus.toString() + '&Source=TrackWebApp', false, false, false, 'vehicleTrackingBaseUrlApi');
      debugger;
      this._callAPIService.getResponse().subscribe((res: any) => {
        this.spinner.hide();
        if (res.statusCode === "200") {
          debugger;
          if (res.responseData[0].isSuccess == "True") {
            this._snackBar.open(res.responseData[0].mSg);
            // this.toastrService.success(res.responseData[0].mSg);
            this.spinner.hide();
            this.submitted = false;
          }
          else if (res.responseData[0].isSuccess == "False") {
            this._snackBar.open(res.responseData[0].mSg);
            // this.toastrService.error(res.responseData[0].mSg);
            return

          }
        }
        else if (res.statusCode === "409") {
          // this.toastrService.error(res.statusMessage);
        }
        else {
          // this.toastrService.error("No data found");
          this.spinner.hide();
        }
      },

      );
    }
  }
  clearForm() {
    this.select = true;
    this.submitted = false;
    this.breakDownForm.reset({
      breakDownStatus: 'Breakdown'
    });
  }

}
