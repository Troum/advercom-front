import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import {HttpService} from "../../_services/http/http.service";
import {SnotifyService} from "ng-snotify";
import {ListenerService} from "../../_services/listener/listener.service";
@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ConfirmComponent implements OnInit {
  id: any;
  response: any;
  constructor(private matDialogRef: MatDialogRef<ConfirmComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private _httpClient: HttpService, private snotify: SnotifyService, private listener: ListenerService) { }

  ngOnInit() {
    this.id = this.data.id;
  }
  close(){
    this.matDialogRef.close();
  }
  delete() {
    const fd = new FormData();
    fd.append('id', this.id);
    this._httpClient.deleteProject(fd).subscribe(
      data => {
        this.listener.refresh('refresh');
        this.matDialogRef.close();
        this.response = data;
        this.snotify.success(this.response.success);
      },
      error => {
        this.snotify.error(error.error.error);
      }
    )
  }
}
