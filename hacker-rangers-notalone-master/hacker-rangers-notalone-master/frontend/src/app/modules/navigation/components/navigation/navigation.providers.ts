import {InjectionToken, Provider} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {TuiDestroyService, tuiIsPresent} from '@taiga-ui/cdk';
import {Observable} from 'rxjs';
import {filter, map, mergeMap, takeUntil} from 'rxjs/operators';

import {MUI_PAGES} from '../../tokens/pages';
import {TUI_TITLE} from '../../tokens/title';
import {MuiPages} from '../../types/pages';

export const NAVIGATION_TITLE = new InjectionToken<Observable<string>>(`Page title`);
export const NAVIGATION_LABELS = new InjectionToken<readonly string[]>(
    `Navigation sections labels for search`,
);
export const NAVIGATION_ITEMS: InjectionToken<readonly MuiPages[]> =
    new InjectionToken<readonly MuiPages[]>(`Navigation pages`);

export const NAVIGATION_PROVIDERS: Provider[] = [
    TuiDestroyService,
    {
        provide: NAVIGATION_TITLE,
        deps: [Router, ActivatedRoute, TUI_TITLE, TuiDestroyService],
        useFactory: (
            router: Router,
            activatedRoute: ActivatedRoute,
            titlePrefix: string,
            destroy$: Observable<void>,
        ): Observable<string> => {
            return router.events.pipe(
                filter(event => event instanceof NavigationEnd),
                map(() => activatedRoute.firstChild),
                filter(tuiIsPresent),
                mergeMap(({data}) => data),
                map(({title}) => titlePrefix + title),
                takeUntil(destroy$),
            );
        },
    },
    {
        provide: NAVIGATION_LABELS,
        deps: [MUI_PAGES],
        useFactory: labelsProviderFactory,
    },
    {
        provide: NAVIGATION_ITEMS,
        deps: [MUI_PAGES],
        useFactory: (pages: MuiPages): readonly MuiPages[] => {
            const labels = labelsProviderFactory(pages);

            return [
                ...labels.map(label => pages.filter(({section}) => section === label)),
                pages.filter(page => !page.section),
            ];
        },
    },
];

function labelsProviderFactory(pages: MuiPages): readonly string[] {
    return pages
        .map(({section}) => section)
        .filter(tuiIsPresent)
        .filter((item, index, array) => array.indexOf(item) === index);
}
