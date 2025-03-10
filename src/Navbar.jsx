import { useState } from "react"
import { Link, NavLink } from "react-router-dom";

function NavBar() {

    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return(
        <>
            <div id="navBar" className="w-full h-full bg-green-700 flex items-center space-x-10">
                <header className="flex justify-between items-center text-white py-6 px-8">
                    <h1 className="text-white text-base font-semibold">Canton Chess</h1>
                    <ul className="hidden xl:flex items-center gap-4 font-semibold text-base absolute right-10">
                        <Link to="/"><li className="p-3 hover:bg-white hover:bg-opacity-10 rounded-md transition-all cursor-pointer">Home</li></Link>
                        <NavLink to="/about"><li className="p-3 hover:bg-white hover:bg-opacity-10 rounded-md transition-all cursor-pointer">About</li></NavLink>
                        <NavLink to="/classes"><li className="p-3 hover:bg-white hover:bg-opacity-10 rounded-md transition-all cursor-pointer">Classes</li></NavLink>
                        <NavLink to="/registration"><li className="p-3 hover:bg-white hover:bg-opacity-10 rounded-md transition-all cursor-pointer">Registration</li></NavLink>
                        <NavLink to="/faq"><li className="p-3 hover:bg-white hover:bg-opacity-10 rounded-md transition-all cursor-pointer">FAQ</li></NavLink>
                        <NavLink to="/contact"><li className="p-3 hover:bg-white hover:bg-opacity-10 rounded-md transition-all cursor-pointer">Contact</li></NavLink>
                    </ul>

                    <i className="bx bx-menu xl:hidden text-5xl cursor-pointer absolute right-4 pr-5" onClick={() => setIsMenuOpen(!isMenuOpen)}></i>
                    {isMenuOpen && (
                        <div className={`absolute xl:hidden z-50 top-14 left-0 w-full bg-green-700 flex flex-col items-center gap-6 font-semibold text-lg transform transition-transform ${isMenuOpen ? "opacity-100" : "opacity-0"}`} style={{transition: "transform 0.3s ease, opacity 0.3s ease"}}>
                            <Link to="/"><li className="list-none w-full text-center p-4 hover:bg-white hover:bg-opacity-10 transition-all cursor-pointer" onClick={() => setIsMenuOpen(!isMenuOpen)}>Home</li></Link>
                            <NavLink to="/about"><li className="list-none w-full text-center p-4 hover:bg-white hover:bg-opacity-10 transition-all cursor-pointer" onClick={() => setIsMenuOpen(!isMenuOpen)}>About</li></NavLink>
                            <NavLink to="/classes"><li className="list-none w-full text-center p-4 hover:bg-white hover:bg-opacity-10 transition-all cursor-pointer" onClick={() => setIsMenuOpen(!isMenuOpen)}>Classes</li></NavLink>
                            <NavLink to="/registration"><li className="list-none w-full text-center p-4 hover:bg-white hover:bg-opacity-10 transition-all cursor-pointer" onClick={() => setIsMenuOpen(!isMenuOpen)}>Registration</li></NavLink>
                            <NavLink to="/faq"><li className="list-none w-full text-center p-4 hover:bg-white hover:bg-opacity-10 transition-all cursor-pointer" onClick={() => setIsMenuOpen(!isMenuOpen)}>FAQ</li></NavLink>
                            <NavLink to="/contact"><li className="list-none w-full text-center p-4 hover:bg-white hover:bg-opacity-10 transition-all cursor-pointer" onClick={() => setIsMenuOpen(!isMenuOpen)}>Contact</li></NavLink>
                        </div>
                    )}
                    
                </header>
            </div>
        </>
    );
}

export default NavBar