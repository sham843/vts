import {MatDialog} from '@angular/material/dialog';
import { Component, OnInit, NgZone, ElementRef, ViewChild } from '@angular/core';
import { MapsAPILoader} from '@agm/core';
  import {  MouseEvent  } from '@agm/core';
import { CommonService } from 'src/app/services/common.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
// import { ToastrService } from 'ngx-toastr';
import { CallAPIService } from 'src/app/services/call-api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-poi',
  templateUrl: './poi.component.html',
  styleUrls: ['./poi.component.scss']
})
export class PoiComponent implements OnInit{

  classActive: boolean = false;
  mapViewType: any = 'roadmap';
  removeBtnFlag: boolean = false;
  showSidebar: boolean = true;
  mapTypeControl: boolean = true;
  zoomControl: boolean = true;
  fullscreenControl: boolean = true;
  position = [18.489585, 73.8578095];
  rngSlider: any;
  lat: any = 19.75117687556874;
  long: any = 75.71630325927731;
  vechileList: any
  poiForm!: FormGroup;
  date: any = new Date();
  submitted = false;
  VehicleDetailsData: any;
  p: number = 1;
  title: any;
  circleradius = 1000;
  radius = 400;
  address: any;
  HighlightRow: any;
  zoom: any = 12;
  PoiDetails: any;
  flag: boolean = true;
  id = 0;
  poiGlobalObj: any;
  actionFlag: any = "I"; // I for Insert
  geoCoder: any;
  viewType: boolean = false;
  editselOpt: any;
  customStyle = [];
  isChecked: any;
  displayedColumns: string[] = ['rowNumber', 'title', 'action'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource: any;
  @ViewChild('close') close: any;
  todayDate = new Date();
  @ViewChild('search') searchElementRef: any;
  

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private _callAPIService: CallAPIService,
    private spinner: NgxSpinnerService,
    private _commonService: CommonService,
    // private toastrService: ToastrService,
    private fb: FormBuilder,
    private ngZone: NgZone,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.customForm();
    this.getVenicleList();
    this.getVehicleDetails();
    this.mapsAPILoader.load().then(() => {
      this.geoCoder = new google.maps.Geocoder;
      this.getAddress(this.lat, this.long);
    });
    this.searchAutoComplete();
  }

