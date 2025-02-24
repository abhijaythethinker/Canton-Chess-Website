function Classes() {

    const cantonChessURL = "https://mi-cantontownship.civicrec.com/MI/canton-leisure-services/catalog/index/7acdf463fa82a4f15e0f5136182c8052?filter=c2VhcmNoPWNoZXNz"

    return(
        <>
            <div className="w-screen h-screen bg-slate-50">
                {/* Computer & Tablet View */}
                <div className="hidden md:flex w-full h-fit bg-slate-50 flex-col items-center px-5">
                    <h1 className="text-5xl w-fit h-fit my-12 text-green-700 font-semibold">Classes</h1>

                    {/* Beginner Classes Card */}
                    <div className="h-fit w-fit bg-white border border-gray-100 flex flex-row items-center rounded-3xl shadow-xl mb-10 overflow-hidden">
                        <div className="p-10">
                            <h1 className="font-semibold text-3xl">Beginner Classes</h1>
                            <br></br>
                            <h2 className="font-semibold w-96 mb-10">
                                Learn Chess even if you have no prior knowledge or experience. This class will 
                                develop your abilities from beginner to intermediate tournament chess player. 
                                For more info click the button below.
                            </h2>
                            <div className="flex justify-center">
                            <button onClick={() => window.open(cantonChessURL, "_blank")} className="py-4 px-14 rounded-lg bg-green-700 text-white border-2 border-green-700 hover:bg-white hover:text-green-700 font-semibold transition-colors duration-400 cursor-pointer">Sign Up</button>
                            </div>  
                        </div>
                        <img src="/images/checkmate.jpg" alt="chess image" className="h-full object-cover"></img>
                    </div>
                    {/* Intermediate Classes Card */}
                    <div className="h-fit w-fit bg-white border border-gray-100 flex flex-row items-center rounded-3xl shadow-xl mb-10 overflow-hidden">
                        <div className="p-10">
                            <h1 className="font-semibold text-3xl">Intermediate Classes</h1>
                            <br></br>
                            <h2 className="font-semibold w-96 mb-10">
                                This next-level course is designed for intermediate players from 800-1400 USCF 
                                ratings. New themes will be introduced based on previous experience as well as 
                                an emphasis on the practical game and competition. For more info click the button below.
                            </h2>
                            <div className="flex justify-center">  
                                <button onClick={() => window.open(cantonChessURL, "_blank")} className="py-4 px-14 rounded-lg bg-green-700 text-white border-2 border-green-700 hover:bg-white hover:text-green-700 font-semibold transition-colors duration-400 cursor-pointer">Sign Up</button>
                            </div>  
                        </div>
                        <img src="/images/checkmate2.jpg" alt="chess image" className="h-full object-cover"></img>
                    </div>
                </div>
                {/* Phone View */}
                <div className="flex md:hidden w-full h-fit bg-slate-50 flex-col items-center px-5">
                    <h1 className="text-5xl w-fit h-fit my-12 text-green-700 font-semibold">Classes</h1>

                    {/* Beginner Classes Card */}
                    <div className="h-fit w-3/4 bg-white border border-gray-100 flex flex-row items-center text-center rounded-3xl shadow-xl mb-10 overflow-hidden">
                        <div className="p-10">
                            <h1 className="font-semibold text-3xl">Beginner Classes</h1>
                            <br></br>
                            <h2 className="font-semibold w-full mb-10">
                                Learn Chess even if you have no prior knowledge or experience. This class will 
                                develop your abilities from beginner to intermediate tournament chess player. 
                                For more info click the button below.
                            </h2>
                            <div className="flex justify-center">
                            <button onClick={() => window.open(cantonChessURL, "_blank")} className="py-4 px-14 rounded-lg bg-green-700 text-white border-2 border-green-700 hover:bg-white hover:text-green-700 font-semibold transition-colors duration-400 cursor-pointer">Sign Up</button>
                            </div>  
                        </div>
                    </div>
                    {/* Intermediate Classes Card */}
                    <div className="h-fit w-3/4 bg-white border border-gray-100 flex flex-row items-center text-center rounded-3xl shadow-xl mb-10 overflow-hidden">
                        <div className="p-10">
                            <h1 className="font-semibold text-3xl">Intermediate Classes</h1>
                            <br></br>
                            <h2 className="font-semibold w-full mb-10">
                                This next-level course is designed for intermediate players from 800-1400 USCF 
                                ratings. New themes will be introduced based on previous experience as well as 
                                an emphasis on the practical game and competition. For more info click the button below.
                            </h2>
                            <div className="flex justify-center">  
                                <button onClick={() => window.open(cantonChessURL, "_blank")} className="py-4 px-14 rounded-lg bg-green-700 text-white border-2 border-green-700 hover:bg-white hover:text-green-700 font-semibold transition-colors duration-400 cursor-pointer">Sign Up</button>
                            </div>  
                        </div>
                    </div>
                </div>
            </div>
            
        </>
    );  
}

export default Classes