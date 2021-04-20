import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CallAPIService } from './call-api.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  date: any = new Date();

  constructor() { }

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

 
}
