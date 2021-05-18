import { NgModule } from '@angular/core';
import { CommonModule,DatePipe } from '@angular/common';
import { AgmCoreModule } from '@agm/core';
import { TrackingRoutingModule } from './tracking-routing.module';
import { TrackingComponent } from './tracking.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgmDirectionModule } from 'agm-direction';



@NgModule({
  declarations: [
    TrackingComponent
  ],
  imports: [
    CommonModule,
    TrackingRoutingModule,
    AgmCoreModule,
    FormsModule,
    ReactiveFormsModule,
    AgmDirectionModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAV0MsCXcScyVTpfgelNpIakmESv9W0E3c',
      language: 'en',
      libraries: ['geometry','places']
    }),

  ],
  providers:[DatePipe]
})
export class TrackingModule { }
