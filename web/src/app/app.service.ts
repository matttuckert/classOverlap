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
  // notifies subscribers whenever the selected plans are changed
  onSaved: Subject<IPlan[]> = new Subject<IPlan[]>();

  
  selectionCount: BehaviorSubject<number>;

  constructor(private http: HttpClient, public dialog: MatDialog) { 
    this.selectionCount = new BehaviorSubject(this.counter);
  }

  // gets the plans at specified url
  getPlans() {
    return this.http.get<IPlan[]>(this.url)
  }

  incrementSelection() {
    this.selectionCount.next(++this.counter);
  }

  resetSelection() {
    this.counter = 2;
    this.selectionCount.next(2);
  }
  
}
