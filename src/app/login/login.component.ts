import { Component, OnInit } from '@angular/core';
import { SnotifyService } from 'ng-snotify';
import { HttpService } from '../_services/http/http.service';
import { AuthService } from "../_services/auth/auth.service";
import { Router } from "@angular/router";
import { StatusService } from "../_services/status/status.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public form = {
    email: null,
    password: null
  };
  constructor(
    private snotify: SnotifyService,
    private httpService: HttpService,
    private authService: AuthService,
    private router: Router,
    private status: StatusService
  ) { }

  ngOnInit() {
  }

  onSubmit(){
    this.httpService.login(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    )
  }

  handleResponse(data){
    this.authService.handle(data.access_token);
    this.status.changeStatus(true);
    this.router.navigateByUrl('/dashboard');
  }
  handleError(error) {
    this.snotify.error(error.error.error)
  }
}
