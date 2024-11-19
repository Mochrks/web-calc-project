
import { Navbar } from '@/components/demo/Navbar'
import { Footer } from '@/components/demo/Footer'
import { IncomeCalc } from '@/components/demo/IncomeCalc'

export const Income = () => {
    return (
        <>
            <header >
                <Navbar />
            </header>
            <main className='w-full'>
                <IncomeCalc />
            </main>
            <Footer />
        </>
    )
}
