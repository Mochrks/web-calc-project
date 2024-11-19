import { useState, useEffect } from 'react'
import { Button } from '../ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { LuCalculator } from "react-icons/lu"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export const BMICalc = () => {
    const [height, setHeight] = useState<number | ''>('')
    const [weight, setWeight] = useState<number | ''>('')
    const [bmi, setBMI] = useState<number | null>(null)
    const [category, setCategory] = useState<string>('')

    const calculateBMI = () => {
        if (height && weight) {
            const heightInMeters = height / 100
            const bmiValue = weight / (heightInMeters * heightInMeters)
            setBMI(parseFloat(bmiValue.toFixed(1)))
        }
    }

    useEffect(() => {
        if (bmi !== null) {
            if (bmi < 18.5) setCategory('Underweight')
            else if (bmi >= 18.5 && bmi < 25) setCategory('Normal weight')
            else if (bmi >= 25 && bmi < 30) setCategory('Overweight')
            else setCategory('Obese')
        }
    }, [bmi])

    const bmiCategories = [
        { category: 'Underweight', range: 'Less than 18.5' },
        { category: 'Normal weight', range: '18.5 - 24.9' },
        { category: 'Overweight', range: '25 - 29.9' },
        { category: 'Obese', range: '30 or greater' },
    ]

    const chartData = [
        { bmi: 15, label: 'Severely Underweight' },
        { bmi: 18.5, label: 'Underweight' },
        { bmi: 25, label: 'Normal' },
        { bmi: 30, label: 'Overweight' },
        { bmi: 35, label: 'Obese' },
        { bmi: 40, label: 'Severely Obese' },
    ]

    return (
        <div className="container relative min-h-screen flex-col items-center justify-center md:grid md:max-w-none md:grid-cols-2 lg:px-0">
            <div className="hidden h-full bg-muted text-zinc-800 md:flex flex-col justify-around space-y-10 text-lg font-medium bg-secondary">
                <div className='px-10 space-y-9'>
                    <div className='flex space-x-2'>
                        <LuCalculator className='w-8 h-8' />
                        <h6>BMI Calculator</h6>
                    </div>
                    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-7xl">
                        BMI Calculator
                    </h1>

                    <div className='flex flex-col gap-5'>
                        <Card className="bg-white text-black p-5 rounded-3xl">
                            <CardHeader>
                                <CardTitle className="text-2xl font-bold">BMI Categories</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Category</TableHead>
                                            <TableHead>BMI Range</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {bmiCategories.map((item, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{item.category}</TableCell>
                                                <TableCell>{item.range}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>

                        <Card className="bg-white text-black p-4 rounded-3xl">
                            <CardHeader>
                                <CardTitle className="text-2xl font-bold">BMI Chart</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[300px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={chartData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="bmi" />
                                            <YAxis />
                                            <Tooltip />
                                            <Line type="monotone" dataKey="bmi" stroke="#8884d8" />
                                            {bmi && (
                                                <Line
                                                    type="monotone"
                                                    data={[{ bmi: bmi, label: 'Your BMI' }]}
                                                    dataKey="bmi"
                                                    stroke="#82ca9d"
                                                    strokeWidth={3}
                                                    dot={{ r: 8 }}
                                                />
                                            )}
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    <blockquote className="px-10">
                        <p className="text-lg">
                            &ldquo;Calculate your Body Mass Index (BMI) to get an idea of whether you're underweight, overweight, or at a healthy weight for your height.&rdquo;
                        </p>
                    </blockquote>
                </div>

            </div>

            <div className="pt-20 md:pt-1 lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <Card className="bg-white text-black p-4 rounded-3xl">
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold">BMI Calculator</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="height">Height (cm)</Label>
                                    <Input
                                        id="height"
                                        type="number"
                                        placeholder="Enter height in cm"
                                        value={height}
                                        onChange={(e) => setHeight(parseFloat(e.target.value) || '')}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="weight">Weight (kg)</Label>
                                    <Input
                                        id="weight"
                                        type="number"
                                        placeholder="Enter weight in kg"
                                        value={weight}
                                        onChange={(e) => setWeight(parseFloat(e.target.value) || '')}
                                    />
                                </div>
                                <Button className="w-full" onClick={calculateBMI}>Calculate BMI</Button>
                                {bmi !== null && (
                                    <div className="mt-4 text-center">
                                        <p className="text-2xl font-bold">Your BMI: {bmi}</p>
                                        <p className="text-xl">Category: {category}</p>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    <div className='flex flex-col md:hidden py-20'>
                        <h1 className="scroll-m-20 text-xl font-extrabold tracking-tight py-5 ">
                            Table BMI
                        </h1>

                        <div className='flex flex-col gap-5'>
                            <Card className="bg-white text-black p-5 rounded-3xl">
                                <CardHeader>
                                    <CardTitle className="text-2xl font-bold">BMI Categories</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Category</TableHead>
                                                <TableHead>BMI Range</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {bmiCategories.map((item, index) => (
                                                <TableRow key={index}>
                                                    <TableCell>{item.category}</TableCell>
                                                    <TableCell>{item.range}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                            <h1 className="scroll-m-20 text-xl font-extrabold tracking-tight py-5 ">
                                Chart
                            </h1>
                            <Card className="bg-white text-black p-4 rounded-3xl">
                                <CardHeader>
                                    <CardTitle className="text-2xl font-bold">BMI Chart</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-[300px] w-full">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <LineChart data={chartData}>
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="bmi" />
                                                <YAxis />
                                                <Tooltip />
                                                <Line type="monotone" dataKey="bmi" stroke="#8884d8" />
                                                {bmi && (
                                                    <Line
                                                        type="monotone"
                                                        data={[{ bmi: bmi, label: 'Your BMI' }]}
                                                        dataKey="bmi"
                                                        stroke="#82ca9d"
                                                        strokeWidth={3}
                                                        dot={{ r: 8 }}
                                                    />
                                                )}
                                            </LineChart>
                                        </ResponsiveContainer>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}