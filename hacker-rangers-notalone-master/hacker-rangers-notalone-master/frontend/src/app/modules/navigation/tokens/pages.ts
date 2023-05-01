import {InjectionToken} from '@angular/core';

import {MuiPages} from '../types/pages';

export const MUI_PAGES: InjectionToken<MuiPages> = new InjectionToken<MuiPages>(
    `Documentation pages`,
    {
        factory: () => [],
    },
);
