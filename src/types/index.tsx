import { ReactNode } from 'react'

export type Expense = {
    name: string;
    amount: number;
    category?: string;
}

export type Investment = {
    name: string;
    amount: number;
    expectedReturn: number;
}

export type Debt = {
    name: string;
    amount: number;
    interestRate: number;
}

export type IncomeEntry = {
    id: string;
    date: string;
    income: number;
    expenses: Expense[];
    investments: Investment[];
    debts: Debt[];
    savings: number;
    notes: string;
}

export type HealthMetrics = {
    id: string;
    date: string;
    height: number;
    weight: number;
    age: number;
    gender: 'male' | 'female';
    bmi: number;
    bmr: number;
    tdee: number;
    category: string;
}

export type LoanResult = {
    monthlyPayment: number;
    totalPayment: number;
    totalInterest: number;
    amortization: {
        month: number;
        payment: number;
        interest: number;
        principal: number;
        remaining: number;
    }[];
}

export interface LayoutProps {
    children: ReactNode
}

