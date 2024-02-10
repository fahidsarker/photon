import IDE from '@/components/IDE'
import { languages } from '@/data/languages'
import { themes } from '@/data/themes'
import { getCookie } from 'cookies-next'
import { redirect } from 'next/dist/server/api-utils'
import { notFound } from 'next/navigation'
import React from 'react'
import { cookies } from 'next/headers';
import { decompressCodeFromUrl } from '@/helpers/compresser'
import { Metadata, ResolvingMetadata } from 'next'

export const dynamicParams = false

interface Props { params: { lang: string }, searchParams: { code?: string } }

export async function generateMetadata(
    { params, searchParams }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const languageID = params.lang
    const language = languages.find((lang) => lang.value === languageID)
    if (language === undefined) {
        notFound()
    }

    return {
        title: `${language.label} IDE`,
        description: `Online ${language.label} compiler and interpreter. Code, compile, and run code in ${language.label} language online.`,
        keywords: [`${language.label} online compiler`, `${language.label} online interpreter`, `${language.label} online IDE`],
    }
}

const page = async ({ params, searchParams }: Props) => {

    const languageID = params.lang
    const language = languages.find((lang) => lang.value === languageID)
    if (language === undefined) {
        notFound()
    }

    let savedTheme = themes[0]
    const savedThemeValue = getCookie("theme_value", { cookies })
    if (savedThemeValue !== undefined) {
        savedTheme = themes.find((theme) => theme.value === savedThemeValue) || themes[0]
    }

    let initCode: string | undefined = undefined;
    try {
        if (searchParams.code !== undefined) {
            initCode = await decompressCodeFromUrl(searchParams.code)
        }
    } catch (error) {
        console.error(error)
        initCode = ''
    }

    if (initCode === undefined) {
        initCode = getCookie(`code_${languageID}`, { cookies })
    }

    const fontSizeStr = getCookie("font_size", { cookies })
    const fontSize = fontSizeStr === undefined ? undefined : parseInt(fontSizeStr)


    return (
        <IDE language={language} themeBaseStart={savedTheme} initCode={initCode} initFontSize={fontSize} />
    )
}

export async function generateStaticParams() {
    return languages.map((lang) => ({ lang: lang.value }))
}

export default page