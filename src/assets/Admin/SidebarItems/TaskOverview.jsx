import React, { useState, useMemo, useEffect } from 'react';
import { useTable, usePagination, useSortBy, useFilters } from 'react-table';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faEye } from '@fortawesome/free-solid-svg-icons';
import Popup from '../../../components/Popup';
import CustomButton from '../../../components/Button';

const TaskOverview = () => {
    const [tasks, setTasks] = useState([]);
    const [popupMessage, setPopupMessage] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [filterInput, setFilterInput] = useState('');
    const [editingTask, setEditingTask] = useState(null);
    const [formData, setFormData] = useState({ name: '', assignedUser: '', dueDate: '', status: '' });

    useEffect(() => {
        // Fetch tasks from the API
        axios.get('http://localhost:3001/tasks')
            .then(response => setTasks(response.data))
            .catch(error => console.error('Error fetching tasks:', error));
    }, []);

    const data = useMemo(() => tasks, [tasks]);

    const columns = useMemo(() => [
        { Header: 'Task Name', accessor: 'name' },
        { Header: 'Assigned User', accessor: 'assignedUser' },
        { Header: 'Due Date', accessor: 'dueDate' },
        { Header: 'Status', accessor: 'status' },
        { Header: 'Actions', Cell: ({ row }) => (
            <div className="flex justify-center">
                <FontAwesomeIcon icon={faEye} className="text-blue-500 cursor-pointer mx-1" onClick={() => handleViewTask(row.original)} />
                <FontAwesomeIcon icon={faEdit} className="text-green-500 cursor-pointer mx-1" onClick={() => handleEditTask(row.original)} />
                <FontAwesomeIcon icon={faTrashAlt} className="text-red-500 cursor-pointer mx-1" onClick={() => handleDeleteTask(row.original.id)} />
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

    const handleDeleteTask = (taskId) => {
        axios.delete(`http://localhost:3001/tasks/${taskId}`)
            .then(response => {
                setTasks(tasks.filter(task => task.id !== taskId));
                setPopupMessage('Task deleted successfully!');
                setShowPopup(true);
            })
            .catch(error => {
                console.error('Error deleting task:', error);
                setPopupMessage('There was an error deleting the task.');
                setShowPopup(true);
            });
    };

    const handleEditTask = (task) => {
        setEditingTask(task);
        setFormData(task);
    };

    const handleUpdateTask = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:3001/tasks/${editingTask.id}`, formData)
            .then(response => {
                const updatedTasks = tasks.map(task => task.id === editingTask.id ? response.data : task);
                setTasks(updatedTasks);
                setEditingTask(null);
                setPopupMessage('Task updated successfully!');
                setShowPopup(true);
            })
            .catch(error => {
                console.error('Error updating task:', error);
                setPopupMessage('There was an error updating the task.');
                setShowPopup(true);
            });
    };

    const handleViewTask = (task) => {
        setPopupMessage(`Task Details: \nName: ${task.name}\nAssigned User: ${task.assignedUser}\nDue Date: ${task.dueDate}\nStatus: ${task.status}`);
        setShowPopup(true);
    };

    const handleFilterChange = (e) => {
        const value = e.target.value || undefined;
        setFilter('status', value);
        setFilterInput(value);
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold mb-4">Task Overview</h1>
            <div className="mb-4">
                <input
                    value={filterInput}
                    onChange={handleFilterChange}
                    placeholder={"Search by status"}
                    className="border p-2 rounded"
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
                <button onClick={() => previousPage()} disabled={!canPreviousPage} className="text-xs">
                    {'<'}
                </button>
                <span className="text-xs">
                    Page <strong>{pageIndex + 1}</strong> of {page.length}
                </span>
                <button onClick={() => nextPage()} disabled={!canNextPage} className="text-xs">
                    {'>'}
                </button>
            </div>
            {editingTask && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                        <h2 className="text-2xl font-semibold mb-4">Edit Task</h2>
                        <form onSubmit={handleUpdateTask} className="space-y-4">
                            <input 
                                type="text" 
                                name="name" 
                                placeholder="Task Name" 
                                value={formData.name} 
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full p-2 border rounded"
                            />
                            <input 
                                type="text" 
                                name="assignedUser" 
                                placeholder="Assigned User" 
                                value={formData.assignedUser} 
                                onChange={(e) => setFormData({ ...formData, assignedUser: e.target.value })}
                                className="w-full p-2 border rounded"
                            />
                            <input 
                                type="date" 
                                name="dueDate" 
                                value={formData.dueDate} 
                                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                                className="w-full p-2 border rounded"
                            />
                            <select 
                                name="status" 
                                value={formData.status} 
                                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                className="w-full p-2 border rounded"
                            >
                                <option value="Pending">Pending</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                            </select>
                            <div className="flex justify-end space-x-4">
                                <button 
                                    type="button" 
                                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition duration-150"
                                    onClick={() => setEditingTask(null)}
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit" 
                                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-150"
                                >
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {showPopup && (
                <Popup 
                    message={popupMessage} 
                    onConfirm={() => setShowPopup(false)} 
                    type="ok" 
                />
            )}
            <div className="absolute top-4 right-4">
                <CustomButton to="/" color="blue" bgColor="blue" btnText="Go to homepage" />
            </div>
        </div>

        
    );
};

export default TaskOverview;
