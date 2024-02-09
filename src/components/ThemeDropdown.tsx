import React from "react";
import Select, { GroupBase, OptionsOrGroups } from "react-select";
import monacoThemes from "monaco-themes/themes/themelist.json";
import { customStyles } from "../data/styles";
import { ThemeData, ThemeSelectorInterface } from "@/models/theme";
import { themes } from "@/data/themes";

const ThemeDropdown = ({ theme, handleThemeChange }: {
    handleThemeChange: (selectedOption: any) => void;
    theme: ThemeSelectorInterface;
}) => {
    return (
        <Select
            placeholder={`Select Theme`}
            // options={languageOptions}
            options={themes.map((theme) => ({
                key: theme.value,
                ...theme,
                // options: [
                //     themeId
                // ]
            } as any))}
            // value={theme}
            value={theme as any}
            styles={customStyles(theme)}
            onChange={handleThemeChange}
        />
    );
};

export default ThemeDropdown;