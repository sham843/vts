import { Component, OnInit } from '@angular/core';
import { MapsAPILoader} from '@agm/core';
@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.scss']
})
export class TrackingComponent implements OnInit {
  position = [18.489585, 73.8578095];
  lat = 51.678418;
  long = 7.809007;
  googleMapType = 'satellite';
  constructor() { }

  ngOnInit(): void {
  }

}
