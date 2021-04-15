import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  getMobileNo: any;
  getUserName: any
  @Output() onToggleSidebar: EventEmitter<any> = new EventEmitter();
  constructor(private router: Router, private _commonService: CommonService) { }

  ngOnInit(): void {
    this.getMobileNo = this._commonService.loggedInUserMobile();
    this.getUserName = this._commonService.loggedInUsername();
  }

  toggleSidebar() {
    this.onToggleSidebar.emit();
  }


  logout() {
    localStorage.clear();
    this.router.navigate(['../login']);
  }

}
