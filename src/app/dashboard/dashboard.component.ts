import { Component, OnInit} from '@angular/core';
import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";
import {SnotifyService} from "ng-snotify";
import {ExtensionsService} from "../_services/extensions/extensions.service";
import {HttpService} from "../_services/http/http.service";
import {Ng2ImgMaxService} from "ng2-img-max";
import { NgProgress } from 'ngx-progressbar';
import {ListenerService} from "../_services/listener/listener.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public file: any;
  public coverFilename: string = 'Загрузите обложку проекта';
  public photoFilenames: string = 'Загрузите одну или больше фотографий';
  public videoFilenames: string = 'Загрузите одно или больше видео';
  public cover: any;
  public photos: any;
  public videos: any;
  public form = {
    name: null,
    description: null,
    client: null
  };
  public response: any;
  constructor(private spinner: Ng4LoadingSpinnerService,
              private snotify: SnotifyService,
              private extensions: ExtensionsService,
              private _httpClient: HttpService,
              private resizer: Ng2ImgMaxService,
              private progressBar: NgProgress,
              private listener: ListenerService
              ) { }

  ngOnInit() { }
  onSubmit() {
    const fd = new FormData();
    const cover: File = this.cover;
    const photos: Array<File> = this.photos;
    const videos: Array<File> = this.videos;
    if(typeof photos !== 'undefined'){
      for (let i = 0; i <= photos.length; i++) {
        fd.append('photos[]', photos[i]);
      }
    }
    if(typeof videos !== 'undefined'){
      for (let i = 0; i <= videos.length; i++) {
        fd.append('videos[]', videos[i]);
      }
    }
    fd.append('name', this.form.name);
    fd.append('description', this.form.description);
    fd.append('client', this.form.client);
    if(typeof cover === 'undefined') {
      this.snotify.error('Обложка проекта обязательна!');
    } else {
      this.progressBar.start();
      fd.append('cover', cover);
      this._httpClient.addProject(fd).subscribe(
      data => {
        this.listener.refresh('refresh');
        this.progressBar.done();
        this.response = data;
        this.clearAll();
        this.snotify.success(this.response.response);
      },
      error => console.log(error),
      () => console.log('Request completed')
    )
    }

  }
  onCoverUpload(event) {
    this.cover = event.target.files[0];
    this.resizer.resizeImage(this.cover, 499, 333).subscribe(
      result => {
        this.cover = new File([result], result.name);
        if(this.extensions.checkCoverExtension(this.cover)) {
          this.coverFilename = this.filenameString(event, this.cover);
        } else {
          this.snotify.error('Проверьте расширения загружаемого файла: на сервер могут быть загружены только изображения с расширениями .png, .jpg и .jpeg', {
            timeout: 5000
          });
        }
      },
      error => {
        this.snotify.error(error);
      }
    )

  }
  onPhotosUpload(event) {
    this.photos = <Array<File>>event.target.files;
    if(this.extensions.checkImageExtensions(this.photos)) {
      this.photoFilenames = this.filenameString(event, this.photos);
    } else {
      this.snotify.error('Проверьте расширения загружаемых файлов: на сервер могут быть загружены только изображения с расширениями .png, .jpg и .jpeg', {
        timeout: 5000
      });
    }
  }
  onVideosUpload(event) {
    this.videos = <Array<File>>event.target.files;
    if(this.extensions.checkVideoExtensions(this.videos)) {
      this.videoFilenames = this.filenameString(event, this.videos);
    } else {
      this.snotify.error('Проверьте расширения загружаемых файлов: на сервер могут быть загружены только видео с расширениями .mp4, .mpeg и .webm', {
        timeout: 5000
      });
    }

  }
  filenameString(event, data) {
    let filename: string;
    if (data.length > 1) {
      if (data.length === 2 || data.length === 3 || data.length === 4) {
        return filename = 'будет загружено ' + data.length + ' файла';
      } else {
        return filename = 'будет загружено ' + data.length + ' файлов';
      }
    } else {
      return filename = event.target.files[0].name;
    }
  }
  clearAll(){
    this.cover = null;
    this.file = null;
    this.coverFilename = 'Загрузите обложку проекта';
    this.photoFilenames  = 'Загрузите одну или больше фотографий';
    this.videoFilenames  = 'Загрузите одно или больше видео';
    this.photos = null;
    this.videos = null;
    this.form = {
      name: null,
      description: null,
      client: null
    };
  }

}
