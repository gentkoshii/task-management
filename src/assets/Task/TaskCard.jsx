import React, { useState } from 'react';

const TaskCard = ({ title, state, description, Delete, Assign }) => {
    const [isDeleted, setIsDeleted] = useState(false);

    const handleDelete = () => {
        setIsDeleted(true);
        Delete();
    };

    const handleAssign = () => {
        Assign();
    };

    if (isDeleted) {
        return null;
    }

    return (
        <div>
            <h4>{state}</h4>
            <h3>{title}</h3>
            <p>{description}</p>
            <button onClick={handleDelete}>Delete Task</button>
            <button onClick={handleAssign}>Assign Person</button>
                
        </div>
    );
};

export default TaskCard;
