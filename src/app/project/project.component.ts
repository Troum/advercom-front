import {Component, OnInit} from '@angular/core';
import {ProjectService} from "../_services/project/project.service";
import {HttpService} from "../_services/http/http.service";
import {environment} from "../../environments/environment";
import {DomSanitizer} from "@angular/platform-browser";
import {MatDialog} from "@angular/material";
import {ScrollToService} from "ng2-scroll-to-el";
import {PhotoModalComponent} from "../photo-modal/photo-modal/photo-modal.component";

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  public showCarousel: boolean = false;
  public showVideos: boolean = false;
  public project: any;
  public photos = [];
  public videosUnsafe = [];
  public videos = [];
  public link = `${environment.protocol}://${environment.host}:${environment.port}/images/related`;
  public videoLink = `${environment.protocol}://${environment.host}:${environment.port}/videos/`;
  constructor(private _project: ProjectService, private _httpClient: HttpService, private sanitizer: DomSanitizer, private scrollTo: ScrollToService, private dialog: MatDialog) { }

  ngOnInit() {
      this._project.currentProject.subscribe(project => this.project = project);
      if(Object.keys(this.project).length === 0 && this.project.constructor === Object) {
        const videos = this.getVideos();
        this.showCarousel = true;
        this.showVideos = true;
        this.photos = this.getPhotos();
        this.project = this.getProject();
        for(let video in videos) {
          this.videos.push(videos[video].changingThisBreaksApplicationSecurity);
        }
        console.log(this.videos);
      } else {
        this.setProject(this.project);
        const fd = new FormData();
        fd.append('id', this.project.id);
        this._httpClient.getPhotos(fd).subscribe(
          data => {
            if(typeof data !== null || typeof data !== 'undefined') {
              this.showCarousel = true;
              this.photos = this.makeArray(data);
              this.setPhotos(this.photos);
              this._httpClient.getVideos(fd).subscribe(
                data => {
                  if(typeof data !== null || typeof data !== 'undefined') {
                    this.showVideos = true;
                    this.videosUnsafe = this.makeArray(data);
                    for(let video in this.videosUnsafe) {
                      this.videos.push(this.sanitizer.bypassSecurityTrustResourceUrl(this.videoLink + this.videosUnsafe[video].video));
                    }
                    this.setVideos(this.videos);
                  }

                },
                error => console.log(error),
                () => console.log('Request completed')
              );
            }
          },
          error => console.log(error),
          () => console.log('Request completed')
        );
      }

  }
  makeArray(data){
    let keys = Object.keys(data);
    let response = [];
    for(let key of keys) {
      response.push(data[key]);
    }
    return response[0];
  }
  showPhoto(photo) {
    this.dialog.open(PhotoModalComponent, {data: {photo: photo}, height: 'calc(100% - 50px)', width: '90%'});
  }

  setProject(project) {
    localStorage.setItem('project', JSON.stringify(project));
  }

  setPhotos(photos) {
    localStorage.setItem('photos', JSON.stringify(photos));
  }

  setVideos(videos) {
    localStorage.setItem('videos', JSON.stringify(videos));
  }

  getProject() {
    return JSON.parse(localStorage.getItem('project'));
  }

  getPhotos() {
    return JSON.parse(localStorage.getItem('photos'));
  }

  getVideos() {
    return JSON.parse(localStorage.getItem('videos'));
  }
}
