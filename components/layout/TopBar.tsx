// components/layout/TopBar.tsx
'use client';

import { Mail, Phone, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

export default function TopBar() {
    return (
        <div className="bg-dark-200 text-white text-sm py-2 hidden md:block">
            <div className="container-custom flex justify-between items-center">
                <div className="flex gap-6">
                    <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        <span>info@domain.com</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        <span>Toll Free: (+0) 789 456 123</span>
                    </div>
                </div>
                <div className="flex gap-4">
                    <a href="#" className="hover:text-primary-400 transition">f</a>
                    <a href="#" className="hover:text-primary-400 transition">X</a>
                    <a href="#" className="hover:text-primary-400 transition">QO</a>
                    <a href="#" className="hover:text-primary-400 transition">in</a>
                </div>
            </div>
        </div>
    );
}