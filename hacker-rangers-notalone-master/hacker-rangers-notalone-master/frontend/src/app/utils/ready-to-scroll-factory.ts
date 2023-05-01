import {ElementRef} from '@angular/core';
import {Observable} from 'rxjs';
import {debounceTime, map, startWith} from 'rxjs/operators';

export function readyToScrollFactory(
    hostElement: ElementRef<HTMLElement>,
    resize$: Observable<unknown>,
): Observable<boolean> {
    return resize$.pipe(
        startWith(null),
        debounceTime(0), // Synchronous scrollIntoView (after click) does not work https://stackoverflow.com/a/56971002
        map(() => {
            const host = hostElement.nativeElement;
            const rootElements = Array.from(host.querySelectorAll(`tui-root`));

            return (
              rootElements.every(el => el.querySelector(`.m-paragraph`))
            );
        }),
    );
}
