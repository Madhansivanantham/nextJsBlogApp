"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import clsx from "clsx"

const links = [
    { name: 'Home', href: '/' },
    { name: 'Articles', href: '/articles' },
    {name: 'Add Blog', href: '/addBlog'}
    
]

export default function Navbar() {
    const pathname = usePathname()

    return (
        <nav className="flex gap-6">
            {links.map((link) => (
                <Link
                    key={link.name}
                    href={link.href}
                    className={clsx(
                        'text-sm font-medium transition-colors duration-200 relative',
                        pathname === link.href
                            ? 'text-slate-900 border-b-2 border-slate-900'
                            : 'text-slate-500 hover:text-slate-900'
                    )}
                >
                    {link.name}
                    {pathname === link.href && (
                        <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-slate-900 to-slate-700 rounded-full"></div>
                    )}
                </Link>
            ))}
        </nav>
    )
}