import React, { useState, useMemo, useEffect } from 'react';
import { useTable, usePagination, useSortBy, useFilters } from 'react-table';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReply, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import CustomButton from '../../../components/Button';

const ContactMessages = () => {
    const [messages, setMessages] = useState([]);
    const [popupMessage, setPopupMessage] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [replyContent, setReplyContent] = useState('');
    const [filterInput, setFilterInput] = useState('');

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get('http://your-backend-endpoint-url/contacts');
                setMessages(response.data);
            } catch (error) {
                console.error('Error fetching messages:', error);
                setPopupMessage('Error fetching messages. Please try again later.');
                setShowPopup(true);
            }
        };

        fetchMessages();
    }, []);

    const data = useMemo(() => messages, [messages]);

    const columns = useMemo(() => [
        { Header: 'First Name', accessor: 'firstName' },
        { Header: 'Last Name', accessor: 'lastName' },
        { Header: 'Email', accessor: 'email' },
        { Header: 'Phone', accessor: 'phone' },
        { Header: 'Message', accessor: 'message' },
        { Header: 'Actions', Cell: ({ row }) => (
            <div className="flex justify-center">
                <FontAwesomeIcon icon={faReply} className="text-blue-500 cursor-pointer mx-1" onClick={() => handleReplyMessage(row.original)} />
                <FontAwesomeIcon icon={faTrashAlt} className="text-red-500 cursor-pointer mx-1" onClick={() => handleDeleteMessage(row.original.id)} />
            </div>
        )}
    ], []);

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
        setFilter
    } = useTable({ columns, data, initialState: { pageIndex: 0 } }, useFilters, useSortBy, usePagination);

    const handleReplyMessage = (message) => {
        setSelectedMessage(message);
        setShowPopup(true);
    };

    const handleSendReply = async () => {
        try {
            await axios.post('http://your-backend-endpoint-url/send-reply', {
                to: selectedMessage.email,
                subject: 'Re: Your Message',
                body: replyContent
            });
            setPopupMessage('Reply sent successfully!');
            setShowPopup(false);
            setReplyContent('');
        } catch (error) {
            console.error('Error sending reply:', error);
            setPopupMessage('There was an error sending the reply.');
            setShowPopup(true);
        }
    };

    const handleDeleteMessage = async (messageId) => {
        try {
            await axios.delete(`http://your-backend-endpoint-url/contacts/${messageId}`);
            setMessages(messages.filter(message => message.id !== messageId));
            setPopupMessage('Message deleted successfully!');
            setShowPopup(true);
        } catch (error) {
            console.error('Error deleting message:', error);
            setPopupMessage('There was an error deleting the message.');
            setShowPopup(true);
        }
    };

    const handleFilterChange = (e) => {
        const value = e.target.value || undefined;
        setFilter('email', value);
        setFilterInput(value);
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-semibold mb-6 text-center">Messages</h1>
            <div className="mb-4 flex justify-center">
                <input
                    value={filterInput}
                    onChange={handleFilterChange}
                    placeholder={"Search by email"}
                    className="border p-2 rounded-lg w-full md:w-1/2"
                />
            </div>
            <div className="overflow-x-auto">
                <table {...getTableProps()} className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-gray-100">
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    <th {...column.getHeaderProps(column.getSortByToggleProps())} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        {column.render('Header')}
                                        <span>
                                            {column.isSorted
                                                ? column.isSortedDesc
                                                    ? ' 🔽'
                                                    : ' 🔼'
                                                : ''}
                                        </span>
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()} className="bg-white divide-y divide-gray-200">
                        {page.map(row => {
                            prepareRow(row)
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map(cell => (
                                        <td {...cell.getCellProps()} className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                            {cell.render('Cell')}
                                        </td>
                                    ))}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div className="pagination flex justify-between items-center mt-4">
                <button onClick={() => previousPage()} disabled={!canPreviousPage} className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50">
                    {'<'}
                </button>
                <span className="text-xs">
                    Page <strong>{pageIndex + 1}</strong> of {page.length}
                </span>
                <button onClick={() => nextPage()} disabled={!canNextPage} className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50">
                    {'>'}
                </button>
            </div>
            {showPopup && selectedMessage && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                        <h2 className="text-xl font-semibold mb-4">Reply to Message</h2>
                        <p className="text-gray-800 mb-2">
                            <strong>To:</strong> {selectedMessage.email}
                        </p>
                        <textarea
                            value={replyContent}
                            onChange={(e) => setReplyContent(e.target.value)}
                            placeholder="Write your reply here..."
                            className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                            rows="5"
                        ></textarea>
                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={() => setShowPopup(false)}
                                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-150"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSendReply}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-150"
                            >
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {showPopup && !selectedMessage && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                        <p className="text-gray-800 mb-4">{popupMessage}</p>
                        <button
                            onClick={() => setShowPopup(false)}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-150"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
            <div className="mt-6 sm:mt-0 sm:absolute sm:bottom-4 sm:right-4">
                <CustomButton to="/" color="blue" bgColor="blue" btnText="Go to homepage" />
            </div>
        </div>
    );
};

export default ContactMessages;
