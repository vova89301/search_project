import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LanguageSwitcherComponent} from "./components/language-switcher/language-switcher.component";
import {TuiDataListModule} from "@taiga-ui/core";
import {TuiSelectModule} from "@taiga-ui/kit";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    LanguageSwitcherComponent
  ],
  exports: [
    LanguageSwitcherComponent
  ],
  imports: [
    CommonModule,
    TuiDataListModule,
    TuiSelectModule,
    ReactiveFormsModule
  ]
})
export class LanguageSwitcherModule { }
