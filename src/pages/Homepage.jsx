import { Link } from "react-router-dom";
import Questions from '../assets/Homepage/Question.jsx';
import CardFeatures from "../assets/Homepage/cardFeatures.jsx";

const Homepage = () => {
    const button = 'w-56 h-12 border-[1px] border-black rounded-5 text-xl text-black ';
    const gradientStyle = {
        background: 'radial-gradient(circle at bottom left, #FFB0B0, #FFEFE3 30%)',
        backgroundSize: 'cover'
      };
    

    return ( 
        <div className="w-screen h-full flex flex-col items-center justify-center gap-28 pt-28 pb-28 overflow-hidden" style={gradientStyle}>
            
            <div className="w-[55%] h-full flex">
                <div className="w[50%] flex flex-col gap-6">
                    <h1>TaskFlow Brings all your tasks, teammates, and tools together</h1>
                    <h3>Keep everything in the same place—even if your team isn’t.</h3>
                    <Link><button className={`${button} bg-[#FFAF64]`}>Get Started</button></Link>
                </div>
                <div className="header-img">
                    <img src="homepage-1.png" alt="icon" />
                </div>
            </div>

            <div className="w-[55%] h-full ">
                <div className="flex flex-col gap-4">
                    <h1>Simplify Your Task Management</h1>
                    <h3>Efficiently organize and prioritize your tasks with ease.</h3>
                    <CardFeatures />
                </div>
            </div>

            <div className="w-[55%] h-full flex flex-col gap-10 ">
                <h1>Work Process</h1>
                <img src="homepage-2.png" alt="work-process" />
            </div>

            <div className="w-[55%] h-full flex flex-col gap-10">
                <h1>Why TaskFlow is the best for you!!</h1>
                <div className="flex gap-5">
                    <div className="flex flex-col gap-4">
                        <h3>1. Expert Team</h3>
                        <img src="homepage-3.png" alt="conceptual-photo" className="h-60 w-80"/>
                        <p>Our team comprises individuals who are passionate and offers support at any given time.</p>
                    </div>
                    <div className="flex flex-col gap-4">
                        <h3>2. Customized</h3>
                        <img src="homepage-4.png" alt="conceptual-photo" className="h-60 w-full"/>
                        <p>Every project is tailored to your specific needs, that³s uni¿uely yours.</p>
                    </div>
                    <div className="flex flex-col gap-4">
                        <h3>3. Technology</h3>
                        <img src="homepage-5.png" alt="conceptual-photo" className="h-60 w-full"/>
                        <p>We stay up-to-date with the latest technologies to provide solutions.</p>
                    </div>
                </div>
            </div>

            <div className="w-[55%]">
                <Questions />
            </div>

            <div className="w-[55%] h-full flex gap-12">
                <div className="w-[60%] flex flex-col gap-6">
                <h3>Do you need help? Contact our support team.</h3>
                <p>At TaskFlow, we believe that excellent support is key to your success. Whether you're just getting started or need assistance with advanced features, our dedicated support team is here to help.</p>
                <Link to="/help"><button className={`${button} bg-[#EA9F92]`}>Need Help</button></Link>
                </div>
                <div>
                    <img src="homepage-6.png" alt="img" />
                </div>
            </div>

        </div>
     );
}
 
export default Homepage;