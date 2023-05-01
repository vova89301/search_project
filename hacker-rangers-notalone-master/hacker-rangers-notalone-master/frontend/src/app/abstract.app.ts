import {Directive, ElementRef, HostBinding, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {tuiPure, TuiResizeService} from '@taiga-ui/cdk';
import {Observable} from 'rxjs';

import {readyToScrollFactory} from './utils/ready-to-scroll-factory';
import {PAGE_LOADED} from "./utils/page-loaded.provider";

export const APP_PAGE_LOADED_PROVIDER = {
    provide: PAGE_LOADED,
    deps: [ElementRef, TuiResizeService],
    useFactory: readyToScrollFactory,
};

@Directive()
export abstract class AbstractAppComponent implements OnInit {
    protected abstract readonly storage: Storage;
    protected abstract readonly router: Router;

    // TODO: use inject(TUI_IS_CYPRESS) in angular v14+
    @HostBinding(`class._is-cypress-mode`)
    protected readonly isCypressMode = this.isCypress;

    @HostBinding(`class._loaded`)
    protected readonly pageLoadedInit = `0`;

    // TODO: use inject(TUI_DOC_PAGE_LOADED) in angular v14+
    @HostBinding(`$.class._loaded`)
    protected readonly pageLoaded = this.pageLoaded$;

    protected constructor(
        protected readonly isCypress: boolean,
        protected readonly pageLoaded$: Observable<boolean>,
    ) {}

    async ngOnInit(): Promise<void> {
        await this.replaceEnvInURI();
    }

    @tuiPure
    get isChristmas(): boolean {
        const today = new Date();

        return (
            (!today.getMonth() && today.getDate() < 14) ||
            (today.getMonth() === 11 && today.getDate() > 24)
        );
    }

    protected async replaceEnvInURI(): Promise<void> {
        const env = this.storage.getItem(`env`);

        if (env) {
            this.storage.removeItem(`env`);
            await this.router.navigateByUrl(env.replace(/\/[A-z0-9]*\//, ``));
        }
    }
}
