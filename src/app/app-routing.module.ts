import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { AuthorizationGuard } from './auth/authorization.guard';
import { LoggedInAuthGuard } from './auth/logged-in-auth.guard';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './partial/layout/layout.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, data: { title: 'Login' }, canActivate: [LoggedInAuthGuard] },
  {
    path: '', canActivate: [AuthGuard],
    canActivateChild: [AuthorizationGuard],
    component: LayoutComponent,
    children: [
      { path: 'dashboard', loadChildren: () => import('./partial/dashboard/dashboard.module').then(m => m.DashboardModule), data: { title: 'Dashboard', allowedRoles: [10, 'dc', 'supervisor',] } },
      { path: 'invoice', loadChildren: () => import('./partial/reports/Mining/invoice/invoice.module').then(m => m.InvoiceModule), data: { title: 'Invoice report', allowedRoles: [10, 'dc', 'Invoice',] } },
      { path: 'materialOrder', loadChildren: () => import('./partial/reports/Mining/material-order/material-order.module').then(m => m.MaterialOrderModule), data: { title: 'Material Order', allowedRoles: [10, 'dc', 'supervisor',] } },
      { path: 'summary', loadChildren: () => import('./partial/reports/general/summary/summary.module').then(m => m.SummaryModule), data: { title: 'Summary report', allowedRoles: [10, 'dc', 'supervisor',] } },
      { path: 'speedRange', loadChildren: () => import('./partial/reports/general/speed-range/speed-range.module').then(m => m.SpeedRangeModule), data: { title: 'Speed Range report', allowedRoles: [10, 'dc', 'supervisor',] } },
      { path: 'trip', loadChildren: () => import('./partial/reports/general/trip/trip.module').then(m => m.TripModule), data: { title: 'Trip report', allowedRoles: [10, 'dc', 'supervisor',] } },
      { path: 'address', loadChildren: () => import('./partial/reports/general/address/address.module').then(m => m.AddressModule), data: { title: 'Address report', allowedRoles: [10, 'dc', 'supervisor',] } },
      { path: 'overspeed', loadChildren: () => import('./partial/reports/general/overspeed/overspeed.module').then(m => m.OverspeedModule), data: { title: 'Over Speed report', allowedRoles: [10, 'dc', 'supervisor',] } },
      { path: 'poi', loadChildren: () => import('./partial/master/poi/poi.module').then(m => m.PoiModule), data: { title: 'POI Details', allowedRoles: [10, 'dc', 'supervisor',] } },
      { path: 'breakDown', loadChildren: () => import('./partial/master/break-down/break-down.module').then(m => m.BreakDownModule), data: { title: 'Break Down Details', allowedRoles: [10, 'dc', 'supervisor',] } },
      { path: 'recharge', loadChildren: () => import('./partial/master/recharge/recharge.module').then(m => m.RechargeModule), data: { title: 'Recharge', allowedRoles: [10, 'dc', 'supervisor',] } },
      { path: 'map', loadChildren: () => import('./partial/map/map/map.module').then(m => m.MapModule), data: { title: 'Map', allowedRoles: [10, 'dc', 'supervisor',] } },
      { path: 'tracking', loadChildren: () => import('./partial/map/tracking/tracking.module').then(m => m.TrackingModule), data: { title: 'Tracking', allowedRoles: [10, 'dc', 'supervisor',] } },
      { path: 'changePassword', loadChildren: () => import('./change-password/change-password.module').then(m => m.ChangePasswordModule), data: { title: 'Change Password', allowedRoles: [10, 'dc', 'supervisor',] } },    
    ]
  },
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
