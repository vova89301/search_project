import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LanguageSwitcherComponent} from './language-switcher.component';
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";

describe('LanguageSwitcherComponent', () => {
  let component: LanguageSwitcherComponent;
  let fixture: ComponentFixture<LanguageSwitcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LanguageSwitcherComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LanguageSwitcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
