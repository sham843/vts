import { Component, OnInit } from '@angular/core';
import { MapsAPILoader} from '@agm/core';
@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.scss']
})
export class TrackingComponent implements OnInit {
  position = [18.489585, 73.8578095];
  lat = 20.879865;
  long = 78.905043;
  zoom= 12;
  showtrackmenu: boolean = false;
  showmarkpos: boolean = false;
  showmaptype: boolean = false;
  map: any;

  constructor() { }

  ngOnInit(): void {
  }

  onMapReady(map: any) {
    this.map = map;
    
    // this.mockDirections();
  }

}
