export interface ThemeSelectorInterface { value: string; label: string, background: string, forground: string }

export type BuiltinTheme = 'vs' | 'vs-dark' | 'hc-black' | 'hc-light';

export interface ThemeData extends ThemeSelectorInterface {

    base: BuiltinTheme;
    inherit: boolean;
    rules: ITokenThemeRule[];
    encodedTokensColors?: string[];
    colors: IColors;
}

export type IColors = {
    [colorId: string]: string;
};

export interface ITokenThemeRule {
    token: string;
    foreground?: string;
    background?: string;
    fontStyle?: string;
}


