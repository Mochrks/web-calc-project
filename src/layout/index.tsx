
import { Navbar } from '@/components/demo/Navbar'
import { Footer } from '@/components/demo/Footer'
import { LayoutProps } from '@/types'


export const Layout = ({ children }: LayoutProps) => {
    return (
        <>
            <header>
                <Navbar />
            </header>
            <main className='w-full'>
                {children}
            </main>
            <Footer />
        </>
    )
}