import React from 'react';
import { Link } from 'react-router-dom';

const CardFeatures = () => {
  const cardFeatures = [
    {
      icon:"",
      title: 'Easy Task Management',
      description: 'Organize and manage your tasks with ease using our intuitive interface.',
      link: '/features/easy-task-management'
    },
    {
      icon:"",
      title: 'Task Creation',
      description: 'Create tasks quickly and easily, and keep track of your progress.',
      link: '/features/task-creation'
    },
    {
      icon: "",
      title: 'Collaboration',
      description: 'Share your tasks with others and work together seamlessly.',
      link: '/features/collaboration'
    }
  ];

  return (
    <div className="">
      <h1 className="">App Features</h1>
      <div className="">
        {cardFeatures.map((cardFeature, index) => (
          <div key={index} className="">
            <div className="">
              {cardFeature.icon}
            </div>
            <h3 className="">{cardFeature.title}</h3>
            <p className="">{cardFeature.description}</p>
            <div className="">
              <Link to={cardFeature.link} className="">
                Learn More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardFeatures;
