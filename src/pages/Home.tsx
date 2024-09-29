import React from 'react'
import { Footer } from '@/components/demo/Footer'
import { Navbar } from '@/components/demo/Navbar'
import { BasicCalc } from '@/components/demo/BasicCalc'


export const Home = () => {
    return (
        <>
            <header className=''>
                <Navbar />
            </header>
            <main className='w-full'>
                <BasicCalc />
            </main>
            <Footer />
        </>
    )
}
