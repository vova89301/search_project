import {InjectionToken} from "@angular/core";
import {Observable} from "rxjs";

export const PAGE_LOADED = new InjectionToken<Observable<boolean>>('page.loaded');
