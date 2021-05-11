import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CallAPIService } from './call-api.service';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  date: any = new Date();

  UserLoginDetails!: { userID: any; userType: string; };
  // baseurlObj={
  //   vehicleTrackingBaseUrlApi:'http://awsvehicletracking.mahamining.com/',
  //   stplVtsTrackingBaseUrlAPI : 'http://stpl-vts.mahamining.com',
  //   masterBaseurlApi : 'http://awsmaster.mahamining.com',
  //   mineralBaseurlApi : 'http://awsapi.mahamining.com',
  //   accountingBaseurlApi : 'http://awsaccounting-api.mahamining.com'
  // }

  getBaseurl(url: string) {
    switch (url) {
      case 'vehicleTrackingBaseUrlApi': return 'http://awsvehicletracking.mahamining.com/'; break;
      case 'stplVtsTrackingBaseUrlAPI': return 'http://stpl-vts.mahamining.com/'; break;
      case 'masterBaseurlApi': return 'http://awsmaster.mahamining.com/'; break;
      case 'mineralBaseurlApi': return 'http://awsapi.mahamining.com/'; break;
      case 'accountingBaseurlApi': return 'http://awsaccounting-api.mahamining.com/'; break;
      default: return 'http://awsvehicletracking.mahamining.com/'; break;

      // case 'vehicleTrackingBaseUrlApi': return 'https://mahakhanij.maharashtra.gov.in/';break;
      // case 'stplVtsTrackingBaseUrlAPI': return 'https://mahakhanij.maharashtra.gov.in/';break;
      // case 'masterBaseurlApi': return 'http://awsmaster.mahamining.com/';break;
      // case 'mineralBaseurlApi': return 'http://awsapi.mahamining.com/';break;
      // case 'accountingBaseurlApi': return 'http://awsaccounting-api.mahamining.com/';break;
      // default: return 'https://mahakhanij.maharashtra.gov.in/';break;
    }
  }
  userObj!: { idToken: string; };
  private httpObj: any = {
    type: '',
    url: '',
    options: Object
  };
  clearHttp() {
    this.httpObj.type = '';
    this.httpObj.url = '';
    this.httpObj.options = {};
  }
  constructor(
    private http: HttpClient,
    private datepipe: DatePipe,
    private router: Router )
   {
    interface userObj {
      idToken?: Number,
    };

  }

  getLocalStorageData() {
    let loginObj = JSON.parse(localStorage.loggedInDetails).responseData[0];
    return loginObj;
  }

  userRole() { // get user role name from localstorage
    let userType = this.getLocalStorageData();
    return userType.userType;
  }

  loggedInUserId() {
    let userId = this.getLocalStorageData();
    return userId.id;
  }

  loggedInUsername() {
    let userName = this.getLocalStorageData();
    return userName.name;
  }

  loggedInUserMobile() {
    let usermobileNo = this.getLocalStorageData();
    return usermobileNo.mobileNo1
  }

  getVehicleOwnerId() {
    let vehOwnerId= this.getLocalStorageData();
    return vehOwnerId.vehicleOwnerId
  }

  fromDate(): string {
    return (this.date.getFullYear().toString() + '-'
      + ("0" + (this.date.getMonth() + 1)).slice(-2) + '-'
      + ("0" + ((this.date.getDate() - 1))).slice(-2))
      + 'T' + this.date.toTimeString().slice(0, 5);
  }

  toDate(): string {
    return (this.date.getFullYear().toString() + '-'
      + ("0" + (this.date.getMonth() + 1)).slice(-2) + '-'
      + ("0" + (this.date.getDate())).slice(-2))
      + 'T' + this.date.toTimeString().slice(0, 5);
  }

 
}

