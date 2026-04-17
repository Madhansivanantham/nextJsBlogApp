
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import clsx from "clsx"
import AuthButton from "@/components/AuthButton"

const links = [
    { name: 'Home', href: '/' },
    { name: 'Articles', href: '/articles' },
    { name: 'Add Blog', href: '/addBlog' }

]

export default function Navbar() {
    const pathname = usePathname()

    return (
        <nav className="flex items-center justify-center gap-4 text-center">
            {links.map((link) => (
                <Link
                    key={link.name}
                    href={link.href}
                    className={clsx(
                        'relative rounded-md px-3 py-2 text-sm font-medium transition-all duration-200',
                        pathname === link.href
                            ? 'text-slate-900 bg-slate-100 shadow-sm' 
                            : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50 hover:ring-1 hover:ring-slate-200'
                    )}
                >
                    {link.name}
                   
                </Link>
            ))}
            <div className="flex items-center">
                <AuthButton />
            </div>
        </nav>
    )
}