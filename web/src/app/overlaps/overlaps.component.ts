// component responsible for getting and displaying the overlapping courses
import { Component, OnInit, ViewChild } from '@angular/core';
import { IPlan } from '../../model/plan';
import { AppService } from '../app.service';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { SelectionComponent } from '../selection/selection.component';

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

  isSaved: boolean = false;
  selection1: IPlan;
  selection2: IPlan;
  selection3: IPlan;
  selection4: IPlan;
  columnHeaders: string[];
  displayedColumns: string[] = ['course', 'selection1req', 'selection2req'];
  dataSource: MatTableDataSource<TableData>;
  selectionCount: number;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  // constructs the overlaps component, injects the app service
  constructor(private service: AppService, public dialog: MatDialog) {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource<TableData>();
    let temp = JSON.parse(sessionStorage.getItem("data"));
    if (temp) {
      this.dataSource.data = temp;
    }
    this.columnHeaders = JSON.parse(sessionStorage.getItem("headers")) || this.getColumnHeaders();
  }

  // initialization logic, subscribes to the onSaved variable
  ngOnInit() {
    this.service.onSaved.subscribe(data => {
      this.selection1 = data[0];
      this.selection2 = data[1];
      this.columnHeaders = this.getColumnHeaders();
      this.dataSource.data = this.getOverlaps();
      sessionStorage.setItem("headers", JSON.stringify(this.columnHeaders));
      sessionStorage.setItem("data", JSON.stringify(this.dataSource.data));
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
  getOverlaps(): TableData[] {
    this.selectionCount = this.service.getSelectionCount();
    let overlaps: TableData[] = [];
    for (let c of this.selection1.courseList) {
      for (let co of this.selection2.courseList) {
        if (c.name == co.name && c.requirement != co.requirement) {
          overlaps.push({
            selection1req: c.requirement,
            selection2req: co.requirement,
            course: c.name
          });
        }
      }
    }
    return overlaps;
  }

  // opens the dialog when user clicks "Select Plans"
  openDialog(): void {
    this.dialog.open(SelectionComponent, {
      disableClose: true,
      width: "600px"
    });
  }

  getColumnHeaders(): string[] {
    return [
      "Course",
      this.selection1? this.selection1.longName + " Requirement" : "", 
      this.selection2? this.selection2.longName + " Requirement" : ""
    ];
  }

}
