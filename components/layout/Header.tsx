// components/layout/Header.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CTAButton from '@/components/ui/CTAButton';

const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    {
        name: 'Services',
        href: '/services',
        dropdown: [
            { name: 'SEO Marketing', href: '/services/seo-marketing' },
            { name: 'Digital Marketing', href: '/services/digital-marketing' },
            { name: 'Social Marketing', href: '/services/social-marketing' },
            { name: 'Content Marketing', href: '/services/content-marketing' },
        ]
    },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact Us', href: '/contact' },
];

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            {/* Top Bar */}
            <div className="bg-dark-200 text-white text-sm py-2">
                <div className="container-custom flex justify-between items-center">
                    <div className="flex gap-6">
                        <span>Email: info@domain.com</span>
                        <span>Toll Free: (+0) 789 456 123</span>
                    </div>
                    <div className="flex gap-4">
                        <a href="#" className="hover:text-primary-400 transition">f</a>
                        <a href="#" className="hover:text-primary-400 transition">X</a>
                        <a href="#" className="hover:text-primary-400 transition">QO</a>
                        <a href="#" className="hover:text-primary-400 transition">in</a>
                    </div>
                </div>
            </div>

            {/* Main Header */}
            <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white'
                }`}>
                <nav className="container-custom py-4">
                    <div className="flex justify-between items-center">
                        {/* Logo */}
                        <Link href="/" className="text-2xl font-display font-bold gradient-text">
                            SEORE
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center gap-8">
                            {navigation.map((item) => (
                                <div key={item.name} className="relative group">
                                    {item.dropdown ? (
                                        <button
                                            className="flex items-center gap-1 text-navy-700 hover:text-primary-600 transition font-medium"
                                            onMouseEnter={() => setOpenDropdown(item.name)}
                                            onMouseLeave={() => setOpenDropdown(null)}
                                        >
                                            {item.name}
                                            <ChevronDown className="w-4 h-4" />
                                        </button>
                                    ) : (
                                        <Link
                                            href={item.href}
                                            className="text-navy-700 hover:text-primary-600 transition font-medium"
                                        >
                                            {item.name}
                                        </Link>
                                    )}

                                    {/* Dropdown */}
                                    {item.dropdown && openDropdown === item.name && (
                                        <div
                                            className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl py-2 z-50"
                                            onMouseEnter={() => setOpenDropdown(item.name)}
                                            onMouseLeave={() => setOpenDropdown(null)}
                                        >
                                            {item.dropdown.map((subItem) => (
                                                <Link
                                                    key={subItem.name}
                                                    href={subItem.href}
                                                    className="block px-4 py-2 text-navy-700 hover:bg-cream hover:text-primary-600 transition"
                                                >
                                                    {subItem.name}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                            <CTAButton href="/contact" variant="primary" size="md">
                                Let's Chat
                            </CTAButton>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </nav>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="lg:hidden bg-white border-t"
                        >
                            <div className="container-custom py-4 flex flex-col gap-3">
                                {navigation.map((item) => (
                                    <div key={item.name}>
                                        {item.dropdown ? (
                                            <>
                                                <button className="w-full text-left py-2 text-navy-700 font-medium">
                                                    {item.name}
                                                </button>
                                                <div className="pl-4 flex flex-col gap-2 mt-2">
                                                    {item.dropdown.map((subItem) => (
                                                        <Link
                                                            key={subItem.name}
                                                            href={subItem.href}
                                                            className="py-2 text-navy-600 hover:text-primary-600"
                                                            onClick={() => setIsMobileMenuOpen(false)}
                                                        >
                                                            {subItem.name}
                                                        </Link>
                                                    ))}
                                                </div>
                                            </>
                                        ) : (
                                            <Link
                                                href={item.href}
                                                className="block py-2 text-navy-700 hover:text-primary-600 font-medium"
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                {item.name}
                                            </Link>
                                        )}
                                    </div>
                                ))}
                                <CTAButton href="/contact" variant="primary" size="md" className="mt-2">
                                    Let's Chat
                                </CTAButton>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>
        </>
    );
}