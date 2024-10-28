import { languages } from "@/data/languages";
import { redirect } from "next/navigation";
import React from "react";
import "./page.css";
import Image from "next/image";
import { FaCode } from "react-icons/fa";
import LanguagesDropdown from "@/components/LanguageDropDown";
import { themes } from "@/data/themes";
import Link from "next/link";
import { GITHUB_URL } from "@/data/constants";
import { PhotonHighlight } from "@/data/photon_highlights";
import { LandingPageComponent } from "@/components/landing-page";

const page = () => {
  return <LandingPageComponent />;
};

export default page;
