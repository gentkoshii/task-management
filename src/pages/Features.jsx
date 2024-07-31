import React from 'react';
import CustomButton from '../components/Button';

const Features = () => {
  const gradientStyle = {
    background: 'radial-gradient(circle at right , #739dff, #FFFF 79%)',
    backgroundSize: 'cover'
  };

  return (
    <section style={gradientStyle} className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-black-800 mb-12">Effortless Task Management, <br/>Seamless Collaboration</h2>
        
        <div className="flex flex-wrap items-center mb-20">
          <div className="w-full md:w-1/2">
            <img src="/feature1.png" className="md:w-3/4 w-full h-auto object-cover mx-auto" />
          </div>
          <div className="w-full md:w-1/2 p-10">
            <h2 className="text-3xl mb-4">Easy Task Management</h2>
            <p>Organize and manage your tasks with ease using our intuitive interface.
            Our platform offers a user-friendly interface designed to simplify your task management experience. With drag-and-drop functionality, customizable views, and smart filters, you can effortlessly organize your tasks according to priority, deadlines, and project categories. The intuitive design ensures that even the most complex task lists can be managed efficiently, allowing you to focus on what truly matters.</p>
            <CustomButton to="/login" color="blue" bgColor="blue" btnText="Try It Now!" />
          </div>
        </div>

        <div className="flex flex-wrap items-center mb-20 flex-row-reverse">
          <div className="w-full md:w-1/2">
            <img src="/feature2.png" className="md:w-3/4 w-full h-auto object-cover mx-auto" />
          </div>
          <div className="w-full md:w-1/2 p-10">
            <h2 className="text-3xl mb-4">Task Creation</h2>
            <p>Create tasks quickly and easily, and keep track of your progress.
            Creating tasks has never been easier. With just a few clicks, you can add new tasks, set deadlines, assign them to team members, and add detailed descriptions or subtasks. Our platform provides a comprehensive overview of your progress, displaying completed, pending, and overdue tasks in a clear, visual manner. Automated reminders and notifications ensure you stay on top of your responsibilities, making task creation and management a breeze.</p>
            <CustomButton to="/login" color="blue" bgColor="blue" btnText="Try It Now!" />
          </div>
        </div>

        <div className="flex flex-wrap items-center mb-20">
          <div className="w-full md:w-1/2">
            <img src="/feature3.png" className="md:w-3/4 w-full h-auto object-cover mx-auto" />
          </div>
          <div className="w-full md:w-1/2 p-10">
            <h2 className="text-3xl mb-4">Collaboration</h2>
            <p>Share your tasks with others and work together seamlessly.
            Effective collaboration is at the heart of our platform. You can easily share tasks with team members, assign roles, and monitor progress in real-time. The built-in communication tools, such as comments and instant messaging, facilitate smooth interaction and idea sharing. Whether you're working on a small team project or coordinating with a large group, our platform ensures everyone is on the same page, working towards common goals with maximum efficiency.</p>
            <CustomButton to="/login" color="blue" bgColor="blue" btnText="Try It Now!" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
