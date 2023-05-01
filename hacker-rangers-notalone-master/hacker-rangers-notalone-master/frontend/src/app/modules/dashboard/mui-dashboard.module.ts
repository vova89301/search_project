import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TuiButtonModule, TuiFormatNumberPipeModule, TuiLinkModule} from "@taiga-ui/core";
import {MuiDashboardComponent} from './mui-dashboard.component';
import {TuiInputDateRangeModule, TuiInputModule, TuiIslandModule, TuiTagModule} from "@taiga-ui/kit";
import {TuiTableModule} from "@taiga-ui/addon-table";
import {TuiAxesModule, TuiLineChartModule, TuiLineDaysChartModule} from "@taiga-ui/addon-charts";
import {FormsModule} from "@angular/forms";
import { MuiProjectListComponent } from './project-list/mui-project-list.component';
import {TuiLetModule} from "@taiga-ui/cdk";
import {RouterLink} from "@angular/router";

@NgModule({
  declarations: [
    MuiDashboardComponent,
    MuiProjectListComponent,
  ],
    imports: [
        CommonModule,
        TuiButtonModule,
        TuiInputModule,
        TuiTableModule,
        TuiLinkModule,
        TuiTagModule,
        TuiInputDateRangeModule,
        TuiAxesModule,
        TuiLineDaysChartModule,
        FormsModule,
        TuiIslandModule,
        TuiFormatNumberPipeModule,
        TuiLineChartModule,
        TuiLetModule,
        RouterLink
    ],
  exports: [
    MuiDashboardComponent
  ]
})
export class MuiDashboardModule {
}
