import {InjectionToken} from '@angular/core';

export const MUI_MENU_TEXT = new InjectionToken<string>(`menu i18n text`, {
    factory: () => `Menu`,
});

export const MUI_SEARCH_TEXT = new InjectionToken<string>(`search i18n text`, {
  factory: () => `Search`,
});
