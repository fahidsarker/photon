import React from "react";
import { classnames } from "@/utils/general";
import { ThemeData, ThemeSelectorInterface } from "@/models/theme";

const CustomInput = ({ themeData, customInput, setCustomInput }: {
    customInput: string;
    setCustomInput: (value: string) => void;
    themeData: ThemeSelectorInterface;
}) => {
    return (
        <>
            {" "}
            <textarea
                rows={5}
                style={{
                    backgroundColor: themeData.background,
                    color: themeData.forground,
                }
                }
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                placeholder={`Custom input`}
                className={classnames(
                    "focus:outline-none w-full border-2 border-black z-10 resize-none rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-4 py-2 hover:shadow transition duration-200 bg-transparentresize-none mt-2"
                )}
            ></textarea>
        </>
    );
};

export default CustomInput;