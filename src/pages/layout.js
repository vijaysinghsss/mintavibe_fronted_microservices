import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar/Navbar'

const Layout = () => {
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