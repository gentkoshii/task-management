import { Link } from "react-router-dom";
import Questions from "../assets/Homepage/Question.jsx";
import CardFeatures from "../assets/Homepage/cardFeatures.jsx";

import ImageBg from "../../public/homepage-bg.png";

const Homepage = () => {
  const button =
    "w-56 h-12 border-[1px] border-black rounded-5 text-xl text-black ";

  const imageBg = {
    backgroundSize: "100%",
    backgroundImage: `url(${ImageBg})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
  };

  return (
    <div
      className="w-screen h-full flex flex-col items-center justify-center gap-28 pt-28 pb-28 overflow-hidden"
      style={imageBg}
    >
      <div className="w-[90%] md:w-[75%] lg:w-[55%] h-full flex flex-col lg:flex-row items-center gap-8">
        <div className="w-full lg:w-[50%] flex flex-col gap-6 text-center lg:text-left">
          <h1>TaskFlow Brings all your tasks, teammates, and tools together</h1>
          <h3>Keep everything in the same place—even if your team isn’t.</h3>
          <Link to={"/login"}>
            <button className={`${button} bg-[#FFAF64]`}>Get Started</button>
          </Link>
        </div>
        <div className="header-img w-full lg:w-auto flex justify-center">
          <img src="homepage-1.png" alt="icon" className="max-w-full" />
        </div>
      </div>

      <div className="w-[90%] md:w-[75%] lg:w-[55%] h-full flex flex-col items-center text-center">
        <div className="flex flex-col gap-4">
          <h1>Simplify Your Task Management</h1>
          <h3>Efficiently organize and prioritize your tasks with ease.</h3>
          <CardFeatures />
        </div>
      </div>

      <div className="w-[90%] md:w-[75%] lg:w-[55%] h-full flex flex-col gap-10 items-center text-center">
        <h1>Work Process</h1>
        <img src="homepage-2.png" alt="work-process" className="max-w-full" />
      </div>

      <div className="w-[90%] md:w-[75%] lg:w-[55%] h-full flex flex-col gap-10 items-center text-center">
        <h1>Why TaskFlow is the best for you!!</h1>
        <div className="flex flex-col md:flex-row gap-5">
          <div className="flex flex-col gap-4">
            <h3>1. Expert Team</h3>
            <img
              src="homepage-3.png"
              alt="conceptual-photo"
              className="h-60 w-full"
            />
            <p>
              Our team comprises individuals who are passionate and offers
              support at any given time.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <h3>2. Customized</h3>
            <img
              src="homepage-4.png"
              alt="conceptual-photo"
              className="h-60 w-full"
            />
            <p>
              Every project is tailored to your specific needs, that’s uniquely
              yours.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <h3>3. Technology</h3>
            <img
              src="homepage-5.png"
              alt="conceptual-photo"
              className="h-60 w-full"
            />
            <p>
              We stay up-to-date with the latest technologies to provide
              solutions.
            </p>
          </div>
        </div>
      </div>

      <div className="w-[90%] md:w-[75%] lg:w-[55%]">
        <Questions />
      </div>

      <div className="w-[90%] md:w-[75%] lg:w-[55%] h-full flex flex-col md:flex-row gap-12 items-center text-center md:text-left">
        <div className="w-full md:w-[60%] flex flex-col gap-6">
          <h3>Do you need help? Contact our support team.</h3>
          <p>
            At TaskFlow, we believe that excellent support is key to your
            success. Whether you're just getting started or need assistance with
            advanced features, our dedicated support team is here to help.
          </p>
          <Link to="/help">
            <button className={`${button} bg-[#EA9F92]`}>Need Help</button>
          </Link>
        </div>
        <div className="w-full md:w-auto flex justify-center">
          <img src="homepage-6.png" alt="img" className="max-w-full" />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
