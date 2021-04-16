import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OverspeedComponent } from './overspeed.component';

const routes: Routes = [{ path: '', component: OverspeedComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OverspeedRoutingModule { }
