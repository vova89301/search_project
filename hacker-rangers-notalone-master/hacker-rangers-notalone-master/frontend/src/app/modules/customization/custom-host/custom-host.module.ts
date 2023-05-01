import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomHostComponent } from './components/custom-host/custom-host.component';



@NgModule({
    declarations: [
        CustomHostComponent
    ],
    exports: [
        CustomHostComponent
    ],
    imports: [
        CommonModule
    ]
})
export class CustomHostModule { }
