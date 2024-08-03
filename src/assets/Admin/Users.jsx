import React, { useMemo, useState, useEffect } from 'react';
import { useTable, usePagination, useSortBy, useFilters } from 'react-table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faEye } from '@fortawesome/free-solid-svg-icons';
import CustomButton from '../../components/Button';
import axios from 'axios';

const Users = () => {
    const [data, setData] = useState([]);
    const [filterInput, setFilterInput] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://your-backend-endpoint-url/users');
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const columns = useMemo(() => [
        { Header: 'Name', accessor: 'name' },
        { Header: 'Last Name', accessor: 'lastName' },
        { Header: 'Email', accessor: 'email' },
        { Header: 'Actions', Cell: ({ row }) => (
            <div className="flex justify-center">
                <FontAwesomeIcon icon={faEye} className="text-blue-500 cursor-pointer mx-1" onClick={() => handleViewUser(row.original)} />
                <FontAwesomeIcon icon={faEdit} className="text-green-500 cursor-pointer mx-1" onClick={() => handleEditUser(row.original)} />
                <FontAwesomeIcon icon={faTrashAlt} className="text-red-500 cursor-pointer mx-1" onClick={() => handleDeleteUser(row.original.id)} />
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
        setFilter,
    } = useTable({ columns, data, initialState: { pageIndex: 0 } }, useFilters, useSortBy, usePagination);

    const handleFilterChange = (e) => {
        const value = e.target.value || undefined;
        setFilter('name', value);
        setFilterInput(value);
    };

    const handleViewUser = (user) => {
        alert(`Viewing user: ${user.name} ${user.lastName}`);
        // Implement view user functionality here, e.g., open a modal with user details
    };

    const handleEditUser = (user) => {
        alert(`Editing user: ${user.name} ${user.lastName}`);
        // Implement edit user functionality here, e.g., open a form with user details
    };

    const handleDeleteUser = async (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await axios.delete(`http://your-backend-endpoint-url/users/${userId}`);
                setData(data.filter(user => user.id !== userId));
                alert('User deleted successfully!');
            } catch (error) {
                console.error('Error deleting user:', error);
                alert('Failed to delete user');
            }
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-semibold mb-6 text-center">Users</h1>
            <div className="mb-4 flex justify-center">
                <input
                    value={filterInput}
                    onChange={handleFilterChange}
                    placeholder={"Search by name"}
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
                    Page <strong>{pageIndex + 1}</strong>
                </span>
                <button onClick={() => nextPage()} disabled={!canNextPage} className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50">
                    {'>'}
                </button>
            </div>
            <div className="mt-6 sm:mt-0 sm:absolute sm:bottom-4 sm:right-4">
                <CustomButton to="/" color="blue" bgColor="blue" btnText="Go to homepage" />
            </div>
        </div>
    );
};

export default Users;
