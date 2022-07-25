import React, { Suspense, useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'

import Loading from '../../commons/components/Loading'
import { PRIVATE_ROUTES } from '../../routes'
import AdminDashboard from '../../commons/components/AdminDashboard'
import { getCurrentUser } from '../../models/User'
import Header from '../../commons/components/Header'
import MainPage from '../../commons/components/MainPage'
import Footer from '../../commons/components/Footer'

function Index() {
    const [isAdmin, setIsAdmin] = useState(false)

    const [isHomePage, setIsHomePage] = useState(true)
    const location = useLocation()

    useEffect(() => {
        const currentUser = getCurrentUser()
        if (currentUser) {
            if (currentUser.roles === 2) {
                setIsAdmin(true)
            } else {
                setIsAdmin(false)
            }
        }
    }, [])

    useEffect(() => {
        if (location.pathname === '/' || location.pathname === '/*') {
            setIsHomePage(true)
        } else {
            setIsHomePage(false)
        }
        return () => {
            setIsHomePage(null)
        }
    }, [location])

    return (
        <div className="wrapper">
            <Header />
            <div className="main-body">
                <div className="container">
                    {isAdmin && <AdminDashboard />}

                    <Suspense fallback={<Loading />}>
                        <Routes>
                            {PRIVATE_ROUTES.map((route, index) =>
                                route.component ? (
                                    <Route
                                        key={index}
                                        path={route.path}
                                        element={<route.component />}
                                    />
                                ) : null
                            )}
                        </Routes>
                    </Suspense>

                    {isHomePage && <MainPage />}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Index
