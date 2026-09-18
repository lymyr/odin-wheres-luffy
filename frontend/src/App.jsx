import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Routes from './Routes.jsx'

function App() {
  return (
    <RouterProvider router={createBrowserRouter(Routes)} />
  )
}

export default App
