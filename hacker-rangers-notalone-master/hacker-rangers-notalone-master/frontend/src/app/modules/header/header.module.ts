import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiSidebarModule } from '@taiga-ui/addon-mobile';
import { TuiActiveZoneModule } from '@taiga-ui/cdk';
import { TuiButtonModule } from '@taiga-ui/core';
import { PolymorpheusModule } from '@tinkoff/ng-polymorpheus';

import { MuiNavigationModule } from '../navigation/navigation.module';
import { MuiHeaderComponent } from './header.component';

@NgModule({
  imports: [
    CommonModule,
    PolymorpheusModule,
    TuiButtonModule,
    TuiSidebarModule,
    TuiActiveZoneModule,
    MuiNavigationModule,
    ReactiveFormsModule
  ],
  declarations: [MuiHeaderComponent],
  exports: [MuiHeaderComponent],
})
export class MuiHeaderModule {
}
