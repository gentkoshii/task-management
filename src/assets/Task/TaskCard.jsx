import React, { useState } from "react";

const TaskCard = ({
  id,
  title,
  description,
  onDelete,
  onAssign,
  onEditTitle,
  onEditDescription,
}) => {
  const [isDeleted, setIsDeleted] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editDescription, setEditDescription] = useState(description);
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = () => {
    setIsDeleted(true);
    onDelete();
  };

  const handleAssign = () => {
    onAssign();
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSubmit = () => {
    onEditTitle(editTitle);
    onEditDescription(editDescription);
    setIsEditing(false);
  };

  if (isDeleted) {
    return null;
  }

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        marginBottom: "10px",
      }}
    >
      {!isEditing ? (
        <>
          <h3>{title}</h3>
          <p>{description}</p>
          <button onClick={handleDelete}>Delete Task</button>
          <button onClick={handleAssign}>Assign Person</button>
          <button onClick={handleEdit}>Edit</button>
        </>
      ) : (
        <>
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
          />
          <button onClick={handleSubmit}>Save</button>
        </>
      )}
    </div>
  );
};

export default TaskCard;
