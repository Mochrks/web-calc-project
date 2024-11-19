
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LuCalculator, LuDollarSign, LuHelpCircle } from "react-icons/lu"
import { Link } from 'react-router-dom'

export const HomePage = () => {
    return (
        <div className="min-h-screen py-20 bg-gradient-to-b from-gray-100 to-gray-200">
            <main className="container mx-auto px-4 py-12">
                <section className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-800 mb-4">Take Control of Your Health , Finances , and Calculate Math</h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Use our powerful calculators to make informed decisions about your well-being and financial future.
                    </p>
                </section>

                <div className="grid md:grid-cols-3 gap-8">
                    <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <CardHeader>
                            <CardTitle className="flex items-center text-2xl font-bold text-gray-800">
                                <LuCalculator className="w-6 h-6 mr-2 text-blue-500" />
                                BMI Calculator
                            </CardTitle>
                            <CardDescription>Understand your body mass index</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600 mb-4">
                                Calculate your BMI and get insights into your health status. Our easy-to-use tool provides instant results and personalized recommendations.
                            </p>
                            <Button asChild className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                                <Link to="/bmi-calc">Calculate BMI</Link>
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <CardHeader>
                            <CardTitle className="flex items-center text-2xl font-bold text-gray-800">
                                <LuDollarSign className="w-6 h-6 mr-2 text-green-500" />
                                Income Calculator
                            </CardTitle>
                            <CardDescription>Manage your finances effectively</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600 mb-4">
                                Track your income, expenses, and savings with our comprehensive calculator. Visualize your financial health and receive tailored advice.
                            </p>
                            <Button asChild className="w-full bg-green-500 hover:bg-green-600 text-white">
                                <Link to="/income-calc">Analyze Income</Link>
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <CardHeader>
                            <CardTitle className="flex items-center text-2xl font-bold text-gray-800">
                                <LuHelpCircle className="w-6 h-6 mr-2 text-purple-500" />
                                Basic Calculator
                            </CardTitle>
                            <CardDescription>Perform simple calculations quickly</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600 mb-4">
                                Easily perform basic calculations such as addition, subtraction, multiplication, and division. This tool is perfect for quick and everyday math tasks.
                            </p>
                            <Button asChild className="w-full bg-purple-500 hover:bg-purple-600 text-white">
                                <Link to="/basic-calc">Calculate</Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
                <section className="mt-16 text-center  py-16 rounded-lg">
                    <div className="container mx-auto px-4">
                        <h3 className="text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
                            Why Choose Our Calculator Tools?
                        </h3>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
                            Our advanced calculation tools are designed to provide precision, ease of use, and valuable insights for your daily needs.
                        </p>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                                <div className="mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                    </svg>
                                </div>
                                <h4 className="text-2xl font-bold text-gray-800 mb-4">Precision Guaranteed</h4>
                                <p className="text-gray-600">
                                    Utilizing cutting-edge algorithms and the latest scientific formulas to ensure the most accurate calculations possible.
                                </p>
                            </div>
                            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                                <div className="mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                    </svg>
                                </div>
                                <h4 className="text-2xl font-bold text-gray-800 mb-4">Seamless Experience</h4>
                                <p className="text-gray-600">
                                    Intuitive, clean interface designed for users of all technical backgrounds, making complex calculations simple.
                                </p>
                            </div>
                            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                                <div className="mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                    </svg>
                                </div>
                                <h4 className="text-2xl font-bold text-gray-800 mb-4">Smart Insights</h4>
                                <p className="text-gray-600">
                                    Beyond calculations, receive intelligent recommendations tailored to your specific data and needs.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>


        </div>
    )
}