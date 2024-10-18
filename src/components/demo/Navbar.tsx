
import { IoMenu } from "react-icons/io5";
import { Button } from '@/components/ui/button';
import { LuCalculator } from 'react-icons/lu';
import { Link } from "react-router-dom";
export const Navbar = () => {
    return (
        <nav className="flex border-b-4 border-black bg-white items-center justify-between py-7 px-10">
            <div className="flex items-center space-x-4">
                <LuCalculator className='w-8 h-8' />
                <span className="text-xl font-bold">Calc Web</span>
            </div>
            <div className="hidden md:flex text-lg font-bold space-x-10 mr-10">
                <Link to="/" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                    Home
                </Link>
                <Link to="/basic-calc" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                    Basic Calculator
                </Link>
                <Link to="/bmi-calc" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                    BMI Calculator
                </Link>
                <Link to="/income-calc" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                    Income Calculator
                </Link>
                <Link to="/faq" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                    FAQ
                </Link>
            </div>
            <div className="md:hidden">
                <Button variant="neutral" size="icon">
                    <IoMenu className="h-6 w-6" />
                </Button>
            </div>
        </nav>
    )
}
