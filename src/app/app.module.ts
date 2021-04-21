import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './partial/layout/layout.component';
import { HeaderComponent } from './partial/layout/header/header.component';
import { FooterComponent } from './partial/layout/footer/footer.component';
import { SidebarComponent } from './partial/layout/sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
<<<<<<< HEAD
import { DatePipe } from '@angular/common';

=======
import { AgmCoreModule } from '@agm/core';
>>>>>>> master
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    HttpClientModule,
    MatDialogModule,
    MatSortModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAV0MsCXcScyVTpfgelNpIakmESv9W0E3c',
      language: 'en',
      libraries: ['geometry', 'places']
    })
  ],
  providers: [DatePipe,],
  bootstrap: [AppComponent]
})
export class AppModule { }
