import React from 'react';
import { Home } from '@/pages/Home';
import { Routes, Route } from 'react-router-dom';
import { Basic } from '@/pages/Basic';
import { Income } from '@/pages/Income';
import { BMI } from '@/pages/BMI';
import { Faq } from '@/pages/Faq';

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/basic-calc" element={<Basic />} />
            <Route path="/bmi-calc" element={<BMI />} />
            <Route path="/income-calc" element={<Income />} />
            <Route path="/faq" element={<Faq />} />
        </Routes>
    );
};

export default AppRoutes;