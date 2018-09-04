import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { transition, trigger, style, keyframes, state, animate } from '@angular/animations';
import {ScrollToService} from 'ng2-scroll-to-el';
import {StatusService} from '../_services/status/status.service';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { Variables } from '../_model/constants';
import {Router} from "@angular/router";
import {AuthService} from "../_services/auth/auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  animations: [
    trigger('navbarAnimate', [
      state('show', style({
        backgroundColor: 'purple'
      })),
      state('hide', style({
        backgroundColor: 'transparent'
      })),
      transition('hide => show', animate('300ms ease-in')),
      transition('show => hide', animate('300ms ease-out'))
    ])
  ],
  providers: [Location, {provide: LocationStrategy, useClass: PathLocationStrategy}]
})
export class NavbarComponent implements OnInit {
  state: string = 'hide';
  public loggedIn: boolean;
  public location: Location;
  public login: boolean = true;
  constructor(private el: ElementRef,
              private scrollTo: ScrollToService,
              private status: StatusService, location: Location,
              private router: Router,
              private auth: AuthService) {
    this.location = location;
  }
  ngOnInit() {
    if(this.location.path() === Variables.login || this.location.path() === Variables.dashboard || this.location.path() === Variables.signup) {
      this.login = false;
    }
    this.status.status.subscribe(value => this.loggedIn = value);
  }
  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    const componentPosition = this.el.nativeElement.offsetTop;
    const scrollPosition = window.pageYOffset;
    if (scrollPosition > componentPosition) {
      this.state = 'show'
    } else {
      this.state = 'hide'
    }

  }
  logout(){
    this.status.changeStatus(false);
    this.router.navigateByUrl('/');
    this.auth.remove();
    this.login = true;
  }


}
