import {Component, Inject, Output, EventEmitter, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {ConfirmComponent} from "../../confirm-modal/confirm/confirm.component";
import {HttpService} from "../../_services/http/http.service";
import {SnotifyService} from "ng-snotify";
import {ListenerService} from "../../_services/listener/listener.service";

@Component({
  selector: 'app-project-modal',
  templateUrl: './project-modal.component.html',
  styleUrls: ['./project-modal.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProjectModalComponent implements OnInit {
  project: any;
  response: any;
  changes = {
    name: false,
    client: false,
    description: false
  };
  constructor(private listener: ListenerService, private matDialogRef: MatDialogRef<ProjectModalComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog, private _httpClient: HttpService, private snotify: SnotifyService) {
  }
  @Output() onFilter: EventEmitter<any> = new EventEmitter();
  ngOnInit() {
    this.project = this.data.project;
  }
  close() {
    this.matDialogRef.close();
  }
  changeName() {
    this.changes.name = true;
  }
  changeClient() {
    this.changes.client = true;
  }
  changeDescription() {
    this.changes.description = true;
  }
  edit(name, client, description) {
    this.listener.refresh('refresh');
    if(this.changes.name === true || this.changes.client === true || this.changes.description === true) {
    const fd = new FormData();
    fd.append('id', this.project.id);
    fd.append('name', name.value );
    fd.append('client', client.value);
    fd.append('description', description.value);
    this._httpClient.editProject(fd).subscribe(
      data => {
        this.close();
        this.response = data;
        this.snotify.success(this.response.success);
      },
      error => {
        this.snotify.error(error.error)
      }
    )
    } else {
      this.snotify.info('Никаких изменений внесено не было');
    }

  }
  delete() {
    this.matDialogRef.close();
    this.dialog.open(ConfirmComponent, {data: {id: this.project.id}, height: '220px', width: '20%'});
  }
}
