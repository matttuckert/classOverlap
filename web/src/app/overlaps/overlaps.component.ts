// component responsible for getting and displaying the overlapping courses
import { Component, OnInit, ViewChild } from '@angular/core';
import { IPlan } from '../../model/plan';
import { AppService } from '../app.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

export interface TableData {
  course: string;
  selection1req: string;
  selection2req: string;
}

@Component({
  selector: 'app-overlaps',
  templateUrl: './overlaps.component.html',
  styleUrls: ['./overlaps.component.css']
})
export class OverlapsComponent implements OnInit {

  selection1: IPlan;
  selection2: IPlan;
  displayedColumns: string[] = ['course', 'selection1req', 'selection2req'];
  dataSource: MatTableDataSource<TableData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  // constructs the overlaps component, injects the app service
  constructor(private service: AppService) {
      // Assign the data to the data source for the table to render
      this.dataSource = new MatTableDataSource();
  }

  // initialization logic, subscribes to the onSaved variable
  ngOnInit() {
    this.service.onSaved.subscribe(data => {
      this.selection1 = data[0];
      this.selection2 = data[1];
      this.getOverlaps()
    });
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // gets overlapping courses of the plan list passed as a parameter
  getOverlaps() {
    let overlaps: TableData[] = [];
    for (let c of this.selection1.courseList) {
      if (this.selection2.courseList.includes(c)) {
        overlaps.push({
          selection1req: "selection1req",
          selection2req: "selection2req",
          course: c})
      }
    }
    this.dataSource.data = overlaps;
  }

}
