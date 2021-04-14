import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  _showSidebar: boolean = false;
  @Input() set showSidebar(value: boolean) {
    this._showSidebar = value;
  }
  constructor() { }

  ngOnInit(): void {
  }

}
