// component responsible for getting and displaying the overlapping courses
import { Component, OnInit } from '@angular/core';
import { IPlan, Course } from '../../model/plan';
import { AppService } from '../app.service';

@Component({
  selector: 'app-overlaps',
  templateUrl: './overlaps.component.html',
  styleUrls: ['./overlaps.component.css']
})
export class OverlapsComponent implements OnInit {

  // selected plans
  selectedPlans: IPlan[];

  // constructs the overlaps component, injects the app service
  constructor(private service: AppService) { }

  // initialization logic, subscribes to the onSaved variable
  ngOnInit() {
    this.service.onSaved.subscribe(data => this.selectedPlans = data);
  }

  // gets overlapping courses of the plan list passed as a parameter
  getOverlaps() {
    // not yet implemented
  }

}
