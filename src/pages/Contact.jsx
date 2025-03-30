import { useState } from "react"
import emailjs from '@emailjs/browser'

function Contact() {

    const[name, SetName] = useState('');
    const[uscf, SetUscf] = useState('');
    const[email, SetEmail] = useState('');
    const[message, SetMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const templateParameters = {
            from_name: name,
            from_uscf: uscf,
            from_email: email,
            to_name: 'Canton Chess',
            message: message,
        };
    
        emailjs
            .send(import.meta.env.VITE_SERVICE_ID, import.meta.env.VITE_TEMPLATE_ID, templateParameters, import.meta.env.VITE_PUBLIC_KEY)
            .then((response) => {
                console.log('Email sent successfully!', response);
                const alertBox = document.getElementById('successAlert');
                // Show alert with animation
                alertBox.classList.remove('hidden', 'opacity-0', 'translate-x-5');
                alertBox.classList.add('opacity-100', 'translate-x-0');

                // Hide the alert after 3 seconds
                setTimeout(() => {
                    alertBox.classList.remove('opacity-100', 'translate-x-0');
                    alertBox.classList.add('opacity-0', 'translate-x-5');
                }, 3000);
                SetName('');
                SetUscf('');
                SetEmail('');
                SetMessage('');
            })
            .catch((error) => {
                console.error('Error sending email:', error);
            });
    };
    

    return(
        <>
            <div className="bg-slate-50">
                <div className="py-8 lg:py-16 px-4 mx-auto w-screen 2xl:w-3/5 h-screen bg-slate-50">
                    <div id="successAlert" class="hidden fixed top-24 right-4 bg-green-200 text-green-700 px-6 py-4 rounded-lg shadow-lg shadow-green-200/70 transform transition-all duration-500 ease-in-out opacity-0 translate-x-5">
                        <p>Email Sent Successfully!</p>
                    </div>

                    <h2 className="mb-4 text-4xl tracking-tight font-semibold text-center text-green-700">Contact Us</h2>
                    <div className="flex items-center justify-center space-x-2 mb-4">
                        <i className='bx bx-envelope text-2xl tracking-tight text-green-700'></i>
                        <h2 className="text-xl tracking-tight font-semibold text-center text-green-700">cantonchess2017@gmail.com</h2>
                    </div>

                    <form action="#" className="space-y-8" onSubmit={handleSubmit}>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-green-700">Name</label>
                            <input 
                            value={name}
                            onChange={(e) => SetName(e.target.value)}
                            type="text" className="block p-3 w-full text-sm text-black bg-slate-50 rounded-lg shadow-sm border-2 border-green-700 focus:ring-2 focus:ring-green-500 focus:outline-none focus:shadow-lg focus:shadow-green-500/60 focus:border-slate-50 px-4 py-2" placeholder="First Name Last Name" required
                            />
                        </div>
                        {/* <div>
                            <label className="block mb-2 text-sm font-medium text-green-700">USCF ID</label>
                            <input 
                            value={uscf}
                            maxLength="8"
                            onChange={(e) => {
                                const value = e.target.value;
                                SetUscf(value);
                            }}
                            type="text" className="block p-3 w-full text-sm text-black bg-slate-50 rounded-lg shadow-sm border-2 border-green-700 focus:ring-2 focus:ring-green-500 focus:outline-none focus:shadow-lg focus:shadow-green-500/60 focus:border-slate-50 px-4 py-2" placeholder="12345678" required
                            />
                        </div> */}
                        <div>
                            <label className="block mb-2 text-sm font-medium text-green-700">Your email</label>
                            <input
                            value={email}
                            onChange={(e) => SetEmail(e.target.value)}
                            type="email" className="bg-slate-50 border-2 border-green-700 focus:ring-2 focus:ring-green-500 focus:outline-none focus:shadow-lg focus:shadow-green-500/60 focus:border-slate-50 px-4 py-2 text-black text-sm rounded-lg shadow-sm block w-full p-2.5 " placeholder="name@gmail.com" required
                            />
                        </div>
                        <div className="sm:col-span-2">
                            <label className="block mb-2 text-sm font-medium text-green-700">Your message</label>
                            <textarea
                            value={message}
                            onChange={(e) => SetMessage(e.target.value)} 
                            rows="6" className="block p-2.5 w-full text-sm text-black bg-slate-50 rounded-lg shadow-sm border-2 border-green-700 focus:ring-2 focus:ring-green-500 focus:outline-none focus:shadow-lg focus:shadow-green-500/60 focus:border-slate-50 px-4 py-2" placeholder="Leave a comment..." required>
                            </textarea>
                        </div>
                        <div className="flex justify-center">
                            <button 
                            disabled={uscf.length !== 8} // Disable if not exactly 8 characters
                            className={`${
                                uscf.length === 8 ? 'py-3 px-5 text-sm font-medium text-center text-white rounded-lg shadow-lg sm:w-fit bg-green-700 border-2 border-green-700 hover:bg-green-800 hover:border-green-800 transition-colors duration-400 cursor-pointer' : 'py-3 px-5 text-sm font-medium text-center text-gray-500 rounded-lg shadow-lg sm:w-fit bg-gray-300 border-2 border-gray-300 cursor-not-allowed'
                            }`}
                            type="submit">
                            Send message
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Contact