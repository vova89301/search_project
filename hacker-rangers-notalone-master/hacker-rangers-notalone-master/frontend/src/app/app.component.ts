import {ChangeDetectionStrategy, Component, Inject, ViewEncapsulation} from '@angular/core';
import {distinctUntilChanged, filter, mapTo, merge, Observable, Subject} from "rxjs";
import {Router} from "@angular/router";
import {map, startWith} from "rxjs/operators";
import {LOCAL_STORAGE} from '@ng-web-apis/common';
import {AbstractAppComponent, APP_PAGE_LOADED_PROVIDER} from "./abstract.app";
import {
  TUI_IS_ANDROID,
  TUI_IS_CYPRESS,
  TUI_IS_IOS,
  TuiDestroyService,
  TuiResizeService,
  TuiSwipeService
} from "@taiga-ui/cdk";
import {PAGE_LOADED} from "./utils/page-loaded.provider";

@Component({
  selector: 'app',
  templateUrl: './app.template.html',
  styleUrls: ['./app.style.less'],
  providers: [TuiDestroyService, TuiResizeService, APP_PAGE_LOADED_PROVIDER],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent extends AbstractAppComponent {
  title = 'notalone-frontend';

  readonly isLanding$ = this.router.events.pipe(
    map(() => false),
    // map(() => this.router.routerState.snapshot.url === `/`),
    distinctUntilChanged(),
  );

  constructor(
    @Inject(TUI_IS_CYPRESS) isCypress: boolean,
    @Inject(TUI_IS_ANDROID) readonly isAndroid: boolean,
    @Inject(TUI_IS_IOS) readonly isIos: boolean,
    @Inject(PAGE_LOADED) pageLoaded$: Observable<boolean>,
    @Inject(LOCAL_STORAGE) protected readonly storage: Storage,
    @Inject(Router) protected readonly router: Router,
  ) {
    super(isCypress, pageLoaded$);
  }

  override async ngOnInit(): Promise<void> {
    await super.ngOnInit();
  }
}
