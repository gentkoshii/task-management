import React, { useState, useEffect } from "react";
import axios from "axios";
import { useJwt } from "react-jwt";

const TaskDetails = ({
  task,
  setOpenTaskDetails,
  onSaveComment,
  onSaveSubtasks,
  members, // Receive the members prop
}) => {
  const [subtasks, setSubtasks] = useState(task?.subtasks || []);
  const [newSubtask, setNewSubtask] = useState("");
  const [file, setFile] = useState(null);
  const [isTracking, setIsTracking] = useState(false);
  const [workTime, setWorkTime] = useState("0d 0h 0m 0s");
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isEditingComment, setIsEditingComment] = useState(false);
  const [assignedMembers, setAssignedMembers] = useState(
    task?.assignedMembers || []
  );
  const [attachments, setAttachments] = useState([]);

  const token = localStorage.getItem("token");
  const { decodedToken } = useJwt(token);
  const userId = decodedToken?.sub;

  const profilePic =
    JSON.parse(localStorage.getItem("user"))?.profilePicture ||
    "user-avatar.png";
  const userName =
    JSON.parse(localStorage.getItem("user"))?.firstName || "user";

  const requestHeaders = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  useEffect(() => {
    if (task) {
      fetchSubtasks();
      fetchComments();
      fetchAssignedMembers(task.id);
      fetchAttachments();
    }
  }, [task]);

  const fetchAssignedMembers = async (taskId) => {
    try {
      const response = await axios.get(
        `https://4wvk44j3-7001.euw.devtunnels.ms/api/task/${taskId}/assigned-users`,
        {
          headers: requestHeaders,
        }
      );
      setAssignedMembers(response.data || []);
      console.log("Assigned members:", response.data);
    } catch (error) {
      console.error("Failed to fetch members:", error);
    }
  };

  const fetchSubtasks = async () => {
    try {
      const response = await axios.get(
        `https://4wvk44j3-7001.euw.devtunnels.ms/api/subtask`,
        {
          params: {
            taskId: task.id,
          },
          headers: requestHeaders,
        }
      );
      setSubtasks(response.data);
    } catch (error) {
      console.error("Failed to fetch subtasks:", error);
    }
  };

  const handleAddSubtask = async () => {
    if (newSubtask.trim()) {
      try {
        await axios.post(
          "https://4wvk44j3-7001.euw.devtunnels.ms/api/subtask",
          {
            taskId: task.id,
            title: newSubtask,
          },
          {
            headers: requestHeaders,
          }
        );
        fetchSubtasks(); // Refetch subtasks after adding a new one
        setNewSubtask("");
      } catch (error) {
        console.error("Failed to add subtask:", error);
      }
    }
  };

  const handleRemoveSubtask = async (index) => {
    const subtaskToRemove = subtasks[index];
    try {
      await axios.delete(
        `https://4wvk44j3-7001.euw.devtunnels.ms/api/subtask/${subtaskToRemove.id}`,
        {
          headers: requestHeaders,
        }
      );
      fetchSubtasks(); // Refetch subtasks after removing one
    } catch (error) {
      console.error("Failed to remove subtask:", error);
    }
  };

  const handleSubtaskCompletion = async (index) => {
    const updatedSubtasks = subtasks.map((subtask, i) =>
      i === index ? { ...subtask, isCompleted: !subtask.isCompleted } : subtask
    );

    setSubtasks(updatedSubtasks);

    try {
      await axios.patch(
        `https://4wvk44j3-7001.euw.devtunnels.ms/api/subtask/update-completion`,
        {
          subtaskId: subtasks[index].id,
          isCompleted: !subtasks[index].isCompleted,
        },
        {
          headers: requestHeaders,
        }
      );
    } catch (error) {
      console.error("Failed to update subtask completion:", error);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    if (selectedFile.size > 8 * 1024 * 1024) {
      alert("File size exceeds 8MB limit.");
      return;
    }
    setFile(selectedFile);
  };

  const handleFileUpload = async () => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        console.log(`Uploading file for task ID: ${task.id}`);
        const response = await axios.post(
          `https://4wvk44j3-7001.euw.devtunnels.ms/api/attachment/upload?taskId=${task.id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("File upload response:", response);
        alert("File uploaded successfully.");
        setFile(null);
        fetchAttachments(); // Fetch attachments after uploading a new one
      } catch (error) {
        console.error(
          "Failed to upload file:",
          error.response || error.message
        );
      }
    }
  };

  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `https://4wvk44j3-7001.euw.devtunnels.ms/api/comment`,
        {
          params: {
            taskId: task.id,
          },
          headers: requestHeaders,
        }
      );
      setComments(response.data);
    } catch (error) {
      console.error("Failed to fetch comments:", error);
    }
  };

  const handleAddComment = async () => {
    if (newComment.trim()) {
      try {
        await axios.post(
          "https://4wvk44j3-7001.euw.devtunnels.ms/api/comment",
          {
            taskId: task.id,
            content: newComment,
            userId: userId, // Include the userId in the request
          },
          {
            headers: requestHeaders,
          }
        );
        setNewComment("");
        setIsEditingComment(false);
        fetchComments(); // Refetch comments after adding a new one
      } catch (error) {
        console.error("Failed to add comment:", error);
      }
    }
  };

  const handleRemoveComment = async (index) => {
    const commentToRemove = comments[index];
    try {
      await axios.delete(
        `https://4wvk44j3-7001.euw.devtunnels.ms/api/comment/${commentToRemove.id}`,
        {
          headers: requestHeaders,
        }
      );
      fetchComments(); // Refetch comments after removing one
    } catch (error) {
      console.error("Failed to remove comment:", error);
    }
  };

  const fetchAttachments = async () => {
    try {
      const response = await axios.get(
        `https://4wvk44j3-7001.euw.devtunnels.ms/api/attachment/task/${task.id}`,
        {
          headers: requestHeaders,
        }
      );
      setAttachments(response.data);
    } catch (error) {
      console.error("Failed to fetch attachments:", error);
    }
  };

  const handleDownloadAttachment = async (attachmentId) => {
    try {
      const response = await axios.get(
        `https://4wvk44j3-7001.euw.devtunnels.ms/api/attachment/download`,
        {
          params: {
            attachmentId,
          },
          headers: requestHeaders,
          responseType: "blob", // Ensure the response is in blob format
        }
      );

      // Create a URL for the binary data
      const url = window.URL.createObjectURL(
        new Blob([response.data], { type: response.headers["content-type"] })
      );

      // Extract the filename from the content-disposition header, if available
      let filename = "attachment";
      const contentDisposition = response.headers["content-disposition"];
      if (
        contentDisposition &&
        contentDisposition.indexOf("attachment") !== -1
      ) {
        const filenameMatch = contentDisposition.match(/filename="(.+)"/);
        if (filenameMatch.length === 2) {
          filename = filenameMatch[1];
        }
      }

      // Create a link element to trigger the download
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Failed to download attachment:", error);
    }
  };

  const handleRemoveAttachment = async (attachmentId) => {
    try {
      await axios.delete(
        `https://4wvk44j3-7001.euw.devtunnels.ms/api/attachment/delete`,
        {
          params: {
            attachmentId,
          },
          headers: requestHeaders,
        }
      );
      fetchAttachments(); // Refetch attachments after removing one
    } catch (error) {
      console.error("Failed to remove attachment:", error);
    }
  };

  const assignMember = async (e) => {
    const memberId = e.target.value;
    const member = members.find((m) => m.userId === memberId);

    if (member) {
      try {
        const response = await axios.post(
          "https://4wvk44j3-7001.euw.devtunnels.ms/api/task/assign-user",
          {
            taskId: task.id,
            userId: memberId,
          },
          {
            headers: requestHeaders,
          }
        );
        console.log("Assign member response:", response); // Log the response
        const updatedAssignedMembers = [...assignedMembers, member];
        setAssignedMembers(updatedAssignedMembers);
      } catch (error) {
        console.error("Failed to assign member:", error);
      }
    }
  };

  const handleRemoveMember = async (member) => {
    const updatedAssignedMembers = assignedMembers.filter(
      (assignedMember) => assignedMember.id !== member.id
    );
    setAssignedMembers(updatedAssignedMembers);

    try {
      await axios.delete(
        "https://4wvk44j3-7001.euw.devtunnels.ms/api/task/remove-user",
        {
          headers: requestHeaders,
          data: {
            taskId: task.id,
            userId: member.userId,
          },
        }
      );
    } catch (error) {
      console.error("Failed to remove member:", error);
      setAssignedMembers(assignedMembers); // Revert to previous state on failure
    }
  };

  const handleStartTimeTracking = async () => {
    try {
      await axios.post(
        `https://4wvk44j3-7001.euw.devtunnels.ms/api/task/${task.id}/start-timer`,
        {},
        {
          headers: requestHeaders,
        }
      );
      setIsTracking(true);
      // Optionally fetch the updated work time or handle UI updates
    } catch (error) {
      console.error("Failed to start time tracking:", error);
    }
  };

  const handleStopTimeTracking = async () => {
    try {
      await axios.post(
        `https://4wvk44j3-7001.euw.devtunnels.ms/api/task/${task.id}/stop-timer`,
        {}, // Assuming no additional body data is needed
        {
          headers: requestHeaders,
        }
      );
      setIsTracking(false);
      fetchWorkTime(); // Fetch the updated work time after stopping the timer
    } catch (error) {
      console.error("Failed to stop time tracking:", error);
      alert("Failed to stop timer: " + error.message);
    }
  };

  const fetchWorkTime = async () => {
    try {
      const response = await axios.get(
        `https://4wvk44j3-7001.euw.devtunnels.ms/api/task/${task.id}/work-time`,
        {
          headers: requestHeaders,
        }
      );
      const { workTime } = response.data;
      setWorkTime(workTime);
    } catch (error) {
      console.error("Failed to fetch work time:", error);
      setWorkTime("Error fetching work time");
    }
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
        <h3 className="text-lg font-semibold capitalize">{task.title}</h3>
        <p className="mt-2 text-sm capitalize text-gray-400">
          {task.description}
        </p>
        <div className="mt-2">
          <div>
            <h4 className="text-sm font-semibold">Subtasks</h4>
            <div className="flex w-full justify-between mb-2">
              <input
                type="text"
                value={newSubtask}
                onChange={(e) => setNewSubtask(e.target.value)}
                className="border text-sm rounded p-2 my-0 w-[70%]"
                placeholder="Add a new subtask"
              />
              <button
                onClick={handleAddSubtask}
                className="bg-[#FFDF92] text-black w-[25%] px-4 py-1 rounded"
              >
                Add
              </button>
            </div>
            {subtasks.length > 0 ? (
              <ul className="list-disc pl-5">
                {subtasks.map((subtask, index) => (
                  <li
                    key={index}
                    className={`flex items-center text-sm ${
                      subtask.isCompleted ? "line-through text-gray-500" : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={subtask.isCompleted || false}
                      onChange={() => handleSubtaskCompletion(index)}
                      className="mr-2"
                    />
                    {subtask.title}
                    <button
                      onClick={() => handleRemoveSubtask(index)}
                      className="ml-2 text-red-500"
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">No subtasks yet.</p>
            )}
          </div>
          <p className="text-sm">
            <strong>Due Date:</strong> {task.dueDate}
          </p>

          <div className="w-[75%] flex justify-between mt-4 gap-2">
            <div className="flex flex-col">
              <h4 className="text-sm font-semibold">Time Tracking</h4>
              <p className="text-sm">
                <strong>Work Time:</strong> {workTime}
              </p>
            </div>
            <div className="mt-1">
              {!isTracking ? (
                <button
                  onClick={handleStartTimeTracking}
                  className="text-white px-4 py-2 rounded hover:-translate-y-[2px]"
                >
                  <img src="/start.png" alt="start" className="w-5" />
                </button>
              ) : (
                <button
                  onClick={handleStopTimeTracking}
                  className="text-white px-4 py-2 rounded hover:-translate-y-[2px]"
                >
                  <img src="/stop.png" alt="stop" className="w-5" />
                </button>
              )}
            </div>
          </div>

          <div>
            <div className="flex w-full justify-between">
              <input
                type="file"
                onChange={handleFileChange}
                className="w-[70%] border text-sm rounded p-2"
              />
              <button
                onClick={handleFileUpload}
                className="bg-[#FFDF92] text-black px-2 w-[25%] rounded"
              >
                Upload File
              </button>
            </div>
          </div>

          <div className="mt-2">
            <h4 className="text-base font-semibold">Attachments</h4>
            <div>
              {attachments.length > 0 ? (
                attachments.map((attachment) => (
                  <div
                    key={attachment.id}
                    className="flex items-center justify-between bg-gray-100 p-2 rounded my-1"
                  >
                    <span>{attachment.fileName}</span>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => handleDownloadAttachment(attachment.id)}
                        className="text-sm hover:-translate-y-[2px] active:underline"
                      >
                        Download
                      </button>
                      <button
                        onClick={() => handleRemoveAttachment(attachment.id)}
                        className="text-red-500 text-sm"
                      >
                        <img src="/file.png" alt="delete" className="w-5" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">No attachments yet.</p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-3">
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
                  <li
                    key={index}
                    className="text-sm mb-2 flex items-start justify-center"
                  >
                    <img
                      src={comment.profilePic || profilePic}
                      alt="Profile"
                      className="w-8 h-8 rounded-full mr-2"
                    />
                    <span className="flex-grow capitalize mt-1">
                      {userName}
                    </span>
                    <span className="flex-grow capitalize mt-1">
                      {comment.content}
                    </span>
                    <button
                      onClick={() => handleRemoveComment(index)}
                      className="text-red-500 ml-2 mt-1"
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">No comments yet.</p>
            )}
          </div>
        </div>
        <div className="mt-4">
          <h4 className="text-base font-semibold">Assigned Members</h4>
          <div className="flex items-center gap-3 my-2">
            <select
              value=""
              onChange={assignMember}
              className="border py-2 px-1 rounded capitalize"
            >
              <option value="">Assign Member</option>
              {members.map((member) => (
                <option key={member.userId} value={member.userId}>
                  {member.firstName} {member.lastName}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2">
            {assignedMembers.length > 0 ? (
              assignedMembers.map((member, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-gray-100 px-2 py-1 rounded capitalize"
                >
                  <img
                    src={member.profilePicture || profilePic}
                    alt="Profile"
                    className="w-8 h-8 rounded-full"
                  />
                  <span>
                    {member.firstName} {member.lastName}
                  </span>
                  <button
                    onClick={() => handleRemoveMember(member)}
                    className="text-red-500 text-sm"
                  >
                    X
                  </button>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No members assigned yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
