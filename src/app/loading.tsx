import React from 'react'
import Image from 'next/image'
const loading = () => {
    return (
        <main className='h-svh w-svw flex flex-col items-center justify-center'>
            <Image src='/logo/code-logo.png' alt="Logo" width={128} height={128} className='animate-pulse' />
        </main>
    )
}

export default loading