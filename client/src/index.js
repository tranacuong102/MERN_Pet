import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import { viVN } from '@mui/material/locale'
import { createTheme, ThemeProvider } from '@mui/material'
import App from './App'
import { StoreProvider } from './stores/context'

import reportWebVitals from './reportWebVitals'

const theme = createTheme(
    {
        typography: {
            fontFamily: [
                'Roboto',
                'Source Sans Pro',
                'Arial',
                'sans-serif',
            ].join(','),
        },
        breakpoints: {
            values: {
                xs: 0,
                ls: 400,
                sm: 600,
                md: 900,
                lg: 1200,
                xl: 1536,
            },
        },
    },
    viVN
)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <RecoilRoot>
        <Router>
            <ThemeProvider theme={theme}>
                <StoreProvider>
                    <App />
                </StoreProvider>
            </ThemeProvider>
        </Router>
    </RecoilRoot>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
