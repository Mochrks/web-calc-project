
import { Navbar } from '@/components/demo/Navbar'
import { Footer } from '@/components/demo/Footer'
import { BasicCalc } from '@/components/demo/BasicCalc'

export const Basic = () => {
    return (
        <>
            <header >
                <Navbar />
            </header>
            <main className='w-full'>
                <BasicCalc />
            </main>
            <Footer />
        </>
    )
}
