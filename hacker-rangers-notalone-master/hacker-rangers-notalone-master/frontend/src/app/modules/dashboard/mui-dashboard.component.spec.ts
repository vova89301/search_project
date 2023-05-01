import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MuiDashboardComponent } from './mui-dashboard.component';

describe('DashboardComponent', () => {
  let component: MuiDashboardComponent;
  let fixture: ComponentFixture<MuiDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MuiDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MuiDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
