import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {HomeComponent} from "./home/home.component";
import {SignupComponent} from "./signup/signup.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {ProjectComponent} from "./project/project.component";
import {BeforeLoginService} from "./_services/activating/before-login.service";
import {AfterLoginService} from "./_services/activating/after-login.service";

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [BeforeLoginService]
  },
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [BeforeLoginService]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AfterLoginService]
  },
  {
    path: 'detailed',
    component: ProjectComponent
  }
  ];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
