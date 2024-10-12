import "./server"
import './App.css'

import { BrowserRouter, Routes, Route } from "react-router-dom"

import Layout from "./components/Layout"

import Home from "./pages/Home"
import About from "./pages/About"

import Vans from "./pages/Vans/Vans"
import VanDetail from "./pages/Vans/VanDetail"

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/vans" element={<Vans />} />
          <Route path="/vans/:id" element={<VanDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
