import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})
export class PlanComponent implements OnInit {

  shortName: string;
  longName: string;
  courseList: string[];

  constructor() { }

  ngOnInit() {
  }

}
