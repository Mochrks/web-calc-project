
import { Button } from '../ui/button';
import { FaGithub } from 'react-icons/fa';
import { LuCalculator } from 'react-icons/lu';

export const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-12 px-10">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                    {/* logo company */}
                    <div className="flex space-x-5 mb-4 md:mb-0">
                        <Button variant="neutral" size="icon">
                            <LuCalculator className='w-8 h-8' />
                        </Button>
                        <Button variant="neutral" size="icon">
                            <FaGithub className="h-6 w-6" />
                        </Button>
                    </div>

                </div>
                <div className="grid grid-cols-2 md:grid-cols-2 gap-8 mb-8">


                    <div>
                        <h3 className="text-lg font-semibold mb-4">Resources</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                                    Documentation
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                                    Tutorials
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                                    Blog
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Legal</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                                    Terms of Service
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                                    Cookie Policy
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="text-center">
                    <div className="mt-4 text-center text-lg text-white">
                        © {currentYear} Created by <a href="https://www.github.com/mochrks" target="_blank" rel="noopener noreferrer" className="hover:underline">@mochrks</a>. All rights reserved.
                    </div>
                </div>
            </div>
        </footer>
    )
}
