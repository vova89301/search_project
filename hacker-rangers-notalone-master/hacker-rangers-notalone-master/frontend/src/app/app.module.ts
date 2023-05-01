import {NgDompurifySanitizer} from "@tinkoff/ng-dompurify";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app.routes';
import {AppComponent} from './app.component';
import {API_PROVIDERS, APP_PROVIDERS} from "./app.providers";

import {
  TuiRootModule,
  TuiDialogModule,
  TuiAlertModule,
  TUI_SANITIZER,
  TuiButtonModule,
  TuiModeModule, TuiLinkModule, TuiTextfieldControllerModule
} from "@taiga-ui/core";
import {PolymorpheusModule} from '@tinkoff/ng-polymorpheus';

import {TuiTableBarsHostModule} from "@taiga-ui/addon-tablebars";
import {TuiSheetModule, TuiSidebarModule, TuiThemeAndroidModule, TuiThemeIosModule} from "@taiga-ui/addon-mobile";
import {TuiActiveZoneModule} from "@taiga-ui/cdk";
import {TuiInputModule} from "@taiga-ui/kit";
import {LanguageSwitcherModule} from "./modules/language-switcher/language-switcher.module";
import {VersionManagerModule} from "./modules/version-manager/version-manager.module";
import {CustomHostModule} from "./modules/customization/custom-host/custom-host.module";
import {MainModule} from "./modules/main/main.module";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    PolymorpheusModule,
    TuiRootModule,
    TuiDialogModule,
    TuiAlertModule,
    TuiSheetModule,
    TuiTableBarsHostModule,
    TuiThemeAndroidModule,
    TuiThemeIosModule,
    TuiInputModule,
    LanguageSwitcherModule,
    VersionManagerModule,
    CustomHostModule,
    MainModule,
    TuiLinkModule,
    TuiModeModule,
    TuiTextfieldControllerModule
  ],
  providers: [APP_PROVIDERS, API_PROVIDERS],
  bootstrap: [AppComponent]
})
export class AppModule {
}
