// components/layout/Header.tsx (Updated with left-to-right drawer)
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown, Mail, Phone, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CTAButton from '@/components/ui/CTAButton';
import Image from 'next/image';
import TopBar from './TopBar';

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
      { name: 'Market Research', href: '/services/market-research' },
      { name: 'Keyword Research', href: '/services/keyword-research' },
    ]
  },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact Us', href: '/contact' },
];

// Mobile drawer animation variants
const drawerVariants = {
  hidden: { 
    x: '-100%',
    transition: {
      type: 'tween',
      duration: 0.3,
      ease: 'easeInOut'
    }
  },
  visible: { 
    x: 0,
    transition: {
      type: 'tween',
      duration: 0.3,
      ease: 'easeInOut'
    }
  },
  exit: { 
    x: '-100%',
    transition: {
      type: 'tween',
      duration: 0.3,
      ease: 'easeInOut'
    }
  }
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 }
};

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Prevent body scroll when mobile menu is open
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <TopBar />
      {/* Main Header */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white'
      }`}>
        <nav className="container-custom py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="relative z-50">
              <Image src="/icons/logo.png" alt="javusseo" width={180} height={150} priority />
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
                      <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" />
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
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 pt-3 w-64 bg-white rounded-xl shadow-xl py-2 z-50"
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
                    </motion.div>
                  )}
                </div>
              ))}
              <CTAButton href="/contact" variant="primary" size="md">
                Let's Chat
              </CTAButton>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition relative z-50"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer Menu - Left to Right */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 z-50 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Drawer */}
            <motion.div
              variants={drawerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed top-0 left-0 bottom-0 w-full max-w-sm bg-white shadow-2xl z-50 overflow-y-auto lg:hidden"
            >
              <div className="sticky top-0 bg-white z-10 px-6 pt-6 pb-4 border-b border-gray-100">
                <div className="flex justify-between items-center">
                  <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                    <Image src="/icons/logo.png" alt="javusseo" width={150} height={120} />
                  </Link>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-lg hover:bg-gray-100 transition"
                    aria-label="Close menu"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="px-6 py-6">
                <div className="flex flex-col gap-2">
                  {navigation.map((item) => (
                    <div key={item.name} className="border-b border-gray-50 last:border-0">
                      {item.dropdown ? (
                        <>
                          <button
                            onClick={() => setOpenMobileDropdown(openMobileDropdown === item.name ? null : item.name)}
                            className="flex items-center justify-between w-full py-3 text-navy-700 font-medium hover:text-primary-600 transition"
                          >
                            {item.name}
                            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${
                              openMobileDropdown === item.name ? 'rotate-180' : ''
                            }`} />
                          </button>
                          <AnimatePresence>
                            {openMobileDropdown === item.name && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <div className="pl-4 pb-3 flex flex-col gap-2">
                                  {item.dropdown.map((subItem) => (
                                    <Link
                                      key={subItem.name}
                                      href={subItem.href}
                                      className="py-2 text-navy-600 hover:text-primary-600 transition"
                                      onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                      {subItem.name}
                                    </Link>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
                        <Link
                          href={item.href}
                          className="block py-3 text-navy-700 hover:text-primary-600 font-medium transition"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <CTAButton 
                    href="/contact" 
                    variant="primary" 
                    size="lg" 
                    className="w-full justify-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Let's Chat
                  </CTAButton>
                </div>

                {/* Mobile Contact Info */}
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <div className="space-y-3">
                    <a href='mailto:javusseo@gmail.com' className="flex items-center gap-3 text-navy-600">
                      <Mail className="w-4 h-4 text-primary-500" />
                      <span className="text-sm">javusseo@gmail.com</span>
                    </a>
                    <a href='tel:+923096535746' className="flex items-center gap-3 text-navy-600">
                      <Phone className="w-4 h-4 text-primary-500" />
                      <span className="text-sm">(+92) 309 6535746</span>
                    </a>
                  </div>
                  
                  {/* Social Icons */}
                  {/* <div className="flex gap-4 mt-6">
                    <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-primary-500 hover:text-white transition">
                      <Facebook height={25} width={25} />
                    </a>
                    <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-primary-500 hover:text-white transition">
                        <Twitter height={25} width={25} />
                    </a>
                    <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-primary-500 hover:text-white transition">
                      <Linkedin height={25} width={25} />
                    </a>
                    <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-primary-500 hover:text-white transition">
                        <Instagram height={25} width={25} />
                    </a>
                  </div> */}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}