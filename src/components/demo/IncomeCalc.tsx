import React, { useState, useEffect } from 'react'
import { Button } from '../ui/button'
import { Card } from '../ui/card'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'
import { LuCalculator, LuTrendingUp, LuWallet, LuPieChart, LuHistory, LuPlus, LuTrash2, LuInfo } from "react-icons/lu"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts'
import { format } from 'date-fns'
import { Expense, IncomeEntry, Investment, Debt } from '@/types'
import { cn } from '@/lib/utils'

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

type TabId = 'budget' | 'invest' | 'debt' | 'history';

const TabButton = ({ id, icon: Icon, label, activeTab, onClick }: { id: TabId, icon: React.ElementType, label: string, activeTab: string, onClick: (id: TabId) => void }) => (
    <button
        onClick={() => onClick(id)}
        className={cn(
            "flex items-center gap-2 px-4 py-2 border-2 border-black rounded-base transition-all font-heading",
            activeTab === id
                ? "bg-main translate-x-boxShadowX translate-y-boxShadowY shadow-none"
                : "bg-white shadow-light hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none"
        )}
    >
        <Icon className="w-4 h-4" />
        <span className="hidden sm:inline">{label}</span>
    </button>
)

export const IncomeCalc = () => {
    const [activeTab, setActiveTab] = useState<'budget' | 'invest' | 'debt' | 'history'>('budget')
    const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'))
    const [income, setIncome] = useState<number>(0)
    const [expenses, setExpenses] = useState<Expense[]>([
        { name: 'Rent/Mortgage', amount: 0 },
        { name: 'Utilities', amount: 0 },
        { name: 'Groceries', amount: 0 },
        { name: 'Transport', amount: 0 },
    ])
    const [investments, setInvestments] = useState<Investment[]>([
        { name: 'Stocks', amount: 0, expectedReturn: 8 },
        { name: 'Savings', amount: 0, expectedReturn: 4 },
    ])
    const [debts, setDebts] = useState<Debt[]>([
        { name: 'Credit Card', amount: 0, interestRate: 15 },
    ])
    const [notes, setNotes] = useState('')
    const [entries, setEntries] = useState<IncomeEntry[]>([])
    const [recommendation, setRecommendation] = useState('')

    // Load from localStorage on mount
    useEffect(() => {
        const savedEntries = localStorage.getItem('financial_entries')
        if (savedEntries) {
            try {
                setEntries(JSON.parse(savedEntries))
            } catch (e) {
                console.error("Failed to parse saved entries", e)
            }
        }
    }, [])

    // Save to localStorage whenever entries change
    useEffect(() => {
        localStorage.setItem('financial_entries', JSON.stringify(entries))
    }, [entries])

    const calculateTotalExpenses = () => expenses.reduce((sum, e) => sum + e.amount, 0)
    const calculateTotalInvestments = () => investments.reduce((sum, i) => sum + i.amount, 0)
    const calculateTotalDebts = () => debts.reduce((sum, d) => sum + d.amount, 0)
    const calculateSavings = () => income - calculateTotalExpenses() - calculateTotalInvestments()

    const handleItemChange = (
        index: number,
        field: string,
        value: string | number,
        type: 'expense' | 'invest' | 'debt'
    ) => {
        if (type === 'expense') {
            const updated = [...expenses]
            updated[index] = { ...updated[index], [field]: field === 'amount' ? parseIDR(value.toString()) : value }
            setExpenses(updated)
        } else if (type === 'invest') {
            const updated = [...investments]
            updated[index] = { ...updated[index], [field]: field === 'name' ? value : Number(value) }
            setInvestments(updated)
        } else if (type === 'debt') {
            const updated = [...debts]
            updated[index] = { ...updated[index], [field]: field === 'name' ? value : Number(value) }
            setDebts(updated)
        }
    }

    const addItem = (type: 'expense' | 'invest' | 'debt') => {
        if (type === 'expense') setExpenses([...expenses, { name: '', amount: 0 }])
        if (type === 'invest') setInvestments([...investments, { name: '', amount: 0, expectedReturn: 5 }])
        if (type === 'debt') setDebts([...debts, { name: '', amount: 0, interestRate: 10 }])
    }

    const removeItem = (index: number, type: 'expense' | 'invest' | 'debt') => {
        if (type === 'expense') setExpenses(expenses.filter((_, i) => i !== index))
        if (type === 'invest') setInvestments(investments.filter((_, i) => i !== index))
        if (type === 'debt') setDebts(debts.filter((_, i) => i !== index))
    }

    const handleSubmit = () => {
        const savings = calculateSavings()
        const newEntry: IncomeEntry = {
            id: crypto.randomUUID(),
            date,
            income,
            expenses: expenses.filter(e => e.amount > 0),
            investments: investments.filter(i => i.amount > 0),
            debts: debts.filter(d => d.amount > 0),
            savings,
            notes
        }
        setEntries([newEntry, ...entries])

        // Calculate metrics for recommendation
        const savingsPercentage = (savings / income) * 100
        const debtRatio = (calculateTotalDebts() / income) * 100

        let rec = ""
        if (savingsPercentage < 20) rec += "Try to increase your savings rate to at least 20%. "
        if (debtRatio > 30) rec += "Your debt-to-income ratio is high (>30%). Focus on paying down high-interest debt. "
        if (calculateTotalInvestments() === 0) rec += "Consider starting a small investment for long-term growth. "

        setRecommendation(rec || "Your financial health looks solid! Keep it up.")

        // Success Reset but keep some defaults
        setIncome(0)
        setNotes('')
    }

    const deleteEntry = (id: string) => {
        setEntries(entries.filter(e => e.id !== id))
    }

    const chartData = [
        { name: 'Expenses', value: calculateTotalExpenses(), color: '#FF8042' },
        { name: 'Investments', value: calculateTotalInvestments(), color: '#00C49F' },
        { name: 'Savings', value: Math.max(0, calculateSavings()), color: '#0088FE' },
    ].filter(d => d.value > 0)

    const historyChartData = React.useMemo(() => entries.slice(0, 7).reverse().map(e => ({
        date: format(new Date(e.date), 'MM/dd'),
        income: e.income,
        savings: e.savings
    })), [entries])

    return (
        <div className="container relative min-h-screen py-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Sidebar - Stats & Charts */}
                <div className="lg:col-span-4 space-y-6">
                    <Card className="bg-main border-black border-4 shadow-light p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <LuPieChart className="w-8 h-8" />
                            <h2 className="text-2xl font-black uppercase italic">Dashboard</h2>
                        </div>
                        <div className="space-y-4">
                            <div className="bg-white border-2 border-black p-4 rounded-base">
                                <p className="text-sm font-bold opacity-70">Total Monthly Income</p>
                                <p className="text-2xl font-black">{formatIDR(income)}</p>
                            </div>
                            <div className="bg-white border-2 border-black p-4 rounded-base">
                                <p className="text-sm font-bold opacity-70">Projected Savings</p>
                                <p className="text-2xl font-black text-blue-600">{formatIDR(calculateSavings())}</p>
                            </div>
                            <div className="h-[250px] w-full mt-6 bg-white border-2 border-black rounded-base p-2">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={chartData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={40}
                                            outerRadius={70}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {chartData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} stroke="#000" strokeWidth={2} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </Card>

                    {recommendation && (
                        <Card className="bg-yellow-300 border-black border-4 shadow-light p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <LuInfo className="w-5 h-5 font-bold" />
                                <h3 className="font-black uppercase">Coach Tip</h3>
                            </div>
                            <p className="font-bold text-sm leading-tight">{recommendation}</p>
                        </Card>
                    )}

                    {historyChartData.length > 0 && (
                        <Card className="bg-white border-black border-2 shadow-light p-4">
                            <h3 className="font-black uppercase mb-4">Recent Trend</h3>
                            <div className="h-[200px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={historyChartData}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                        <XAxis dataKey="date" />
                                        <YAxis hide />
                                        <Tooltip />
                                        <Bar dataKey="savings" fill="#a388ee" stroke="#000" strokeWidth={2} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </Card>
                    )}
                </div>

                {/* Right Area - Input Tabs */}
                <div className="lg:col-span-8 space-y-6">
                    <div className="flex flex-wrap gap-4 mb-4">
                        <TabButton id="budget" icon={LuWallet} label="Budgeting" activeTab={activeTab} onClick={setActiveTab} />
                        <TabButton id="invest" icon={LuTrendingUp} label="Investments" activeTab={activeTab} onClick={setActiveTab} />
                        <TabButton id="debt" icon={LuCalculator} label="Debts" activeTab={activeTab} onClick={setActiveTab} />
                        <TabButton id="history" icon={LuHistory} label="History" activeTab={activeTab} onClick={setActiveTab} />
                    </div>

                    <Card className="bg-white border-black border-4 shadow-light p-6">
                        {activeTab === 'budget' && (
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label className="font-black uppercase text-xs">Reporting Date</Label>
                                        <Input
                                            type="date"
                                            value={date}
                                            onChange={(e) => setDate(e.target.value)}
                                            className="border-2 border-black shadow-none focus-visible:ring-0 focus-visible:border-main bg-white"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="font-black uppercase text-xs">Total Income</Label>
                                        <Input
                                            placeholder="e.g. 5.000.000"
                                            value={income ? formatIDR(income) : ''}
                                            onChange={(e) => setIncome(parseIDR(e.target.value))}
                                            className="border-2 border-black font-bold text-lg"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4 pt-4 border-t-2 border-black border-dashed">
                                    <div className="flex justify-between items-center">
                                        <h3 className="font-black uppercase flex items-center gap-2">
                                            <LuPlus className="text-red-500" /> Fixed & Misc Expenses
                                        </h3>
                                        <Button size="sm" variant="noShadow" onClick={() => addItem('expense')} className="bg-red-400">
                                            Add Expense
                                        </Button>
                                    </div>
                                    <div className="space-y-3">
                                        {expenses.map((expense, idx) => (
                                            <div key={idx} className="flex gap-2 items-center">
                                                <Input
                                                    placeholder="Category"
                                                    value={expense.name}
                                                    onChange={(e) => handleItemChange(idx, 'name', e.target.value, 'expense')}
                                                    className="flex-1 border-2 border-black"
                                                />
                                                <Input
                                                    placeholder="Amount"
                                                    value={expense.amount ? formatIDR(expense.amount) : ''}
                                                    onChange={(e) => handleItemChange(idx, 'amount', e.target.value, 'expense')}
                                                    className="w-1/3 border-2 border-black font-bold"
                                                />
                                                <Button size="icon" variant="noShadow" onClick={() => removeItem(idx, 'expense')} className="bg-white hover:bg-red-100">
                                                    <LuTrash2 className="w-4 h-4 text-red-500" />
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="pt-6">
                                    <Label className="font-black uppercase text-xs">Analysis Notes</Label>
                                    <Textarea
                                        placeholder="Reflection on this month's spending..."
                                        value={notes}
                                        onChange={(e) => setNotes(e.target.value)}
                                        className="border-2 border-black min-h-[100px]"
                                    />
                                </div>

                                <Button
                                    onClick={handleSubmit}
                                    className="w-full bg-mainAccent text-white h-14 text-xl font-black uppercase italic shadow-light border-black border-2"
                                >
                                    Log Monthly Record
                                </Button>
                            </div>
                        )}

                        {activeTab === 'invest' && (
                            <div className="space-y-6">
                                <h3 className="font-black text-2xl uppercase">Long-term Growth</h3>
                                <div className="space-y-4">
                                    {investments.map((invest, idx) => (
                                        <div key={idx} className="grid grid-cols-12 gap-2 items-end bg-green-50 p-4 border-2 border-black rounded-base">
                                            <div className="col-span-12 md:col-span-5 space-y-1">
                                                <Label className="text-[10px] uppercase font-bold">Asset Name</Label>
                                                <Input
                                                    value={invest.name}
                                                    onChange={(e) => handleItemChange(idx, 'name', e.target.value, 'invest')}
                                                    className="border-black border-2"
                                                />
                                            </div>
                                            <div className="col-span-6 md:col-span-4 space-y-1">
                                                <Label className="text-[10px] uppercase font-bold">Monthly Allocation</Label>
                                                <Input
                                                    value={invest.amount ? formatIDR(invest.amount) : ''}
                                                    onChange={(e) => handleItemChange(idx, 'amount', e.target.value, 'invest')}
                                                    className="border-black border-2 font-bold"
                                                />
                                            </div>
                                            <div className="col-span-4 md:col-span-2 space-y-1">
                                                <Label className="text-[10px] uppercase font-bold">APR %</Label>
                                                <Input
                                                    type="number"
                                                    value={invest.expectedReturn}
                                                    onChange={(e) => handleItemChange(idx, 'expectedReturn', e.target.value, 'invest')}
                                                    className="border-black border-2"
                                                />
                                            </div>
                                            <div className="col-span-2 md:col-span-1">
                                                <Button size="icon" variant="noShadow" onClick={() => removeItem(idx, 'invest')} className="bg-transparent border-0">
                                                    <LuTrash2 className="w-4 h-4 text-red-500" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                    <Button onClick={() => addItem('invest')} className="w-full bg-green-200 text-black border-2 border-black">
                                        Add Investment Asset
                                    </Button>
                                </div>
                                <div className="mt-4 p-4 bg-white border-4 border-black border-dashed rounded-base">
                                    <p className="font-bold flex items-center gap-2">
                                        <LuTrendingUp className="text-green-600" />
                                        Expected Annual Growth: {formatIDR(investments.reduce((acc, i) => acc + (i.amount * 12 * (i.expectedReturn / 100)), 0))}
                                    </p>
                                </div>
                            </div>
                        )}

                        {activeTab === 'debt' && (
                            <div className="space-y-6">
                                <h3 className="font-black text-2xl uppercase italic text-red-600">Debt Destroyer</h3>
                                <div className="space-y-4">
                                    {debts.map((debt, idx) => (
                                        <div key={idx} className="grid grid-cols-12 gap-2 items-end bg-red-50 p-4 border-2 border-black rounded-base">
                                            <div className="col-span-12 md:col-span-5 space-y-1">
                                                <Label className="text-[10px] uppercase font-bold">Debt Source</Label>
                                                <Input
                                                    value={debt.name}
                                                    onChange={(e) => handleItemChange(idx, 'name', e.target.value, 'debt')}
                                                    className="border-black border-2"
                                                />
                                            </div>
                                            <div className="col-span-6 md:col-span-4 space-y-1">
                                                <Label className="text-[10px] uppercase font-bold">Total Principal</Label>
                                                <Input
                                                    value={debt.amount ? formatIDR(debt.amount) : ''}
                                                    onChange={(e) => handleItemChange(idx, 'amount', e.target.value, 'debt')}
                                                    className="border-black border-2 font-bold"
                                                />
                                            </div>
                                            <div className="col-span-4 md:col-span-2 space-y-1">
                                                <Label className="text-[10px] uppercase font-bold">Rate %</Label>
                                                <Input
                                                    type="number"
                                                    value={debt.interestRate}
                                                    onChange={(e) => handleItemChange(idx, 'interestRate', e.target.value, 'debt')}
                                                    className="border-black border-2"
                                                />
                                            </div>
                                            <div className="col-span-2 md:col-span-1">
                                                <Button size="icon" variant="noShadow" onClick={() => removeItem(idx, 'debt')} className="bg-transparent border-0">
                                                    <LuTrash2 className="w-4 h-4 text-red-500" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                    <Button onClick={() => addItem('debt')} className="w-full bg-red-200 text-black border-2 border-black">
                                        Add Debt Entry
                                    </Button>
                                </div>
                            </div>
                        )}

                        {activeTab === 'history' && (
                            <div className="space-y-4">
                                <h3 className="font-black text-2xl uppercase">Financial Logs</h3>
                                {entries.length === 0 ? (
                                    <div className="text-center py-20 border-4 border-black border-dashed">
                                        <p className="font-bold opacity-50">No logs found. Start by adding a monthly record!</p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {entries.map((entry) => (
                                            <Card key={entry.id} className="border-2 border-black p-4 relative overflow-hidden bg-white shadow-light hover:translate-x-1">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <p className="text-xs font-black bg-black text-white px-2 py-1 inline-block rounded-sm mb-2">
                                                            {format(new Date(entry.date), 'MMMM yyyy')}
                                                        </p>
                                                        <h4 className="text-lg font-black">{formatIDR(entry.income)} <span className="text-sm font-normal opacity-50">Income</span></h4>
                                                    </div>
                                                    <Button size="icon" variant="noShadow" onClick={() => deleteEntry(entry.id)} className="bg-red-50 hover:bg-red-500 group">
                                                        <LuTrash2 className="w-4 h-4 text-red-500 group-hover:text-white" />
                                                    </Button>
                                                </div>
                                                <div className="grid grid-cols-3 gap-2 mt-4 text-center">
                                                    <div className="bg-orange-100 p-2 border-black border-2 rounded-base">
                                                        <p className="text-[10px] font-bold">Spent</p>
                                                        <p className="font-black text-sm">{formatIDR(entry.expenses.reduce((s, e) => s + e.amount, 0))}</p>
                                                    </div>
                                                    <div className="bg-green-100 p-2 border-black border-2 rounded-base">
                                                        <p className="text-[10px] font-bold">Invested</p>
                                                        <p className="font-black text-sm">{formatIDR(entry.investments.reduce((s, i) => s + i.amount, 0))}</p>
                                                    </div>
                                                    <div className="bg-blue-100 p-2 border-black border-2 rounded-base">
                                                        <p className="text-[10px] font-bold">Saved</p>
                                                        <p className="font-black text-sm text-blue-700">{formatIDR(entry.savings)}</p>
                                                    </div>
                                                </div>
                                                {entry.notes && (
                                                    <div className="mt-4 p-2 bg-gray-50 border-black border-b-2 text-sm italic font-medium">
                                                        &ldquo;{entry.notes}&rdquo;
                                                    </div>
                                                )}
                                            </Card>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </Card>
                </div>
            </div>
        </div>
    )
}
