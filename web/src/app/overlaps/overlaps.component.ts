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
  columnHeaders = ["", "", ""];
  displayedColumns: string[] = ['course', 'selection1req', 'selection2req'];
  dataSource: MatTableDataSource<TableData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  // constructs the overlaps component, injects the app service
  constructor(private service: AppService, public dialog: MatDialog) {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource();
  }

  // initialization logic, subscribes to the onSaved variable
  ngOnInit() {
    this.service.onSaved.subscribe(data => {
      this.selection1 = data[0];
      this.selection2 = data[1];
      this.columnHeaders[0] = "Course"
      this.columnHeaders[1] = this.selection1.longName + " Requirement";
      this.columnHeaders[2] = this.selection2.longName + " Requirement";
      this.getOverlaps();
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
    this.dataSource.data = overlaps;
  }

    // opens the dialog when user clicks "Select Plans"
    openDialog(): void {
      this.dialog.open(SelectionComponent, {
        disableClose: true,
        width: "600px"
      });
    }

}
