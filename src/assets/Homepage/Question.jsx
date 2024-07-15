import React, { useState } from 'react';


const Questions = () => {
    const [activeIndex, setActiveIndex] = useState(null);
  
    const questions = [
      { question: 'What is TaskFlow?', answer: 'TaskFlow is a task management platform.' },
      { question: 'How do I create a task?', answer: 'You can create a task by clicking on the "Add Task" button.' },
      { question: 'Can I share my tasks?', answer: 'Yes, you can share your tasks with others.' }
    ];
  
    const toggleAnswer = (index) => {
      setActiveIndex(activeIndex === index ? null : index);
    };
  
    return (
      <div className="flex flex-col w-full h-full gap-12">
        <h1 className="">Most Frequently Asked Questions!!</h1>
        <div>
          {questions.map((item, index) => (
            <div key={index} className="mb-4 ">
              <div className="flex justify-between" onClick={() => toggleAnswer(index)}>
                <h3 className="">{item.question}</h3>
                <span className="text-2xl">{activeIndex === index ? '-' : '+'}</span>
              </div>
              {activeIndex === index && <p className="mt-2 text-lg">{item.answer}</p>}
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default Questions;
  