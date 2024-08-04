import { Link } from "react-router-dom";
import Questions from "../assets/Homepage/Question.jsx";
import CardFeatures from "../assets/Homepage/cardFeatures.jsx";
import { useTheme } from "../context/ThemeContext";

const Homepage = () => {
  const button =
    "w-56 h-12 border-[1px] border-black rounded-5 text-xl text-black";

  const { darkMode } = useTheme();

  const FeatureSection = ({
    title,
    imgSrc,
    imgSrcDark,
    imgAlt,
    description,
  }) => {
    return (
      <div className="grid grid-rows-[auto_1fr_auto] place-items-center items-center">
        <h3 className="text-lg font-semibold">{title}</h3>
        <img
          alt={imgAlt}
          src={darkMode ? imgSrcDark : imgSrc}
          className="w-[35vw] max-w-full"
        />
        <p className="text-sm">{description}</p>
      </div>
    );
  };

  const featureData = [
    {
      title: "1. Expert Team",
      imgSrc: "homepage-3.png",
      imgSrcDark: "homepage-3.png",
      imgAlt: "conceptual-photo",
      description:
        "Our team comprises individuals who are passionate and offer support at any given time.",
    },
    {
      title: "2. Customized",
      imgSrc: "homepage-4.png",
      imgSrcDark: "homepage-4-1.png",
      imgAlt: "conceptual-photo",
      description:
        "Every project is tailored to your specific needs, making it uniquely yours.",
    },
    {
      title: "3. Technology",
      imgSrc: "homepage-5.png",
      imgSrcDark: "homepage-5-1.png",
      imgAlt: "conceptual-photo",
      description:
        "We stay up-to-date with the latest technologies to provide innovative solutions.",
    },
  ];

  return (
    <div className="w-screen bg-gradient-to-b from-pink-100 via-white to-pink-100 dark:from-slate-900 dark:via-gray-800 dark:to-slate-900 h-full flex flex-col items-center justify-center gap-28 pt-28 pb-28 overflow-hidden dark:text-white">
      <div className="w-[90%] lg:w-[55%] h-full flex flex-col lg:flex-row items-center lg:items-start">
        <div className="w-full lg:w-[50%] flex flex-col gap-6 text-center lg:text-left">
          <h1>TaskFlow Brings all your tasks, teammates, and tools together</h1>
          <h3>Keep everything in the same place—even if your team isn’t.</h3>
          <Link to="/login">
            <button
              className={`${button} ${
                darkMode ? "bg-[#76ABAE]" : "bg-[#FFAF64]"
              }`}
            >
              Get Started
            </button>
          </Link>
        </div>
        <div className="w-full lg:w-[50%] mt-8 lg:mt-0">
          <img
            src={darkMode ? "homepage-1-white.png" : "homepage-1.png"}
            alt="icon"
            className="w-full"
          />
        </div>
      </div>

      <div className="w-[90%] lg:w-[55%] h-full">
        <div className="flex flex-col gap-4 text-center lg:text-left">
          <h1>Simplify Your Task Management</h1>
          <h3>Efficiently organize and prioritize your tasks with ease.</h3>
          <CardFeatures />
        </div>
      </div>

      <div className="w-[90%] lg:w-[55%] h-full flex flex-col gap-10 text-center lg:text-left">
        <h1>Work Process</h1>
        <img
          src={darkMode ? "homepage-2.2.png" : "homepage-2.png"}
          alt="work-process"
          className="w-full"
        />
      </div>

      <div className="w-[90%] lg:w-[55%] h-full flex flex-col gap-10 text-center lg:text-left">
        <h1>Why TaskFlow is the best for you!!</h1>
        <div className="grid md:grid-cols-3 gap-5">
          {featureData.map((feature, index) => (
            <FeatureSection
              key={index}
              title={feature.title}
              imgSrc={feature.imgSrc}
              imgSrcDark={feature.imgSrcDark}
              imgAlt={feature.imgAlt}
              description={feature.description}
            />
          ))}
        </div>
      </div>

      <div className="w-[90%] lg:w-[55%]">
        <Questions />
      </div>

      <div className="w-[90%] lg:w-[55%] h-full flex flex-col lg:flex-row gap-12">
        <div className="w-full lg:w-[60%] flex flex-col gap-6">
          <h3>Do you need help? Contact our support team.</h3>
          <p>
            At TaskFlow, we believe that excellent support is key to your
            success. Whether you're just getting started or need assistance with
            advanced features, our dedicated support team is here to help.
          </p>
          <Link to="/help">
            <button
              className={`${button} ${
                darkMode ? "bg-[#76ABAE]" : "bg-[#EA9F92]"
              }`}
            >
              Need Help
            </button>
          </Link>
        </div>
        <div className="w-full lg:w-[40%]">
          <img src="homepage-6.png" alt="img" className="w-full" />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
