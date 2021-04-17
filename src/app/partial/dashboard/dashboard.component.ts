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

  constructor(public dialog: MatDialog,
    private _commonService: CommonService,
    private _callAPIService:CallAPIService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.userRole = this._commonService.userRole();
    this.getBreakdownReport();
    this.getInvoiceDetails();
    this.getSimDueAndOverDue();
    this.getComplaintDetails();
    this.getVehicleStatusCount();
    this.getVehiclesCountDashboard();

  }


  getBreakdownReport() {
    this.spinner.show();
    this._callAPIService.callAPI('get', 'vehicle-tracking/dashboard/get-breakdown-report?UserId=' + this.loggedInUserId, false, false, false, 'vehicleTrackingBaseUrlApi');
    this._callAPIService.getResponse().subscribe((res: any) => {
      if (res.statusCode === "200") {
        this.resBreakdownReport = res;
        this.resBreakdownReport = this.resBreakdownReport?.responseData
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
      }
    })
  }

  getInvoiceDetails() {
    this.spinner.show();
    this._callAPIService.callAPI('get', 'vehicle-tracking/dashboard/get-invoice-details?UserId=' + this.loggedInUserId, false, false, false, 'vehicleTrackingBaseUrlApi');
    this._callAPIService.getResponse().subscribe((res: any) => {
      this.resInvoiceDetails = res;
      this.resInvoiceDetails = this.resInvoiceDetails?.responseData;
      if (res.statusCode === "200") {
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
        // this.toastrService.error(res.statusMessage);
      }
    })
  }

  getSimDueAndOverDue() {
    this.spinner.show();
    this._callAPIService.callAPI('get', 'vehicle-tracking/dashboard/get-sim-due-and-over-due?UserId=' + this.loggedInUserId, false, false, false, 'vehicleTrackingBaseUrlApi');
    this._callAPIService.getResponse().subscribe((res: any) => {
      if (res.statusCode === "200") {
        this.resSimDueAndOverDue = res;
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
        // this.toastrService.error(res.statusMessage);
      }
    })
  }

  getComplaintDetails() {
    this.spinner.show();
    this._callAPIService.callAPI('get', 'vehicle-tracking/dashboard/get-complaint-details?UserId=' + this.loggedInUserId, false, false, false, 'vehicleTrackingBaseUrlApi');
    this._callAPIService.getResponse().subscribe((res: any) => {
      if (res.statusCode === "200") {
        this.resComplaintDetails = res;
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
      }

    })
  }

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
      }

    })
  }


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
      if (res.statusCode === "200") {
        this.resVehiclesCountDashboard = res;
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
