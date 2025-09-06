import { ReactNode } from 'react'
export type Expense = {
    name: string;
    amount: number;
}

export type IncomeEntry = {
    date: string;
    income: number;
    expenses: Expense[];
    savings: number;
    notes: string;
}

export interface LayoutProps {
    children: ReactNode
}