
import * as React from 'react'
import Link from 'next/link'
import NavBar from './nav-bar'

const Header = ( { pathname } ) => (
    <div>
        <NavBar />
        <Link href="/">
            <a className={pathname === '/' ? 'is-active' : ''}>Home</a>
        </Link>{' '}
        <Link href="/about">
            <a className={pathname === '/about' ? 'is-active' : ''}>About</a>
        </Link>
    </div>
)

export default Header;