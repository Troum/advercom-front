import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ScrollToModule } from 'ng2-scroll-to-el';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppRoutingModule } from './/app-routing.module';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { HttpService } from './_services/http/http.service';
import { SignupComponent } from './signup/signup.component';
import { AuthService } from './_services/auth/auth.service';
import { StatusService } from './_services/status/status.service';
import { ProjectComponent } from './project/project.component';
import { BeforeLoginService } from './_services/activating/before-login.service';
import { AfterLoginService } from './_services/activating/after-login.service';
import { ProjectService } from "./_services/project/project.service";
import { MatDialogModule } from '@angular/material';
import { MatButtonModule } from "@angular/material";
import { MatInputModule } from "@angular/material";
import { Ng4LoadingSpinnerModule } from "ng4-loading-spinner";
import { ExtensionsService } from './_services/extensions/extensions.service';
import { Ng2ImgMaxModule } from "ng2-img-max";
import { NgProgressModule } from 'ngx-progressbar';
import { LoaderComponent } from './ui/loader/loader.component';
import { ProjectsTableComponent } from './table/projects-table/projects-table.component';
import { MatTableModule } from "@angular/material";
import { MatTabsModule } from "@angular/material";
import { MatCardModule } from "@angular/material";
import { MatPaginatorModule } from "@angular/material";
import { MatSortModule } from "@angular/material";
import { MatPaginatorIntl } from '@angular/material';
import { International } from "./international";
import { ProjectModalComponent } from "./edit-modal/modal/project-modal.component";
import { PhotoModalComponent } from './photo-modal/photo-modal/photo-modal.component';
import { ConfirmComponent } from './confirm-modal/confirm/confirm.component';
import { ListenerService } from './_services/listener/listener.service';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    DashboardComponent,
    LoginComponent,
    SignupComponent,
    ProjectComponent,
    LoaderComponent,
    ProjectsTableComponent,
    ProjectModalComponent,
    PhotoModalComponent,
    ConfirmComponent
  ],
  entryComponents: [
    ProjectModalComponent,
    PhotoModalComponent,
    ConfirmComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ScrollToModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    SnotifyModule,
    HttpClientModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    Ng4LoadingSpinnerModule.forRoot(),
    Ng2ImgMaxModule,
    NgProgressModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTabsModule,
    MatCardModule
  ],
  providers: [
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults},
    SnotifyService,
    HttpService,
    AuthService,
    StatusService,
    BeforeLoginService,
    AfterLoginService,
    ProjectService,
    ExtensionsService,
    { provide: MatPaginatorIntl, useClass: International},
    ListenerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
