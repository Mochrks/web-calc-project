import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { LuCalculator, LuDollarSign, LuActivity, LuTrendingUp, LuTarget, LuBrain, LuBanknote, LuArrowLeftRight } from "react-icons/lu"
import { Link } from 'react-router-dom'

export const HomePage = () => {
    return (
        <div className="min-h-screen py-10 bg-bg text-text">
            <main className="container mx-auto px-4">
                <section className="text-center mb-20 relative">
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-yellow-300 border-2 border-black px-4 py-1 font-black uppercase text-xs rotate-2 shadow-light">
                        V3.0 Extreme Dashboards
                    </div>
                    <h1 className="text-6xl md:text-9xl font-black mb-6 uppercase italic tracking-tighter leading-tight">
                        Ultra<span className="text-mainAccent">Calc</span>
                    </h1>
                    <p className="text-xl md:text-2xl font-bold max-w-3xl mx-auto border-4 border-black bg-white p-8 shadow-light -rotate-1">
                        Professional-grade analytical engine for health, finance, and scientific engineering. Now with data persistence.
                    </p>
                </section>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                    <Card className="bg-blue-300 border-4 border-black shadow-light p-6 hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="bg-white border-2 border-black p-2 rounded-base">
                                <LuActivity className="w-8 h-8 text-blue-600" />
                            </div>
                            <h2 className="text-3xl font-black uppercase italic">Health Hub</h2>
                        </div>
                        <p className="font-bold mb-6 min-h-[60px]">
                            BMR, TDEE, BMI, and Weight logging with historical trend charts.
                        </p>
                        <Button asChild className="w-full bg-white text-black border-2 border-black shadow-light hover:bg-blue-50">
                            <Link to="/bmi-calc" className="font-black italic">LAUNCH ANALYZER</Link>
                        </Button>
                    </Card>

                    <Card className="bg-green-300 border-4 border-black shadow-light p-6 hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="bg-white border-2 border-black p-2 rounded-base">
                                <LuDollarSign className="w-8 h-8 text-green-600" />
                            </div>
                            <h2 className="text-3xl font-black uppercase italic">Finance</h2>
                        </div>
                        <p className="font-bold mb-6 min-h-[60px]">
                            Complex budgeting, investment compounding, and debt strategies.
                        </p>
                        <Button asChild className="w-full bg-white text-black border-2 border-black shadow-light hover:bg-green-50">
                            <Link to="/income-calc" className="font-black italic">GOTO DASHBOARD</Link>
                        </Button>
                    </Card>

                    <Card className="bg-main border-4 border-black shadow-light p-6 hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="bg-white border-2 border-black p-2 rounded-base">
                                <LuCalculator className="w-8 h-8 text-purple-600" />
                            </div>
                            <h2 className="text-3xl font-black uppercase italic">Numeric</h2>
                        </div>
                        <p className="font-bold mb-6 min-h-[60px]">
                            Scientific calculator with history and advanced trig functions.
                        </p>
                        <Button asChild className="w-full bg-white text-black border-2 border-black shadow-light hover:bg-purple-50">
                            <Link to="/basic-calc" className="font-black italic">OPEN SCI-CALC</Link>
                        </Button>
                    </Card>

                    <Card className="bg-orange-300 border-4 border-black shadow-light p-6 hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="bg-white border-2 border-black p-2 rounded-base">
                                <LuBanknote className="w-8 h-8 text-orange-600" />
                            </div>
                            <h2 className="text-3xl font-black uppercase italic">Lending</h2>
                        </div>
                        <p className="font-bold mb-6 min-h-[60px]">
                            Amortization schedules and mortgage repayment breakdowns.
                        </p>
                        <Button asChild className="w-full bg-white text-black border-2 border-black shadow-light hover:bg-orange-50">
                            <Link to="/loan-calc" className="font-black italic">LOAN MASTER</Link>
                        </Button>
                    </Card>

                    <Card className="bg-yellow-300 border-4 border-black shadow-light p-6 hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all md:col-span-2 lg:col-span-1">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="bg-white border-2 border-black p-2 rounded-base">
                                <LuArrowLeftRight className="w-8 h-8 text-yellow-600" />
                            </div>
                            <h2 className="text-3xl font-black uppercase italic">Universal</h2>
                        </div>
                        <p className="font-bold mb-6 min-h-[60px]">
                            Convert length, weight, data, and temperature with high precision.
                        </p>
                        <Button asChild className="w-full bg-white text-black border-2 border-black shadow-light hover:bg-yellow-50">
                            <Link to="/unit-calc" className="font-black italic">UNIT ENGINE</Link>
                        </Button>
                    </Card>
                </div>

                <section className="border-t-8 border-black pt-20 pb-10">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <h3 className="text-5xl font-black uppercase italic">Engineering Grade</h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4 bg-red-200 border-4 border-black p-4 shadow-light">
                                    <LuTarget className="w-10 h-10 shrink-0" />
                                    <div>
                                        <h4 className="font-black text-xl uppercase">Zero Placeholders</h4>
                                        <p className="font-bold opacity-70">Functional tools for real-world scenarios. No fake data here.</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 bg-cyan-200 border-4 border-black p-4 shadow-light">
                                    <LuBrain className="w-10 h-10 shrink-0" />
                                    <div>
                                        <h4 className="font-black text-xl uppercase">Native Storage</h4>
                                        <p className="font-bold opacity-70">Your history and settings live in your browser's core.</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 bg-green-200 border-4 border-black p-4 shadow-light">
                                    <LuTrendingUp className="w-10 h-10 shrink-0" />
                                    <div>
                                        <h4 className="font-black text-xl uppercase">Visual Edge</h4>
                                        <p className="font-bold opacity-70">Data visualization that actually makes sense at a glance.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="bg-white border-8 border-black p-8 shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] rotate-3">
                                <div className="bg-black text-white p-2 inline-block font-black uppercase text-[10px] mb-4">SYSTEM STATUS: OPTIMAL</div>
                                <p className="text-4xl font-black italic mb-4">"THE ONLY SUITE YOU NEED FOR SURVIVAL IN THE MODERN WORLD."</p>
                                <p className="font-bold text-right text-main">- MOCHRKS ARCHIVE</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}