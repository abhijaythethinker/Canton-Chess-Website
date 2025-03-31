import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser'
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

// Firebase config
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

function Scraper() {
    const [uscfId, setUscfId] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [playerName, setPlayerName] = useState('');
    const[email, SetEmail] = useState('');
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isEmailValid = emailPattern.test(email);
    const [sectionName, setSectionName] = useState('');
    const [tmDate, setTmDate] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [confirmationMessage, setConfirmationMessage] = useState(''); // Confirmation message state

    const fetchMembershipInfo = async () => {
        console.log('Fetching data...');
        setLoading(true);
        setError('');
        try {
            if (!uscfId) {
                setError('USCF ID is required');
                return;
            }
    
            console.log('Making fetch request...');
            const response = await fetch('/api/get-membership-expiration', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ uscfId }),
            });
    
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
    
            const data = await response.json();
            console.log('Received data:', data);
            setExpirationDate(data.expirationDate || 'No data found');
            setPlayerName(data.playerName || 'Name not found');
    
            const isExpired = new Date(data.expirationDate) < new Date();
            setIsValid(!isExpired);
    
        } catch (error) {
            console.error('Error fetching data:', error);
            setError('USCF ID not found. Please check your input and try again.');
        } finally {
            setLoading(false);
        }
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (tmDate == 'Apr 27') {
            try {
                const collectionRef = collection(firestore, "April DB");
                await addDoc(collectionRef, {
                    playerName,
                    expirationDate,
                    uscfId,
                    sectionName,
                    email,
                });
    
                setPlayerName('');
                setExpirationDate('');
                setUscfId('');
                setSectionName('');
                setTmDate('');
    
                setConfirmationMessage(`${playerName} registered for ${sectionName} section on ${tmDate}!`);
                setTimeout(() => setConfirmationMessage(''), 10000); // Clear message after 3 seconds
    
            } catch (error) {
                console.error("Error submitting data: ", error);
            }
        }
        if (tmDate == 'June 21') {
            try {
                const collectionRef = collection(firestore, "June DB");
                await addDoc(collectionRef, {
                    playerName,
                    expirationDate,
                    uscfId,
                    sectionName,
                    email,
                });
    
                setPlayerName('');
                setExpirationDate('');
                setUscfId('');
                setSectionName('');
                setTmDate('');
    
                setConfirmationMessage(`${playerName} registered for ${sectionName} section on ${tmDate}!`);
                setTimeout(() => setConfirmationMessage(''), 4000); // Clear message after 3 seconds
    
            } catch (error) {
                console.error("Error submitting data: ", error);
            }
        }    

        const templateParameters = {
            name: playerName,
            date_name: tmDate,
            section_name: sectionName,
            uscf_id: uscfId,
            email: email,
        };
    
        emailjs
            .send(import.meta.env.VITE_SERVICE_ID, import.meta.env.VITE_TEMPLATE_REGISTRATION_ID, templateParameters, import.meta.env.VITE_PUBLIC_KEY)
            .then((response) => {
                console.log('Email sent successfully!', response);
                SetEmail('');
            })
            .catch((error) => {
                console.error('Error sending email:', error);
                SetEmail('');
            });
    };

    const isExpired = new Date(expirationDate) < new Date();

    return (
        <div className="w-screen h-screen flex items-center justify-center bg-slate-50 p-5">
            <div className="w-full max-w-sm bg-white p-8 rounded-3xl shadow-xl flex flex-col items-center 2xl:scale-125 overflow-auto max-h-screen">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Enter USCF ID & Check Membership</h2>

                {/* Confirmation Message */}
                {confirmationMessage && (
                    <div className="w-full bg-green-200 text-green-700 py-3 px-4 rounded-lg mb-4 text-center font-medium shadow-md shadow-green-200/70">
                        {confirmationMessage}
                    </div>
                )}

                <input
                    className="w-full text-center text-lg py-3 px-6 mb-6 rounded-lg shadow-sm border-2 border-green-700 focus:ring-2 focus:ring-green-500 focus:outline-none focus:shadow-lg focus:shadow-green-500/60 focus:border-slate-50"
                    type="text"
                    value={uscfId}
                    maxLength="8"
                    onChange={(e) => {
                        setUscfId(e.target.value);
                        setPlayerName('');
                        setExpirationDate('');
                        setSectionName('');
                        setTmDate('');
                    }}
                    placeholder="Enter USCF ID"
                />
                <button
                    onClick={fetchMembershipInfo}
                    disabled={loading || !(uscfId.length === 8 && parseInt(uscfId, 10) > 9999999)}
                    className={`w-full py-3 mb-6 rounded-lg border-2 font-semibold  transition-colors duration-400 ${
                        !loading && uscfId.length === 8 && parseInt(uscfId, 10) > 9999999 ? 'bg-green-700 text-white hover:bg-white hover:text-green-700 border-green-700 cursor-pointer' : 'bg-gray-300 text-gray-500 border-gray-300 cursor-not-allowed'
                    }`}
                >
                    {loading ? 'Loading...' : 'Check Membership'}
                </button>
                {error && <p className="text-red-600 mb-4">{error}</p>}

                <div className="w-full">
                    <p className="text-lg font-medium text-gray-800 mb-2">Name: {playerName}</p>
                    <p className="text-lg font-medium text-gray-800 mb-2">Expiration Date: {expirationDate}</p>
                    <p className="text-lg font-medium text-gray-800 mb-2">Section: {sectionName}</p>
                </div>

                <div className="w-full flex justify-around mb-4">
                    <button
                        onClick={() => setSectionName('U1000')}
                        className="py-3 px-4 rounded-lg bg-green-700 text-white border-2 border-green-700 hover:bg-white hover:text-green-700 font-semibold transition-colors duration-400">
                        U1000
                    </button>
                    <button
                        onClick={() => setSectionName('U1500')}
                        className="py-3 px-4 rounded-lg bg-green-700 text-white border-2 border-green-700 hover:bg-white hover:text-green-700 font-semibold transition-colors duration-400">
                        U1500
                    </button>
                    <button
                        onClick={() => setSectionName('OPEN')}
                        className="py-3 px-4 rounded-lg bg-green-700 text-white border-2 border-green-700 hover:bg-white hover:text-green-700 font-semibold transition-colors duration-400">
                        OPEN
                    </button>
                </div>

                <div className="w-full">
                    <p className="text-lg font-medium text-gray-800 mb-2">Tournament Date: {tmDate}</p>
                </div>

                <div className="w-full flex justify-around mb-4">
                    <button
                        onClick={() => setTmDate('Apr 27')}
                        className="py-3 px-8 rounded-lg bg-green-700 text-white border-2 border-green-700 hover:bg-white hover:text-green-700 font-semibold transition-colors duration-400">
                        Apr 27
                    </button>
                    <button
                        onClick={() => setTmDate('June 21')}
                        className="py-3 px-8 rounded-lg bg-green-700 text-white border-2 border-green-700 hover:bg-white hover:text-green-700 font-semibold transition-colors duration-400">
                        June 21
                    </button>
                </div>

                <div className="w-full">
                    <p className="text-lg font-medium text-gray-800 mb-2">Email:</p>
                    <input
                        value={email}
                        onChange={(e) => SetEmail(e.target.value)}
                        type="email" className= "border-2 border-green-700 focus:ring-2 focus:ring-green-500 focus:outline-none focus:shadow-lg focus:shadow-green-500/60 focus:border-slate-50 px-4 py-2 text-black text-sm rounded-lg shadow-sm block w-full p-2.5 mx-50" placeholder="name@gmail.com" required
                    />
                </div>

                <button
                    onClick={handleSubmit}
                    disabled={isExpired || !uscfId || !expirationDate || !playerName || !isEmailValid || sectionName.length === 0 || tmDate.length === 0 || email.length === 0}
                    className={`w-full py-3 mt-6 rounded-lg  border-2 font-semibold ${
                        isExpired || !uscfId || !expirationDate || !playerName || !isEmailValid || sectionName.length === 0 || tmDate.length === 0 || email.length === 0
                            ? 'bg-gray-300 text-gray-500 border-gray-300 cursor-not-allowed'
                            : 'bg-green-700 text-white border-green-700 hover:text-green-700 hover:bg-white hover:border-green-700 transition-colors duration-400'
                    }`}
                >
                    {isExpired ? 'USCF ID Expired' : 'Register'}
                </button>
            </div>
        </div>
    );
}

export default Scraper;
