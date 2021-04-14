import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CallAPIService {
  UserLoginDetails: any;
  userObj: any;

  getBaseurl(url: string) {
    switch (url) {
      case 'vehicleTrackingBaseUrlApi': return 'http://awsvehicletracking.mahamining.com/'; break;
      case 'stplVtsTrackingBaseUrlAPI': return 'http://stpl-vts.mahamining.com/'; break;
      case 'masterBaseurlApi': return 'http://awsmaster.mahamining.com/'; break;
      case 'mineralBaseurlApi': return 'http://awsapi.mahamining.com/'; break;
      case 'accountingBaseurlApi': return 'http://awsaccounting-api.mahamining.com/'; break;
      default: return 'http://awsvehicletracking.mahamining.com/'; break;

    }
  }

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
  constructor(private http: HttpClient) {}

  getResponse(): any {
    let temp: any = undefined;
    !this.httpObj.options.body && (delete this.httpObj.options.body)
    !this.httpObj.options.params && (delete this.httpObj.options.params)
    return this.http.request(this.httpObj.type, this.httpObj.url, this.httpObj.options);
  }

  callAPI(type: string, url: string, isHeader: Boolean, obj: any, params: any, baseUrl: any) {
    try {
      this.userObj = JSON.parse(localStorage.UserInfo);
      this.UserLoginDetails = JSON.parse(localStorage.UserLoginDetails);
    } catch (e) { }
    this.clearHttp();
    this.httpObj.type = type;
    this.httpObj.url = this.getBaseurl(baseUrl) + url;
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

}
