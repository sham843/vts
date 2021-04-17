<<<<<<< HEAD
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

=======
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CallAPIService } from 'src/app/services/call-api.service';
import { CommonService } from 'src/app/services/common.service';
import { BreakdownListDialogComponent } from './dialog/breakdown-list-dialog/breakdown-list-dialog.component';
import { EtpDetailsDialogComponent } from './dialog/etp-details-dialog/etp-details-dialog.component';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
>>>>>>> master

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
  stopVehicles: any = "";
  runningVehicles: any = "";
  totoalCountVehicles: any;
  offlineVehicles: any = "";
  piChartMsg: boolean = false;
  totalVehicles: any;
  loggedInUserId = this._commonService.loggedInUserId();

<<<<<<< HEAD
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
=======
  constructor(public dialog: MatDialog,
    private _commonService: CommonService,
    private _callAPIService:CallAPIService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private _snackBar: MatSnackBar) { }
>>>>>>> master

  ngOnInit(): void {
    this.userRole = this._commonService.userRole();
    this.getBreakdownReport();
    this.getInvoiceDetails();
    this.getSimDueAndOverDue();
    this.getComplaintDetails();
    this.getVehicleStatusCount();
    this.getVehiclesCountDashboard();
<<<<<<< HEAD
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
=======

  }


  getBreakdownReport() {
    this.spinner.show();
    this._callAPIService.callAPI('get', 'vehicle-tracking/dashboard/get-breakdown-report?UserId=' + this.loggedInUserId, false, false, false, 'vehicleTrackingBaseUrlApi');
    this._callAPIService.getResponse().subscribe((res: any) => {
      if (res.statusCode === "200") {
        this.resBreakdownReport = res;
        this.resBreakdownReport = this.resBreakdownReport?.responseData
>>>>>>> master
        this.spinner.hide();
      }
      else if (res.statusCode === "409") {
        this.spinner.hide();
<<<<<<< HEAD
        this.toastrService.error(res.statusMessage);
      }
      else {
        this.spinner.hide();
        // this.toastrService.error(res.statusMessage);
=======
        this._snackBar.open(res.statusMessage, "Close", {
          duration: 1000,
        });
      }
      else {
        this.spinner.hide();
        this._snackBar.open(res.statusMessage, "Close", {
          duration: 1000,
        });
>>>>>>> master
      }
    })
  }

  getInvoiceDetails() {
    this.spinner.show();
<<<<<<< HEAD
    this._commonService.setHttp('get', 'vehicle-tracking/dashboard/get-invoice-details?UserId=' + this.loggedInUserId, false, false, false, 'vehicleTrackingBaseUrlApi');
    this._commonService.getHttp().subscribe((res: any) => {
=======
    this._callAPIService.callAPI('get', 'vehicle-tracking/dashboard/get-invoice-details?UserId=' + this.loggedInUserId, false, false, false, 'vehicleTrackingBaseUrlApi');
    this._callAPIService.getResponse().subscribe((res: any) => {
>>>>>>> master
      this.resInvoiceDetails = res;
      this.resInvoiceDetails = this.resInvoiceDetails?.responseData;
      if (res.statusCode === "200") {
        this.spinner.hide();
      }
      else if (res.statusCode === "409") {
        this.spinner.hide();
<<<<<<< HEAD
        this.toastrService.error(res.statusMessage);
=======
        this._snackBar.open(res.statusMessage, "Close", {
          duration: 1000,
        });
>>>>>>> master
      }
      else {
        this.spinner.hide();
        // this.toastrService.error(res.statusMessage);
      }
    })
  }

  getSimDueAndOverDue() {
    this.spinner.show();
<<<<<<< HEAD
    this._commonService.setHttp('get', 'vehicle-tracking/dashboard/get-sim-due-and-over-due?UserId=' + this.loggedInUserId, false, false, false, 'vehicleTrackingBaseUrlApi');
    this._commonService.getHttp().subscribe((res: any) => {
=======
    this._callAPIService.callAPI('get', 'vehicle-tracking/dashboard/get-sim-due-and-over-due?UserId=' + this.loggedInUserId, false, false, false, 'vehicleTrackingBaseUrlApi');
    this._callAPIService.getResponse().subscribe((res: any) => {
>>>>>>> master
      if (res.statusCode === "200") {
        this.resSimDueAndOverDue = res;
        this.spinner.hide();
      }
      else if (res.statusCode === "409") {
        this.spinner.hide();
<<<<<<< HEAD
        this.toastrService.error(res.statusMessage);
=======
        this._snackBar.open(res.statusMessage, "Close", {
          duration: 1000,
        });
>>>>>>> master
      }
      else {
        this.spinner.hide();
        // this.toastrService.error(res.statusMessage);
      }
    })
  }

  getComplaintDetails() {
    this.spinner.show();
<<<<<<< HEAD
    this._commonService.setHttp('get', 'vehicle-tracking/dashboard/get-complaint-details?UserId=' + this.loggedInUserId, false, false, false, 'vehicleTrackingBaseUrlApi');
    this._commonService.getHttp().subscribe((res: any) => {
=======
    this._callAPIService.callAPI('get', 'vehicle-tracking/dashboard/get-complaint-details?UserId=' + this.loggedInUserId, false, false, false, 'vehicleTrackingBaseUrlApi');
    this._callAPIService.getResponse().subscribe((res: any) => {
>>>>>>> master
      if (res.statusCode === "200") {
        this.resComplaintDetails = res;
        this.spinner.hide();
      }
      else if (res.statusCode === "409") {
        this.spinner.hide();
<<<<<<< HEAD
        this.toastrService.error(res.statusMessage);
      }
      else {
        this.spinner.hide();
        //  this.toastrService.error(res.statusMessage);
=======
        this._snackBar.open(res.statusMessage, "Close", {
          duration: 1000,
        });
      }
      else {
        this.spinner.hide();
        this._snackBar.open(res.statusMessage, "Close", {
          duration: 1000,
        });
>>>>>>> master
      }

    })
  }

<<<<<<< HEAD
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
=======
  getVehicleStatusCount() {
    this.spinner.show();
    this._callAPIService.callAPI('get', 'vehicle-tracking/tracking/get-vehicle-status-count?UserId=' + this.loggedInUserId, false, false, false, 'vehicleTrackingBaseUrlApi');
    this._callAPIService.getResponse().subscribe((res: any) => {
      if (res.statusCode === "200") {
        this.stopVehicles = res.responseData.stopVehicles;
        this.offlineVehicles = res.responseData.offlineVehicles;
        this.runningVehicles = res.responseData.runningVehicles;
        this.totalVehicles = res.responseData.totalVehicles;
        if ((this.stopVehicles == 0) && (this.offlineVehicles == 0) && (this.runningVehicles == 0)) {
          this.piChartMsg = true;
        }
        else {
          this.pieChart(this.stopVehicles, this.offlineVehicles, this.runningVehicles, this.totalVehicles);
        }

        //this.totoalCountVehicles = res.stopVehicles + res.responseData.offlineVehicles + res.responseData.runningVehicles;
        this.spinner.hide();
      }
      else if (res.statusCode === "409") {
        this.spinner.hide();
        this._snackBar.open(res.statusMessage, "Close", {
          duration: 1000,
        });
      }
      else {
        this.spinner.hide();
        this._snackBar.open(res.statusMessage, "Close", {
          duration: 1000,
        });
>>>>>>> master
      }

    })
  }


<<<<<<< HEAD
  getVehiclesCountDashboard() {
    this.spinner.show();
    this._commonService.setHttp('get', 'vehicle-tracking/dashboard/get-vehicles-count-dashboard?UserId=' + this.loggedInUserId, false, false, false, 'vehicleTrackingBaseUrlApi');
    this._commonService.getHttp().subscribe((res: any) => {
=======
  pieChart(stopVehicles: any, offlineVehicles: any, runningVehicles: any, totalVehicles: any) {

    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart instance
    let chart = am4core.create("chartdiv", am4charts.PieChart);

    var label = chart.seriesContainer.createChild(am4core.Label);
    label.text = totalVehicles;
    label.horizontalCenter = "middle";
    label.verticalCenter = "middle";
    label.fontSize = 16;

    // Add and configure Series

    let pieSeries = chart.series.push(new am4charts.PieSeries());

    pieSeries.dataFields.value = "count";
    pieSeries.dataFields.category = "vehicle";
    pieSeries.dataFields.hidden = "hidden";

    // Let's cut a hole in our Pie chart the size of 30% the radius
    chart.innerRadius = am4core.percent(35);

    // Put a thick white border around each Slice
    pieSeries.slices.template.stroke = am4core.color("#fff");
    pieSeries.colors.list = [am4core.color("#43a047"), am4core.color("#fb8c00"), am4core.color("#e53935"), am4core.color("#00acc1")];
    pieSeries.slices.template.strokeWidth = 2;
    pieSeries.slices.template.strokeOpacity = 1;
    pieSeries.slices.template
      // change the cursor on hover to make it apparent the object can be interacted with
      .cursorOverStyle = [
        {
          "property": "cursor",
          "value": "pointer"
        }
      ];

    pieSeries.alignLabels = false;
    pieSeries.labels.template.bent = true;
    pieSeries.labels.template.radius = 3;
    pieSeries.labels.template.padding(0, 0, 0, 0);

    pieSeries.ticks.template.disabled = true;

    // Create a base filter effect (as if it's not there) for the hover to return to
    let shadow = pieSeries.slices.template.filters.push(new am4core.DropShadowFilter);
    shadow.opacity = 0;

    // Create hover state
    let hoverState: any = pieSeries.slices.template.states.getKey("hover"); // normally we have to create the hover state, in this case it already exists

    // Slightly shift the shadow and make it more prominent on hover
    let hoverShadow = hoverState.filters.push(new am4core.DropShadowFilter);
    hoverShadow.opacity = 0.7;
    hoverShadow.blur = 5;

    // stopVehicles:any, offlineVehicles:any, runningVehicles:any
    // Add a legend
    // chart.legend = new am4charts.Legend();
    // chart.legend.position = "right";
    console.log(runningVehicles, offlineVehicles, stopVehicles);
    chart.data = [
      {
        "vehicle": "Running",
        "count": runningVehicles,
        "hidden": (runningVehicles === 0 ? true : false),
        "id": "1"
      }, {
        "vehicle": "Offline",
        "count": offlineVehicles,
        "hidden": (offlineVehicles === 0 ? true : false),
        "id": "5"
      }, {
        "vehicle": "Stopped",
        "count": stopVehicles,
        "hidden": (stopVehicles === 0 ? true : false),
        "id": "2"
      }
    ]

  }

  getVehiclesCountDashboard() {
    this.spinner.show();
    this._callAPIService.callAPI('get', 'vehicle-tracking/dashboard/get-vehicles-count-dashboard?UserId=' + this.loggedInUserId, false, false, false, 'vehicleTrackingBaseUrlApi');
    this._callAPIService.getResponse().subscribe((res: any) => {
>>>>>>> master
      if (res.statusCode === "200") {
        this.resVehiclesCountDashboard = res;
        this.spinner.hide();
      }
      else if (res.statusCode === "409") {
        this.spinner.hide();
<<<<<<< HEAD
        this.toastrService.error(res.statusMessage);
      }
      else {
        this.spinner.hide();
        //this.toastrService.error(res.statusMessage);
      }

    })
=======
        this._snackBar.open(res.statusMessage, "Close", {
          duration: 1000,
        });
      }
      else {
        this.spinner.hide();
        this._snackBar.open(res.statusMessage, "Close", {
          duration: 1000,
        });
      }

    })
  }

  redirectMap(status: any) {
    this.router.navigate(['map'], { state: { example: status } });
  }
  openDialogBreakdown(): void {
    const dialogRef = this.dialog.open(BreakdownListDialogComponent, {
      width: '1200px',
      data: this.resBreakdownReport
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
>>>>>>> master
  }

  openDialogeTPDetails(): void {
    const dialogRef = this.dialog.open(EtpDetailsDialogComponent, {
      width: '1200px',
      data: this.resInvoiceDetails
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
