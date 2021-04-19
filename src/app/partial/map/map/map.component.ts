import { Component, OnInit } from '@angular/core';
import { MapsAPILoader} from '@agm/core';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  position = [18.489585, 73.8578095];
  lat = 51.678418;
  long = 7.809007;
  googleMapType = 'satellite';
  constructor() { }

  ngOnInit(): void {
  }

}
