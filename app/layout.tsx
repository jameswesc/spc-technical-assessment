import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import logo from '../assets/logo.png'
import Image from 'next/image'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Pacific DataViz Challenge 2023 2nd Edition',
    description: 'Entries for the Pacific DataViz Challenge 2023 2nd Edition',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <div className="bg-[#222529]">
                    <div className="container mx-auto p-3 md:p-4">
                        <Image
                            src={logo}
                            className="h-8 md:h-10 w-auto"
                            alt="Pacific DataViz challenge logo."
                        />
                    </div>
                </div>
                {children}
            </body>
        </html>
    )
}
