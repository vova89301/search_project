import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TuiSwipeService } from '@taiga-ui/cdk';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';
import { merge, Subject } from 'rxjs';
import { distinctUntilChanged, filter, map, mapTo, startWith } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/_services/basic-auth.service';

import { MUI_MENU_TEXT } from '../navigation/tokens/i18n';
import { MUI_LOGO } from '../navigation/tokens/logo';

@Component({
    selector: `header[muiHeader]`,
    templateUrl: `./header.template.html`,
    styleUrls: [`./header.style.less`],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MuiHeaderComponent {

    // temp login form
    public loginForm: FormGroup;
    loading = false;
    submitted = false;
    error = '';
    //

    private readonly stream$ = new Subject<boolean>();

    readonly open$ = merge(
        this.router.events.pipe(mapTo(false)),
        this.stream$,
        this.swipes$.pipe(
            filter(swipe => swipe.direction === `left` || swipe.direction === `right`),
            map(swipe => swipe.direction === `right`),
        ),
    ).pipe(startWith(false), distinctUntilChanged());

    constructor(
        @Inject(MUI_LOGO) readonly logo: PolymorpheusContent,
        @Inject(MUI_MENU_TEXT) readonly menu: string,
        @Inject(Router) private readonly router: Router,
        @Inject(TuiSwipeService) private readonly swipes$: TuiSwipeService,
        @Inject(FormBuilder) private readonly formBuilder: FormBuilder,
        @Inject(AuthenticationService) private readonly authenticationService: AuthenticationService
    ) {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    onClick(): void {
        this.stream$.next(true);
    }

    onActiveZone(active: boolean): void {
        if (!active) {
            this.stream$.next(false);
        }
    }

    // temp login logics
    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.login(this.f['username'].value, this.f['password'].value)
            .pipe()
            .subscribe(
                () => {
                    console.log('User creds are updated');
                },
                (error: string) => {
                    console.error('User creds are not updated succesfully:', error);
                    this.error = error;
                    this.loading = false;
                });
    }
    //
}
