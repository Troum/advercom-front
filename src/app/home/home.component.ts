import { Component, OnInit } from '@angular/core';
import { environment } from "../../environments/environment";
import { transition, trigger, style, keyframes, state, animate } from "@angular/animations";
import {ProjectService} from "../_services/project/project.service";
import {Router} from "@angular/router";
import {HttpService} from "../_services/http/http.service";
import {SnotifyService} from "ng-snotify";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public response: any;
  public video: any;
  public projects: any;
  public link = `${environment.protocol}://${environment.host}:${environment.port}`;
  public mail = {
    name: null,
    email: null,
    subject: null,
    message: null
  };
  constructor(private _project: ProjectService, private router: Router, private _httpClient: HttpService, private snotify: SnotifyService) { }

  ngOnInit() {
    localStorage.clear();
    this.video = `${this.link}/video/animation-intro.mp4`;
      let response = null;
      this._httpClient.getProjects().subscribe(
        data => {
          response = data;
          this.projects = response.projects;
        },
        error => console.log(error),
        () => console.log('Request completed')
      );
  }
  showProject(project){
    this._project.setProject(project);
    this.router.navigateByUrl('/detailed');
  }
  sendMail(){
    console.log(this.mail);
    this._httpClient.sendMail(this.mail).subscribe(
      data => {
        this.response = data;
          this.mail = {
            name: '',
            email: '',
            subject: '',
            message: ''
          };
          this.snotify.success(this.response.success);
      },
      error => {
        if(error.error.errors.email){
          this.snotify.error(error.error.errors.email)
        }
        if(error.error.errors.subject){
          this.snotify.error(error.error.errors.subject)
        }
        if(error.error.errors.name){
          this.snotify.error(error.error.errors.name)
        }
        if(error.error.errors.message){
          this.snotify.error(error.error.errors.message)
        }
      }
    )
  }
}
