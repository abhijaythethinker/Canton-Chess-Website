import React, { useState } from 'react';
import Scraper from './Scraper.jsx';

function Registration() {
    const [showRules, setShowRules] = useState(true);

    const sections = [
        {
            title: 'Location',
            rules: [
                'Summit Canton 46000 Summit Pkwy Canton, MI, 48188, United States'
            ],
        },
        {
            title: 'Format & Time Control',
            rules: [
                '4 round Swiss, USCF rated tournament, OPEN, U1500, & U1000',
                'Time Control: OPEN & U1500 G50; d5',
                'Time Control: U1000 G25; d5',
            ],
        },
        {
            title: 'Rounds',
            rules: [
                'OPEN: 9:00 AM, 11:00 AM, 1:00 PM, 3:00 PM',
                'U1500: 9:00 AM, 11:00 AM, 1:00 PM, 3:00 PM',
                'U1000: 10:00 AM, 11:15 AM, 12:30 PM, 1:45 PM',
            ],
        },
        {
            title: 'Registration',
            rules: [
                'Registration via our website only, no in-person registration',
                'Please Note: Registration is NOT possible if USCF membership has expired',
                'OPEN & U1500: $25 CASH ONLY pay on-site',
                'U1000: $20 CASH ONLY pay on-site',
                'Open section for players above USCF 1500 rating ONLY',
                'U1500 section for players above USCF 1000 rating ONLY',
                'Last day to register is 2 days before tournament by 9 PM',
            ],
        },
        {
            title: 'Prizes',
            rules: [
                'OPEN: 50% of Total Prize money split between 1st, 2nd and 3rd places',
                'U1500: 50% of Total Prize money split between 1st, 2nd and 3rd places',
                'U1000: Trophies for 1st, 2nd, 3rd, 4th, 5th',
            ],
        },
    ];

    return (
        <>
            {showRules ? (
                <div className="min-h-screen flex items-center justify-center bg-slate-50 p-8 2xl:p-0 overflow-y-auto">
                    <div className="w-full max-w-4xl bg-white p-6 sm:p-10 rounded-3xl shadow-xl flex flex-col items-center space-y-8">
                        <h2 className="text-3xl font-semibold text-green-700">Tournament Rules</h2>
                        <div className="flex flex-col space-y-6 w-full">
                            {sections.map((section, index) => (
                                <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-md">
                                    <h3 className="text-2xl font-semibold text-green-700 mb-4">{section.title}</h3>
                                    <ul className="list-disc text-left text-base sm:text-lg text-gray-800 space-y-2 pl-5">
                                        {section.rules.map((rule, ruleIndex) => (
                                            <li key={ruleIndex}>{rule}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                        <button
                            onClick={() => setShowRules(false)}
                            className="w-full py-3 mt-6 rounded-lg bg-green-700 text-white border-2 border-green-700 hover:bg-white hover:text-green-700 font-semibold transition-colors duration-400"
                        >
                            I Agree, Proceed
                        </button>
                    </div>
                </div>
            ) : (
                <Scraper />
            )}
        </>
    );
}

export default Registration;
