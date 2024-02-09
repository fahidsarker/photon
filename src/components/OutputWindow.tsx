import { ThemeData, ThemeSelectorInterface } from "@/models/theme";
import { classnames } from "@/utils/general";
import React from "react";

export interface OutputDetailsInt {
    status: {
        id: number;
        description: string;
    };
    compile_output: string;
    stdout: string;
    stderr: string;
    memory: string;
    time: string;
};

const OutputWindow = ({ theme, outputDetails }: {
    outputDetails: OutputDetailsInt | null,
    theme: ThemeSelectorInterface
}) => {
    const getOutput = () => {
        let statusId = outputDetails?.status?.id;

        if (statusId === 6) {
            return (
                <pre className="px-2 py-1 font-normal text-xs text-red-500">
                    {atob(outputDetails?.compile_output ?? '')}
                </pre>
            );
        } else if (statusId === 3) {
            return (
                <pre className="px-2 py-1 font-normal text-xs text-green-500">
                    {atob(outputDetails?.stdout ?? '') !== null
                        ? `${atob(outputDetails?.stdout ?? '')}`
                        : null}
                </pre>
            );
        } else if (statusId === 5) {
            return (
                <pre className="px-2 py-1 font-normal text-xs text-red-500">
                    {`Time Limit Exceeded`}
                </pre>
            );
        } else {
            return (
                <pre className="px-2 py-1 font-normal text-xs text-red-500">
                    {atob(outputDetails?.stderr ?? '')}
                </pre>
            );
        }
    };
    return (
        <>
            <div style={{
                backgroundColor: theme.background,
                color: theme.forground,
            }} className={classnames(
                "focus:outline-none h-[40vh] w-full border-2 border-black z-10 rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-4 py-2 hover:shadow transition duration-200 bg-transparentresize-none "
            )}>
                {outputDetails ? <>{getOutput()}</> : <div className="m-4 font-roboto-mono text-opacity-20 text-sm">Execute code to see output...</div>}
            </div>
        </>
    );
};

export default OutputWindow;