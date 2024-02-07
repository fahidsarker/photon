"use client";
import React, { useEffect, useLayoutEffect, useState } from "react";
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
import { compressCodeForUrl } from "@/helpers/compresser";
import { FaShare, FaDownload, FaSave, FaCopy, } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";

const Landing = () => {
  const [customInput, setCustomInput] = useState("");
  const [outputDetails, setOutputDetails] = useState<OutputDetailsInt | null>(null);
  const [processing, setProcessing] = useState<boolean>(false);
  const [currentTheme, setCurrentTheme] = useState<ThemeData | null>(null);
  const [language, setLanguage] = useState<LanguageInterface | null>(null);
  const [code, setCode] = useState<string | null>(null);
  // const [windowWidth, setWindowWidth] = useState<number | null>(null);
  const [view, setView] = useState<"desktop" | "mobile">("desktop");

  const enterPress = useKeyPress("Enter");
  const ctrlPress = useKeyPress("Control");

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

  // only run once to define the default theme
  useEffect(() => {
    defineTheme(getStorageTheme() ?? defaultTheme).then((data) => {
      setCurrentTheme(data);
    }
    );


    setLanguage(getStorageLanguage() ?? languages[0]);
    setCode(getStorageCode(language?.value ?? languages[0].value) ?? languages[0].initCode ?? "");

  }, []);

  useEffect(() => {
    if (enterPress && ctrlPress) {
      handleCompile();
    }
  }, [ctrlPress, enterPress]);
  const onChange = (action: string, data: string) => {
    if (language == null) {
      return;
    }
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

    if (code === null || language === null || processing) {
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
    if (sl.id === language?.id) {
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

  if (currentTheme == null || language == null) {
    // still loading the theme
    return <div className="flex items-center justify-center w-svw h-svh">Hang on...</div>;
  }


  function copyShareURLTOClipboard() {
    if (!code) {
      return;
    }
    const compressedCode = compressCodeForUrl(code);

    const currentURL = window.location.href;
    const url = new URL(currentURL);
  }

  // if (view === "mobile") {
  //   return <NotForMobile />
  // }

  return (
    <div id="ide" style={{
      backgroundColor: currentTheme.colors['editor.background'],
      color: currentTheme.colors['editor.foreground'],
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
            <LanguagesDropdown themeData={currentTheme} onSelectChange={onSelectChange} />
            <ThemeDropdown themeData={currentTheme} handleThemeChange={handleThemeChange} theme={currentTheme} />
          </div>

          <div className="flex flex-row items-center justify-center h-full ml-3">
            <button className="btn flex items-center gap-2 mx-2" >
              <FaShare /> Share
            </button>
            <button className="btn flex items-center gap-2 mx-2" >
              <FaCopy /> Copy
            </button>
            <button className="btn flex items-center gap-2 mx-2" >
              <FaSave /> Save
            </button>
            <button className="btn flex items-center gap-2 mx-2" >
              <FaDownload /> .js
            </button>
          </div>
        </div>

        <Link href={'https://github.com/fahidsarker/photon'} target="_blank" className="ml-auto mr-4">
          <Image src='/logo/github.png' alt="Logo" width={128} height={128} className="w-9 h-9  bg-white rounded-md  cursor-pointer" />
        </Link>

      </div>
      <div className="flex flex-row space-x-4 items-start px-4 py-4">
        <div className="flex flex-col w-full h-full justify-start items-end">
          <CodeEditorWindow
            height={view === "desktop" ? "calc(100svh - 80px)" : "calc(100svh - 150px)"}
            width={view === 'desktop' ? '100%' : '100%'}
            key={language.id}
            code={code ?? language.initCode ?? ""}
            onChange={onChange}
            language={language ?? languages[0]}
            theme={currentTheme.value}
          />
        </div>

        {
          view === "desktop" &&
          <div className="flex flex-shrink-0 gap-4 w-0 md:w-[200px] lg:w-[350px] flex-col ">
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
    </div>
  );
};
export default Landing;



const NotForMobile = () => {
  return (
    <div id="not-for-mobile" className="p-4 flex flex-col gap-4 items-center justify-center w-svw h-svh">
      <Image src='/logo/code-logo.png' alt="Logo" width={128} height={128} className="w-24 h-24 cursor-pointer" />
      <h1 className="text-lg text-center">Photon is not yet available for Mobile View. Please use the Desktop view while we work on it 😬</h1>
    </div>
  )
}
