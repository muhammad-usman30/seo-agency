'use client';

import { Mail, Phone, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

export default function TopBar() {
  return (
    <div className="bg-dark-200 text-white text-sm py-2 hidden md:block">
      <div className="container-custom flex justify-between items-center">
        <div className="flex gap-6">
          <a href='mailto:javusseo@gmail.com' className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            <span>javusseo@gmail.com</span>
          </a>
         
        </div>
        <div className="flex gap-4">
            <a href="tel:+923096535746" className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>(+92) 309 6535746</span>
            </a>
          {/* <a href="#" className="hover:text-primary-400 transition">
            <Facebook className="w-4 h-4" />
          </a>
          <a href="#" className="hover:text-primary-400 transition">
            <Twitter className="w-4 h-4" />
          </a>
          <a href="#" className="hover:text-primary-400 transition">
            <Linkedin className="w-4 h-4" />
          </a> */}
        </div>
      </div>
    </div>
  );
}