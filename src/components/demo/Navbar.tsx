import React from 'react'
import { IoLogoBitbucket } from "react-icons/io";
import { IoMenu } from "react-icons/io5";
import { Button } from '@/components/ui/button';
export const Navbar = () => {
    return (
        <nav className="flex border-b-4 border-black bg-white items-center justify-between py-7 px-10">
            <div className="flex items-center space-x-4">
                <IoLogoBitbucket className="h-8 w-8" />
                <span className="text-xl font-bold">Calc Web</span>
            </div>
            <div className="hidden md:flex text-lg font-bold space-x-10 mr-10">
                <a href="#" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                    Home
                </a>
                <a href="#" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                    Basic Calculator
                </a> <a href="#" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                    BMI Calculator
                </a>
                <a href="#" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                    Income Calculator
                </a>
                <a href="#" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                    FAQ
                </a>
            </div>
            <div className="md:hidden">
                <Button variant="neutral" size="icon">
                    <IoMenu className="h-6 w-6" />
                </Button>
            </div>
        </nav>
    )
}
