// service that can be injected into any component
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IPlan } from 'src/model/plan';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  
  // url - currently pointing to mock data
  private url: string = "assets/mock-data/plans.json";
  // notifies subscribers whenever the selected plans are changed
  onSaved: Subject<IPlan[]> = new Subject<IPlan[]>();

  constructor(private http: HttpClient) { }

  // gets the plans at specified url
  getPlans() {
    return this.http.get<IPlan[]>(this.url)
  }
}
