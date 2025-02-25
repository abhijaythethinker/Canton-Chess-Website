import React, { useState } from 'react';

function FAQ() {
    const [openQuestion, setOpenQuestion] = useState(null);

    const questions = [
        {
            question: "What is a USCF ID?",
            answer: "A USCF ID is a unique identification number assigned to members of the United States Chess Federation.",
        },
        {
            question: "How do I register for a USCF membership?",
            answer: "Go to https://new.uschess.org/ select 'Join' and 'Become A Member'.",
        },
        {
            question: "Why does it say my USCF is expired?",
            answer: "Your USCF membership is only valid until its expiration date. If it's expired, you must go on the website and renew your membership.",
        },
        {
            question: "Do I need a USCF membership to play in tournaments?",
            answer: "Yes, you need a USCF membership to play in all rated USCF tournaments.",
        },
        {
            question: "Can I play if I don't have a rating?",
            answer: "Yes, you can play as long as your membership is current.",
        },
        {
            question: "I paid for/renewed a membership, but it still shows as expired or missing in your system?",
            answer: "Please wait at least 5 minutes after purchasing a membership to allow the USChess website to update. If the issue still persists, please contact us.",
        },
        {
            question: "I pasted my USCF ID from USChess, but I can't press 'Check Membership'?",
            answer: "Always type your USCF ID manually to avoid copying extra spaces that may prevent all 8 numbers from displaying.",
        },
        {
            question: "Do I need a chess set and clock to play in this tournament?",
            answer: "No. However, it is strongly recommended as we don't provide boards and clocks.",
        },
    ];

    const toggleQuestion = (index) => {
        setOpenQuestion(openQuestion === index ? null : index);
    };

    return (
        <div className="w-screen h-screen bg-slate-50">
            <div className="w-screen h-fit bg-slate-50 flex flex-col items-center px-5">
                <h1 className="text-4xl sm:text-5xl my-12 text-green-700 font-semibold text-center">
                    Frequently Asked Questions
                </h1>

                {questions.map((q, index) => (
                    <div
                        key={index}
                        className="h-fit w-full sm:w-10/12 md:w-3/4 lg:w-2/3 bg-white border border-gray-100 flex flex-col items-center justify-center rounded-3xl shadow-xl p-5 mb-10"
                    >
                        <div className="flex items-center justify-between w-full px-5">
                            <h1 className="font-semibold text-base sm:text-lg md:text-xl">{q.question}</h1>
                            <i
                                className={`bx ${openQuestion === index ? 'bxs-minus-circle' : 'bxs-plus-circle'} 
                                text-green-700 text-2xl cursor-pointer`}
                                onClick={() => toggleQuestion(index)}
                            ></i>
                        </div>
                        {openQuestion === index && (
                            <p className="my-4 font-medium text-sm sm:text-base md:text-lg text-center">{q.answer}</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FAQ;
