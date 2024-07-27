// src/assets/Modals/InviteMembers.jsx
import React, { useState } from "react";
import axios from "axios";

const InviteMembers = ({ setOpenInviteMembers, onSaveInvitation }) => {
  const [email, setEmail] = useState("");

  const handleSendInvitation = () => {
    if (!email || !role) {
      alert("Please fill in all fields");
      return;
    }

    const invitation = { email };

    axios
      .post("url", invitation)
      .then(() => {
        onSaveInvitation(invitation);
        setOpenInviteMembers(false);
      })
      .catch((error) => console.error("Error sending invitation:", error));
  };

  return (
    <div
      onClick={(e) => {
        if (e.target !== e.currentTarget) return;
        setOpenInviteMembers(false);
      }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
    >
      <div className="bg-white px-8 py-6 rounded-lg shadow-lg w-full max-w-lg relative">
        <button
          onClick={() => setOpenInviteMembers(false)}
          className="absolute top-4 right-4 text-gray-600 font-semibold hover:text-gray-700"
        >
          X
        </button>
        <h3 className="text-xl font-semibold">Invite Members</h3>
        <div className="mt-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Member's Email"
            className="w-full border rounded p-2 mb-2"
          />
          <button
            onClick={handleSendInvitation}
            className="bg-[#FFDF92] text-black px-4 py-2 rounded hover:bg-[#fde4a8]"
          >
            Send Invitation
          </button>
        </div>
      </div>
    </div>
  );
};

export default InviteMembers;
