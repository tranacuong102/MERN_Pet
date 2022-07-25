import React, { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import { PUBLIC_ROUTES } from './routes'
import Loading from './commons/components/Loading'

import 'react-toastify/dist/ReactToastify.css'
import './App.scss'

function App() {
    return (
        <div className="app">
            <Suspense fallback={<Loading />}>
                <Routes>
                    {PUBLIC_ROUTES.map((route, index) =>
                        route.component ? (
                            <Route
                                key={index}
                                path={route.path}
                                exact={route.exact}
                                element={<route.component />}
                            />
                        ) : null
                    )}
                </Routes>
            </Suspense>
            <ToastContainer />
        </div>
    )
}

export default App
