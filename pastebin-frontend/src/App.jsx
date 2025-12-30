import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import CreatePage from './pages/CreatePage'
import ViewPaste from './pages/ViewPaste'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CreatePage></CreatePage>} ></Route>
          <Route path="/p/:id" element={<ViewPaste></ViewPaste>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
