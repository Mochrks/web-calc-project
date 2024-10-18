
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

                <section className="mt-16 text-center">
                    <h3 className="text-3xl font-bold text-gray-800 mb-4">Calculate your problem</h3>
                    <div className="grid md:grid-cols-3 gap-8 mt-8">
                        <div>
                            <h4 className="text-xl font-semibold text-gray-700 mb-2">Accurate Calculations</h4>
                            <p className="text-gray-600">Our tools use the latest formulas and standards to ensure precise results.</p>
                        </div>
                        <div>
                            <h4 className="text-xl font-semibold text-gray-700 mb-2">User-Friendly Interface</h4>
                            <p className="text-gray-600">Intuitive design makes it easy for anyone to use our calculators effectively.</p>
                        </div>
                        <div>
                            <h4 className="text-xl font-semibold text-gray-700 mb-2">Personalized Insights</h4>
                            <p className="text-gray-600">Get tailored recommendations based on your unique health and financial data.</p>
                        </div>
                    </div>
                </section>
            </main>


        </div>
    )
}