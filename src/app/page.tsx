"use client";
import React, { useEffect, useState } from "react";
import CodeEditorWindow from "@/components/CodeEditorWindow";
import { classnames } from "@/utils/general";
import { languages } from "@/data/languages";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { defineTheme } from "@/lib/defineTheme";
import useKeyPress from "@/hooks/useKeyPress";
import OutputWindow, { OutputDetailsInt } from "@/components/OutputWindow";
import CustomInput from "@/components/CustomInput";
import OutputDetails from "@/components/OutputDetails";
import ThemeDropdown from "@/components/ThemeDropdown";
import LanguagesDropdown from "@/components/LanguageDropDown";
import { ThemeData, ThemeSelectorInterface } from "@/models/theme";
import { LanguageInterface } from "@/models/language";
import Image from "next/image";
import { CompileResponse } from "@/app/api/route";
import { defaultTheme } from "@/data/default_theme";
import { getStorageCode, getStorageLanguage, getStorageTheme, setStorageCode, setStorageLanguage, setStoragetStorageheme } from "@/storage";
import Link from "next/link";


const Landing = () => {
  const [customInput, setCustomInput] = useState("");
  const [outputDetails, setOutputDetails] = useState<OutputDetailsInt | null>(null);
  const [processing, setProcessing] = useState<boolean>(false);
  const [currentTheme, setCurrentTheme] = useState<ThemeData | null>(null);
  const [language, setLanguage] = useState(getStorageLanguage() ?? languages[0]);
  const [code, setCode] = useState<string | null>(getStorageCode(language?.value ?? languages[0].value));

  const enterPress = useKeyPress("Enter");
  const ctrlPress = useKeyPress("Control");


  // only run once to define the default theme
  useEffect(() => {
    defineTheme(getStorageTheme() ?? defaultTheme).then((data) => {
      setCurrentTheme(data);
    }
    );
  }, []);

  useEffect(() => {
    if (enterPress && ctrlPress) {
      handleCompile();
    }
  }, [ctrlPress, enterPress]);
  const onChange = (action: string, data: string) => {
    switch (action) {
      case "code": {
        setCode(data);
        if (data.length % 10 === 0) {
          setStorageCode(language.value, data);
        }
        break;
      }
      default: {
        console.warn("case not handled!", action, data);
      }
    }
  };


  const handleCompile = async () => {

    if (code === null) {
      return;
    }

    setStorageCode(language.value, code);
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
    if (sl.id === language.id) {
      return;
    }

    setCode(sl.initCode ?? "");
    setLanguage(sl);
    setStorageLanguage(sl);
  };

  function handleThemeChange(th: ThemeSelectorInterface) {
    defineTheme(th).then((data) => {
      if (data == null) {
        return;
      }
      setCurrentTheme(data);
      setStoragetStorageheme(data);
    });
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

  if (currentTheme == null) {
    // still loading the theme
    return <div className="flex items-center justify-center w-svw h-svh">Hang on...</div>;
  }

  return (
    <div style={{
      background: currentTheme.colors['editor.background'],
      color: currentTheme.colors['editor.foreground'],
    }} className="h-svh">
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



      <div className="ml-4 flex flex-row mt-0 items-center justify-start">
        <Image src='/logo/code-logo.png' alt="Logo" width={128} height={128} className="w-8 h-8 cursor-pointer" />
        <div className="px-4 py-2">
          <LanguagesDropdown themeData={currentTheme} onSelectChange={onSelectChange} />
        </div>
        <div className="px-4 py-2">
          <ThemeDropdown themeData={currentTheme} handleThemeChange={handleThemeChange} theme={currentTheme} />
        </div>

        <Link href={'https://github.com/fahidsarker/photon'} target="_blank" className="ml-auto mr-4">
          <Image src='/logo/github.png' alt="Logo" width={128} height={128} className="w-8 h-8  bg-white rounded-md cursor-pointer" />
        </Link>

      </div>
      <div className="flex flex-row space-x-4 items-start px-4 py-4">
        <div className="flex flex-col w-full h-full justify-start items-end">
          <CodeEditorWindow
            key={language.id}
            code={code ?? language.initCode ?? ""}
            onChange={onChange}
            language={language ?? languages[0]}
            theme={currentTheme.value}
          />
        </div>

        <div className="flex flex-shrink-0 gap-4 w-[30%] flex-col ">
          <OutputWindow themeData={currentTheme} outputDetails={outputDetails} />
          <div className="flex flex-col items-end">
            <CustomInput
              themeData={currentTheme}
              customInput={customInput}
              setCustomInput={setCustomInput}
            />
            <button
              onClick={handleCompile}
              disabled={!code}
              className={classnames(
                "mt-4 border-2 border-black z-10 rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-4 py-2 hover:shadow transition duration-200 flex-shrink-0",
                !code ? "opacity-50" : ""
              )}
            >
              {processing ? "Processing..." : "Compile and Execute"}
            </button>
          </div>
          {outputDetails && <OutputDetails outputDetails={outputDetails} />}
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};
export default Landing;