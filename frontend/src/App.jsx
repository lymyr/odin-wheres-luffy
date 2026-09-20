import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Routes from './Routes.jsx'
import { useState } from 'react'
import TokenContext from './hooks/TokenContext.js'

function App() {
  const [token, setToken] = useState()
  return (
    <TokenContext value={[token, setToken]}>
        <RouterProvider router={createBrowserRouter(Routes)} />
    </TokenContext>
  )
}

export default App
