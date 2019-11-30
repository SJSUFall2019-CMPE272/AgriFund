import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonorDashboardComponent } from './donor-dashboard.component';

describe('DonorDashboardComponent', () => {
  let component: DonorDashboardComponent;
  let fixture: ComponentFixture<DonorDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonorDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonorDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
