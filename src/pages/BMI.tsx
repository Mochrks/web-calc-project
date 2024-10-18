
import { Navbar } from '@/components/demo/Navbar'
import { Footer } from '@/components/demo/Footer'
import { BMICalc } from '@/components/demo/BmiCalc'


export const BMI = () => {
    return (
        <>
            <header className=''>
                <Navbar />
            </header>
            <main className='w-full'>
                <BMICalc />
            </main>
            <Footer />
        </>
    )
}
