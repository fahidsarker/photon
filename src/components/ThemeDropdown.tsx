import React from "react";
import Select, { GroupBase, OptionsOrGroups } from "react-select";
import monacoThemes from "monaco-themes/themes/themelist.json";
import { customStyles } from "../data/styles";
import { ThemeData, ThemeSelectorInterface } from "@/models/theme";

const ThemeDropdown = ({ themeData, handleThemeChange, theme }: {
    handleThemeChange: (selectedOption: any) => void;
    theme: ThemeSelectorInterface;
    themeData: ThemeData
}) => {
    return (
        <Select
            placeholder={`Select Theme`}
            // options={languageOptions}
            options={Object.entries(monacoThemes).map(([themeId, themeName]) => ({
                label: themeName,
                value: themeId,
                key: themeId,
                // options: [
                //     themeId
                // ]
            } as any))}
            // value={theme}
            value={theme as any}
            styles={customStyles(themeData)}
            onChange={handleThemeChange}
        />
    );
};

export default ThemeDropdown;