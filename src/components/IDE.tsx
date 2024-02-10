"use client";
import { LanguageInterface } from '@/models/language';
import { ThemeData, ThemeSelectorInterface } from '@/models/theme';
import React, { useEffect, useState } from 'react'
import OutputWindow, { OutputDetailsInt } from './OutputWindow';
import useKeyPress from '@/hooks/useKeyPress';
import { defineTheme } from '@/lib/defineTheme';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LanguagesDropdown from './LanguageDropDown';
import { FaShare, FaDownload, FaSave, FaCopy, } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import Image from 'next/image';
import CodeEditorWindow from './CodeEditorWindow';
import Link from 'next/link';
import ThemeDropdown from './ThemeDropdown';
import CustomInput from './CustomInput';
import { classnames } from '@/utils/general';
import OutputDetails from './OutputDetails';
import { CompileResponse } from '@/app/api/route';
import { setCookie } from 'cookies-next';
import { compressCodeForUrl } from '@/helpers/compresser';
import { GITHUB_URL } from '@/data/constants';
const IDE = ({ themeBaseStart, language, initCode, initFontSize }: { language: LanguageInterface, themeBaseStart: ThemeSelectorInterface, initCode: string | undefined, initFontSize?: number }) => {
    const [customInput, setCustomInput] = useState("");
    const [outputDetails, setOutputDetails] = useState<OutputDetailsInt | null>(null);
    const [processing, setProcessing] = useState<boolean>(false);
    const [themeBase, setThemeBase] = useState<ThemeSelectorInterface>(themeBaseStart);
    const [themeData, setThemeData] = useState<ThemeData | null>(null);
    const [code, setCode] = useState<string | null>(initCode ?? language.initCode ?? '');
    const [view, setView] = useState<"desktop" | "mobile">("desktop");
    const [fontSize, setFontSize] = useState<number>(initFontSize ?? 14);

    const enterPress = useKeyPress("Enter");
    const ctrlPress = useKeyPress("Control");
    const cmdPress = useKeyPress("Meta");
    const negativePress = useKeyPress("-");
    const positivePress = useKeyPress("=");


    useEffect(() => {
        defineTheme(themeBase).then((data) => {
            setThemeData(data);
        }
        );

    }, [themeBase]);

    useEffect(() => {
        function onResize() {
            console.log(window.innerWidth);
            setView(prevView => {
                if (window.innerWidth < 768) {
                    if (prevView === "desktop") {
                        return "mobile";
                    }
                } else if (prevView === "mobile") {
                    return "desktop";
                }
                return prevView;
            });
        }

        window.addEventListener('resize', onResize);
        onResize();
        return () => window.removeEventListener('resize', onResize);
    }, [])


    useEffect(() => {
        if (enterPress && (ctrlPress || cmdPress)) {
            handleCompile();
        }
    }, [ctrlPress, enterPress, cmdPress]);

    useEffect(() => {
        if (negativePress && (ctrlPress || cmdPress)) {
            setCookie("font_size", (fontSize - 1).toString());
            setFontSize(prev => prev - 1);
        }
    }, [negativePress, ctrlPress, cmdPress]);

    useEffect(() => {
        if (positivePress && (ctrlPress || cmdPress)) {
            setCookie("font_size", (fontSize + 1).toString());
            setFontSize(prev => prev + 1);
        }
    }, [positivePress, ctrlPress, cmdPress]);



    const onChange = (action: string, data: string) => {
        if (language == null) {
            return;
        }
        switch (action) {
            case "code": {
                setCode(data);
                if (data.length % 10 === 0) {
                    saveCurrentCode();
                }
                break;
            }
            default: {
                console.warn("case not handled!", action, data);
            }
        }
    };

    const saveCurrentCode = () => {
        if (code === null || language === null) {
            return;
        }
        setCookie(`code_${language.value}`, code);
    }

    const handleCompile = async () => {

        if (code === null || language === null || processing) {
            return;
        }

        // setStorageCode(language.value, code);
        saveCurrentCode();
        setProcessing(true);
        try {

            const res = await fetch('/api', {
                method: 'POST',
                body: JSON.stringify({ code, language, customInput }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const resJson = await res.json() as CompileResponse;
            if (resJson.success) {
                showSuccessToast(resJson.message);
                setOutputDetails(resJson.data);
            } else {
                showErrorToast(resJson.message, 2000);

            }

        } catch (error) {
        }

        setProcessing(false);

    };

    const onSelectChange = (sl: LanguageInterface) => {
        if (sl.id === language?.id) {
            return;
        }

        window.open(`/${sl.value}`, '_blank');
    };

    function handleThemeChange(th: ThemeSelectorInterface) {
        setThemeBase(th);
        // saveThemeData(th);
        setCookie("theme_value", th.value);
    }


    const showSuccessToast = (msg: string | undefined) => {
        toast.success(msg || `Compiled Successfully!`, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };


    const showErrorToast = (msg: string | undefined, timer: number | undefined) => {
        toast.error(msg || `Something went wrong! Please try again.`, {
            position: "top-right",
            autoClose: timer ? timer : 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    const downloadCodeInFile = () => {
        if (code === null || language === null) {
            return;
        }
        const extension = language.extension;
        // downloadFile(code, `code.${extension}`);

        const element = document.createElement("a");
        const file = new Blob([code], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = `code.${extension}`;
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
    }

    const copyCodeToClipboard = () => {
        if (code === null) {
            return;
        }
        navigator.clipboard.writeText(code).then(() => {
            showSuccessToast("Code Copied to Clipboard!");
        }, () => {
            showErrorToast("Failed to copy code to clipboard!", 1000);
        });
    }

    const copyCodeShareURLToClipboard = async () => {
        if (code === null) {
            return;
        }

        const compressedCode = await compressCodeForUrl(code);
        const currentBaseURL = window.location.origin;
        const shareURL = `${currentBaseURL}/${language.value}/?code=${compressedCode}`;
        if (shareURL.length > 2000) {
            showErrorToast("Code is too long to share via URL", 1000);
            return;
        }
        navigator.clipboard.writeText(shareURL).then(() => {
            showSuccessToast("Share URL Copied to Clipboard!");
        }, () => {
            showErrorToast("Failed to copy share URL to clipboard!", 1000);
        });

    }


    return (
        <div id="ide" style={{
            backgroundColor: themeBase.background,
            color: themeBase.forground,
        }} className="h-svh w-svw overflow-auto">
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />


            <div className="ml-4 flex flex-row  mt-0 items-center justify-center pt-2">
                <IoMenu className="text-2xl font-bold mr-2 lg:hidden cursor-pointer" />
                <Image src='/logo/code-logo.png' alt="Logo" width={128} height={128} className="w-8 h-8 cursor-pointer" />
                <div className="hidden lg:flex  gap-2 lg:flex-row items-center justify-center">
                    <div className="flex flex-row ml-4 gap-4">
                        <LanguagesDropdown language={language} themeData={themeBase} onSelectChange={onSelectChange} />
                        <ThemeDropdown handleThemeChange={handleThemeChange} theme={themeBase} />
                    </div>

                    <div className="flex flex-row items-center justify-center h-full ml-3">
                        <button className="btn flex items-center gap-2 mx-2" onClick={copyCodeShareURLToClipboard}>
                            <FaShare /> Share
                        </button>
                        <button className="btn flex items-center gap-2 mx-2" onClick={copyCodeToClipboard}>
                            <FaCopy /> Copy
                        </button>
                        <button className="btn flex items-center gap-2 mx-2" onClick={saveCurrentCode}>
                            <FaSave /> Save
                        </button>
                        <button className="btn flex items-center gap-2 mx-2" onClick={downloadCodeInFile} >
                            <FaDownload /> .{language.extension}
                        </button>
                    </div>
                </div>

                <Link href={GITHUB_URL} target="_blank" className="ml-auto mr-4">
                    <Image src='/logo/github.png' alt="Logo" width={128} height={128} className="w-9 h-9  bg-white rounded-md  cursor-pointer" />
                </Link>

            </div>
            <div className="flex flex-row space-x-4 items-start px-4 py-4">
                <div className="flex flex-col w-full h-full justify-start items-end">
                    {
                        themeData == null ? <div style={{
                            height: view === "desktop" ? "calc(100svh - 80px)" : "calc(100svh - 150px)",
                            width: view === 'desktop' ? '100%' : '100%'
                        }} className='flex flex-row items-center justify-center animate-pulse'>
                            <Image src='/logo/code-logo.png' alt="Logo" width={128} height={128} />
                        </div>
                            : <CodeEditorWindow
                                height={view === "desktop" ? "calc(100svh - 80px)" : "calc(100svh - 150px)"}
                                width={view === 'desktop' ? '100%' : '100%'}
                                key={language.id}
                                fontSize={fontSize}
                                code={code ?? language.initCode ?? ""}
                                onChange={onChange}
                                language={language}
                                theme={themeData.value}
                            />
                    }
                </div>

                {
                    view === "desktop" &&
                    <div className="flex flex-shrink-0 gap-4 w-0 md:w-[200px] lg:w-[350px] flex-col ">
                        <OutputWindow theme={themeBase} outputDetails={outputDetails} />
                        <div className="flex flex-col items-end">
                            <CustomInput
                                themeData={themeBase}
                                customInput={customInput}
                                setCustomInput={setCustomInput}
                            />
                            <button
                                onClick={handleCompile}
                                disabled={!code}
                                className={classnames(
                                    "btn mt-4",
                                    !code ? "opacity-50" : ""
                                )}
                            >
                                {processing ? "Processing..." : "Compile and Execute"}
                            </button>
                        </div>
                        {outputDetails && <OutputDetails outputDetails={outputDetails} />}
                    </div>
                }


            </div>
            <div className={`${view === "desktop" ? 'hidden' : ''} flex flex-row items-center justify-center`}>
                <button className="btn  mt-4">
                    {processing ? "Processing..." : "Compile and Execute"}
                </button>
            </div>
        </div >
    );
}

export default IDE