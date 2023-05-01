import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MuiUserProfileComponent } from './mui-user-profile.component';

describe('UserProfileComponent', () => {
  let component: MuiUserProfileComponent;
  let fixture: ComponentFixture<MuiUserProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MuiUserProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MuiUserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
