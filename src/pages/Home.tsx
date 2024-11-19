
import { Navbar } from '@/components/demo/Navbar'
import { Footer } from '@/components/demo/Footer'
import { HomePage } from '@/components/demo/HomePage'

export const Home = () => {
    return (
        <>
            <header>
                <Navbar />
            </header>
            <main className='w-full'>
                <HomePage />
            </main>
            <Footer />
        </>
    )
}
