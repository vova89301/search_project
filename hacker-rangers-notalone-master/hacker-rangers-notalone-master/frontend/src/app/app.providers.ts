import { Provider } from '@angular/core';
import { TUI_SANITIZER } from "@taiga-ui/core";
import { NgDompurifySanitizer } from "@tinkoff/ng-dompurify";
import { MUI_LOGO } from "./modules/navigation/tokens/logo";
import { LOGO_CONTENT } from "./modules/logo/logo.component";
import { MUI_PAGES } from "./modules/navigation/tokens/pages";
import { pages } from "./app.pages";
import { WORKSPACE_API_BASE_URL } from './api/notalone.workspace.api';
import { environment } from '../environments/environment';
import { HeadersInterceptor } from "./interceptors/headers-interceptor";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { BasicAuthErrorInterceptor, BasicAuthInterceptor } from './_helpers';

export const API_PROVIDERS: Provider[] = [
  {
    provide: WORKSPACE_API_BASE_URL,
    useValue: environment.workspaceApiUrl,
  }
];

export const APP_PROVIDERS: Provider[] = [
  { provide: TUI_SANITIZER, useClass: NgDompurifySanitizer },
  {
    provide: MUI_LOGO,
    useValue: LOGO_CONTENT,
  },
  {
    provide: MUI_PAGES,
    useValue: pages,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: HeadersInterceptor,
    multi: true
  },
  { 
    provide: HTTP_INTERCEPTORS, 
    useClass: BasicAuthInterceptor, 
    multi: true 
  },
  { provide: HTTP_INTERCEPTORS, 
    useClass: BasicAuthErrorInterceptor, 
    multi: true 
  }
];
