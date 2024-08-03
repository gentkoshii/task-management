import React from "react";
import { Link } from "react-router-dom";

import gatheringImg from "../../../public/gathering.png";
import taskImg from "../../../public/task-management.png";
import brainstormingImg from "../../../public/brainstorming.png";
import meetingImg from "../../../public/meeting.png";
import takeCareImg from "../../../public/take-care.png";
import testTubeImg from "../../../public/test-tube.png";

const CardFeatures = () => {
  const cardFeatures = [
    {
      icon: gatheringImg,
      title: "Project Management",
      description:
        "Keep tasks in order, deadlines on track, and team members aligned with Trello.",
      link: "/features/easy-task-management",
      color: "bg-[#E5C2FF]",
      btnColor: "bg-[#C5ADFF]",
    },
    {
      icon: taskImg,
      title: "Task Management",
      description:
        "Easy to manage, complete, bring tasks together, and make your projects a success.",
      link: "/features/task-creation",
      color: "bg-[#85EAFF]",
      btnColor: "bg-[#5DE2FF]",
    },
    {
      icon: brainstormingImg,
      title: "Brainstorming",
      description:
        "Unleash your team’s creativity and keep ideas visible, collaborative, and actionable.",
      link: "/features/collaboration",
      color: "bg-[#FFD674]",
      btnColor: "bg-[#FFCB50]",
    },
    {
      icon: meetingImg,
      title: "Meetings",
      description:
        "Empower your team meetings to be more productive, empowering, and dare we say—fun.",
      link: "/features/fourth-card",
      color: "bg-[#FFC58F]",
      btnColor: "bg-[#FFB46F]",
    },
    {
      icon: takeCareImg,
      title: "Onboarding",
      description:
        "Onboarding to a new company or project is a snap with Trello’s visual layout of to-do’s, resources, and progress tracking.",
      link: "/features/fourth-card",
      color: "bg-[#FFD4C1]",
      btnColor: "bg-[#E7B5A0]",
    },
    {
      icon: testTubeImg,
      title: "Resource Hub",
      description:
        "This is a brief description... This is a brief description... This is a brief description...",
      link: "/features/fourth-card",
      color: "bg-[#FF87AA]",
      btnColor: "bg-[#EE638C]",
    },
  ];

  const button =
    "w-44 h-10 p-[4px] border-[1px] border-black rounded-5 text-xl text-black text-center no-underline";

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-1 md:gap-5 items-center place-items-center justify-center">
        {cardFeatures.map((cardFeature, index) => (
          <div
            key={index}
            className={`w-80 h-96 ${cardFeature.color} p-4 mb-8 flex flex-col items-center justify-center border-[1px] border-black rounded-3xl relative`}
          >
            <div className="h-24 w-24  ">
              {cardFeature.icon && (
                <img
                  src={cardFeature.icon}
                  alt="icon"
                  className="h-full w-full object-contain p-2"
                />
              )}
            </div>
            <div className="flex flex-col items-center">
              <div className="flex-1 mt-4">
                <h3 className="text-xl font-bold">{cardFeature.title}</h3>
                <p className="mt-2">{cardFeature.description}</p>
              </div>
              <div className="mt-4">
                <Link to={"/features"}>
                  <button className={`${button} ${cardFeature.btnColor}`}>
                    Learn More
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardFeatures;
