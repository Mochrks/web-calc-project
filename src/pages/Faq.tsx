
import { Navbar } from '@/components/demo/Navbar'
import { Footer } from '@/components/demo/Footer'
import { FAQPage } from '@/components/demo/FAQPage'


export const Faq = () => {
    return (
        <>
            <header className=''>
                <Navbar />
            </header>
            <main className='w-full'>
                <FAQPage />
            </main>
            <Footer />
        </>
    )
}
