// components/layout/Footer.tsx
'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import NewsletterForm from '@/components/forms/NewsletterForm';
import Image from 'next/image';

const quickLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Projects', href: '/projects' },
    { name: 'Contact', href: '/contact' },
];

const legalLinks = [
    { name: 'Terms Of Service', href: '/terms-and-conditions' },
    { name: 'Refund Policy', href: '/refund-policy' },
    { name: 'Privacy Policy', href: '/privacy-policy' },
];

const ourServices = [
    { name: 'Keyword Research & Strategy', href: '/services/keyword-research-strategy' },
    { name: 'On-Page SEO', href: '/services/on-page-seo' },
    { name: 'Technical SEO', href: '/services/technical-seo' },
    { name: 'Content SEO', href: '/services/content-seo' },
];

export default function Footer() {
    return (
        <footer className="bg-navy-900 text-white pt-16 pb-8">
            <div className="container-custom">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    {/* Brand Column */}
                    <div>
                        <Link href="/" className="mb-4">
                            <Image src="/icons/logo-footer.png" alt="javusseo" width={180} height={150} />
                        </Link>
                        <p className="text-navy-300 my-4">
                            Strategy-driven SEO agency helping businesses achieve higher rankings and increased organic traffic.
                        </p>
                        <div className="flex gap-3">
                            <a href="#" className="w-10 h-10 bg-navy-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition">
                                <Facebook className="w-5 h-5" />
                            </a>
                            {/* <a href="#" className="w-10 h-10 bg-navy-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition">
                                <Twitter className="w-5 h-5" />
                            </a> */}
                            <a href="#" className="w-10 h-10 bg-navy-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition">
                                <Linkedin className="w-5 h-5" />
                            </a>
                            {/* <a href="#" className="w-10 h-10 bg-navy-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition">
                                <Instagram className="w-5 h-5" />
                            </a> */}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-bold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-navy-300 hover:text-primary-400 transition">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal Policy */}
                    <div>
                        <h4 className="text-lg font-bold mb-4">Legal Policy</h4>
                        <ul className="space-y-2">
                            {legalLinks.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-navy-300 hover:text-primary-400 transition">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Our Services */}
                    <div>
                        <h4 className="text-lg font-bold mb-4">Our Services</h4>
                        <ul className="space-y-2">
                            {ourServices.map((service) => (
                                <li key={service.name}>
                                    <Link href={service.href} className="text-navy-300 hover:text-primary-400 transition">
                                        {service.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Contact Info Row */}
                <div className="grid md:grid-cols-3 gap-6 py-8 border-t border-navy-800 mb-8">
                    <a href='mailto:javusseo@gmail.com' className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-primary-500" />
                        <span className="text-navy-300">javusseo@gmail.com</span>
                    </a>
                    <a href='tel:+923096535746' className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-primary-500" />
                        <span className="text-navy-300">(+92) 309 6535746</span>
                    </a>
                    <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-primary-500" />
                        <span className="text-navy-300">F79H+C5F, Block M Phase 2 Johar Town, Lahore</span>
                    </div>
                </div>

                {/* Newsletter */}
                <div className="py-8 border-t border-navy-800">
                    <div className="max-w-md">
                        <h4 className="text-lg font-bold mb-3">Subscribe to Newsletter</h4>
                        <NewsletterForm />
                    </div>
                </div>

                {/* Copyright */}
                <div className="pt-8 text-center text-navy-400 text-sm">
                    <p>© 2026 JAVUSSEO. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
}