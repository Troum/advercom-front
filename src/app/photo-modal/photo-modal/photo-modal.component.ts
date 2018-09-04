import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {environment} from "../../../environments/environment";


@Component({
  selector: 'app-photo-modal',
  templateUrl: './photo-modal.component.html',
  styleUrls: ['./photo-modal.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PhotoModalComponent implements OnInit {
  public link = `${environment.protocol}://${environment.host}:${environment.port}/images/related`;
  photo: any;
  constructor(private matDialogRef: MatDialogRef<PhotoModalComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.photo = this.data.photo;
  }

  close() {
    this.matDialogRef.close();
  }

}
