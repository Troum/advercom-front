import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {AuthService} from "../auth/auth.service";

@Injectable()
export class StatusService {

  private logged = new BehaviorSubject<boolean>(this.authService.logged());
  status = this.logged.asObservable();
  constructor(private authService: AuthService) { }
  changeStatus(value: boolean) {
    this.logged.next(value);
  }
}
