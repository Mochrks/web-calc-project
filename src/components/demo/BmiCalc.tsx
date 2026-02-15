import React, { useState, useEffect } from 'react'
import { Button } from '../ui/button'
import { Card } from '../ui/card'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { LuActivity, LuInfo, LuTrash2, LuHistory, LuDumbbell, LuSoup, LuScale } from "react-icons/lu"
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts'
import { format } from 'date-fns'
import { HealthMetrics } from '@/types'
import { cn } from '@/lib/utils'

export const BMICalc = () => {
    const [height, setHeight] = useState<number>(170)
    const [weight, setWeight] = useState<number>(70)
    const [age, setAge] = useState<number>(25)
    const [gender, setGender] = useState<'male' | 'female'>('male')
    const [activity, setActivity] = useState<number>(1.2) // Sedentary
    const [metrics, setMetrics] = useState<HealthMetrics | null>(null)
    const [history, setHistory] = useState<HealthMetrics[]>([])

    useEffect(() => {
        const saved = localStorage.getItem('health_history')
        if (saved) setHistory(JSON.parse(saved))
    }, [])

    useEffect(() => {
        localStorage.setItem('health_history', JSON.stringify(history.slice(0, 15)))
    }, [history])

    const calculateMetrics = () => {
        // BMI
        const heightM = height / 100
        const bmi = weight / (heightM * heightM)

        // BMR (Mifflin-St Jeor Equation)
        let bmr = (10 * weight) + (6.25 * height) - (5 * age)
        bmr = gender === 'male' ? bmr + 5 : bmr - 161

        // TDEE
        const tdee = bmr * activity

        // Category
        let category = "Normal"
        if (bmi < 18.5) category = "Underweight"
        else if (bmi >= 25 && bmi < 30) category = "Overweight"
        else if (bmi >= 30) category = "Obese"

        const newMetric: HealthMetrics = {
            id: crypto.randomUUID(),
            date: new Date().toISOString(),
            height,
            weight,
            age,
            gender,
            bmi: parseFloat(bmi.toFixed(1)),
            bmr: Math.round(bmr),
            tdee: Math.round(tdee),
            category
        }

        setMetrics(newMetric)
        setHistory([newMetric, ...history])
    }

    const deleteHistory = (id: string) => {
        setHistory(history.filter(h => h.id !== id))
    }

    const idealWeightLow = 18.5 * (height / 100) ** 2
    const idealWeightHigh = 24.9 * (height / 100) ** 2

    return (
        <div className="container min-h-screen py-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left - Input Section */}
                <div className="lg:col-span-12 xl:col-span-4 space-y-6">
                    <Card className="bg-blue-300 border-black border-4 shadow-light p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <LuActivity className="w-10 h-10 font-black" />
                            <h1 className="text-4xl font-black uppercase italic tracking-tighter">BioAnalyzer</h1>
                        </div>

                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="font-black uppercase text-xs">Height (cm)</Label>
                                    <Input
                                        type="number"
                                        value={height}
                                        onChange={(e) => setHeight(Number(e.target.value))}
                                        className="border-2 border-black font-bold h-12 text-lg"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="font-black uppercase text-xs">Weight (kg)</Label>
                                    <Input
                                        type="number"
                                        value={weight}
                                        onChange={(e) => setWeight(Number(e.target.value))}
                                        className="border-2 border-black font-bold h-12 text-lg"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="font-black uppercase text-xs">Age</Label>
                                    <Input
                                        type="number"
                                        value={age}
                                        onChange={(e) => setAge(Number(e.target.value))}
                                        className="border-2 border-black font-bold h-12 text-lg"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="font-black uppercase text-xs">Gender</Label>
                                    <div className="flex border-2 border-black rounded-base overflow-hidden h-12">
                                        <button
                                            onClick={() => setGender('male')}
                                            className={cn("flex-1 font-black uppercase text-xs transition-colors", gender === 'male' ? "bg-black text-white" : "bg-white")}
                                        >M</button>
                                        <button
                                            onClick={() => setGender('female')}
                                            className={cn("flex-1 font-black uppercase text-xs transition-colors", gender === 'female' ? "bg-black text-white" : "bg-white")}
                                        >F</button>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label className="font-black uppercase text-xs">Activity Level</Label>
                                <select
                                    value={activity}
                                    onChange={(e) => setActivity(Number(e.target.value))}
                                    className="w-full h-12 border-2 border-black rounded-base font-bold px-4"
                                >
                                    <option value={1.2}>Sedentary (No exercise)</option>
                                    <option value={1.375}>Lightly Active (1-3 days/week)</option>
                                    <option value={1.55}>Moderately Active (3-5 days/week)</option>
                                    <option value={1.725}>Very Active (6-7 days/week)</option>
                                    <option value={1.9}>Extra Active (Athlete/Physical Job)</option>
                                </select>
                            </div>

                            <Button
                                onClick={calculateMetrics}
                                className="w-full bg-white text-black h-14 border-4 border-black shadow-light hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all font-black uppercase text-xl italic"
                            >
                                Analyze Body
                            </Button>
                        </div>
                    </Card>

                    <Card className="bg-yellow-300 border-black border-4 shadow-light p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <LuInfo className="w-5 h-5" />
                            <h3 className="font-black uppercase">Ideal Range</h3>
                        </div>
                        <p className="font-bold">
                            For your height, a healthy weight is between:
                            <span className="block text-2xl font-black">{Math.round(idealWeightLow)} - {Math.round(idealWeightHigh)} KG</span>
                        </p>
                    </Card>
                </div>

                {/* Center - Dashboard */}
                <div className="lg:col-span-12 xl:col-span-8 space-y-6">
                    {metrics ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <Card className="bg-white border-black border-4 shadow-light p-6 relative overflow-hidden group">
                                <LuScale className="absolute -right-4 -bottom-4 w-24 h-24 opacity-5" />
                                <p className="font-black uppercase text-xs opacity-50 mb-1">BMI Score</p>
                                <p className="text-5xl font-black mb-2">{metrics.bmi}</p>
                                <p className={cn(
                                    "inline-block px-2 py-1 text-xs font-black uppercase rounded-sm border-2 border-black",
                                    metrics.category === "Normal" ? "bg-green-400" : "bg-red-400"
                                )}>
                                    {metrics.category}
                                </p>
                            </Card>

                            <Card className="bg-white border-black border-4 shadow-light p-6 relative overflow-hidden group">
                                <LuSoup className="absolute -right-4 -bottom-4 w-24 h-24 opacity-5" />
                                <p className="font-black uppercase text-xs opacity-50 mb-1">Basal Metabolic Rate</p>
                                <p className="text-5xl font-black mb-2">{metrics.bmr}</p>
                                <p className="text-xs font-bold uppercase">Calories/Day (Minimum)</p>
                            </Card>

                            <Card className="bg-white border-black border-4 shadow-light p-6 relative overflow-hidden group">
                                <LuDumbbell className="absolute -right-4 -bottom-4 w-24 h-24 opacity-5 text-mainAccent" />
                                <p className="font-black uppercase text-xs opacity-50 mb-1">Maint. Calories (TDEE)</p>
                                <p className="text-5xl font-black mb-2 text-mainAccent">{metrics.tdee}</p>
                                <p className="text-xs font-bold uppercase">Calories to stay same weight</p>
                            </Card>
                        </div>
                    ) : (
                        <div className="h-[200px] border-4 border-black border-dashed flex items-center justify-center rounded-base bg-white">
                            <p className="font-black uppercase opacity-20 text-2xl italic">Input Data to start analysis</p>
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Comparison Table */}
                        <Card className="bg-white border-black border-4 shadow-light p-6">
                            <h3 className="font-black uppercase text-xl mb-4 italic">Daily Intake Scenarios</h3>
                            <div className="space-y-3">
                                {[
                                    { label: 'Extreme Loss', cal: metrics ? metrics.tdee - 1000 : '...', color: 'bg-red-200' },
                                    { label: 'Normal Loss', cal: metrics ? metrics.tdee - 500 : '...', color: 'bg-orange-200' },
                                    { label: 'Maintenance', cal: metrics ? metrics.tdee : '...', color: 'bg-green-200' },
                                    { label: 'Normal Gain', cal: metrics ? metrics.tdee + 500 : '...', color: 'bg-blue-200' },
                                ].map((row, i) => (
                                    <div key={i} className={cn("flex justify-between items-center p-3 border-2 border-black rounded-base font-bold", row.color)}>
                                        <span className="uppercase text-xs">{row.label}</span>
                                        <span className="font-black">{row.cal} CAL</span>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        {/* Chart */}
                        <Card className="bg-white border-black border-4 shadow-light p-6">
                            <h3 className="font-black uppercase text-xl mb-4 italic">Weight History</h3>
                            <div className="h-[180px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={[...history].reverse()}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                        <XAxis dataKey="date" hide />
                                        <YAxis domain={['auto', 'auto']} />
                                        <Tooltip />
                                        <Area type="step" dataKey="weight" stroke="#000" fill="#a388ee" strokeWidth={3} fillOpacity={0.4} />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </Card>
                    </div>

                    {/* History */}
                    <Card className="bg-white border-black border-4 shadow-light p-4 overflow-hidden">
                        <div className="flex items-center gap-2 mb-4">
                            <LuHistory className="w-5 h-5" />
                            <h3 className="font-black uppercase italic">Historical Logs</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-black text-white text-xs uppercase">
                                    <tr>
                                        <th className="p-2 border-2 border-black">Date</th>
                                        <th className="p-2 border-2 border-black">Weight</th>
                                        <th className="p-2 border-2 border-black">BMI</th>
                                        <th className="p-2 border-2 border-black">TDEE</th>
                                        <th className="p-2 border-2 border-black">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {history.map((h) => (
                                        <tr key={h.id} className="font-bold text-sm bg-gray-50 hover:bg-white border-b-2 border-black">
                                            <td className="p-2 border-2 border-black">{format(new Date(h.date), 'MM/dd/yy')}</td>
                                            <td className="p-2 border-2 border-black">{h.weight}kg</td>
                                            <td className="p-2 border-2 border-black">{h.bmi}</td>
                                            <td className="p-2 border-2 border-black">{h.tdee}</td>
                                            <td className="p-2 border-2 border-black text-center">
                                                <button onClick={() => deleteHistory(h.id)} className="text-red-500 hover:scale-125 transition-transform">
                                                    <LuTrash2 />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {history.length === 0 && (
                                        <tr>
                                            <td colSpan={5} className="p-8 text-center opacity-20 font-black uppercase italic">No records yet</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}
