import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faDollarSign, faChartLine, faTasks, faComments, faBell } from '@fortawesome/free-solid-svg-icons';
import CustomButton from '../../../components/Button';

const Dashboard = () => {
    return (
        <div className="p-8 min-h-screen relative">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold mb-6">Welcome to the Admin Dashboard</h1>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white shadow-md p-6 rounded-lg flex items-center">
                        <FontAwesomeIcon icon={faUsers} className="text-blue-500 text-3xl mr-4" />
                        <div>
                            <p className="text-2xl font-bold">512</p>
                            <p className="text-gray-600">Clients</p>
                        </div>
                    </div>
                    <div className="bg-white shadow-md p-6 rounded-lg flex items-center">
                        <FontAwesomeIcon icon={faDollarSign} className="text-green-500 text-3xl mr-4" />
                        <div>
                            <p className="text-2xl font-bold">$7,770</p>
                            <p className="text-gray-600">Sales</p>
                        </div>
                    </div>
                    <div className="bg-white shadow-md p-6 rounded-lg flex items-center">
                        <FontAwesomeIcon icon={faChartLine} className="text-red-500 text-3xl mr-4" />
                        <div>
                            <p className="text-2xl font-bold">256%</p>
                            <p className="text-gray-600">Performance</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white shadow-md p-6 rounded-lg">
                        <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
                        <ul className="space-y-3">
                            <li className="flex items-center">
                                <FontAwesomeIcon icon={faTasks} className="text-blue-500 mr-3" />
                                <span>Completed task "Redesign website"</span>
                            </li>
                            <li className="flex items-center">
                                <FontAwesomeIcon icon={faComments} className="text-green-500 mr-3" />
                                <span>New comment on blog post</span>
                            </li>
                            <li className="flex items-center">
                                <FontAwesomeIcon icon={faBell} className="text-yellow-500 mr-3" />
                                <span>New notification</span>
                            </li>
                        </ul>
                    </div>
                    <div className="bg-white shadow-md p-6 rounded-lg">
                        <h2 className="text-xl font-bold mb-4">User Statistics</h2>
                        <div className="space-y-2">
                            <p><strong>Active Users:</strong> 120</p>
                            <p><strong>New Sign-ups:</strong> 30</p>
                            <p><strong>Returning Users:</strong> 50</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white shadow-md p-6 rounded-lg mb-8">
                    <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
                    <div className="flex space-x-4">
                        <CustomButton to="" color="blue" bgColor="blue" btnText="Add Client" />
                        <CustomButton to="" color="green" bgColor="green" btnText="View Sales" />
                        <CustomButton to="" color="red" bgColor="red" btnText="Generate Report" />
                    </div>
                </div>

                <div className="bg-white shadow-md p-6 rounded-lg">
                    <h2 className="text-xl font-bold mb-4">Performance Chart</h2>
                    <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                        <span className="text-gray-600">Chart Placeholder</span>
                    </div>
                </div>
            </div>

            <div className="absolute top-4 right-4">
                <CustomButton to="/" color="blue" bgColor="blue" btnText="Go to homepage" />
            </div>
        </div>
    );
};

export default Dashboard;
