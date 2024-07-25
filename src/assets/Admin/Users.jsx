import React, { useMemo, useState } from 'react';
import { useTable, usePagination, useSortBy, useFilters } from 'react-table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faEye } from '@fortawesome/free-solid-svg-icons';
import CustomButton from '../../components/Button'

const Users = () => {
    const data = useMemo(() => [
        { id: 1, name: 'Howell Hand', company: 'Kiehn-Green', city: 'Emelyside', progress: 70, created: 'Mar 3, 2023' },
        { id: 2, name: 'Hope Howe', company: 'Nolan Inc', city: 'Paristown', progress: 80, created: 'Dec 1, 2023' },
        { id: 3, name: 'Nelson Jerde', company: 'Nitzsche LLC', city: 'Jailynbury', progress: 55, created: 'May 18, 2023' },
        { id: 4, name: 'Kim Weimann', company: 'Brown-Lueilwitz', city: 'New Emie', progress: 60, created: 'May 4, 2023' },
        { id: 5, name: 'Justice O\'Reilly', company: 'Lakin-Muller', city: 'New Kacie', progress: 90, created: 'Mar 27, 2023' },
    ], []);

    const columns = useMemo(() => [
        { Header: 'Name', accessor: 'name' },
        { Header: 'Company', accessor: 'company' },
        { Header: 'City', accessor: 'city' },
        { Header: 'Progress', accessor: 'progress', Cell: ({ value }) => <progress max="100" value={value} className="w-full h-2 bg-green-200 rounded">{value}%</progress> },
        { Header: 'Created', accessor: 'created' },
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

    const [filterInput, setFilterInput] = useState('');

    const handleFilterChange = (e) => {
        const value = e.target.value || undefined;
        setFilter('name', value);
        setFilterInput(value);
    };

    const handleViewUser = (user) => {
        alert(`Viewing user: ${user.name}`);
    };

    const handleEditUser = (user) => {
        alert(`Editing user: ${user.name}`);
    };

    const handleDeleteUser = (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            alert(`Deleted user with ID: ${userId}`);
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
            <div className="pagination flex justify-between p-4">
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
            <div className="absolute top-4 right-4">
                <CustomButton to="/" color="blue" bgColor="blue" btnText="Go to homepage" />
            </div>
        </div>
    );
};

export default Users;
