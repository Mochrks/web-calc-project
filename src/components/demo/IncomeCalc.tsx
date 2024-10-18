import React, { useState, } from 'react'
import { Button } from '../ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'
import { LuCalculator } from "react-icons/lu"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import { format } from 'date-fns'

type Expense = {
    name: string;
    amount: number;
}

type IncomeEntry = {
    date: string;
    income: number;
    expenses: Expense[];
    savings: number;
    notes: string;
}

const formatIDR = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(value);
}

const parseIDR = (value: string) => {
    return Number(value.replace(/[^0-9-]+/g, ""));
}

export const IncomeCalc = () => {
    const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'))
    const [income, setIncome] = useState<number>(0)
    const [expenses, setExpenses] = useState<Expense[]>([
        { name: '', amount: 0 },
        { name: '', amount: 0 },
        { name: '', amount: 0 },
        { name: '', amount: 0 },
    ])
    const [notes, setNotes] = useState('')
    const [entries, setEntries] = useState<IncomeEntry[]>([])
    const [recommendation, setRecommendation] = useState('')

    const calculateSavings = () => {
        const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0)
        return income - totalExpenses
    }

    const handleExpenseChange = (index: number, field: 'name' | 'amount', value: string) => {
        const updatedExpenses = [...expenses]
        if (field === 'name') {
            updatedExpenses[index].name = value
        } else {
            updatedExpenses[index].amount = parseIDR(value)
        }
        setExpenses(updatedExpenses)
    }

    const handleSubmit = () => {
        const savings = calculateSavings()
        const newEntry: IncomeEntry = {
            date,
            income,
            expenses,
            savings,
            notes
        }
        setEntries([...entries, newEntry])

        // Calculate savings percentage
        const savingsPercentage = (savings / income) * 100
        if (savingsPercentage < 30) {
            setRecommendation("It's recommended to try saving at least 30% of your income. Consider reducing expenses or finding ways to increase your income.")
        } else {
            setRecommendation("Great job! You're saving more than 30% of your income.")
        }

        // Reset form
        setDate(format(new Date(), 'yyyy-MM-dd'))
        setIncome(0)
        setExpenses([
            { name: '', amount: 0 },
            { name: '', amount: 0 },
            { name: '', amount: 0 },
            { name: '', amount: 0 },
        ])
        setNotes('')
    }

    const chartData = [
        { name: 'Income', value: income },
        ...expenses.filter(expense => expense.amount > 0).map(expense => ({ name: expense.name || 'Expense', value: expense.amount })),
        { name: 'Savings', value: calculateSavings() },
    ]

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D']

    const handleNumericInput = (value: string, setter: React.Dispatch<React.SetStateAction<number>>) => {
        const numericValue = value.replace(/[^0-9]/g, '')
        setter(parseIDR(numericValue))
    }

    return (
        <div className="container relative min-h-screen flex-col items-center justify-center md:grid md:max-w-none md:grid-cols-2 lg:px-0">
            <div className="hidden h-full bg-muted text-zinc-800 md:flex flex-col justify-around space-y-3 text-lg font-medium bg-secondary">
                <div className='px-10 space-y-5'>
                    <div className='flex space-x-2'>
                        <LuCalculator className='w-8 h-8' />
                        <h6>Income Calculator</h6>
                    </div>
                    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-7xl">
                        Income Calculator
                    </h1>
                    <div className='py-2'>
                        <Card className="bg-white text-black p-4 rounded-3xl">
                            <CardHeader>
                                <CardTitle className="text-2xl font-bold">Income Breakdown</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[300px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={chartData}
                                                cx="50%"
                                                cy="50%"
                                                labelLine={false}
                                                outerRadius={80}
                                                fill="#8884d8"
                                                dataKey="value"
                                            >
                                                {chartData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <Tooltip formatter={(value) => formatIDR(Number(value))} />
                                            <Legend />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className='flex'>
                        {recommendation && (
                            <Card className="bg-white text-black p-4 rounded-3xl">
                                <CardHeader>
                                    <CardTitle className="text-2xl font-bold">Recommendation</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p>{recommendation}</p>
                                </CardContent>
                            </Card>
                        )}

                        <Card className="bg-white text-black p-4 rounded-3xl ml-10">
                            <CardHeader>
                                <CardTitle className="text-2xl font-bold">Saved Entries</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {entries.map((entry, index) => (
                                        <div key={index} className="border-b pb-2">
                                            <p><strong>Date:</strong> {entry.date}</p>
                                            <p><strong>Income:</strong> {formatIDR(entry.income)}</p>
                                            <p><strong>Expenses:</strong></p>
                                            <ul>
                                                {entry.expenses.filter(expense => expense.amount > 0).map((expense, i) => (
                                                    <li key={i}>{expense.name || `Expense ${i + 1}`}: {formatIDR(expense.amount)}</li>
                                                ))}
                                            </ul>
                                            <p><strong>Savings:</strong> {formatIDR(entry.savings)}</p>
                                            <p><strong>Notes:</strong> {entry.notes}</p>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    <blockquote className="px-2 pt-2">
                        <p className="text-lg">
                            &ldquo;Track your income, expenses, and savings to make informed financial decisions and reach your financial goals.&rdquo;
                        </p>
                    </blockquote>
                </div>

            </div>

            <div className="pt-20 md:pt-1 lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <Card className="bg-white text-black p-4 rounded-3xl">
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold">Income Calculator</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="date">Date</Label>
                                    <Input
                                        id="date"
                                        type="date"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="income">Income</Label>
                                    <Input
                                        id="income"
                                        type="text"
                                        placeholder="Enter your income"
                                        value={income ? formatIDR(income) : ''}
                                        onChange={(e) => handleNumericInput(e.target.value, setIncome)}
                                    />
                                </div>
                                {expenses.map((expense, index) => (
                                    <div key={index} className="space-y-2">
                                        <Label htmlFor={`expense-${index}`}>{`Expense ${index + 1}`}</Label>
                                        <div className="flex space-x-2">
                                            <Input
                                                id={`expense-name-${index}`}
                                                placeholder="Expense name"
                                                value={expense.name}
                                                onChange={(e) => handleExpenseChange(index, 'name', e.target.value)}
                                            />
                                            <Input
                                                id={`expense-amount-${index}`}
                                                type="text"
                                                placeholder="Amount"
                                                value={expense.amount ? formatIDR(expense.amount) : ''}
                                                onChange={(e) => handleNumericInput(e.target.value, (value) => handleExpenseChange(index, 'amount', value.toString()))}
                                            />
                                        </div>
                                    </div>
                                ))}
                                <div className="space-y-2">
                                    <Label htmlFor="notes">Notes</Label>
                                    <Textarea
                                        id="notes"
                                        placeholder="Add any additional notes"
                                        value={notes}
                                        onChange={(e) => setNotes(e.target.value)}
                                    />
                                </div>
                                <Button className="w-full" onClick={handleSubmit}>Calculate and Save</Button>
                            </div>
                        </CardContent>
                    </Card>

                </div>
            </div>
        </div>
    )
}