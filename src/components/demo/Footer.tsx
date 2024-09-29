import React from 'react'
import { IoLogoBitbucket } from 'react-icons/io';
import { Button } from '../ui/button';
import { FaGithub } from 'react-icons/fa';
import { PiYoutubeLogo } from 'react-icons/pi';

export const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-12 px-10">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                    {/* logo company */}
                    <div className="flex space-x-5 mb-4 md:mb-0">
                        <Button variant="neutral" size="icon">
                            <IoLogoBitbucket className="h-8 w-8" />
                        </Button>
                        <Button variant="neutral" size="icon">
                            <FaGithub className="h-6 w-6" />
                        </Button>

                    </div>
                    <div className="flex space-x-6">
                        <a href="#" className="text-white hover:text-gray-200 transition-colors duration-200">
                            {/* <Icons.facebook className="h-6 w-6" /> */}
                            <span className="sr-only">Facebook</span>
                        </a>
                        <a href="#" className="text-white hover:text-gray-200 transition-colors duration-200">
                            {/* <Icons.twitter className="h-6 w-6" /> */}
                            <span className="sr-only">Twitter</span>
                        </a>
                        <a href="#" className="text-white hover:text-gray-200 transition-colors duration-200">
                            {/* <Icons.instagram className="h-6 w-6" /> */}
                            <span className="sr-only">Instagram</span>
                        </a>
                        <a href="#" className="text-white hover:text-gray-200 transition-colors duration-200">
                            {/* <Icons.linkedin className="h-6 w-6" /> */}
                            <span className="sr-only">LinkedIn</span>
                        </a>
                        <a href="#" className="text-white hover:text-gray-200 transition-colors duration-200">
                            {/* <Icons.youtube className="h-6 w-6" /> */}
                            <span className="sr-only">YouTube</span>
                        </a>
                    </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Company</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                                    Careers
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                                    Press
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Products</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                                    Features
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                                    Pricing
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                                    Integrations
                                </a>
                            </li>
                        </ul>
                    </div>
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
