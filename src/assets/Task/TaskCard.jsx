import React, { useState } from "react";

const TaskCard = ({
  id,
  title,
  description,
  assignedTo,
  projectMembers,
  onDelete,
  onAssign,
  onEditTitle,
  onEditDescription,
}) => {
  const [isDeleted, setIsDeleted] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editDescription, setEditDescription] = useState(description);
  const [isEditing, setIsEditing] = useState(false);
  const [assignedPerson, setAssignedPerson] = useState(assignedTo);

  const handleDelete = () => {
    setIsDeleted(true);
    onDelete();
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSubmit = () => {
    onEditTitle(editTitle);
    onEditDescription(editDescription);
    setIsEditing(false);
  };

  const handleAssignChange = (e) => {
    setAssignedPerson(e.target.value);
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
          {assignedPerson ? (
            <p>
              Assigned to:{" "}
              {
                projectMembers.find((member) => member.id === assignedPerson)
                  ?.name
              }
            </p>
          ) : (
            <p>Not Assigned</p>
          )}
          <button onClick={handleDelete}>Delete Task</button>
          <select value={assignedPerson} onChange={handleAssignChange}>
            <option value="">Assign Person</option>
            {projectMembers.map((member) => (
              <option key={member.id} value={member.id}>
                {member.name}
              </option>
            ))}
          </select>
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
