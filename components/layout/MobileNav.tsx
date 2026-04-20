// components/layout/MobileNav.tsx
'use client';

import { useState } from 'react';
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
        ]
    },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact Us', href: '/contact' },
];

export default function MobileNav() {
    const [isOpen, setIsOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    return (
        <>
            <button
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition"
                onClick={() => setIsOpen(true)}
            >
                <Menu className="w-6 h-6" />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/50 z-50"
                            onClick={() => setIsOpen(false)}
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'tween' }}
                            className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-white shadow-2xl z-50 overflow-y-auto"
                        >
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-8">
                                    <span className="text-2xl font-bold gradient-text">SEORE</span>
                                    <button onClick={() => setIsOpen(false)} className="p-2">
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>

                                <div className="flex flex-col gap-4">
                                    {navigation.map((item) => (
                                        <div key={item.name}>
                                            {item.dropdown ? (
                                                <>
                                                    <button
                                                        onClick={() => setOpenDropdown(openDropdown === item.name ? null : item.name)}
                                                        className="flex items-center justify-between w-full py-2 text-navy-700 font-medium"
                                                    >
                                                        {item.name}
                                                        <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === item.name ? 'rotate-180' : ''}`} />
                                                    </button>
                                                    <AnimatePresence>
                                                        {openDropdown === item.name && (
                                                            <motion.div
                                                                initial={{ height: 0, opacity: 0 }}
                                                                animate={{ height: 'auto', opacity: 1 }}
                                                                exit={{ height: 0, opacity: 0 }}
                                                                className="pl-4 mt-2 space-y-2 overflow-hidden"
                                                            >
                                                                {item.dropdown.map((subItem) => (
                                                                    <Link
                                                                        key={subItem.name}
                                                                        href={subItem.href}
                                                                        className="block py-2 text-navy-600 hover:text-primary-600"
                                                                        onClick={() => setIsOpen(false)}
                                                                    >
                                                                        {subItem.name}
                                                                    </Link>
                                                                ))}
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </>
                                            ) : (
                                                <Link
                                                    href={item.href}
                                                    className="block py-2 text-navy-700 hover:text-primary-600 font-medium"
                                                    onClick={() => setIsOpen(false)}
                                                >
                                                    {item.name}
                                                </Link>
                                            )}
                                        </div>
                                    ))}
                                    <CTAButton href="/contact" variant="primary" size="md" className="mt-4">
                                        Let's Chat
                                    </CTAButton>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}