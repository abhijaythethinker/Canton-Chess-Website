import { NavLink } from "react-router-dom";
import { motion } from "framer-motion"

function Home() {

    return(
        <>
            <div className="w-screen min-h-screen bg-gradient-to-b from-black via-gray-900 to-gray-800">
                {/* About Registration Buttons and Logo */}
                <div 
                    className="sm:flex xl:flex-row flex-col"
                >
                    <div className="xl:w-1/2 xl:py-96 w-full h-96 flex flex-col items-center justify-center">
                        <motion.h1 
                            initial={{ opacity: 0, y: -20 }} 
                            animate={{ opacity: 1, y: 0 }} 
                            transition={{ duration: 0.5 }} 
                            className="text-green-700 sm:text-7xl text-5xl mb-12 font-semibold">Canton Chess
                        </motion.h1>
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }} 
                            animate={{ opacity: 1, x: 0 }} 
                            transition={{ duration: 0.5 }} 
                            className="flex sm:flex-row flex-col sm:gap-12 gap-4"
                        >
                            <NavLink to="/about"><button className="py-4 px-14 rounded-lg bg-green-700 text-white border-2 border-green-700 hover:bg-transparent hover:text-green-700 font-semibold transition-colors duration-400 cursor-pointer">About</button></NavLink>
                            <NavLink to="/registration"><button className="py-4 xl:px-8 sm:px-12 px-8 rounded-lg text-green-700 border-2 border-green-700 hover:bg-green-700 hover:text-white font-semibold transition-colors duration-400 cursor-pointer">Registration</button></NavLink>
                        </motion.div>
                    </div>
                    
                    <div className="xl:w-1/2 xl:py-96 w-full h-96 sm:h-96 md:py-80 sm:py-64 flex items-center justify-center">
                        <motion.img 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        transition={{ duration: 1 }} 
                        src="/images/logo.png" alt="Canton Chess Logo" className="flex items-center justify-center scale-75 sm:scale-50 2xl:scale-50 xl:scale-75 drop-shadow-lg"/>
                    </div>
                </div>

                {/* About Us */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ duration: 0.5 }} 
                    className="w-full h-fit flex flex-col items-center justify-center bg-transparent"
                >
                    <h1 className="text-5xl font-semibold mb-6 text-green-700">About Us</h1>
                    <h1 className="text-2xl text-center mb-6 text-green-700">Promoting Competitive Chess</h1>
                    <h1 className="w-3/4 text-center text-green-700">Each month, we host tournaments inspiring players of all levels to engage with the game. Our goal is to create a fantastic experience where everyone can have fun and enjoy the competition.</h1>
                </motion.div>

                {/* Copyright */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ duration: 0.5 }} 
                    className="w-full h-20 flex items-center justify-center font-semibold bg-transparent">
                    <h1 className="text-green-700">Copyright © Canton Chess 2025</h1>
                </motion.div>
            </div>
        </>
    );
}

export default Home