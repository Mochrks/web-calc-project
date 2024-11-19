import { useState } from "react";
import { IoMenu, IoClose } from "react-icons/io5";
import { Button } from '@/components/ui/button';
import { LuCalculator } from 'react-icons/lu';
import { Link } from "react-router-dom";

export const Navbar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <>
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
                    <Button variant="neutral" size="icon" onClick={toggleSidebar}>
                        <IoMenu className="h-6 w-6" />
                    </Button>
                </div>
            </nav>

            {/* Sidebar Mobile */}
            <div
                className={`
                    fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
                    ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}
                    md:hidden z-50
                `}
            >
                <div className="flex justify-between items-center p-4 border-b">
                    <span className="text-xl font-bold">Menu</span>
                    <Button variant="neutral" size="icon" onClick={toggleSidebar}>
                        <IoClose className="h-6 w-6" />
                    </Button>
                </div>
                <div className="flex flex-col p-4 space-y-4">
                    <Link
                        to="/"
                        className="text-gray-600 hover:text-gray-900"
                        onClick={toggleSidebar}
                    >
                        Home
                    </Link>
                    <Link
                        to="/basic-calc"
                        className="text-gray-600 hover:text-gray-900"
                        onClick={toggleSidebar}
                    >
                        Basic Calculator
                    </Link>
                    <Link
                        to="/bmi-calc"
                        className="text-gray-600 hover:text-gray-900"
                        onClick={toggleSidebar}
                    >
                        BMI Calculator
                    </Link>
                    <Link
                        to="/income-calc"
                        className="text-gray-600 hover:text-gray-900"
                        onClick={toggleSidebar}
                    >
                        Income Calculator
                    </Link>
                    <Link
                        to="/faq"
                        className="text-gray-600 hover:text-gray-900"
                        onClick={toggleSidebar}
                    >
                        FAQ
                    </Link>
                </div>
            </div>

            {/* Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
                    onClick={toggleSidebar}
                ></div>
            )}
        </>
    );
};