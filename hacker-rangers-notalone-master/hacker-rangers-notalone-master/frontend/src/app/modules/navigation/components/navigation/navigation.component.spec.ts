import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationComponent } from './navigation.component';
import {RouterTestingModule} from "@angular/router/testing";
import {TuiModeDirective, TuiModeModule} from "@taiga-ui/core";
import {CUSTOM_ELEMENTS_SCHEMA, forwardRef} from "@angular/core";
import {TuiSwipeService} from "@taiga-ui/cdk";
import {MainComponent} from "../../../main/components/main/main.component";

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavigationComponent, TuiModeDirective ],
      imports: [RouterTestingModule, TuiModeModule],
      providers: [
        {
          provide: TuiModeDirective
        },
        TuiSwipeService,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
