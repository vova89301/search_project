import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CustomHostComponent} from './custom-host.component';
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";

describe('CustomHostComponent', () => {
  let component: CustomHostComponent;
  let fixture: ComponentFixture<CustomHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomHostComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CustomHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
