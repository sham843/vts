import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

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

  // modalClose(){
  //   let element:any =  document.getElementsByClassName('btn-close')[0];
  //   element.click();
  // }

}
