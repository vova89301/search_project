import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {MuiNavigationModule} from "../navigation/navigation.module";
import {TuiRootModule, TuiThemeNightModule} from "@taiga-ui/core";
import {TuiToggleModule} from "@taiga-ui/kit";
import {MainComponent} from "./components/main/main.component";
import {FormsModule} from "@angular/forms";
import {MuiHeaderModule} from "../header/header.module";
import {MuiDashboardModule} from "../dashboard/mui-dashboard.module";
import {MuiProjectDetailsModule} from "../project-details/mui-project-details.module";
import {MuiUserProfileModule} from "../user-profile/mui-user-profile.module";

@NgModule({
  declarations: [
    MainComponent
  ],
  exports: [
    MainComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    // taiga-ui modules
    TuiRootModule,
    TuiToggleModule,
    TuiThemeNightModule,
    // notalone modules
    MuiHeaderModule,
    MuiNavigationModule,
    MuiDashboardModule,
    MuiProjectDetailsModule,
    MuiUserProfileModule,
  ]
})
export class MainModule {
}
