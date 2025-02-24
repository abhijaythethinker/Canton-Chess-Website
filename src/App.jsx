import NavBar from "./Navbar"
import Home from "./pages/Home"
import About from "./pages/About"
import Classes from "./pages/Classes"
import Registration from "./pages/Registration"
import Faq from "./pages/Faq"
import { Route, Routes } from "react-router-dom"
import Contact from "./pages/Contact"

function App() {

  return (
    <>
      <NavBar/>
      <Routes>
      <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/classes" element={<Classes/>}/>
        <Route path="/registration" element={<Registration/>}/>
        <Route path="/faq" element={<Faq/>}/>
        <Route path="/contact" element={<Contact/>}/>
      </Routes>
    </>
  )
}

export default App
