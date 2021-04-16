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
      { path: 'invoice', loadChildren: () => import('./partial/reports/Mining/invoice/invoice.module').then(m => m.InvoiceModule), data: { title: 'Dashboard', allowedRoles: [10, 'dc', 'Invoice',] } },
      { path: 'materialOrder', loadChildren: () => import('./partial/reports/Mining/material-order/material-order.module').then(m => m.MaterialOrderModule), data: { title: 'Material Order', allowedRoles: [10, 'dc', 'supervisor',] } }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
