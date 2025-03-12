import { motion } from "framer-motion";

function About() {
    // Team member roles + descriptions
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
        <div className="w-screen min-h-screen bg-slate-50 flex flex-col items-center py-16">
            {/* Page Title */}
            <motion.h1 
                initial={{ opacity: 0, y: -20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.5 }}
                className="text-5xl text-green-700 font-semibold mb-12"
            >
                Meet Our Team
            </motion.h1>

            {/* Team Members */}
            <div className="w-full flex flex-wrap justify-center gap-10 px-6">
                {teamMembers.map((member, index) => (
                    <motion.div 
                        key={index}
                        initial={{ opacity: 0, y: 20 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                        className="bg-white rounded-3xl shadow-lg w-full sm:w-10/12 md:w-7/12 lg:w-5/12 xl:w-1/3 p-6 flex flex-col items-center hover:scale-105 transition-transform"
                    >
                        {/* Profile Picture */}
                        <img 
                            className="rounded-full w-40 h-40 md:w-48 md:h-48"
                            src={member.pic}
                            alt={`${member.name}'s profile`}
                        />
                        {/* Name & Role */}
                        <h2 className="mt-6 text-xl font-semibold text-green-700 text-center">{member.name}</h2>
                        <h3 className="text-md font-medium text-gray-600 mb-4">{member.role}</h3>
                        {/* Description */}
                        <p className="text-center text-gray-700 px-4">{member.description}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

export default About;
