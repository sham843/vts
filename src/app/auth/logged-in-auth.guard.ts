import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedInAuthGuard implements CanActivate {
  constructor(private _authService: AuthService,
    private _router: Router,
    private _snackBar: MatSnackBar
  ) { }

  canActivate(): boolean {
    if (this._authService.isLoggedIn()) {
      this._router.navigate(['/dashboard']);
      this._snackBar.open("You have already logged in", "Ok", {
        duration: 2000,
      })
      return false;
    } else {
      return true;
    }
  }
}
