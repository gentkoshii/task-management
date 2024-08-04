import React, { useState, useMemo, useEffect } from "react";
import { useTable, usePagination, useSortBy, useFilters } from "react-table";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReply, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import CustomButton from "../../../components/Button";
import { useTheme } from '../../../context/ThemeContext';

const ContactMessages = () => {
    const { darkMode } = useTheme();
    const [messages, setMessages] = useState([]);
    const [filteredMessages, setFilteredMessages] = useState([]);
    const [popupMessage, setPopupMessage] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [replyContent, setReplyContent] = useState("");
    const [filterInput, setFilterInput] = useState("");
    const [showReplyModal, setShowReplyModal] = useState(false);

    const requestHeaders = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get(
                    "https://4wvk44j3-7001.euw.devtunnels.ms/api/contactform",
                    { headers: requestHeaders }
                );
                setMessages(response.data);
                setFilteredMessages(response.data); // Initialize filtered messages
            } catch (error) {
                console.error("Error fetching messages:", error);
                setPopupMessage("Error fetching messages. Please try again later.");
                setShowPopup(true);
            }
        };

        fetchMessages();
    }, []);

    const data = useMemo(() => filteredMessages, [filteredMessages]);

    const columns = useMemo(
        () => [
            { Header: "First Name", accessor: "firstName" },
            { Header: "Last Name", accessor: "lastName" },
            { Header: "Email", accessor: "email" },
            { Header: "Phone", accessor: "phoneNumber" }, // Updated accessor to match the correct field name
            { Header: "Message", accessor: "message" },
            {
                Header: "Actions",
                Cell: ({ row }) => (
                    <div className="flex justify-center gap-4">
                        <FontAwesomeIcon
                            icon={faReply}
                            className="text-blue-500 cursor-pointer mx-1"
                            onClick={() => handleReplyMessage(row.original)}
                        />
                        <FontAwesomeIcon
                            icon={faTrashAlt}
                            className="text-red-500 cursor-pointer mx-1"
                            onClick={() => handleDeleteMessage(row.original.id)}
                        />
                    </div>
                ),
            },
        ],
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        nextPage,
        previousPage,
        state: { pageIndex },
        pageOptions,
        setFilter,
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0, pageSize: 10 } // Set page size to 10
        },
        useFilters,
        useSortBy,
        usePagination
    );

    const handleReplyMessage = (message) => {
        setSelectedMessage(message);
        setShowReplyModal(true);
    };

    const handleSendReply = async () => {
        try {
            await axios.post(
                "https://4wvk44j3-7001.euw.devtunnels.ms/api/contactform/respond",
                {
                    contactFormId: selectedMessage.id,
                    responseMessage: replyContent,
                },
                {
                    headers: requestHeaders,
                }
            );
            setPopupMessage("Reply sent successfully!");
            setShowPopup(true);
            setShowReplyModal(false);
            setReplyContent("");
        } catch (error) {
            console.error("Error sending reply:", error);
            setPopupMessage("There was an error sending the reply.");
            setShowPopup(true);
        }
    };

    const handleDeleteMessage = async (messageId) => {
        try {
            await axios.delete(
                `https://4wvk44j3-7001.euw.devtunnels.ms/api/contactform/${messageId}`,
                {
                    headers: requestHeaders,
                }
            );
            setMessages((prevMessages) => prevMessages.filter((message) => message.id !== messageId));
            setFilteredMessages((prevMessages) => prevMessages.filter((message) => message.id !== messageId));
            setPopupMessage("Message deleted successfully!");
            setShowPopup(true);
        } catch (error) {
            console.error("Error deleting message:", error);
            setPopupMessage("There was an error deleting the message.");
            setShowPopup(true);
        }
    };

    const handleFilterChange = (e) => {
        const value = e.target.value.toLowerCase() || "";
        setFilterInput(value);
        const filtered = messages.filter((message) =>
            message.email.toLowerCase().includes(value)
        );
        setFilteredMessages(filtered);
    };

    const containerClass = darkMode ? 'bg-gray-900 text-gray-200' : 'bg-white text-gray-900';
    const tableClass = darkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-900';
    const headerClass = darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700';
    const rowClass = darkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-700';
    const inputClass = darkMode ? 'bg-gray-800 text-gray-200 border-gray-600' : 'bg-white text-gray-700 border-gray-300';
    const buttonClass = darkMode ? 'bg-blue-700 text-white' : 'bg-blue-500 text-white';
    const popupClass = darkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-900';

    return (
        <div className={`container mx-auto p-6 ${containerClass}`}>
            <h1 className="text-3xl font-semibold mb-6 text-center">Messages</h1>
            <div className="mb-4 flex justify-center">
                <input
                    value={filterInput}
                    onChange={handleFilterChange}
                    placeholder={"Search by email"}
                    className={`border p-2 rounded-lg w-full md:w-1/2 ${inputClass}`}
                />
            </div>
            <div className="overflow-x-auto">
                <table
                    {...getTableProps()}
                    className={`min-w-full shadow-md rounded-lg overflow-hidden ${tableClass}`}
                >
                    <thead className={headerClass}>
                        {headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                    <th
                                        {...column.getHeaderProps(column.getSortByToggleProps())}
                                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                                    >
                                        {column.render("Header")}
                                        <span>
                                            {column.isSorted
                                                ? column.isSortedDesc
                                                    ? " 🔽"
                                                    : " 🔼"
                                                : ""}
                                        </span>
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody
                        {...getTableBodyProps()}
                        className="divide-y divide-gray-200"
                    >
                        {page.map((row) => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()} className={rowClass}>
                                    {row.cells.map((cell) => (
                                        <td
                                            {...cell.getCellProps()}
                                            className="px-6 py-4 whitespace-nowrap text-sm"
                                        >
                                            {cell.render("Cell")}
                                        </td>
                                    ))}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div className="pagination flex justify-between items-center mt-4">
                <button
                    onClick={() => previousPage()}
                    disabled={!canPreviousPage}
                    className={`px-4 py-2 rounded disabled:opacity-50 ${buttonClass}`}
                >
                    {"<"}
                </button>
                <span className="text-xs">
                    Page <strong>{pageIndex + 1}</strong> of {pageOptions.length}
                </span>
                <button
                    onClick={() => nextPage()}
                    disabled={!canNextPage}
                    className={`px-4 py-2 rounded disabled:opacity-50 ${buttonClass}`}
                >
                    {">"}
                </button>
            </div>
            {showReplyModal && selectedMessage && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className={`p-6 rounded-lg shadow-lg max-w-md w-full ${tableClass}`}>
                        <h2 className="text-xl font-semibold mb-4">Reply to Message</h2>
                        <p className="mb-2">
                            <strong>To:</strong> {selectedMessage.email}
                        </p>
                        <textarea
                            value={replyContent}
                            onChange={(e) => setReplyContent(e.target.value)}
                            placeholder="Write your reply here..."
                            className={`w-full p-2 border rounded-lg mb-4 ${inputClass}`}
                            rows="5"
                        ></textarea>
                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={() => setShowReplyModal(false)}
                                className={`px-4 py-2 rounded transition duration-150 ${buttonClass}`}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSendReply}
                                className={`px-4 py-2 rounded transition duration-150 ${buttonClass}`}
                            >
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {showPopup && !showReplyModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className={`p-6 rounded-lg shadow-lg max-w-md w-full ${popupClass}`}>
                        <p className="mb-4">{popupMessage}</p>
                        <button
                            onClick={() => setShowPopup(false)}
                            className={`px-4 py-2 rounded transition duration-150 ${buttonClass}`}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
            <div className="mt-6 sm:mt-0 sm:absolute sm:bottom-4 sm:right-4">
                <CustomButton
                    to="/"
                    color="blue"
                    bgColor="blue"
                    btnText="Go to homepage"
                />
            </div>
        </div>
    );
};

export default ContactMessages;
