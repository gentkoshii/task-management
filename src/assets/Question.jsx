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
      <div className="">
        <h1 className="">Most Frequently Asked Questions!!</h1>
        <div>
          {questions.map((item, index) => (
            <div key={index} className="mb-4">
              <div className="" onClick={() => toggleAnswer(index)}>
                <h3 className="">{item.question}</h3>
                <span className="">{activeIndex === index ? '-' : '+'}</span>
              </div>
              {activeIndex === index && <p className="mt-2">{item.answer}</p>}
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default Questions;
  