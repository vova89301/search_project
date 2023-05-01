export interface MuiPageBase {
    readonly section?: string;
    readonly iconSource?: string;
    readonly title: string;
}

export interface MuiPage extends MuiPageBase {
    readonly route: string;
    readonly keywords?: string;
}

export interface MuiPageGroup extends MuiPageBase {
    readonly subPages: readonly MuiPage[];
}

export type RawLoaderContent = Promise<{default: string}> | string;

export const MUI_EXAMPLE_PRIMARY_FILE_NAME = {
    TS: `TypeScript`,
    LESS: `LESS`,
    HTML: `HTML`,
} as const;

export type MuiDocExample =
    | Record<string, RawLoaderContent>
    | {
          [MUI_EXAMPLE_PRIMARY_FILE_NAME.TS]?: string;
          [MUI_EXAMPLE_PRIMARY_FILE_NAME.HTML]?: string;
          [MUI_EXAMPLE_PRIMARY_FILE_NAME.LESS]?: string;
      };
