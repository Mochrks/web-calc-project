import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('@/pages/Home').then(module => ({ default: module.Home })));
const Basic = lazy(() => import('@/pages/Basic').then(module => ({ default: module.Basic })));
const Income = lazy(() => import('@/pages/Income').then(module => ({ default: module.Income })));
const BMI = lazy(() => import('@/pages/BMI').then(module => ({ default: module.BMI })));
const Faq = lazy(() => import('@/pages/Faq').then(module => ({ default: module.Faq })));
const Loan = lazy(() => import('@/pages/Loan').then(module => ({ default: module.Loan })));
const Unit = lazy(() => import('@/pages/Unit').then(module => ({ default: module.Unit })));

const AppRoutes: React.FC = () => {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-bg font-black text-2xl uppercase italic">Loading...</div>}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/basic-calc" element={<Basic />} />
                <Route path="/bmi-calc" element={<BMI />} />
                <Route path="/income-calc" element={<Income />} />
                <Route path="/loan-calc" element={<Loan />} />
                <Route path="/unit-calc" element={<Unit />} />
                <Route path="/faq" element={<Faq />} />
            </Routes>
        </Suspense>
    );
};

export default AppRoutes;