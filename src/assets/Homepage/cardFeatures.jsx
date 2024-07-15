import React from 'react';
import { Link } from 'react-router-dom';

const CardFeatures = () => {
  const cardFeatures = [
    {
      icon:"",
      title: 'Easy Task Management',
      description: 'Organize and manage your tasks with ease using our intuitive interface.',
      link: '/features/easy-task-management',
      color: 'bg-[#E5C2FF]',
      btnColor: 'bg-[#C5ADFF]'
    },
    {
      icon:"",
      title: 'Task Creation',
      description: 'Create tasks quickly and easily, and keep track of your progress.',
      link: '/features/task-creation',
      color: 'bg-[#85EAFF]',
      btnColor: 'bg-[#5DE2FF]'
    },
    {
      icon: "",
      title: 'Collaboration',
      description: 'Share your tasks with others and work together seamlessly.',
      link: '/features/collaboration',
      color: 'bg-[#FFD674]',
      btnColor: 'bg-[#FFCB50]'
    },
    {
      icon: "",
      title: 'Fourth Card',
      description: 'This is an additional card to demonstrate the layout.',
      link: '/features/fourth-card',
      color: 'bg-[#FFC58F]',
      btnColor: 'bg-[#FFB46F]'
    },
    {
      icon: "",
      title: 'Fifth Card',
      description: 'This is an additional card to demonstrate the layout.',
      link: '/features/fourth-card',
      color: 'bg-[#FFD4C1]',
      btnColor: 'bg-[#E7B5A0]'
    },
    {
      icon: "",
      title: 'Sixth Card',
      description: 'This is an additional card to demonstrate the layout.',
      link: '/features/fourth-card',
      color: 'bg-[#FF87AA]',
      btnColor: 'bg-[#EE638C]'
    }
  ];

  const button = 'w-44 h-10 p-[4px] border-[1px] border-black rounded-5 text-xl text-black text-center no-underline';

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-5 justify-center">
        {cardFeatures.map((cardFeature, index) => (
          <div key={index} className={`w-80 h-96 ${cardFeature.color} p-4 mb-8 flex flex-col items-start border-[1px] border-black rounded-3xl relative`}>
            <div className="h-24 w-24 border-1 border-black rounded-xl bg-gray-100 flex items-center justify-center">
              {cardFeature.icon}
            </div>
            <div className="flex-1 mt-4">
              <h3 className="text-xl font-bold">{cardFeature.title}</h3>
              <p className="mt-2">{cardFeature.description}</p>
            </div>
            <div className="mt-4">
              <Link to={cardFeature.link}>
                <button className={`${button} ${cardFeature.btnColor}`}>
                  Learn More
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardFeatures;
