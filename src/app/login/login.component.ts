import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CallAPIService } from '../services/call-api.service';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: any;
  submitted = false;
  data: any;
  toggle: boolean = false;
  hide = true;

  constructor(
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private _commonService: CommonService,
    private _callAPIService: CallAPIService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      userRole: 'admin'
    });
  }

  changeType(input_field_password: any) {
    if (input_field_password.type == "password")
      input_field_password.type = "text";
    else
      input_field_password.type = "password";

    this.toggle = !this.toggle;
  }

  get f() { return this.loginForm.controls };

  onSubmit() {
    this.spinner.show();
    this.submitted = true;
    if (this.loginForm.invalid) {
      this.spinner.hide(); 
      return;
    }
    else {
      this.data = this.loginForm.value;
      this._callAPIService.callAPI('get', 'vehicle-tracking/login/login-web?' + 'UserName=' + this.data.username + '&Password=' + this.data.password, false, false, false, 'vehicleTrackingBaseUrlApi');
      this._callAPIService.getResponse().subscribe((res: any) => {
        if (res.statusCode === "200") {
          localStorage.setItem('loggedInDetails', JSON.stringify(res));
          this.router.navigate(['../dashboard'], { relativeTo: this.route })
          this._snackBar.open(res.statusMessage, "Close", {
            duration: 1000,
          });
          this.spinner.hide();
        }
        else {
          this.spinner.hide();
          this._snackBar.open(res.statusMessage);
        }

      })
    }
  }
}


