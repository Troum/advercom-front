import { Component, OnInit } from '@angular/core';
import {HttpService} from "../_services/http/http.service";
import {SnotifyService} from "ng-snotify";
import {AuthService} from "../_services/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public form = {
    name: null,
    email: null,
    password: null,
    password_confirmation: null
  };
  constructor(private _httpClient: HttpService, private snotify: SnotifyService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    this._httpClient.signUp(this.form).subscribe(
      data => console.log(data),
          error => this.handleError(error)
    )
  }
  handleResponse(data) {
    this.authService.handle(data.access_token);
    this.router.navigateByUrl('/dashboard');
  }
  handleError(error) {
    if(error.error.errors.email) {
      this.snotify.error(error.error.errors.email)
    }
    if(error.error.errors.password) {
      this.snotify.error(error.error.errors.password)
    }
  }
}
