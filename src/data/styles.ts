import { ThemeData } from "@/models/theme";
import { StylesConfig } from "react-select";

export const customStyles = (themeData: ThemeData): StylesConfig<any> => {
    const themeBackground = themeData.colors['editor.background'];
    const themeForeground = themeData.colors['editor.foreground'];
    return {
        control: (base, _) => ({
            ...base,
            width: "100%",
            maxWidth: "14rem",
            minWidth: "12rem",
            borderRadius: "5px",
            color: themeForeground,
            fontSize: "0.8rem",
            lineHeight: "1.75rem",
            backgroundColor: themeBackground,
            cursor: "pointer",
            border: "2px solid #000000",
            boxShadow: "5px 5px 0px 0px rgba(0,0,0);",
            ":hover": {
                border: `2px solid #000000`,
                boxShadow: "none",
            },
        }),

        valueContainer: (base, _) => ({
            ...base,
            color: themeForeground,

        }),

        singleValue: (base, _) => ({
            ...base,
            color: themeForeground,
        }),

        option: (styles, _) => {
            return {
                ...styles,
                color: themeForeground,
                fontSize: "0.8rem",
                lineHeight: "1.75rem",
                width: "100%",
                background: themeBackground,
                ":hover": {
                    backgroundColor: "rgb(243 244 246)",
                    color: "#000",
                    cursor: "pointer",
                },
            };
        },
        menu: (styles, _) => {
            return {
                ...styles,
                backgroundColor: themeBackground,
                maxWidth: "14rem",
                border: "2px solid #000000",
                borderRadius: "5px",
                color: "#fff",
                boxShadow: "5px 5px 0px 0px rgba(0,0,0);",
            };
        },

        placeholder: (defaultStyles, _) => {
            return {
                ...defaultStyles,
                color: themeForeground,
                fontSize: "0.8rem",
                lineHeight: "1.75rem",
            };
        },
    };
};