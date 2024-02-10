import { languages } from '@/data/languages'
import { redirect } from 'next/navigation'
import React from 'react'
import './page.css'
import Image from 'next/image'
import { FaCode } from "react-icons/fa";
import LanguagesDropdown from '@/components/LanguageDropDown'
import { themes } from '@/data/themes'
import Link from 'next/link'
import { GITHUB_URL } from '@/data/constants'
import { PhotonHighlight } from '@/data/photon_highlights'


const page = () => {
  return <main className='bg-gradient-to-tr from-[#120024] to-[#010101] h-svh w-svw overflow-x-hidden overflow-y-scroll'>
    <nav className='bg-[#010101] flex flex-row w-svw font-poppins items-center py-4 px-8 text-sm'>
      <Link href={'/'} className='flex cursor-pointer'>
        <Image className='w-8 h-8' src={'/logo/code-logo.png'} alt='logo' width={100} height={100} />
        <h1 className='font-thin text-xl ml-2'>Photon</h1>
      </Link>
      <ul className='ml-auto mr-2 text-white text-opacity-70 flex gap-2'>
        {/* <li>
          Features
        </li>
        <li>
          About
        </li> */}
        <Link href={GITHUB_URL} className='hover:text-white transition-all'>
          Github
        </Link >
      </ul>
      <StartCodingBtn />
    </nav>

    <section className='mt-[60px] flex flex-col items-center lg:justify-between justify-center font-poppins gap-4 mx-8 lg:flex-row'>
      <section className='max-w-[600px]'>
        <h1 className='font-thin font-roboto-mono text-4xl'>
          Online Code Editor, <br /> remimagined
        </h1>
        <p className='font-poppins text-opacity-65 text-white font-thin text-sm'>
          Photon is a modern code editor that runs on the browser. It is designed to be fast, reliable and easy to use. It is built with modern web technologies and is open source.
        </p>
        <div className='flex flex-col sm:flex-row gap-4 mt-2'>
          <LanguagesDropdown themeData={themes[10]} language={languages[0]} />
          <StartCodingBtn />
        </div>
        <p className='mt-2 text-sm'>
          Photon is Completely Open-sourced on Github. You can check it out <Link href={GITHUB_URL} className='font-bold underline'>here</Link>
        </p>
      </section>
      <video src='/demos/features.mp4' autoPlay={true} loop muted className='hidden lg:block demo-video rounded-lg mt-8' />
      <Image src={'/demos/photon-features.gif'} alt='features' width={889} height={720} className='block lg:hidden demo-video rounded-lg mt-8' />

    </section>
    <section className='mt-[60px] lg:mt-[100px] flex flex-wrap gap-4 rounded-md bg-black bg-opacity-20 m-4  items-center justify-center'>
      {
        PhotonHighlight.all().map((highlight, index) => {
          return <div key={index} className='h-[320px] w-[320px] p-8 flex-col flex gap-4 text-white'>
            <Image src={highlight.logo} alt={highlight.title} width={56} height={56} className='w-12 h-12' />
            <h1 className='font-poppins text-3xl'>{highlight.title}</h1>
            <p className='font-roboto-mono text-sm text-justify'>{highlight.description}</p>

          </div>

        })
      }
    </section>
    <div className='flex items-center justify-center'>
      <StartCodingBtn />
    </div>

    <section className='flex items-center justify-center mt-8 py-4 bg-black font-poppins text-sm'>
      CopyRight © 2024 Fahid Sarker
    </section>

  </main>
}

export default page


const StartCodingBtn = () => {
  return (
    <Link href={`/${languages[0].value}`} className='btn-back px-4 py-1 rounded-md flex items-center gap-2 w-fit'>
      <FaCode />
      Start Coding
    </Link>
  )
}
