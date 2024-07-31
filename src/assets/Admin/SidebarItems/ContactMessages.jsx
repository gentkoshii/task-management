import React, { useState, useMemo, useEffect } from 'react';
import { useTable, usePagination, useSortBy, useFilters } from 'react-table';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import CustomButton from '../../../components/Button';

const ContactMessages = () => {
    const [messages, setMessages] = useState([]);
    const [popupMessage, setPopupMessage] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [filterInput, setFilterInput] = useState('');

    useEffect(() => {
        // Fetch contact messages from the API
        const fetchMessages = async () => {
            try {
                const response = await axios.get('http://localhost:3001/contacts');
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
                <FontAwesomeIcon icon={faEye} className="text-blue-500 cursor-pointer mx-1" onClick={() => handleViewMessage(row.original)} />
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

    const handleViewMessage = (message) => {
        setSelectedMessage(message);
        setShowPopup(true);
    };

    const handleDeleteMessage = async (messageId) => {
        try {
            await axios.delete(`http://localhost:3001/contacts/${messageId}`);
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
        <div className="p-6">
            <h1 className="text-2xl font-semibold mb-4">Messages</h1>
            <div className="mb-4">
                <input
                    value={filterInput}
                    onChange={handleFilterChange}
                    placeholder={"Search by email"}
                    className="border p-2 rounded w-full"
                />
            </div>
            <table {...getTableProps()} className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())} className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
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
                                    <td {...cell.getCellProps()} className="px-3 py-2 whitespace-nowrap text-sm">
                                        {cell.render('Cell')}
                                    </td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div className="pagination flex justify-between p-4">
                <button onClick={() => previousPage()} disabled={!canPreviousPage} className="text-xs border rounded px-2 py-1">
                    {'<'}
                </button>
                <span className="text-xs">
                    Page <strong>{pageIndex + 1}</strong> of {page.length}
                </span>
                <button onClick={() => nextPage()} disabled={!canNextPage} className="text-xs border rounded px-2 py-1">
                    {'>'}
                </button>
            </div>
            {showPopup && selectedMessage && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                        <h2 className="text-xl font-semibold mb-4">Message details</h2>
                        <p className="text-gray-800 mb-2">
                            <strong>Name:</strong> {selectedMessage.firstName} {selectedMessage.lastName}
                        </p>
                        <p className="text-gray-800 mb-2">
                            <strong>Email:</strong> {selectedMessage.email}
                        </p>
                        <p className="text-gray-800 mb-4">
                            <strong>Phone:</strong> {selectedMessage.phone}
                        </p>
                        <p className="text-3xl font-bold text-gray-900 mb-4">
                            {selectedMessage.message}
                        </p>
                        <button
                            onClick={() => setShowPopup(false)}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-150"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
            <div className="absolute top-4 right-4">
                <CustomButton to="/" color="blue" bgColor="blue" btnText="Go to homepage" />
            </div>
        </div>
    );
};

export default ContactMessages;
