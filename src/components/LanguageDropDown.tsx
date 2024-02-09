import React from "react";
import Select, { GroupBase } from "react-select";
import { customStyles } from "../data/styles";
import { languages } from "../data/languages";
import { ThemeData, ThemeSelectorInterface } from "@/models/theme";
import { LanguageInterface } from "@/models/language";

const LanguagesDropdown = ({ language, themeData, onSelectChange }: {
    themeData: ThemeSelectorInterface,
    language: LanguageInterface,
    onSelectChange: (selectedOption: any) => void
}) => {
    return (
        <Select<LanguageInterface>
            placeholder={`Select Language`}
            options={languages.map((language) => (
                {
                    key: language.value,
                    ...language
                }
            ))}
            styles={customStyles(themeData)}
            value={{
                key: language.value,
                ...language
            } as any}
            // defaultValue={language}
            name="language"
            onChange={(selectedOption) => onSelectChange(selectedOption)}
        />
    );
};

export default LanguagesDropdown;