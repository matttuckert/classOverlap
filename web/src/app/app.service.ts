// service that can be injected into any component
import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { IPlan } from 'src/model/plan';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  
  // url - currently pointing to mock data
  private url: string = "assets/plans.json";

  counter: number = 2;
  selectionCount: BehaviorSubject<number>;

  displayedColumns: string[] = ['course', 'selection1req', 'selection2req'];
  columns: BehaviorSubject<string[]>;
  // notifies subscribers whenever the selected plans are changed
  onSaved: Subject<IPlan[]> = new Subject<IPlan[]>();

  constructor(private http: HttpClient, public dialog: MatDialog) { 
    this.selectionCount = new BehaviorSubject(this.counter);
    this.columns = new BehaviorSubject(this.displayedColumns);
  }

  // gets the plans at specified url
  getPlans() {
    return this.http.get<IPlan[]>(this.url)
  }

  incrementSelection() {
    this.selectionCount.next(++this.counter);
    if (this.counter == 3) {
      this.displayedColumns.push('selection3req');
    } else if (this.counter == 4) {
      this.displayedColumns.push('selection4req');
    }
    this.columns.next(this.displayedColumns);
  }

  resetSelection() {
    this.counter = 2;
    this.selectionCount.next(2);
  }
  
}
