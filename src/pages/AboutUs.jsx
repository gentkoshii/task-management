import { Link } from "react-router-dom";
import React from 'react';
import '@fortawesome/fontawesome-free/css/all.css';
import { useTheme } from "../context/ThemeContext";

const AboutUs = () => {
    const button = 'w-56 h-12 border-[1px] border-black rounded-5 text-xl text-black';
    const { darkMode } = useTheme();
    const gradientStyle = darkMode
        ? { background: 'radial-gradient(circle at bottom left, #2D3748, #1A202C 60%)', backgroundSize: 'cover' }
        : { background: 'radial-gradient(circle at bottom left, #FFB0B0, #FFEFE3 60%)', backgroundSize: 'cover' };

    const linkClass = darkMode ? 'text-white' : 'text-black';
    const textClass = darkMode ? 'text-gray-300' : 'text-gray-700';

    return (
        <div className="w-screen h-full flex flex-col items-center justify-center gap-12 md:gap-28 pt-12 md:pt-28 pb-12 md:pb-28 overflow-hidden" style={gradientStyle}>
            <div className="w-[90%] md:w-[75%] lg:w-[55%] h-full flex flex-col gap-6 relative">

                <div className="flex flex-col md:flex-row justify-between items-start w-full mb-9">
                    <div className="flex flex-col gap-3">
                        <h1 className="text-2xl md:text-4xl font-bold mb-1 dark:text-white">About TaskFlow</h1>
                        <p className={`text-base md:text-lg ${textClass}`}>What’s behind the boards.</p>
                    </div>
                    <div className="header-img w-full md:w-[30%] lg:w-[30%] xl:max-w-xs mt-4 md:mt-0">
                    {darkMode ? (
                        <img src="Screenshot_4-Photoroom-white.png" alt="icon" className="w-full h-auto" />
                    ) : (
            <img src="Screenshot_4-Photoroom.png" alt="icon" className="w-full" />
          )}                    
          </div>
                </div>

                <p className="text-2xl md:text-4xl font-bold mb-1 dark:text-white">
                    The way your team works is <br />unique — so is TaskFlow.
                </p>
                <p className={`text-sm md:text-base ${textClass}`}>
                    TaskFlow is the flexible work management tool where teams can ideate plans, collaborate on projects, organize workflows, and track progress in a visual, productive, and rewarding way.
                    From brainstorm to planning to execution, TaskFlow manages the big milestones and the day-to-day tasks of working together and getting things done.
                </p>

            </div>

            <div className="w-[90%] md:w-[75%] lg:w-[55%] h-full flex flex-col gap-2">
                <h2 className="text-xl md:text-2xl font-bold mb-2 dark:text-white">A Brief History of TaskFlow</h2>
                <p className={`text-sm md:text-base ${textClass}`}>
                    Founded in 2023, TaskFlow emerged from the collective vision of a group of dedicated professionals who recognized the need for a more intuitive and effective task management solution. Frustrated with the complexity and limitations of existing tools, our team set out to create a platform that prioritizes user experience, flexibility, and seamless collaboration.
                    Over the years, we have continually refined and expanded our features, guided by the feedback and needs of our growing community of users. Today, TaskFlow stands as a testament to our commitment to innovation and excellence in task management.
                </p>
            </div>

            <div className="w-[90%] md:w-[75%] lg:w-[55%] h-full flex flex-col gap-2">
                <h2 className="text-xl md:text-2xl mb-2 dark:text-white">Millions of people and companies of all kinds and sizes love using TaskFlow.</h2>
                <p className={`text-sm md:text-base ${textClass}`}>
                    TaskFlow has quickly become a favorite among individuals and organizations worldwide.
                </p>
                <p className={`text-sm md:text-base ${textClass}`}>
                    With its robust set of features and ease of use, TaskFlow caters to the diverse needs of millions of users across various industries. From freelancers managing their daily tasks to large enterprises overseeing complex projects.
                </p>
                <div className="flex justify-center gap-5 mt-6">
                    <a href="#" className={`text-xl md:text-2xl ${linkClass}`}><i className="fab fa-twitter"></i></a>
                    <a href="#" className={`text-xl md:text-2xl ${linkClass}`}><i className="fab fa-google"></i></a>
                    <a href="#" className={`text-xl md:text-2xl ${linkClass}`}><i className="fab fa-instagram"></i></a>
                    <a href="#" className={`text-xl md:text-2xl ${linkClass}`}><i className="fab fa-youtube"></i></a>
                    <a href="#" className={`text-xl md:text-2xl ${linkClass}`}><i className="fab fa-facebook"></i></a>
                </div>
            </div>
        </div>
    );
}

export default AboutUs;
