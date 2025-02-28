function About() {
    // team member roles+descriptions
    const teamMembers = [
        {
            name: "Abhijay Das",
            pic: "/images/abhijayPic.png",
            role: "Chief Tournament Director",
            description: "I've been running this tournament for almost two years, aiming to inspire youth and promote chess in my community. My goal is to create an environment where players of all ages can develop their skills and passion for the game.",
        },
        {
            name: "Manmohan Das",
            pic: "/images/manmohanPic.jpg",
            role: "Chief Tournament Director",
            description: "I have been involved in running chess tournaments for several years. Also coached many primary, middle and high school teams within Plymouth Canton schools. Highest individual achievement, Michigan Class A champion.",
        },
        {
            name: "Ayush Das",
            pic: "/images/ayushPic.jpg",
            role: "Chief Tournament Director",
            description: "I've been running a local chess tournament with my brother for almost two years, working alongside our dad to promote chess and inspire the youth in our community. My goal is to create an environment where players of all ages can develop their skills and passion for the game.",
        },
    ];

    return (
        <div className="w-screen h-screen bg-slate-50">
            <div className="w-screen h-fit bg-slate-50">
                <div className="flex flex-col items-center">
                    <h1 className="text-5xl my-12 text-green-700 font-semibold">About</h1>

                    {teamMembers.map((member, index) => (
                        <div
                            key={index}
                            className="h-fit w-7/12 bg-white border border-gray-100 flex flex-col lg:flex-row items-center lg:items-start rounded-3xl shadow-xl p-5 mb-10 text-center"
                        >
                            <img
                                className="rounded-full w-40 h-40 lg:w-56 lg:h-56 p-4"
                                src={member.pic}
                                alt={`${member.name}'s profile`}
                            />
                            <div className="lg:w-4/5 lg:h-56 flex flex-col justify-center items-center py-6">
                                <h2 className="font-semibold mb-4">{member.name} - {member.role}</h2>
                                <p className="font-semibold text-xs sm:text-sm lg:text-base px-4">{member.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    );
}

export default About;
