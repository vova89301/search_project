import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VersionManagerComponent } from './components/version-manager/version-manager.component';



@NgModule({
  declarations: [
    VersionManagerComponent
  ],
  exports: [
    VersionManagerComponent
  ],
  imports: [
    CommonModule
  ]
})
export class VersionManagerModule { }
