import React, { useState } from "react";
import axios from "axios";

const InviteMembers = ({ setOpenInviteMembers }) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSendInvitation = async () => {
    if (!email) {
      alert("Please fill in all fields");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      alert("Please enter a valid email address");
      return;
    }

    const invitation = { email };

    setIsLoading(true);

    try {
      await axios.post(
        "https://4wvk44j3-7001.euw.devtunnels.ms/api/invite",
        invitation
      );
      alert("Invitation sent successfully!");
      setOpenInviteMembers(false);
    } catch (error) {
      console.error("Error sending invitation:", error);
      setError("Failed to send invitation. Please try again.");
    } finally {
      setIsLoading(false);
    }
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
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send Invitation"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default InviteMembers;
