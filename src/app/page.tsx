import { languages } from '@/data/languages'
import { redirect } from 'next/navigation'
import React from 'react'

const page = () => {
  redirect(`/${languages[0].value}`)
}

export default page