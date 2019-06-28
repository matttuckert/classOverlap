import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverlapsComponent } from './overlaps.component';

describe('OverlapsComponent', () => {
  let component: OverlapsComponent;
  let fixture: ComponentFixture<OverlapsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverlapsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverlapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
