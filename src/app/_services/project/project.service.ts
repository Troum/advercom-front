import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
@Injectable()
export class ProjectService {
  private project = new BehaviorSubject<Object>({});
  private projects = new BehaviorSubject<Object>({});
  currentProject = this.project.asObservable();
  currentProjects = this.projects.asObservable();
  constructor() { }
  setProject(project: {}){
    this.project.next(project);
  }
  setProjects(projects: {}) {
    this.projects.next(projects);
  }
}
