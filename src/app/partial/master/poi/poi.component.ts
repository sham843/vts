import { MapsAPILoader} from '@agm/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-poi',
  templateUrl: './poi.component.html',
  styleUrls: ['./poi.component.scss']
})
export class PoiComponent implements OnInit {
  position = [18.489585, 73.8578095];
  lat = 51.678418;
  long = 7.809007;
  googleMapType = 'satellite';
  constructor() { }

  ngOnInit(): void {
  }

}
