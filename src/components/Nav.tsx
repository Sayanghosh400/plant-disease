import { url } from 'inspector'
import Link from 'next/link'
import React from 'react'

const Nav = () => {
    return (
        <header className="flex flex-col items-center justify-between w-full md:w-6xl px-2 md:px-6 py-2 mx-auto md:flex-row bg-[#679267] p-4">
            <Link href="/home" className="text-indigo-900 z-10 active">
                <img src="/happyplant.png" className="w-24 py-8 md:py-0 g-image" />
            </Link>
            <nav className="z-10">
                <ul className="flex flex-row items-center px-6 py-4 text-indigo-100 bg-green-900 rounded-lg">
                    <li className="pr-8">
                        <Link href="/home">Home</Link>
                    </li>
                    <li className="pr-8">
                        <Link href="/login">LogIn</Link>
                    </li>
                </ul>
            </nav>
        </header>

    )
}

export default Nav