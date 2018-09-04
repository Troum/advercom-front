import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpService} from "../../_services/http/http.service";
import {MatDialog, MatPaginator, MatSort} from "@angular/material";
import { MatTableDataSource } from '@angular/material';
import {ProjectInterface} from "../../_model/project-interface";
import {ProjectModalComponent} from "../../edit-modal/modal/project-modal.component";
import {ListenerService} from "../../_services/listener/listener.service";

@Component({
  selector: 'app-projects-table',
  templateUrl: './projects-table.component.html',
  styleUrls: ['./projects-table.component.css']
})
export class ProjectsTableComponent implements OnInit {
  displayedColumns = ['project', 'client'];
  dataSource: any;
  response: any;
  data: any;
  constructor(private _httpClient: HttpService, private dialog: MatDialog, private listener: ListenerService) {
    this.listener.listen().subscribe((n:any) => {
      this.refresh(n);
    })
  }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  ngOnInit() {
    this._httpClient.getProjects().subscribe(
      data => {
        this.response = data;
        this.dataSource = new MatTableDataSource<ProjectInterface[]>(this.response.projects);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error => console.log(error),
      () => console.log('Done!')
    );
  }
  open(id) {
    const fd = new FormData();
    fd.append('id', id);
    this._httpClient.getProject(fd).subscribe(
      data => {
        this.response = data;
        this.data = this.response.project;
        this.dialog.open(ProjectModalComponent, {data: {project: this.data}, height: 'calc(100% - 350px)', width: '40%'});
      },
      error => console.log(error)
    );
  }

  refresh(event) {
    this.ngOnInit();
  }

}
