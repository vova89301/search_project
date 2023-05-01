import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MuiProjectDetailsComponent } from './mui-project-details.component';
import {
    TuiCheckboxLabeledModule,
    TuiDataListWrapperModule, TuiFieldErrorPipeModule, TuiInputDateModule,
    TuiInputModule,
    TuiInputNumberModule,
    TuiInputPasswordModule, TuiInputPhoneModule, TuiInputSliderModule, TuiInputTimeModule, TuiRadioBlockModule,
    TuiSelectModule,
    TuiStepperModule
} from "@taiga-ui/kit";
import {ReactiveFormsModule} from "@angular/forms";
import {TuiErrorModule, TuiGroupModule, TuiTextfieldControllerModule} from "@taiga-ui/core";
import {TuiCurrencyPipeModule, TuiMoneyModule} from "@taiga-ui/addon-commerce";

@NgModule({
  declarations: [
    MuiProjectDetailsComponent
  ],
    imports: [
        CommonModule,
        TuiStepperModule,
        ReactiveFormsModule,
        TuiInputModule,
        TuiErrorModule,
        TuiInputPasswordModule,
        TuiSelectModule,
        TuiInputNumberModule,
        TuiInputSliderModule,
        TuiDataListWrapperModule,
        TuiInputPhoneModule,
        TuiGroupModule,
        TuiRadioBlockModule,
        TuiCheckboxLabeledModule,
        TuiInputTimeModule,
        TuiTextfieldControllerModule,
        TuiMoneyModule,
        TuiInputDateModule,
        TuiFieldErrorPipeModule,
        TuiCurrencyPipeModule
    ]
})
export class MuiProjectDetailsModule { }
