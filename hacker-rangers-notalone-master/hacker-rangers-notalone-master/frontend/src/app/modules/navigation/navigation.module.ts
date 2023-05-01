import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './components/navigation/navigation.component';
import {
  TuiDataListModule, TuiExpandModule,
  TuiLinkModule,
  TuiModeModule,
  TuiScrollbarModule, TuiScrollIntoViewModule, TuiSvgModule,
  TuiTextfieldControllerModule
} from "@taiga-ui/core";
import {TuiAccordionModule, TuiInputModule} from "@taiga-ui/kit";
import {RouterModule} from "@angular/router";
import {TuiAutoFocusModule} from "@taiga-ui/cdk";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    NavigationComponent
  ],
  exports: [
    NavigationComponent
  ],
  imports: [
    CommonModule,
    TuiTextfieldControllerModule,
    TuiDataListModule,
    TuiInputModule,
    TuiScrollbarModule,
    TuiAccordionModule,
    TuiModeModule,
    TuiLinkModule,
    RouterModule,
    TuiExpandModule,
    TuiSvgModule,
    TuiScrollIntoViewModule,
    TuiAutoFocusModule,
    ReactiveFormsModule
  ]
})
export class MuiNavigationModule { }
