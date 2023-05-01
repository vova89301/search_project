import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MuiProjectDetailsComponent } from './mui-project-details.component';

describe('ProductDetailsComponent', () => {
  let component: MuiProjectDetailsComponent;
  let fixture: ComponentFixture<MuiProjectDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MuiProjectDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MuiProjectDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
