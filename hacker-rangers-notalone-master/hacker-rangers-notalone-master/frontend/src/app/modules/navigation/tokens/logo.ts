import {InjectionToken} from '@angular/core';
import {PolymorpheusContent} from '@tinkoff/ng-polymorpheus';

export const MUI_LOGO = new InjectionToken<PolymorpheusContent>(`Main logo`, {
    factory: () => ``,
});
