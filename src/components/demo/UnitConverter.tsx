import { useState } from 'react'
import { Card } from '../ui/card'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { ArrowLeftRight, MoveHorizontal, Scale, Thermometer, Database } from "lucide-react"
import { cn } from '@/lib/utils'

type UnitType = 'length' | 'weight' | 'temp' | 'data'

const conversions: Record<UnitType, Record<string, number | ((val: number, to: string) => number)>> = {
    length: {
        'Meter': 1,
        'Kilometer': 1000,
        'Centimeter': 0.01,
        'Inch': 0.0254,
        'Foot': 0.3048,
        'Mile': 1609.34
    },
    weight: {
        'Gram': 1,
        'Kilogram': 1000,
        'Pound': 453.592,
        'Ounce': 28.3495,
        'Ton': 1e6
    },
    data: {
        'Byte': 1,
        'Kilobyte': 1024,
        'Megabyte': 1024 * 1024,
        'Gigabyte': 1024 * 1024 * 1024,
        'Terabyte': 1024 * 1024 * 1024 * 1024
    },
    temp: {
        'Celsius': (v: number, to: string) => {
            if (to === 'Fahrenheit') return (v * 9 / 5) + 32
            if (to === 'Kelvin') return v + 273.15
            return v
        },
        'Fahrenheit': (v: number, to: string) => {
            if (to === 'Celsius') return (v - 32) * 5 / 9
            if (to === 'Kelvin') return (v - 32) * 5 / 9 + 273.15
            return v
        },
        'Kelvin': (v: number, to: string) => {
            if (to === 'Celsius') return v - 273.15
            if (to === 'Fahrenheit') return (v - 273.15) * 9 / 5 + 32
            return v
        }
    }
}

export const UnitConverter = () => {
    const [type, setType] = useState<UnitType>('length')
    const [value, setValue] = useState<string>('1')
    const [fromUnit, setFromUnit] = useState<string>('Meter')
    const [toUnit, setToUnit] = useState<string>('Kilometer')

    const units = Object.keys(conversions[type])

    const icons = {
        length: MoveHorizontal,
        weight: Scale,
        temp: Thermometer,
        data: Database
    }

    const convert = () => {
        const val = Number.parseFloat(value) || 0
        if (type === 'temp') {
            const runner = conversions.temp[fromUnit] as (v: number, to: string) => number
            return runner(val, toUnit).toFixed(4)
        } else {
            const baseValue = val * (conversions[type][fromUnit] as number)
            const result = baseValue / (conversions[type][toUnit] as number)
            return result.toLocaleString(undefined, { maximumFractionDigits: 6 })
        }
    }

    return (
        <div className="container min-h-screen py-10 flex flex-col items-center">
            <div className="mb-12 text-center">
                <h1 className="text-6xl font-black uppercase italic tracking-tighter mb-2">Universal<span className="text-mainAccent">X</span></h1>
                <p className="font-black opacity-50 uppercase tracking-widest text-xs">Unit Conversion Engine</p>
            </div>

            <div className="w-full max-w-4xl space-y-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {(['length', 'weight', 'temp', 'data'] as UnitType[]).map(t => {
                        const Icon = icons[t]
                        return (
                            <button
                                key={t}
                                onClick={() => {
                                    setType(t)
                                    setFromUnit(Object.keys(conversions[t])[0])
                                    setToUnit(Object.keys(conversions[t])[1])
                                }}
                                className={cn(
                                    "flex flex-col items-center justify-center p-6 border-4 border-black shadow-light transition-all uppercase font-black italic",
                                    type === t ? "bg-mainAccent text-white translate-x-1 translate-y-1 shadow-none" : "bg-white hover:bg-gray-50"
                                )}
                            >
                                <Icon className="w-8 h-8 mb-2" />
                                {t}
                            </button>
                        )
                    })}
                </div>

                <Card className="bg-white border-black border-4 shadow-light p-10">
                    <div className="grid grid-cols-1 md:grid-cols-11 gap-6 items-center">
                        <div className="md:col-span-5 space-y-4">
                            <Label className="font-black uppercase italic">From</Label>
                            <Input
                                type="number"
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                className="h-16 text-3xl font-black border-4 border-black"
                            />
                            <select
                                value={fromUnit}
                                onChange={(e) => setFromUnit(e.target.value)}
                                className="w-full h-12 border-2 border-black font-black uppercase text-sm px-4 bg-yellow-300"
                            >
                                {units.map(u => <option key={u} value={u}>{u}</option>)}
                            </select>
                        </div>

                        <div className="md:col-span-1 flex justify-center">
                            <div className="bg-black text-white p-4 rounded-full rotate-90 md:rotate-0 border-4 border-main">
                                <ArrowLeftRight className="w-6 h-6" />
                            </div>
                        </div>

                        <div className="md:col-span-5 space-y-4">
                            <Label className="font-black uppercase italic">To</Label>
                            <div className="h-16 text-3xl font-black border-4 border-black bg-gray-100 flex items-center px-4 overflow-hidden">
                                {convert()}
                            </div>
                            <select
                                value={toUnit}
                                onChange={(e) => setToUnit(e.target.value)}
                                className="w-full h-12 border-2 border-black font-black uppercase text-sm px-4 bg-green-300"
                            >
                                {units.map(u => <option key={u} value={u}>{u}</option>)}
                            </select>
                        </div>
                    </div>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="p-4 border-2 border-black font-bold bg-pink-200">
                        <h4 className="font-black uppercase text-xs mb-2 italic">Pro Tip</h4>
                        <p className="text-sm">Use the Data mode for calculating exact storage requirements in binary (1024 factor).</p>
                    </Card>
                    <Card className="p-4 border-2 border-black font-bold bg-blue-200">
                        <h4 className="font-black uppercase text-xs mb-2 italic">Precision</h4>
                        <p className="text-sm">UniversalX maintains up to 6 decimal places for critical scientific conversions.</p>
                    </Card>
                    <Card className="p-4 border-2 border-black font-bold bg-orange-200">
                        <h4 className="font-black uppercase text-xs mb-2 italic">Temperature</h4>
                        <p className="text-sm">Celsius, Fahrenheit, and Kelvin conversions use dynamic absolute zero scaling.</p>
                    </Card>
                </div>
            </div>
        </div>
    )
}
