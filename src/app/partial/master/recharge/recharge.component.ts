import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExcelService } from 'src/app/services/excel.service';
import { CallAPIService } from 'src/app/services/call-api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-recharge',
  templateUrl: './recharge.component.html',
  styleUrls: ['./recharge.component.scss']
})
export class RechargeComponent implements OnInit {
  VehicleListRes: any;
  vechileOwnerInfo: any
  p = 1;
  continueFlag: boolean = true;
  makePaymentForm!: FormGroup;
  submitted: boolean = false;
  vehicleOwnerName: any;
  vehicleOwnerMobileNo: any;
  no = 2;
  basicAmount: any;
  GST: any;
  transactionCost: any;
  PayableAmount: any;
  cheArray: any = [];
  hash: any
  key: any;
  salt: any;
  tranId: any;
  getData: any;
  modalFalg: boolean = false;
  @ViewChild('payuFormSubmit') payuFormSubmit: any;
  @ViewChild('mdlConfirmOpen') mdlConfirmOpen: any;
  dataSource: any;
  displayedColumns: string[] = ['rowNumber','vehicleNo', 'renewalRemainingDays','pay'];

  constructor(private _commonService: CommonService,
    private spinner: NgxSpinnerService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _excelService: ExcelService,
    private _callAPIService: CallAPIService,
  ) { }

  ngOnInit(): void {
    let sessionData = this._commonService.getLocalStorageData();
    this.vehicleOwnerName = sessionData.vehicleOwnerName;
    this.vehicleOwnerMobileNo = sessionData.vehicleOwnerMobileNo;
    this.getVenicleList();
    this.customForm();
  }

  getVenicleList() {
    this.spinner.show();
    this._callAPIService.callAPI('get', 'vehicle-tracking/mahakhanij/get-vehicle-payment?UserId=' + this._commonService.loggedInUserId() + "&RateTypeId=" + 2, false, false, false, 'vehicleTrackingBaseUrlApi');
    this._callAPIService.getResponse().subscribe((responseData: any) => {
      if (responseData.statusCode === "200") {
        this.spinner.hide();
        this.VehicleListRes = responseData.responseData;
        this.dataSource = new MatTableDataSource(this.VehicleListRes);
        this.vechileOwnerInfo = responseData.responseData1[0];
        this.key = responseData.responseData2[0].key;
        this.salt = responseData.responseData2[0].salt;
        this.tranId = Math.random().toString().substr(2, 7);
      }
      else if (responseData.statusCode === "409") {
        alert(responseData.statusMessage);
      }
      else {
        console.log('Data not found');
      }
    },
    );
  }

  customForm() {
    this.makePaymentForm = this.fb.group({
      firstName: [this.vehicleOwnerName],
      mobileNo: [this.vehicleOwnerMobileNo],
      emailId: ['', [Validators.required, Validators.email]],
      gstNo: ['', Validators.pattern("^([0][1-9]|[1-2][0-9]|[3][0-7])([a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9a-zA-Z]{1})+$")],
    })
  }

  checkBox(data: any, vechId: any) {
    let checked = data.target.checked;
    let prevIndex = data.target.value;
    let selIndex = prevIndex - 1;
    if (checked) {
      this.VehicleListRes['checked'] = true;
      this.cheArray.push({ 'rNo': Number(data.target.value), 'vechId': vechId });
      this.VehicleListRes[selIndex].checkBoxStatus = true;
    }
    else {
      this.VehicleListRes[selIndex].checkBoxStatus = false;
      this.cheArray = this.cheArray.filter((item: any) => item.rNo != prevIndex);

    }
  }

  continue() {
    if (this.cheArray.length == 0) {
      this._snackBar.open("Select atleast one vehicle" ,'Ok');
    } else {
      this.continueFlag = false;
      this.rechargeCal(this.vechileOwnerInfo)
    }
  }

  rechargeCal(data: any) {
    this.basicAmount = data.rate * this.cheArray.length;
    this.GST = (this.basicAmount / 100) * data.gst;
    this.transactionCost = ((this.basicAmount + this.GST) * data.transactionPercentage) / 100;
    this.PayableAmount = this.basicAmount + this.GST + this.transactionCost;
  }

  back() {
    this.continueFlag = true;
  }

