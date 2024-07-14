import React, { useState } from 'react';
import TaskCard from './TaskCard';

const TaskManage = () => {
    const [tasks, setTasks] = useState([
        { id: 1, title: 'Task 1', state: 'To Do', description: 'Description of Task 1' },
        { id: 2, title: 'Task 2', state: 'Doing', description: 'Description of Task 2' },
        { id: 3, title: 'Task 3', state: 'Done', description: 'Description of Task 3' }
    ]);

    const handleDeleteTask = (taskId) => {
        const updatedTasks = tasks.filter(task => task.id !== taskId);
        setTasks(updatedTasks);
    };

    const handleAssignPerson = (taskId) => {
        console.log(`Assign person to task with ID: ${taskId}`);
    };

    return (
        <div>
            {tasks.map(task => (
                <TaskCard
                    key={task.id}
                    state={task.state}
                    title={task.title}
                    description={task.description}
                    onDelete={() => handleDeleteTask(task.id)}
                    onAssign={() => handleAssignPerson(task.id)}
                />
            ))}
        </div>
    );
};

export default TaskManage;
