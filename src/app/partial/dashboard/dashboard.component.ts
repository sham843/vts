import { Component, OnInit,ViewChild} from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Label, MultiDataSet } from 'ng2-charts';
import { ChartType } from 'chart.js';
import { ToastrService } from 'ngx-toastr';
import { SingleDataSet, PluginServiceGlobalRegistrationAndOptions } from 'ng2-charts';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  userRole: any;
  resBreakdownReport: any;
  resInvoiceDetails: any;
  resSimDueAndOverDue: any;
  resComplaintDetails: any;
  resVehicleStatusCount: any;
  resVehiclesCountDashboard: any;
  piChartLabel: any = [];
  piChartValue: any = [];
  loggedInUserId = this._commonService.loggedInUserId();
  dataSource: any;

  displayedColumns: string[] = ['srNo','vehicleNo','invoiceNo','quantity','destination',
                              'validityFrom','validityUpto','breakdownDatetime','restartDatetime'];

   @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _commonService: CommonService,
    private spinner: NgxSpinnerService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.userRole = this._commonService.userRole();
    this.getBreakdownReport();
    this.getInvoiceDetails();
    this.getSimDueAndOverDue();
    this.getComplaintDetails();
    this.getVehicleStatusCount();
    this.getVehiclesCountDashboard();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getBreakdownReport() {
    this.spinner.show();
    this._commonService.setHttp('get', 'vehicle-tracking/dashboard/get-breakdown-report?UserId=' + this.loggedInUserId, false, false, false, 'vehicleTrackingBaseUrlApi');
    this._commonService.getHttp().subscribe((res: any) => {
      if (res.statusCode === "200") {
        this.resBreakdownReport = res;
        this.resBreakdownReport = this.resBreakdownReport?.responseData
        this.dataSource = new MatTableDataSource(this.resBreakdownReport);
         this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.spinner.hide();
      }
      else if (res.statusCode === "409") {
        this.spinner.hide();
        this.toastrService.error(res.statusMessage);
      }
      else {
        this.spinner.hide();
        // this.toastrService.error(res.statusMessage);
      }
    })
  }

  getInvoiceDetails() {
    this.spinner.show();
    this._commonService.setHttp('get', 'vehicle-tracking/dashboard/get-invoice-details?UserId=' + this.loggedInUserId, false, false, false, 'vehicleTrackingBaseUrlApi');
    this._commonService.getHttp().subscribe((res: any) => {
      this.resInvoiceDetails = res;
      this.resInvoiceDetails = this.resInvoiceDetails?.responseData;
      if (res.statusCode === "200") {
        this.spinner.hide();
      }
      else if (res.statusCode === "409") {
        this.spinner.hide();
        this.toastrService.error(res.statusMessage);
      }
      else {
        this.spinner.hide();
        // this.toastrService.error(res.statusMessage);
      }
    })
  }

  getSimDueAndOverDue() {
    this.spinner.show();
    this._commonService.setHttp('get', 'vehicle-tracking/dashboard/get-sim-due-and-over-due?UserId=' + this.loggedInUserId, false, false, false, 'vehicleTrackingBaseUrlApi');
    this._commonService.getHttp().subscribe((res: any) => {
      if (res.statusCode === "200") {
        this.resSimDueAndOverDue = res;
        this.spinner.hide();
      }
      else if (res.statusCode === "409") {
        this.spinner.hide();
        this.toastrService.error(res.statusMessage);
      }
      else {
        this.spinner.hide();
        // this.toastrService.error(res.statusMessage);
      }
    })
  }

  getComplaintDetails() {
    this.spinner.show();
    this._commonService.setHttp('get', 'vehicle-tracking/dashboard/get-complaint-details?UserId=' + this.loggedInUserId, false, false, false, 'vehicleTrackingBaseUrlApi');
    this._commonService.getHttp().subscribe((res: any) => {
      if (res.statusCode === "200") {
        this.resComplaintDetails = res;
        this.spinner.hide();
      }
      else if (res.statusCode === "409") {
        this.spinner.hide();
        this.toastrService.error(res.statusMessage);
      }
      else {
        this.spinner.hide();
        //  this.toastrService.error(res.statusMessage);
      }

    })
  }

  // for PiChart
  options: any = { legend: { position: 'right', } }
  doughnutChartLabels: Label[] = this.piChartLabel; // pichart key
  doughnutChartData: MultiDataSet = [this.piChartValue];// pichart value
  doughnutChartType: ChartType = 'doughnut';

  public doughnutChartPlugins: PluginServiceGlobalRegistrationAndOptions[] = [{
    afterDraw(chart:any) {
      const ctx = chart.ctx;
      var txt1 = '';
      var txt2 = '';    

      try{
        var check = chart.active ? chart.tooltip._active[0]._datasetIndex : "None";
        if(check !== "None"){
        txt1 = chart.tooltip._data.labels[chart.tooltip._active[0]._index];
        txt2 = chart.tooltip._data.datasets[0].data[chart.tooltip._active[0]._index];        
      }else{
        txt1 = chart.tooltip._data.labels[0];
        txt2 = chart.tooltip._data.datasets[0].data[0];
      }
      }
      catch(err){
        txt1 = chart.tooltip._data.labels[0] 
        txt2 = chart.tooltip._data.datasets[0].data[0];
      }
      //Get options from the center object in options
      const sidePadding = 60;
      const sidePaddingCalculated = (sidePadding / 100) * (chart.innerRadius * 2)

      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
      const centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);

      //Get the width of the string and also the width of the element minus 10 to give it 5px side padding

      const stringWidth = ctx.measureText(txt1).width;
      const elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;

      // Find out how much the font can grow in width.
      const widthRatio = elementWidth / stringWidth;
      const newFontSize = Math.floor(30 * widthRatio);
      const elementHeight = (chart.innerRadius * 2);

      // Pick a new font size so it will not be larger than the height of label.
      const fontSizeToUse = 30;
      ctx.font = fontSizeToUse + 'px Arial';
      ctx.fillStyle = 'black';

      // Draw text in center
      ctx.fillText(10, centerX, centerY - 10);
      var fontSizeToUse1 = 15;
      ctx.font = fontSizeToUse1 + 'px Arial';
      ctx.fillText(txt1, centerX, centerY + 10);
    }
  }];


  getVehicleStatusCount() {
    this.spinner.show();
    this._commonService.setHttp('get', 'vehicle-tracking/tracking/get-vehicle-status-count?UserId=' + this.loggedInUserId, false, false, false, 'vehicleTrackingBaseUrlApi');
    this._commonService.getHttp().subscribe((res: any) => {
      if (res.statusCode === "200") {
        this.spinner.hide();
        this.resVehicleStatusCount = res;
        for (var key in this.resVehicleStatusCount.responseData) {
          if (this.resVehicleStatusCount.responseData[key] > 1) {
            let keys;
            if (key == "totalVehicles") {
              keys = "Total Vehicles" + " (" + this.resVehicleStatusCount.responseData.totalVehicles + ")";
            } else if (key == "idleVehicles") {
              keys = "Idle Vehicles" + " (" + this.resVehicleStatusCount.responseData.idleVehicles + ")";
            } else if (key == "isGpsService") {
              keys = "Gps Service" + " (" + this.resVehicleStatusCount.responseData.isGpsService + ")";
            } else if (key == "noPollingVehicles") {
              keys = "No Polling Vehicles" + " (" + this.resVehicleStatusCount.responseData.noPollingVehicles + ")";
            } else if (key == "offlineVehicles") {
              keys = "Offline Vehicles" + " (" + this.resVehicleStatusCount.responseData.offlineVehicles + ")";
            } else if (key == "runningVehicles") {
              keys = "Running Vehicles" + " (" + this.resVehicleStatusCount.responseData.runningVehicles + ")";
            } else if (key == "stopVehicles") {
              keys = "Stop Vehicles" + " (" + this.resVehicleStatusCount.responseData.stopVehicles + ")";
            }
            else{
              console.log("no data");
            }
            this.piChartLabel.push(keys);
            this.piChartValue.push(this.resVehicleStatusCount.responseData[key]);
 
          }
        }
      }
      else if (res.statusCode === "409") {
        this.spinner.hide();
        this.toastrService.error(res.statusMessage);
      }
      else {
        this.spinner.hide();
        this.toastrService.error(res.statusMessage);
      }

    })
  }


  getVehiclesCountDashboard() {
    this.spinner.show();
    this._commonService.setHttp('get', 'vehicle-tracking/dashboard/get-vehicles-count-dashboard?UserId=' + this.loggedInUserId, false, false, false, 'vehicleTrackingBaseUrlApi');
    this._commonService.getHttp().subscribe((res: any) => {
      if (res.statusCode === "200") {
        this.resVehiclesCountDashboard = res;
        this.spinner.hide();
      }
      else if (res.statusCode === "409") {
        this.spinner.hide();
        this.toastrService.error(res.statusMessage);
      }
      else {
        this.spinner.hide();
        //this.toastrService.error(res.statusMessage);
      }

    })
  }

}
