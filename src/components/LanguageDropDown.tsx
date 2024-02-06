import React from "react";
import Select, { GroupBase } from "react-select";
import { customStyles } from "../data/styles";
import { languages } from "../data/languages";
import { ThemeData } from "@/models/theme";

const LanguagesDropdown = ({ themeData, onSelectChange }: {
    onSelectChange: (selectedOption: any) => void;
    themeData: ThemeData
}) => {
    return (
        <Select<typeof languages[0]>
            placeholder={`Select Language`}
            options={languages.map((language) => (
                {
                    label: language.label,
                    value: language.value,
                    key: language.value,
                    id: language.id,
                    name: language.name,
                    initCode: language.initCode,
                }
            ))}
            styles={customStyles(themeData)}
            defaultValue={languages[0] as any}
            name="language"
            onChange={(selectedOption) => onSelectChange(selectedOption)}
        />
    );
};

export default LanguagesDropdown;