  searchAutoComplete(){
    this.mapsAPILoader.load().then(() => {
      // this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;
  
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
  
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
  
          this.lat = place.geometry.location.lat();
          this.long = place.geometry.location.lng();
          // this.zoom = 12;
          this.getAddress(this.lat,this.long)
        });
      });
    });
  }

  get f() { return this.poiForm.controls };

  customForm() {
    this.poiForm = this.fb.group({
      title: ['', Validators.required],
      radius: ['1000', Validators.required],
      vehicleNo: ['', Validators.required],
      address: [''],
    })
  }

  getVenicleList() {
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

  getVehicleDetails() {
    this._callAPIService.callAPI('get', 'vehicle-tracking/POI/get-POI-vehicle-Details?UserId=' + this._commonService.loggedInUserId() + '&VehicleNumber=' + this.poiForm.value.vehicleNo, false, false, false, 'vehicleTrackingBaseUrlApi');
    this._callAPIService.getResponse().subscribe((res: any) => {
      if (res.statusCode === "200") {
        this.VehicleDetailsData = res.responseData;
        this.dataSource = new MatTableDataSource(res.responseData);
         setTimeout(() => {
           this.dataSource.paginator = this.paginator;
           this.dataSource.sort = this.sort; 
         })
        console.log(this.VehicleDetailsData);
      }
      else if (res.statusCode === "409") {
        alert(res.statusMessage);
      }
      else {
        console.log('Data not found');
      }
    },

    );
  }

  onSubmit() {
    this.submitted = true;
    if (this.poiForm.invalid) {
      this.spinner.hide();
      return;
    }
    else {
      console.log(this.poiForm.value.vehicleNo);
      let mulVehicleId: any = this.poiForm.value.vehicleNo;
      mulVehicleId = mulVehicleId.toString();
      this.poiGlobalObj = {
        "id": this.id, "vehicleOwnerId": this._commonService.getVehicleOwnerId(), "title": this.poiForm.value.title, "latitude": this.lat, "longitude": this.long, "distance": Number(this.poiForm.value.radius), "poiAddress": this.address, "userId": this._commonService.loggedInUserId(), "createdDate": this.todayDate, "isDeleted": true, "vehicleId": mulVehicleId, "flag": this.actionFlag
      }
      this.editViewDelete(this.poiGlobalObj)
    }

  }

  editViewDelete(poiGlobalObj: any) {
    this._callAPIService.callAPI('post', 'vehicle-tracking/POI/save-update-POI', false, poiGlobalObj, false, 'vehicleTrackingBaseUrlApi');
    this._callAPIService.getResponse().subscribe((res: any) => {
      if (res.statusCode === "200") {
        this.removeBtnFlag = false;
        this.getVehicleDetails();
        // this.toastrService.success(res.statusMessage);
        this.spinner.hide();
        // this.submitted = false;
        this.clearForm();
      }
      else if (res.statusCode === "409") {
        // this.toastrService.error(res.statusMessage);
      }
      else {
        // this.toastrService.error("No data found");
        this.spinner.hide();
      }
    })
  }

  clearForm() {
    this.submitted = false;
    this.poiForm.reset();
    this.circleradius = 1000;
    this.radius = 1000;
    this.viewType = false;
    // this.getAddress(this.lat, this.long);
  }

  poiDetailsViewEditDel(index: any, checkFlag: any) {
    if (checkFlag == 'del') {
      let selObj = this.VehicleDetailsData[index];
      console.log(this.poiGlobalObj);
      this.poiGlobalObj = {
        "id": selObj.id, "vehicleOwnerId": this._commonService.getVehicleOwnerId(), "title": selObj.title, "latitude": selObj.latitude, "longitude": selObj.longitude, "distance": selObj.distance, "poiAddress": selObj.poiAddress, "userId": this._commonService.loggedInUserId(), "createdDate": this.todayDate, "isDeleted": true, "vehicleId": selObj.vehicleId, "flag": 'D'
      }
      this.editViewDelete(this.poiGlobalObj)
      return
    }
    else if (checkFlag == 'view') {
      this.modalClose();
      this.viewType = true;
    }
    else if (checkFlag == 'edit') {
      this.modalClose();
      this.viewType = false;
    }

    this.actionFlag = "U";
    this.removeBtnFlag = true;
    this.HighlightRow = index;
    this.PoiDetails = this.VehicleDetailsData[index];
    this.id = this.PoiDetails.id;
    this.poiForm.patchValue({
      title: this.PoiDetails.title,
      radius: this.PoiDetails.distance,
      address: this.PoiDetails.poiAddress,
      vehicleNo: this.PoiDetails.vehicleId,
    })
    this.circleradius = this.PoiDetails.distance
    this.editselOpt = this.PoiDetails.vehicleId.split(',').map(function (item: any) {
      return Number(item);
    });
  }

  markerDragEnd($event: MouseEvent) {
    console.log($event);
    this.lat = $event.coords.lat;
    this.long = $event.coords.lng;
    this.getAddress(this.lat, this.long);
  }

  getAddress(lat: number, long: number) {
    this.spinner.show();
    this.geoCoder.geocode({ 'location': { lat: lat, lng: long } }, (results: any, status: any) => {
      if (status === 'OK') {
        if (results[0]) {
          this.spinner.hide();
          this.zoom = 12;
          this.address = results[0].formatted_address;
        } else {
          this.spinner.hide();
          // this.toastrService.error('No results found');
        }
      }
      this.spinner.hide();
    });
  }

  toggleClass() {
    this.classActive = !this.classActive;
  }

  changeMap(mapType:any){
    // alert(this.isChecked);
    if(mapType == 'map'){
      if(this.isChecked){
        this.mapViewType = 'terrain';
      }else{
        this.mapViewType = 'roadmap';
      }
    }else if(mapType == 'satellite'){
      console.log(this.isChecked)
      if(this.isChecked){
        console.log('ok')
        this.mapViewType = 'hybrid';
      }else{
        this.mapViewType = 'satellite';
      }
    }
  }

    checkValue(event: any, mapType:any){
      if(event == 'terrain'  && mapType == 'roadmap'){
        this.isChecked = true;
        this.mapViewType = 'terrain';
      }else if(event == 'labels'  && mapType == 'terrain'){
        this.isChecked = false;
        this.mapViewType = 'roadmap';
      }
      else if(event == 'terrain' && mapType == 'satellite'){
        this.isChecked = true;
        this.mapViewType = 'hybrid';
      }
      else if(event == 'labels' && mapType == 'hybrid'){
        this.isChecked = false;
        this.mapViewType = 'satellite';
      }
   }

  modalClose() {
    let el: HTMLElement = this.close.nativeElement;
    el.click();
  }


}