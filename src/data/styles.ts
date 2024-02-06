import { StylesConfig } from "react-select";

export const customStyles: StylesConfig<any> = {
    control: (base, _) => ({
        ...base,
        width: "100%",
        maxWidth: "14rem",
        minWidth: "12rem",
        borderRadius: "5px",
        color: "#fff",
        fontSize: "0.8rem",
        lineHeight: "1.75rem",
        backgroundColor: "#000",
        cursor: "pointer",
        border: "2px solid #000000",
        boxShadow: "5px 5px 0px 0px rgba(0,0,0);",
        ":hover": {
            border: "2px solid #000000",
            boxShadow: "none",
        },
    }),

    valueContainer: (base, _) => ({
        ...base,
        color: "#FFFFFF",

    }),

    singleValue: (base, _) => ({
        ...base,
        color: "#FFFFFF",
    }),

    option: (styles, _) => {
        return {
            ...styles,
            color: "#fff",
            fontSize: "0.8rem",
            lineHeight: "1.75rem",
            width: "100%",
            background: "#000",
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
            backgroundColor: "#000",
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
            color: "#fff",
            fontSize: "0.8rem",
            lineHeight: "1.75rem",
        };
    },
};