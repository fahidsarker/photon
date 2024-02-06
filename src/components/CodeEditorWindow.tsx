import React, { useState } from "react";

import Editor from "@monaco-editor/react";
import { LanguageInterface } from "@/models/language";

const CodeEditorWindow = ({ onChange, language, code, theme }: {
    onChange: (key: string, value: string) => void;
    language: LanguageInterface;
    code: string;
    theme: string;
}) => {
    console.log("CodeEditorWindow -> language", language);
    const [value, setValue] = useState(code || "");

    const handleEditorChange = (value: string | undefined) => {
        if (value === undefined) return;
        setValue(value);
        onChange("code", value);
    };

    return (
        <div className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl">
            <Editor
                height="89svh"
                width={`100%`}
                language={language.value}
                value={value}
                theme={theme}
                defaultValue={language.initCode ?? ''}
                onChange={handleEditorChange}
            />
        </div>
    );
};
export default CodeEditorWindow;