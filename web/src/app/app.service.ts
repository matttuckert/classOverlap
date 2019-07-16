// service that can be injected into any component
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IPlan } from 'src/model/plan';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  
  // url - currently pointing to mock data
  private url: string = "assets/plans.json";
  // notifies subscribers whenever the selected plans are changed
  onSaved: Subject<IPlan[]> = new Subject<IPlan[]>();

  constructor(private http: HttpClient, public dialog: MatDialog) { }

  // gets the plans at specified url
  getPlans() {
    return this.http.get<IPlan[]>(this.url)
  }
  
}
