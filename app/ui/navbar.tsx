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
                        'text-sm font-medium transition-colors',
                        pathname === link.href
                            ? 'text-black border-b-2 border-black'
                            : 'text-gray-500 hover:text-black'
                    )}
                >
                    {link.name}
                </Link>
            ))}
        </nav>
    )
}