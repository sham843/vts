import { Injectable } from '@angular/core';
<<<<<<< HEAD
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
=======
import { MatSnackBar } from '@angular/material/snack-bar';
import { CallAPIService } from './call-api.service';
>>>>>>> master

@Injectable({
  providedIn: 'root'
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

<<<<<<< HEAD

  getHttp(): any {
    let temp: any = undefined;
    !this.httpObj.options.body && (delete this.httpObj.options.body)
    !this.httpObj.options.params && (delete this.httpObj.options.params)
    return this.http.request(this.httpObj.type, this.httpObj.url, this.httpObj.options);
  }

  setHttp(type: string, url: string, isHeader: Boolean, obj: any, params: any, baseUrl: any) {
    // this.logOutAfterOneHour();
    try {
      this.userObj = JSON.parse(localStorage.UserInfo);
      this.UserLoginDetails = JSON.parse(localStorage.UserLoginDetails);
    } catch (e) { }
    this.clearHttp();
    this.httpObj.type = type;
    //this.httpObj.url ='http://awsvehicletracking.mahamining.com/'+url;
    //let urldt= this.baseurlObj[baseUrl]
    //console.log(this.getBaseurl(baseUrl))
    this.httpObj.url = this.getBaseurl(baseUrl) + url;
    // console.log(this.baseurlObj['vehicleTrackingBaseUrlApi'])

    // this.httpObj.url = 'https://api.rentatruck.shauryatechnosoft.com/masterdata/' + url;
    if (isHeader) {
      let tempObj: any = {
        "Authorization": "bearer " + this.userObj.idToken
      };
      if (this.UserLoginDetails && type !== 'get') {
        tempObj.UserId = this.UserLoginDetails.userID;
        tempObj.UserType = this.UserLoginDetails.userType || "Owner"
      }
      this.httpObj.options.headers = new HttpHeaders(tempObj);
    }

    if (obj !== false) {
      this.httpObj.options.body = obj;
    }
    else {
      this.httpObj.options.body = false;
    }
    if (params !== false) {
      this.httpObj.options.params = params;
    }
    else {
      this.httpObj.options.params = false;
    }

  }


  // logOutAfterOneHour(){
  //   let currentDate:any = new Date();
  //   let currentTime =  currentDate.getTime();

  //   let loginDateTime:any = localStorage.getItem('loginDateTime');
  //   let loginTime = new Date(loginDateTime);
  //   let checkloginTime = loginTime.getTime();

  //   let diff = currentTime - checkloginTime

  //   var hh:any = Math.floor(diff / 1000 / 60 / 60);   
  //   hh = ('0' + hh).slice(-2)

  //   var timeDiff:any= hh * 1000 * 60 * 60;
  //   var mm:any = Math.floor(diff / 1000 / 60);
  //   mm = ('0' + mm).slice(-2)

  //   var timeDiff:any= mm * 1000 * 60;
  //   var ss:any = Math.floor(diff / 1000);
  //    ss = ('0' + ss).slice(-2)
  //    console.log("Time Diff- " + hh + ":" + mm + ":" + ss);

  //   if (mm > 60){
  //     localStorage.clear();
  //     this.router.navigate(['../login']);
  //   }

  // }


=======
 
>>>>>>> master
}

