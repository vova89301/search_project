import {DOCUMENT} from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostBinding,
  Inject,
  Optional,
} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {TuiSidebarDirective} from '@taiga-ui/addon-mobile';
import {tuiControlValue, TuiDestroyService, tuiPure, tuiUniqBy} from '@taiga-ui/cdk';
import {TuiBrightness, TuiModeDirective} from '@taiga-ui/core';
import {TuiInputComponent} from '@taiga-ui/kit';
import {Observable} from 'rxjs';
import {filter, map, startWith, take, takeUntil} from 'rxjs/operators';

import {MuiPage} from '../../interfaces/page';
import {MuiPages} from '../../types/pages';

import {MUI_SEARCH_TEXT} from '../../tokens/i18n';
import {MUI_PAGE_LOADED} from '../../tokens/page-loaded';
import {TUI_SCROLL_BEHAVIOR} from '../../tokens/scroll-behavior';
import {muiTransliterateKeyboardLayout} from "../../utils/transliterate-keyboard-layout";

import {
  NAVIGATION_ITEMS,
  NAVIGATION_LABELS,
  NAVIGATION_PROVIDERS,
  NAVIGATION_TITLE,
} from './navigation.providers';

@Component({
  selector: 'mui-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.less'],
  providers: NAVIGATION_PROVIDERS,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent {

  @HostBinding(`class._open`)
  menuOpen = false;

  openPagesArr: boolean[] = [];
  openPagesGroupsArr: boolean[] = [];
  active = ``;

  readonly search = new FormControl(``);

  readonly filtered$ = tuiControlValue<string>(this.search).pipe(
    filter(search => search.length > 2),
    map(search => this.filterItems(this.flattenSubPages(this.items), search)),
  );

  readonly mode$: Observable<TuiBrightness> = this.mode.change$.pipe(
    startWith(null),
    map(() => this.mode.mode || `onLight`),
  );

  constructor(
    @Inject(ChangeDetectorRef) changeDetectorRef: ChangeDetectorRef,
    @Inject(Title) titleService: Title,
    @Inject(NAVIGATION_TITLE) title$: Observable<string>,
    @Inject(DOCUMENT) private readonly documentRef: Document,
    @Inject(TuiModeDirective)
    private readonly mode: TuiModeDirective,
    @Optional()
    @Inject(TuiSidebarDirective)
    readonly sidebar: unknown,
    @Inject(NAVIGATION_LABELS) readonly labels: string[],
    @Inject(NAVIGATION_ITEMS)
    readonly items: readonly MuiPages[],
    @Inject(MUI_SEARCH_TEXT) readonly searchText: string,
    @Inject(Router) private readonly router: Router,
    @Inject(ActivatedRoute) private readonly activatedRoute: ActivatedRoute,
    @Inject(TuiDestroyService) private readonly destroy$: Observable<void>,
    @Inject(MUI_PAGE_LOADED)
    private readonly readyToScroll$: Observable<boolean>,
    @Inject(TUI_SCROLL_BEHAVIOR) private readonly scrollBehavior: ScrollBehavior,
  ) {
    // Angular can't navigate no anchor links
    // https://stackoverflow.com/questions/36101756/angular2-routing-with-hashtag-to-page-anchor
    title$.subscribe(title => {
      changeDetectorRef.markForCheck();
      titleService.setTitle(title);
      this.openActivePageGroup();
      this.handleAnchorLink(this.activatedRoute.snapshot.fragment!);
    });
  }

  get canOpen(): boolean {
    return (this.search.value?.length ?? 0) > 2;
  }

  get itemsWithoutSections(): MuiPages {
    return this.items[this.items.length - 1];
  }

  isActive(route: string): boolean {
    return route === this.active;
  }

  onGroupClick(index: number): void {
    this.openPagesGroupsArr[index] = !this.openPagesGroupsArr[index];
  }

  closeMenu(): void {
    this.menuOpen = false;
  }

  onClick(input: TuiInputComponent): void {
    input.open = false;
    this.menuOpen = false;
    this.search.setValue(``);
    this.openActivePageGroup();
  }

  @tuiPure
  private filterItems(
    items: ReadonlyArray<readonly MuiPage[]>,
    search: string,
  ): ReadonlyArray<readonly MuiPage[]> {
    return items.map(section =>
      tuiUniqBy(
        section.filter(({title, keywords = ``}) => {
          title = title.toLowerCase();
          search = search.toLowerCase();
          keywords = keywords.toLowerCase();

          return (
            title.includes(search) ||
            keywords.includes(search) ||
            title.includes(muiTransliterateKeyboardLayout(search)) ||
            keywords.includes(muiTransliterateKeyboardLayout(search)) ||
            search.replace(/-/gi, ``).includes(title)
          );
        }),
        `title`,
      ),
    );
  }

  @tuiPure
  private flattenSubPages(
    items: readonly MuiPages[],
  ): ReadonlyArray<readonly MuiPage[]> {
    return items.reduce<ReadonlyArray<readonly MuiPage[]>>(
      (array, item) => [
        ...array,
        item.reduce<readonly MuiPage[]>(
          (pages, page) =>
            `subPages` in page
              ? [...pages, ...page.subPages]
              : [...pages, page],
          [],
        ),
      ],
      [],
    );
  }

  private isActiveRoute(route: string): boolean {
    return this.router.isActive(route, false);
  }

  private handleAnchorLink(hash: string): void {
    this.readyToScroll$
      .pipe(filter(Boolean), take(1), takeUntil(this.destroy$))
      .subscribe(() => this.navigateToAnchorLink(hash));
  }

  private openActivePageGroup(): void {
    this.items.forEach((pages, pagesIndex) => {
      pages.forEach((page, pageIndex) => {
        if (`route` in page && this.isActiveRoute(page.route)) {
          this.openPagesArr[pagesIndex] = true;
          this.active = page.route;
        }

        if (`subPages` in page) {
          page.subPages.forEach(subPage => {
            if (this.isActiveRoute(subPage.route)) {
              this.openPagesArr[pagesIndex] = true;
              this.openPagesGroupsArr[pagesIndex * 100 + pageIndex] = true;
              this.active = subPage.route;
            }
          });
        }
      });
    });
  }

  private navigateToAnchorLink(fragment: string): void {
    const element = fragment && this.documentRef.querySelector(`#${fragment}`);

    if (!element) {
      return;
    }

    element.classList.add(`tui-doc-animated-example`);
    element.scrollIntoView({
      block: `start`,
      inline: `nearest`,
      behavior: this.scrollBehavior,
    });
  }

}
