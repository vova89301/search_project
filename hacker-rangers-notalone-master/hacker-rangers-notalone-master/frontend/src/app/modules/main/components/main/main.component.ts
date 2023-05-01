import {Component, forwardRef, HostBinding, Inject, ViewEncapsulation} from '@angular/core';
import {LOCAL_STORAGE, WINDOW} from '@ng-web-apis/common';
import {Subject} from "rxjs";
import {TuiBrightness, TuiModeDirective} from "@taiga-ui/core";
import {TuiSwipeService} from "@taiga-ui/cdk";

@Component({
  selector: 'mui-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: TuiModeDirective,
      useExisting: forwardRef(() => MainComponent),
    },
    TuiSwipeService,
  ],
})
export class MainComponent {

  night =
    this.storage.getItem(`night`) === `true` ||
    (this.storage.getItem(`night`) === null &&
      this.windowRef.matchMedia(`(prefers-color-scheme: dark)`).matches);

  readonly change$ = new Subject<void>();

  constructor(
    @Inject(LOCAL_STORAGE) private readonly storage: Storage,
    @Inject(WINDOW) private readonly windowRef: Window,
  ) { }

  @HostBinding(`attr.data-mode`)
  get mode(): TuiBrightness | null {
    return this.night ? `onDark` : null;
  }

  onMode(night: boolean): void {
    this.night = night;
    this.change$.next();
    this.storage.setItem(`night`, String(night));
  }

}
