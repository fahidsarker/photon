import React, { useState } from "react";

import Editor from "@monaco-editor/react";
import { LanguageInterface } from "@/models/language";

const CodeEditorWindow = ({ onChange, language, code, theme, height, width, fontSize }: {
    onChange: (key: string, value: string) => void;
    language: LanguageInterface;
    code: string;
    theme: string;
    height: string;
    width: string;
    fontSize: number;
}) => {
    const [value, setValue] = useState(code || "");

    const handleEditorChange = (value: string | undefined) => {
        if (value === undefined) return;
        setValue(value);
        onChange("code", value);
    };

    return (
        <div className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl">
            <Editor
                height={height}
                width={width}
                language={language.value}
                value={value}
                options={{
                    fontSize: 24,
                }}
                theme={theme}
                defaultValue={language.initCode ?? ''}
                onChange={handleEditorChange}
            />
        </div>
    );
};
export default CodeEditorWindow;