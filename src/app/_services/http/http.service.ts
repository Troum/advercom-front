import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../environments/environment';
@Injectable()
export class HttpService {
  baseURL = `${environment.protocol}://${environment.host}:${environment.port}/${environment.prefix}`;
  constructor(private _httpClient: HttpClient) { }

  signUp(data) {
    return this._httpClient.post(`${this.baseURL}/signup`,data);
  }
  login(data) {
    return this._httpClient.post(`${this.baseURL}/login`, data);
  }
  getProjects() {
    return this._httpClient.get(`${this.baseURL}/projects`);
  }
  getPhotos(data) {
    return this._httpClient.post(`${this.baseURL}/photos`, data);
  }
  getProject(data) {
    return this._httpClient.post(`${this.baseURL}/project`, data);
  }
  getVideos(data) {
    return this._httpClient.post(`${this.baseURL}/videos`, data);
  }

  addProject(data) {
    return this._httpClient.post(`${this.baseURL}/add-project`, data);
  }

  deleteProject(data) {
    return this._httpClient.post(`${this.baseURL}/delete-project`, data);
  }

  editProject(data) {
    return this._httpClient.post(`${this.baseURL}/edit-project`, data);
  }

  sendMail(data) {
    return this._httpClient.post(`${this.baseURL}/send`, data);
  }
}
