import { useState } from 'react'
import { Button } from '../ui/button'
import { Card } from '../ui/card'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Banknote, Table, CalendarDays, ArrowRight } from "lucide-react"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import { LoanResult } from '@/types'

const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        maximumFractionDigits: 0
    }).format(val)
}

export const LoanCalc = () => {
    const [amount, setAmount] = useState<number>(100000000)
    const [interest, setInterest] = useState<number>(5)
    const [years, setYears] = useState<number>(5)
    const [result, setResult] = useState<LoanResult | null>(null)

    const calculateLoan = () => {
        const principal = amount
        const monthlyInterest = interest / 100 / 12
        const numberOfPayments = years * 12

        const x = Math.pow(1 + monthlyInterest, numberOfPayments)
        const monthly = (principal * x * monthlyInterest) / (x - 1)

        if (Number.isFinite(monthly)) {
            const total = monthly * numberOfPayments
            const totalInterest = total - principal

            const amortization = []
            let remaining = principal
            for (let i = 1; i <= Math.min(numberOfPayments, 60); i++) {
                const interestPayment = remaining * monthlyInterest
                const principalPayment = monthly - interestPayment
                remaining -= principalPayment
                amortization.push({
                    month: i,
                    payment: monthly,
                    interest: interestPayment,
                    principal: principalPayment,
                    remaining: Math.max(0, remaining)
                })
            }

            setResult({
                monthlyPayment: monthly,
                totalPayment: total,
                totalInterest: totalInterest,
                amortization
            })
        }
    }

    const chartData = result ? [
        { name: 'Principal', value: amount, color: '#a388ee' },
        { name: 'Interest', value: result.totalInterest, color: '#ff6b6b' }
    ] : []

    return (
        <div className="container min-h-screen py-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-12 xl:col-span-4 space-y-6">
                    <Card className="bg-orange-300 border-black border-4 shadow-light p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <Banknote className="w-10 h-10" />
                            <h1 className="text-4xl font-black uppercase italic tracking-tighter">LoanMaster</h1>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label className="font-black uppercase text-xs">Loan Amount (IDR)</Label>
                                <Input
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(Number(e.target.value))}
                                    className="border-2 border-black font-bold h-12"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="font-black uppercase text-xs">Interest Rate (%)</Label>
                                <Input
                                    type="number"
                                    step="0.1"
                                    value={interest}
                                    onChange={(e) => setInterest(Number(e.target.value))}
                                    className="border-2 border-black font-bold h-12"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="font-black uppercase text-xs">Loan Term (Years)</Label>
                                <Input
                                    type="number"
                                    value={years}
                                    onChange={(e) => setYears(Number(e.target.value))}
                                    className="border-2 border-black font-bold h-12"
                                />
                            </div>

                            <Button
                                onClick={calculateLoan}
                                className="w-full bg-white text-black h-14 border-4 border-black shadow-light hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all font-black uppercase text-xl"
                            >
                                Calculate Loan
                            </Button>
                        </div>
                    </Card>

                    {result && (
                        <Card className="bg-white border-black border-4 shadow-light p-6">
                            <h3 className="font-black uppercase text-center mb-4">Payment Breakdown</h3>
                            <div className="h-[200px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={chartData}
                                            innerRadius={60}
                                            outerRadius={80}
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
                            <div className="flex justify-center gap-4 mt-2">
                                {chartData.map(d => (
                                    <div key={d.name} className="flex items-center gap-2">
                                        <div className="w-3 h-3 border-2 border-black" style={{ backgroundColor: d.color }}></div>
                                        <span className="text-xs font-black uppercase">{d.name}</span>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    )}
                </div>

                <div className="lg:col-span-12 xl:col-span-8 space-y-6">
                    {result ? (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Card className="bg-mainAccent text-white border-black border-4 shadow-light p-6">
                                    <p className="font-black uppercase text-xs opacity-70 mb-1">Monthly Payment</p>
                                    <p className="text-4xl font-black">{formatCurrency(result.monthlyPayment)}</p>
                                </Card>
                                <Card className="bg-white border-black border-4 shadow-light p-6">
                                    <p className="font-black uppercase text-xs opacity-50 mb-1">Total Interest</p>
                                    <p className="text-4xl font-black text-red-500">{formatCurrency(result.totalInterest)}</p>
                                </Card>
                            </div>

                            <Card className="bg-white border-black border-4 shadow-light overflow-hidden">
                                <div className="p-4 bg-black text-white flex items-center justify-between">
                                    <h3 className="font-black uppercase flex items-center gap-2 italic">
                                        <Table className="w-5 h-5" /> Amortization Schedule (First 5 Years)
                                    </h3>
                                    <span className="text-[10px] font-bold">ACCURATE-PRO V.1</span>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead className="bg-gray-100 uppercase text-[10px] font-black">
                                            <tr>
                                                <th className="p-3 border-b-2 border-black">Mo.</th>
                                                <th className="p-3 border-b-2 border-black">Principal</th>
                                                <th className="p-3 border-b-2 border-black">Interest</th>
                                                <th className="p-3 border-b-2 border-black">Remaining</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {result.amortization.map((row) => (
                                                <tr key={row.month} className="font-bold text-sm border-b border-black/10 hover:bg-main/10 transition-colors">
                                                    <td className="p-3 font-black">{row.month}</td>
                                                    <td className="p-3 text-green-600">{formatCurrency(row.principal)}</td>
                                                    <td className="p-3 text-red-400">{formatCurrency(row.interest)}</td>
                                                    <td className="p-3 opacity-60">{formatCurrency(row.remaining)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </Card>
                        </>
                    ) : (
                        <div className="h-full min-h-[400px] border-4 border-black border-dashed flex flex-col items-center justify-center rounded-base bg-white p-10 text-center">
                            <CalendarDays className="w-20 h-20 opacity-10 mb-4" />
                            <p className="font-black uppercase opacity-20 text-3xl italic max-w-md">Calculate your mortgage or loan repayments with full schedule.</p>
                            <ArrowRight className="w-10 h-10 opacity-10 mt-6 animate-bounce" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
