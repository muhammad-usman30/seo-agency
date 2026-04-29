'use client';

import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import Image from 'next/image';

const WHATSAPP_NUMBER = "923096535746";
const WELCOME_MESSAGE = "Hi! I'm interested in your SEO services. Can you help me?";

export default function WhatsAppButton() {
    const handleClick = () => {
        const message = encodeURIComponent(WELCOME_MESSAGE);
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
    };

    return (
        <motion.button
            onClick={handleClick}
            className="!p-0 h-[60px] w-[60px] fixed bottom-6 right-6 z-50 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 flex items-center justify-center group"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Chat on WhatsApp"
        >
            {/* Animated ring effect */}
            <span className="absolute inset-0 rounded-full animate-ping bg-green-400 opacity-75" />
            
            {/* WhatsApp Icon */}
            <Image src={'/icons/whatsapp-icon.svg'} alt='WhatsApp Icon' height={60} width={60} className='w-[60px] h-[60px]' />
            
            {/* Tooltip on hover */}
            <span className="absolute right-full mr-3 whitespace-nowrap bg-gray-800 text-white text-sm px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                Need help? Chat with us!
            </span>
        </motion.button>
    );
}