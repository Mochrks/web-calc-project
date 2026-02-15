import { useState, useEffect } from 'react'
import { Button } from '../ui/button'
import { DivideIcon, MinusIcon, PlusIcon, XIcon, DeleteIcon, HistoryIcon, FlaskConicalIcon } from 'lucide-react'
import { Card } from '../ui/card'
import { LuCalculator } from "react-icons/lu"
import { cn } from '@/lib/utils'

export const BasicCalc = () => {
    const [display, setDisplay] = useState('0')
    const [currentValue, setCurrentValue] = useState('')
    const [operator, setOperator] = useState('')
    const [waitingForOperand, setWaitingForOperand] = useState(false)
    const [calculation, setCalculation] = useState('')
    const [isScientific, setIsScientific] = useState(false)
    const [history, setHistory] = useState<{ id: string, expr: string, res: string }[]>([])
    const [showHistory, setShowHistory] = useState(false)

    useEffect(() => {
        const savedHistory = localStorage.getItem('calc_history')
        if (savedHistory) {
            setHistory(JSON.parse(savedHistory))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('calc_history', JSON.stringify(history.slice(0, 20)))
    }, [history])

    const inputDigit = (digit: string) => {
        if (waitingForOperand) {
            setDisplay(digit)
            setWaitingForOperand(false)
        } else {
            setDisplay(display === '0' ? digit : display + digit)
        }
        updateCalculation(digit)
    }

    const inputDecimal = () => {
        if (waitingForOperand) {
            setDisplay('0.')
            setWaitingForOperand(false)
        } else if (display.indexOf('.') === -1) {
            setDisplay(display + '.')
        }
        updateCalculation('.')
    }

    const clearDisplay = () => {
        setDisplay('0')
        setCurrentValue('')
        setOperator('')
        setWaitingForOperand(false)
        setCalculation('')
    }

    const performOperation = (nextOperator: string) => {
        const inputValue = parseFloat(display)

        if (currentValue === '') {
            setCurrentValue(inputValue.toString())
        } else if (operator) {
            const currentValueNum = parseFloat(currentValue)
            let newValue: number

            switch (operator) {
                case '+': newValue = currentValueNum + inputValue; break
                case '-': newValue = currentValueNum - inputValue; break
                case '×': newValue = currentValueNum * inputValue; break
                case '÷': newValue = currentValueNum / inputValue; break
                case '^': newValue = Math.pow(currentValueNum, inputValue); break
                default: newValue = inputValue
            }

            setCurrentValue(newValue.toString())
            setDisplay(newValue.toString())

            if (nextOperator === '=') {
                setHistory([{ id: crypto.randomUUID(), expr: calculation, res: newValue.toString() }, ...history])
                setCalculation(newValue.toString())
            }
        }

        setWaitingForOperand(true)
        setOperator(nextOperator)
        if (nextOperator !== '=') {
            updateCalculation(` ${nextOperator} `)
        }
    }

    const performScientific = (func: string) => {
        const val = parseFloat(display)
        let res = 0
        switch (func) {
            case 'sin': res = Math.sin(val); break
            case 'cos': res = Math.cos(val); break
            case 'tan': res = Math.tan(val); break
            case 'log': res = Math.log10(val); break
            case 'ln': res = Math.log(val); break
            case 'sqrt': res = Math.sqrt(val); break
            case 'sqr': res = val * val; break
            case 'pi': res = Math.PI; break
            case 'e': res = Math.E; break
        }
        setDisplay(res.toString())
        setCalculation(`${func}(${val})`)
        setHistory([{ id: crypto.randomUUID(), expr: `${func}(${val})`, res: res.toString() }, ...history])
        setWaitingForOperand(true)
    }

    const updateCalculation = (value: string) => {
        setCalculation(prev => {
            if (prev.includes('=') || /^[a-z]/.test(prev)) {
                return value
            }
            return prev + value
        })
    }

    const deleteLastDigit = () => {
        if (display.length > 1) {
            setDisplay(display.slice(0, -1))
            setCalculation(calculation.slice(0, -1))
        } else {
            setDisplay('0')
            setCalculation('')
        }
    }

    const buttonClass = "text-xl font-black transition-all border-2 border-black"

    return (
        <div className="container min-h-screen py-10 flex flex-col items-center justify-center">
            <div className="mb-8 text-center space-y-2">
                <div className='flex items-center justify-center space-x-2'>
                    <LuCalculator className='w-10 h-10' />
                    <h1 className="text-5xl font-black uppercase italic">UltraCalc</h1>
                </div>
                <p className="font-bold opacity-60 uppercase tracking-widest text-xs">Neubrutalist Computing Machine</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 w-full max-w-5xl justify-center items-start">
                {/* History Sidebar */}
                <Card className={cn(
                    "w-full lg:w-72 bg-white border-4 border-black shadow-light overflow-hidden transition-all",
                    showHistory ? "max-h-[500px]" : "max-h-0 lg:max-h-[600px] border-0 lg:border-4"
                )}>
                    <div className="p-4 bg-yellow-300 border-b-4 border-black flex justify-between items-center">
                        <h2 className="font-black uppercase flex items-center gap-2">
                            <HistoryIcon className="w-4 h-4" /> History
                        </h2>
                        <Button variant="noShadow" size="sm" onClick={() => setHistory([])} className="bg-white border-2 border-black text-[10px] h-6">CLR</Button>
                    </div>
                    <div className="p-4 space-y-3 overflow-y-auto h-[400px]">
                        {history.length === 0 ? (
                            <p className="text-center font-bold opacity-30 italic py-10">Empty...</p>
                        ) : (
                            history.map(item => (
                                <div key={item.id} className="border-b-2 border-black border-dashed pb-2">
                                    <p className="text-[10px] font-bold opacity-50 truncate">{item.expr}</p>
                                    <p className="font-black text-lg"> = {item.res}</p>
                                </div>
                            ))
                        )}
                    </div>
                </Card>

                {/* Main Calc */}
                <div className="flex-1 max-w-[400px]">
                    <Card className="bg-white border-black border-4 shadow-light p-6">
                        <div className="mb-6 bg-green-200 border-4 border-black p-4 h-32 flex flex-col items-end justify-between rounded-base relative overflow-hidden">
                            <div className="absolute top-2 left-2 text-[10px] font-black opacity-30 select-none uppercase">LCD-8000 G-PRO</div>
                            <span className="text-sm font-bold opacity-60 break-all text-right">{calculation || '&nbsp;'}</span>
                            <span className="text-4xl font-black overflow-hidden truncate w-full text-right">{display}</span>
                        </div>

                        <div className="flex gap-2 mb-4">
                            <Button
                                onClick={() => setIsScientific(!isScientific)}
                                className={cn("flex-1 uppercase font-black border-2 border-black shadow-light", isScientific ? "bg-purple-400" : "bg-white")}
                            >
                                <FlaskConicalIcon className="w-4 h-4 mr-2" /> Scientific
                            </Button>
                            <Button
                                onClick={() => setShowHistory(!showHistory)}
                                className="lg:hidden bg-yellow-300 border-2 border-black"
                            >
                                <HistoryIcon className="w-5 h-5" />
                            </Button>
                        </div>

                        <div className="grid grid-cols-4 gap-3">
                            {/* Scientific Row */}
                            {isScientific && (
                                <>
                                    <Button onClick={() => performScientific('sin')} className={`${buttonClass} bg-indigo-100`}>sin</Button>
                                    <Button onClick={() => performScientific('cos')} className={`${buttonClass} bg-indigo-100`}>cos</Button>
                                    <Button onClick={() => performScientific('tan')} className={`${buttonClass} bg-indigo-100`}>tan</Button>
                                    <Button onClick={() => performOperation('^')} className={`${buttonClass} bg-orange-400 text-white`}>x^y</Button>
                                    <Button onClick={() => performScientific('sqrt')} className={`${buttonClass} bg-indigo-100`}>&radic;</Button>
                                    <Button onClick={() => performScientific('sqr')} className={`${buttonClass} bg-indigo-100`}>x&sup2;</Button>
                                    <Button onClick={() => performScientific('log')} className={`${buttonClass} bg-indigo-100`}>log</Button>
                                    <Button onClick={() => performScientific('pi')} className={`${buttonClass} bg-indigo-100`}>&pi;</Button>
                                </>
                            )}

                            <Button onClick={clearDisplay} className={`${buttonClass} bg-red-400 text-black col-span-2`}>CLEAR</Button>
                            <Button onClick={deleteLastDigit} className={`${buttonClass} bg-yellow-300`}>
                                <DeleteIcon size={24} />
                            </Button>
                            <Button onClick={() => performOperation('÷')} className={`${buttonClass} bg-orange-400 text-white`}>
                                <DivideIcon size={24} />
                            </Button>

                            {[7, 8, 9].map(n => (
                                <Button key={n} onClick={() => inputDigit(n.toString())} className={`${buttonClass} bg-white hover:bg-main`}>{n}</Button>
                            ))}
                            <Button onClick={() => performOperation('×')} className={`${buttonClass} bg-orange-400 text-white`}>
                                <XIcon size={24} />
                            </Button>

                            {[4, 5, 6].map(n => (
                                <Button key={n} onClick={() => inputDigit(n.toString())} className={`${buttonClass} bg-white hover:bg-main`}>{n}</Button>
                            ))}
                            <Button onClick={() => performOperation('-')} className={`${buttonClass} bg-orange-400 text-white`}>
                                <MinusIcon size={24} />
                            </Button>

                            {[1, 2, 3].map(n => (
                                <Button key={n} onClick={() => inputDigit(n.toString())} className={`${buttonClass} bg-white hover:bg-main`}>{n}</Button>
                            ))}
                            <Button onClick={() => performOperation('+')} className={`${buttonClass} bg-orange-400 text-white`}>
                                <PlusIcon size={24} />
                            </Button>

                            <Button onClick={() => inputDigit('0')} className={`${buttonClass} bg-white col-span-2 hover:bg-main`}>0</Button>
                            <Button onClick={inputDecimal} className={`${buttonClass} bg-white hover:bg-main`}>.</Button>
                            <Button onClick={() => performOperation('=')} className={`${buttonClass} bg-mainAccent text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none`}>=</Button>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}
