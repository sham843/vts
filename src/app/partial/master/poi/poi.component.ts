import { MapsAPILoader} from '@agm/core';
import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
@Component({
  selector: 'app-poi',
  templateUrl: './poi.component.html',
  styleUrls: ['./poi.component.scss']
})
export class PoiComponent {
  position = [18.489585, 73.8578095];
  lat = 51.678418;
  long = 7.809007;
  googleMapType = 'satellite';
  constructor(public dialog: MatDialog) {}

  openDialog() {
    this.dialog.open(poiDetails);
  }
}
@Component({
  selector: 'poi-details',
  templateUrl: 'poi-details.html',
})
export class poiDetails {}