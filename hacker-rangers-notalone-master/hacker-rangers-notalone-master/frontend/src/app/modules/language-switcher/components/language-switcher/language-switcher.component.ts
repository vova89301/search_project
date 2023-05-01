import {Component, Inject} from '@angular/core';
import {FormControl} from "@angular/forms";

// taiga-ui imports
import {TUI_ICONS_PATH, tuiCapitalizeFirstLetter} from "@taiga-ui/core";
import {TuiCountryIsoCode, TuiLanguageName, TuiLanguageSwitcher} from '@taiga-ui/i18n';
import {TuiStringHandler} from "@taiga-ui/cdk";

@Component({
  selector: 'mui-language-switcher',
  templateUrl: './language-switcher.component.html',
  styleUrls: ['./language-switcher.component.less']
})
export class LanguageSwitcherComponent {

  private readonly path = this.iconsPath(`tuiIcon`).replace(`tuiIcon.svg#tuiIcon`, ``);

  readonly language = new FormControl(tuiCapitalizeFirstLetter(this.switcher.language));

  readonly flags: Map<TuiLanguageName, TuiCountryIsoCode> = new Map([
    [`chinese`, TuiCountryIsoCode.CN],
    [`dutch`, TuiCountryIsoCode.NL],
    [`english`, TuiCountryIsoCode.GB],
    [`french`, TuiCountryIsoCode.FR],
    [`german`, TuiCountryIsoCode.DE],
    [`italian`, TuiCountryIsoCode.IT],
    [`polish`, TuiCountryIsoCode.PL],
    [`portuguese`, TuiCountryIsoCode.PT],
    [`russian`, TuiCountryIsoCode.RU],
    [`spanish`, TuiCountryIsoCode.ES],
    [`turkish`, TuiCountryIsoCode.TR],
    [`ukrainian`, TuiCountryIsoCode.UA],
    [`vietnamese`, TuiCountryIsoCode.VN],
  ]);

  readonly names: TuiLanguageName[] = Array.from(this.flags.keys());

  constructor(
    @Inject(TuiLanguageSwitcher) readonly switcher: TuiLanguageSwitcher,
    @Inject(TUI_ICONS_PATH) private readonly iconsPath: TuiStringHandler<string>,
  ) {
  }

  getFlagPath(code?: TuiCountryIsoCode): string | null {
    return code ? `${this.path}${code}.png` : null;
  }

}
