import { Component } from '@angular/core';
import {AbstractTuiPortalHostComponent, AbstractTuiPortalService} from "@taiga-ui/cdk";
import { CustomPortalService } from './custom-portal.service';

@Component({
  selector: 'mui-custom-host',
  templateUrl: './custom-host.component.html',
  styleUrls: ['./custom-host.component.less'],
  providers: [
    {provide: AbstractTuiPortalService, useExisting: CustomPortalService},
    {provide: AbstractTuiPortalHostComponent, useExisting: CustomHostComponent},
  ],
})
export class CustomHostComponent extends AbstractTuiPortalHostComponent  {

}
