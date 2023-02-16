import React, { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar/Navbar'

const Layout = () => {
    const { pathname, search } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [search, pathname])

    return (
        <>
            <Navbar />
            <section className='topPading'>
                <Outlet />
            </section>
            <Footer />
        </>
    )
}

export default Layout