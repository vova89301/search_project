import {NgModule} from '@angular/core';

import {MuiScrollIntoViewLinkDirective} from './scroll-into-view.directive';

@NgModule({
    declarations: [MuiScrollIntoViewLinkDirective],
    exports: [MuiScrollIntoViewLinkDirective],
})
export class MuiScrollIntoViewLinkModule {}
