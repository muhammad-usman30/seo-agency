// components/admin/AdminSidebar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, CreditCard, FolderKanban, LogOut } from 'lucide-react';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase/config';
import { toast } from 'sonner';

const navItems = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/pricing', label: 'Pricing Plans', icon: CreditCard },
    { href: '/admin/projects', label: 'Projects', icon: FolderKanban },
];

export default function AdminSidebar() {
    const pathname = usePathname();

    const handleLogout = async () => {
        await signOut(auth);
        toast.success('Logged out successfully');
    };

    return (
        <aside className="w-64 bg-navy-800 text-white flex flex-col">
            <div className="p-6">
                <h2 className="text-2xl font-bold gradient-text">SEORE Admin</h2>
            </div>

            <nav className="flex-1 px-4 space-y-2">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${isActive ? 'gradient-bg' : 'hover:bg-navy-700'
                                }`}
                        >
                            <Icon className="w-5 h-5" />
                            <span>{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-navy-700">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 w-full rounded-lg hover:bg-navy-700 transition"
                >
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
}