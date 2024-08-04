import React, { useMemo, useState, useEffect } from 'react';
import { useTable, usePagination, useSortBy, useFilters } from 'react-table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import CustomButton from '../../components/Button';
import axios from 'axios';
import { useTheme } from '../../context/ThemeContext';

const Users = () => {
    const { darkMode } = useTheme();
    const [data, setData] = useState([]);
    const [filterInput, setFilterInput] = useState('');

    const requestHeaders = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://4wvk44j3-7001.euw.devtunnels.ms/api/user/paged', {
                    headers: requestHeaders,
                });
                console.log('Fetched data:', response.data);
                setData(response.data.items || []);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const columns = useMemo(() => [
        { Header: 'First Name', accessor: 'firstName' },
        { Header: 'Last Name', accessor: 'lastName' },
        { Header: 'Email', accessor: 'email' },
        {
            Header: 'Actions', Cell: ({ row }) => (
                <div className="flex justify-center">
                    <FontAwesomeIcon icon={faTrashAlt} className="text-red-500 cursor-pointer mx-1" onClick={() => handleDeleteUser(row.original.id)} />
                </div>
            )
        }
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
        setFilter('firstName', value);
        setFilterInput(value);
    };

    const handleDeleteUser = async (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await axios.delete(`https://4wvk44j3-7001.euw.devtunnels.ms/api/user/delete?userId=${userId}`, {
                    headers: requestHeaders,
                });
                setData(prevData => prevData.filter(user => user.id !== userId));
                alert('User deleted successfully!');
            } catch (error) {
                console.error('Error deleting user:', error);
                alert('Failed to delete user');
            }
        }
    };

    const containerClass = darkMode ? 'bg-gray-900 text-gray-200' : 'bg-white text-gray-900';
    const tableClass = darkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-900';
    const headerClass = darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700';
    const rowClass = darkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-700';
    const inputClass = darkMode ? 'bg-gray-800 text-gray-200 border-gray-600' : 'bg-white text-gray-700 border-gray-300';
    const buttonClass = darkMode ? 'bg-blue-700 text-white' : 'bg-blue-500 text-white';

    return (
        <div className={`container mx-auto p-6 ${containerClass}`}>
            <h1 className="text-3xl font-semibold mb-6 text-center">Users</h1>
            <div className="mb-4 flex justify-center">
                <input
                    value={filterInput}
                    onChange={handleFilterChange}
                    placeholder={"Search by name"}
                    className={`border p-2 rounded-lg w-full md:w-1/2 ${inputClass}`}
                />
            </div>
            <div className="overflow-x-auto">
                <table {...getTableProps()} className={`min-w-full shadow-md rounded-lg overflow-hidden ${tableClass}`}>
                    <thead className={headerClass}>
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    <th {...column.getHeaderProps(column.getSortByToggleProps())} className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
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
                    <tbody {...getTableBodyProps()} className="divide-y divide-gray-200">
                        {page.map(row => {
                            prepareRow(row)
                            return (
                                <tr {...row.getRowProps()} className={rowClass}>
                                    {row.cells.map(cell => (
                                        <td {...cell.getCellProps()} className="px-6 py-4 whitespace-nowrap text-sm">
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
                <button onClick={() => previousPage()} disabled={!canPreviousPage} className={`px-4 py-2 rounded disabled:opacity-50 ${buttonClass}`}>
                    {'<'}
                </button>
                <span className="text-xs">
                    Page <strong>{pageIndex + 1}</strong>
                </span>
                <button onClick={() => nextPage()} disabled={!canNextPage} className={`px-4 py-2 rounded disabled:opacity-50 ${buttonClass}`}>
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
