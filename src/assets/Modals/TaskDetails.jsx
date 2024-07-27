import React, { useState, useEffect } from "react";

const TaskDetailsModal = ({ task, setOpenTaskDetails, onSaveComment }) => {
  const [comments, setComments] = useState(task.comments || []);
  const [newComment, setNewComment] = useState("");
  const [isEditingComment, setIsEditingComment] = useState(false);
  const [subtasks, setSubtasks] = useState(task.subtasks || []);

  useEffect(() => {
    setComments(task.comments || []);
    // Initialize subtasks
    setSubtasks(
      task.subtasks
        ? task.subtasks.map((subtask) => ({
            text: subtask,
            completed: false,
          }))
        : []
    );
  }, [task]);

  const handleAddComment = () => {
    if (newComment.trim()) {
      const updatedComments = [...comments, newComment];
      setComments(updatedComments);
      setNewComment("");
      setIsEditingComment(false);
      onSaveComment(updatedComments); // Notify parent about the change
    }
  };

  const handleSubtaskCompletion = (index) => {
    const updatedSubtasks = subtasks.map((subtask, i) =>
      i === index ? { ...subtask, completed: !subtask.completed } : subtask
    );
    setSubtasks(updatedSubtasks);
  };

  return (
    <div
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setOpenTaskDetails(false);
      }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
    >
      <div className="bg-white px-8 py-6 rounded-lg shadow-lg w-full max-w-lg relative">
        <button
          onClick={() => setOpenTaskDetails(false)}
          className="absolute top-4 right-4 text-gray-600 font-semibold hover:text-gray-700"
        >
          X
        </button>
        <h3 className="text-lg font-semibold">
          <strong>Tittle: </strong>
          {task.title}
        </h3>
        <p className="mt-2 text-sm">
          <strong>Description: </strong>
          {task.description}
        </p>
        <div className="mt-2">
          <p className="text-sm capitalize">
            <strong>Tags:</strong> {task.tags.join(", ")}
          </p>
          {/* Subtasks Section */}
          <div>
            <h4 className="text-sm font-semibold">Subtasks</h4>
            {subtasks.length > 0 ? (
              <ul className="list-disc pl-5">
                {subtasks.map((subtask, index) => (
                  <li
                    key={index}
                    className={`flex items-center text-sm  ${
                      subtask.completed ? "line-through text-gray-500" : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={subtask.completed || false}
                      onChange={() => handleSubtaskCompletion(index)}
                      className="mr-2"
                    />
                    {subtask.text}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">No subtasks yet.</p>
            )}
          </div>
          <p
            className={`text-sm ${
              task.priority === "Critical" ? "text-red-500" : ""
            }`}
          >
            <strong>Priority:</strong> {task.priority}
          </p>
          <p className="text-sm">
            <strong>Due Date:</strong> {task.dueDate}
          </p>
          <p className="text-sm">
            <strong>Reminder:</strong> {task.reminder}
          </p>
        </div>

        {/* Comments Section */}
        <div className="mt-2">
          <h4 className="text-base font-semibold">Comments</h4>
          <div className="mt-2">
            {isEditingComment ? (
              <div>
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full border text-sm rounded p-2"
                  placeholder="Add a comment..."
                />
                <button
                  onClick={handleAddComment}
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Add Comment
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsEditingComment(true)}
                className="text-blue-500 hover:underline"
              >
                Add Comment
              </button>
            )}
          </div>
          <div className="mt-2">
            {comments.length > 0 ? (
              <ul className="list-disc pl-5">
                {comments.map((comment, index) => (
                  <li key={index} className="text-sm mb-2">
                    {comment}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">No comments yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsModal;