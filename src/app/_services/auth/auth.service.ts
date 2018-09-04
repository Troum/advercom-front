import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthService {
  private iss = {
    login: `${environment.protocol}://${environment.host}:${environment.port}/${environment.prefix}/login`,
    signup: `${environment.protocol}://${environment.host}:${environment.port}/${environment.prefix}/signup`,
  };
  constructor() { }
  handle(token) {
    this.set(token);
    console.log(this.isValid());
  }

  set(token) {
    localStorage.setItem('_token', token);
  }
  get() {
    return localStorage.getItem('_token');
  }
  remove() {
    localStorage.removeItem('_token');
  }
  isValid() {
    const token = this.get();
    if(token) {
      const payload = this.payload(token);
      if(payload) {
        return Object.values(this.iss).indexOf(payload.iss) > -1 ? true : false;
      }
    }

    return false;
  }

  payload(token) {
    const payload = token.split('.')[1];
    return this.decode(payload);
  }

  decode(payload) {
    return JSON.parse(atob(payload));
  }

  logged() {
    return this.isValid();
  }
}
