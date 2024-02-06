import { OutputDetailsInt } from "./components/OutputWindow";
import { LanguageInterface } from "./models/language";
import { ThemeSelectorInterface } from "./models/theme";

export const setStorageCode = (language: string, code: string) => {
    localStorage.setItem(`${language}_code`, code);
}

export const setStorageLanguage = (language: LanguageInterface) => {
    localStorage.setItem("language", JSON.stringify(language));
}

export const setStorageCustomInput = (input: string) => {
    localStorage.setItem("customInput", input);
}

export const setStorageCurrentOutput = (output: OutputDetailsInt) => {
    localStorage.setItem("output", JSON.stringify(output));
}


export const getStorageLanguage = (): LanguageInterface | null => {
    const language = localStorage.getItem("language");
    if (language) {
        return JSON.parse(language);
    }
    return null;
}

export const getStorageCustomInput = (): string | null => {
    return localStorage.getItem("customInput");
}

export const getStorageCode = (language: string): string | null => {
    return localStorage.getItem(`${language}_code`);
}

export const getStorageOutput = (): OutputDetailsInt | null => {
    const output = localStorage.getItem("output");
    if (output) {
        return JSON.parse(output);
    }
    return null;
}

export const setStoragetStorageheme = (theme: ThemeSelectorInterface) => {
    localStorage.setItem("theme", JSON.stringify(theme));
}

export const getStorageTheme = (): ThemeSelectorInterface | null => {
    const theme = localStorage.getItem("theme");
    if (theme) {
        return JSON.parse(theme);
    }
    return null;
}





