import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MuiProjectListComponent } from './mui-project-list.component';

describe('ProjectListComponent', () => {
  let component: MuiProjectListComponent;
  let fixture: ComponentFixture<MuiProjectListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MuiProjectListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MuiProjectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
