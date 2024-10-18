import { useState } from 'react'
import { Button } from '../ui/button'
import { DivideIcon, MinusIcon, PlusIcon, XIcon, DeleteIcon } from 'lucide-react'
import { Card } from '../ui/card'
import { LuCalculator } from "react-icons/lu";

export const BasicCalc = () => {
    const [display, setDisplay] = useState('0')
    const [currentValue, setCurrentValue] = useState('')
    const [operator, setOperator] = useState('')
    const [waitingForOperand, setWaitingForOperand] = useState(false)
    const [calculation, setCalculation] = useState('')

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
                case '+':
                    newValue = currentValueNum + inputValue
                    break
                case '-':
                    newValue = currentValueNum - inputValue
                    break
                case '×':
                    newValue = currentValueNum * inputValue
                    break
                case '÷':
                    newValue = currentValueNum / inputValue
                    break
                default:
                    newValue = inputValue
            }

            setCurrentValue(newValue.toString())
            setDisplay(newValue.toString())

            if (nextOperator === '=') {
                setCalculation(`${calculation} = ${newValue}`)
            }
        }

        setWaitingForOperand(true)
        setOperator(nextOperator)
        if (nextOperator !== '=') {
            updateCalculation(` ${nextOperator} `)
        }
    }

    const updateCalculation = (value: string) => {
        setCalculation(prev => {
            if (prev.includes('=')) {
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

    const buttonClass = "text-2xl font-semibold w-20 h-20 flex items-center justify-center"

    return (
        <div className="container relative min-h-screen flex-col items-center justify-center md:grid md:max-w-none md:grid-cols-2 lg:px-0">
            <div className="hidden h-full bg-muted text-zinc-800 md:flex flex-col justify-around space-y-10 text-lg font-medium bg-secondary">
                <div className='px-10 space-y-5'>
                    <div className='flex space-x-2'>
                        <LuCalculator className='w-8 h-8' />
                        <h6>Basic Calculator</h6>
                    </div>
                    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-7xl">
                        Basic Calculator
                    </h1>
                </div>
                <blockquote className="px-10">
                    <p className="text-lg">
                        &ldquo;This calculator is simple, reliable, and essential for quick calculations on the go. It's designed to handle everyday tasks effortlessly.&rdquo;
                    </p>
                </blockquote>
            </div>

            <div className="pt-20 md:pt-1 lg:p-8 ">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[320px]">
                    <Card className="bg-white text-white p-4 rounded-3xl">
                        <div className="h-32 flex flex-col items-end justify-end pb-4 px-6">
                            <span className="text-2xl font-light text-gray-500">{calculation}</span>
                            <span className="text-6xl font-light text-black">{display}</span>
                        </div>
                        <div className="grid grid-cols-4 gap-3">
                            <Button
                                variant="default"
                                className={`${buttonClass} bg-gray-400 text-black hover:bg-gray-300`}
                                onClick={clearDisplay}
                            >
                                AC
                            </Button>
                            <Button
                                variant="default"
                                className={`${buttonClass} bg-gray-400 text-black hover:bg-gray-300`}
                                onClick={() => setDisplay((prev) => (parseFloat(prev) * -1).toString())}
                            >
                                +/-
                            </Button>
                            <Button
                                variant="default"
                                className={`${buttonClass} bg-gray-400 text-black hover:bg-gray-300`}
                                onClick={() => setDisplay((prev) => (parseFloat(prev) / 100).toString())}
                            >
                                %
                            </Button>
                            <Button
                                variant="default"
                                className={`${buttonClass} bg-orange-500 text-white hover:bg-orange-400`}
                                onClick={() => performOperation('÷')}
                            >
                                <DivideIcon size={28} />
                            </Button>
                            <Button
                                variant="default"
                                className={`${buttonClass} bg-gray-700 text-white hover:bg-gray-600`}
                                onClick={() => inputDigit('7')}
                            >
                                7
                            </Button>
                            <Button
                                variant="default"
                                className={`${buttonClass} bg-gray-700 text-white hover:bg-gray-600`}
                                onClick={() => inputDigit('8')}
                            >
                                8
                            </Button>
                            <Button
                                variant="default"
                                className={`${buttonClass} bg-gray-700 text-white hover:bg-gray-600`}
                                onClick={() => inputDigit('9')}
                            >
                                9
                            </Button>
                            <Button
                                variant="default"
                                className={`${buttonClass} bg-orange-500 text-white hover:bg-orange-400`}
                                onClick={() => performOperation('×')}
                            >
                                <XIcon size={28} />
                            </Button>
                            <Button
                                variant="default"
                                className={`${buttonClass} bg-gray-700 text-white hover:bg-gray-600`}
                                onClick={() => inputDigit('4')}
                            >
                                4
                            </Button>
                            <Button
                                variant="default"
                                className={`${buttonClass} bg-gray-700 text-white hover:bg-gray-600`}
                                onClick={() => inputDigit('5')}
                            >
                                5
                            </Button>
                            <Button
                                variant="default"
                                className={`${buttonClass} bg-gray-700 text-white hover:bg-gray-600`}
                                onClick={() => inputDigit('6')}
                            >
                                6
                            </Button>
                            <Button
                                variant="default"
                                className={`${buttonClass} bg-orange-500 text-white hover:bg-orange-400`}
                                onClick={() => performOperation('-')}
                            >
                                <MinusIcon size={28} />
                            </Button>
                            <Button
                                variant="default"
                                className={`${buttonClass} bg-gray-700 text-white hover:bg-gray-600`}
                                onClick={() => inputDigit('1')}
                            >
                                1
                            </Button>
                            <Button
                                variant="default"
                                className={`${buttonClass} bg-gray-700 text-white hover:bg-gray-600`}
                                onClick={() => inputDigit('2')}
                            >
                                2
                            </Button>
                            <Button
                                variant="default"
                                className={`${buttonClass} bg-gray-700 text-white hover:bg-gray-600`}
                                onClick={() => inputDigit('3')}
                            >
                                3
                            </Button>
                            <Button
                                variant="default"
                                className={`${buttonClass} bg-orange-500 text-white hover:bg-orange-400`}
                                onClick={() => performOperation('+')}
                            >
                                <PlusIcon size={28} />
                            </Button>
                            <Button
                                variant="default"
                                className={`${buttonClass} bg-gray-700 text-white hover:bg-gray-600`}
                                onClick={() => inputDigit('0')}
                            >
                                0
                            </Button>
                            <Button
                                variant="default"
                                className={`${buttonClass} bg-gray-700 text-white hover:bg-gray-600`}
                                onClick={inputDecimal}
                            >
                                .
                            </Button>
                            <Button
                                variant="default"
                                className={`${buttonClass} bg-gray-700 text-white hover:bg-gray-600`}
                                onClick={deleteLastDigit}
                            >
                                <DeleteIcon size={28} />
                            </Button>
                            <Button
                                variant="default"
                                className={`${buttonClass} bg-orange-500 text-white hover:bg-orange-400`}
                                onClick={() => performOperation('=')}
                            >
                                =
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}