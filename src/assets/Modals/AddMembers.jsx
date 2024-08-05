import React, { useState, useEffect } from "react";
import axios from "axios";

const AddMembers = ({ setOpenAddMembers, projectId, onMemberAdded }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [members, setMembers] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [selectedRole, setSelectedRole] = useState("user");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const requestHeaders = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const roleEnum = {
    TeamLead: 1,
    Developer: 2,
    Tester: 3,
    Designer: 4,
    DevOps: 5,
  };

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get(
          "https://4wvk44j3-7001.euw.devtunnels.ms/api/user/paged?pageNumber=1&pageSize=10"
        );
        setMembers(response.data.items);
      } catch (error) {
        console.error("Error fetching members:", error);
        setError("Failed to fetch members. Please try again.");
      }
    };

    fetchMembers();
  }, []);

  const handleSearch = async (query) => {
    if (query) {
      const filteredMembers = members.filter((member) =>
        `${member.firstName} ${member.lastName} ${member.email}`
          .toLowerCase()
          .includes(query.toLowerCase())
      );
      setSearchResults(filteredMembers);
    } else {
      setSearchResults([]);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch(searchQuery);
    }
  };

  const handleSendInvitation = async () => {
    if (!selectedMember) {
      alert("Please select a member");
      return;
    }

    const invitation = {
      projectId,
      userId: selectedMember.id,
      role: roleEnum[selectedRole], // Map the selected role to its corresponding enum value
    };

    setIsLoading(true);

    try {
      await axios.post(
        `https://4wvk44j3-7001.euw.devtunnels.ms/api/project/add-user`,
        invitation,
        { headers: requestHeaders }
      );
      alert("Member added successfully!");
      onMemberAdded(); // Call the refetch function here
      setOpenAddMembers(false);
    } catch (error) {
      console.error("Error adding member:", error);
      setError("Failed to add member. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      onClick={(e) => {
        if (e.target !== e.currentTarget) return;
        setOpenAddMembers(false);
      }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
    >
      <div className="bg-white px-8 py-6 rounded-lg shadow-lg w-full max-w-lg relative">
        <button
          onClick={() => setOpenAddMembers(false)}
          className="absolute top-4 right-4 text-gray-600 font-semibold hover:text-gray-700"
        >
          X
        </button>
        <h3 className="text-xl font-semibold">Add Members</h3>
        <div className="mt-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Search Members by Name or Email"
            className="w-full border rounded p-2 mb-2"
          />
          {searchResults.length > 0 && (
            <div className="mt-2 max-h-40 overflow-y-auto">
              <ul>
                {searchResults.map((member) => (
                  <li
                    key={member.id}
                    onClick={() => setSelectedMember(member)}
                    className={`cursor-pointer p-2 hover:bg-gray-200 rounded ${
                      selectedMember?.id === member.id ? "bg-gray-200" : ""
                    }`}
                  >
                    {member.firstName} {member.lastName} - {member.email}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {selectedMember && (
            <div className="mt-4">
              <div className="mb-2">
                Selected Member: {selectedMember.firstName}{" "}
                {selectedMember.lastName}
              </div>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full border rounded p-2 mb-2"
              >
                <option value="TeamLead">TeamLead</option>
                <option value="Developer">Developer</option>
                <option value="Tester">Tester</option>
                <option value="Designer">Designer</option>
                <option value="DevOps">DevOps</option>
              </select>
            </div>
          )}
          <button
            onClick={handleSendInvitation}
            className="bg-[#FFDF92] text-black px-4 py-2 rounded hover:bg-[#fde4a8]"
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Add Member"}
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default AddMembers;