  get f() { return this.makePaymentForm.controls };

  onSubmit() {
    this.submitted = true;
    if (this.makePaymentForm.invalid) {
      this.spinner.hide();
      return;
    } else {
      let modalOPen: HTMLElement = this.mdlConfirmOpen.nativeElement;
      modalOPen.click();
      // this.callHashApi();
    }
  }

  submit(){
    this.callHashApi();
  }

  callHashApi() {
    this.modalFalg = true;
    let data = this.makePaymentForm.value;
    this.getData = data;
    let selVehicleIds = this.cheArray.map((item: any) => {
      let vechId = item.vechId;
      return vechId
    });

    let obj = {
      // "amount": this.PayableAmount.toString(),
      "amount": "1.00",
      "firstname": data.firstName,
      "email": data.emailId,
      "phone": data.mobileNo,
      "productinfo": "vtsamc",
      "service_provider": "payu",
      "lastname": "",
      "address1": "",
      "address2": "",
      "city": "",
      "state": "",
      "country": "",
      "zipcode": "",
      "udf1": "2", // for web
      "udf2": (this._commonService.loggedInUserId()).toString(),
      "udf3": selVehicleIds.toString(),
      "udf4": this.makePaymentForm.value.gstNo,
      "udf5": this.cheArray.length + `$` + this.basicAmount + `$` + this.GST + `$` + this.transactionCost,
      "udf6": "",
      "udf7": "",
      "pg": "1"
    }

    this.spinner.show();
    this._callAPIService.callAPI('post', 'vehicle-tracking/mahakhanij/generate-hash-sequence', false, obj, false, 'vehicleTrackingBaseUrlApi');
    this._callAPIService.getResponse().subscribe((responseData: any) => {
      if (responseData.statusCode === "200") {
        this.hash = responseData.responseData;
        let payuformSubmit: HTMLElement = this.payuFormSubmit.nativeElement;
        payuformSubmit.click();
        this.spinner.hide();
      }
      else if (responseData.statusCode === "409") {
        alert(responseData.statusMessage);
        this.spinner.hide();
      }
      else {
        this.spinner.hide();
      }
    },
    );
  }

  vehiclePayment() {
    this.spinner.show();
    let obj;
    this._callAPIService.callAPI('post', 'vehicle-tracking/mahakhanij/save-update-vehicle-payment', false, obj, false, 'vehicleTrackingBaseUrlApi');
    this._callAPIService.getResponse().subscribe((responseData: any) => {
      if (responseData.statusCode === "200") {
        this.spinner.hide();
        this.VehicleListRes = responseData.responseData;
        this.dataSource = new MatTableDataSource(this.VehicleListRes);
        this.vechileOwnerInfo = responseData.responseData1[0];
        this.key = responseData.responseData2[0].key;
        this.salt = responseData.responseData2[0].salt;
        this.tranId = Math.random().toString().substr(2, 7);
      }
      else if (responseData.statusCode === "409") {
        alert(responseData.statusMessage);
      }
      else {
        console.log('Data not found');
      }
    },
    );
  }

  vehiclePaymentUpdate() {
    this.spinner.show();
    let obj;
    this._callAPIService.callAPI('post', 'vehicle-tracking/mahakhanij/save-update-vehicle-payment-order', false, obj, false, 'vehicleTrackingBaseUrlApi');
    this._callAPIService.getResponse().subscribe((responseData: any) => {
      if (responseData.statusCode === "200") {
        this.spinner.hide();
        this.VehicleListRes = responseData.responseData;
        this.dataSource = new MatTableDataSource(this.VehicleListRes);
        this.vechileOwnerInfo = responseData.responseData1[0];
        this.key = responseData.responseData2[0].key;
        this.salt = responseData.responseData2[0].salt;
        this.tranId = Math.random().toString().substr(2, 7);
      }
      else if (responseData.statusCode === "409") {
        alert(responseData.statusMessage);
      }
      else {
        console.log('Data not found');
      }
    },
    );
  }

  refresh() {
    this.getVenicleList();
    this.submitted = false;
    this.cheArray = [];
    this.makePaymentForm.reset({
      firstName: this.vehicleOwnerName,
      mobileNo: this.vehicleOwnerMobileNo,
    })
  }
}
