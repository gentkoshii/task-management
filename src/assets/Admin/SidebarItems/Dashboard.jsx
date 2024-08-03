import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faProjectDiagram, faComments, faBell, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import CustomButton from '../../../components/Button';
import axios from 'axios';

const Dashboard = () => {
    const [clients, setClients] = useState(0);
    const [projectsRegistered, setProjectsRegistered] = useState(0);
    const [recentActivity, setRecentActivity] = useState([]);
    const [userStatistics, setUserStatistics] = useState({
        activeUsers: 0,
        newSignups: 0,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const clientsResponse = await axios.get('http://your-backend-endpoint-url/clients/count');
                const projectsResponse = await axios.get('http://your-backend-endpoint-url/projects/count');
                const recentActivityResponse = await axios.get('http://your-backend-endpoint-url/recent-activity');
                const userStatisticsResponse = await axios.get('http://your-backend-endpoint-url/user-statistics');

                setClients(clientsResponse.data.count);
                setProjectsRegistered(projectsResponse.data.count);
                setRecentActivity(recentActivityResponse.data);
                setUserStatistics(userStatisticsResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="p-8 min-h-screen relative">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold mb-6">Welcome to the Admin Dashboard</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white shadow-md p-6 rounded-lg flex items-center">
                        <FontAwesomeIcon icon={faUsers} className="text-blue-500 text-3xl mr-4" />
                        <div>
                            <p className="text-2xl font-bold">{clients}</p>
                            <p className="text-gray-600">Clients</p>
                        </div>
                    </div>
                    <div className="bg-white shadow-md p-6 rounded-lg flex items-center">
                        <FontAwesomeIcon icon={faProjectDiagram} className="text-green-500 text-3xl mr-4" />
                        <div>
                            <p className="text-2xl font-bold">{projectsRegistered}</p>
                            <p className="text-gray-600">Projects Registered</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white shadow-md p-6 rounded-lg">
                        <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
                        <ul className="space-y-3">
                            {recentActivity.map((activity, index) => (
                                <li key={index} className="flex items-center">
                                    <FontAwesomeIcon 
                                        icon={
                                            activity.type === 'task' ? faComments : 
                                            activity.type === 'message' ? faEnvelope : 
                                            faBell
                                        } 
                                        className="text-blue-500 mr-3" 
                                    />
                                    <span>{activity.description}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="bg-white shadow-md p-6 rounded-lg">
                        <h2 className="text-xl font-bold mb-4">User Statistics</h2>
                        <div className="space-y-2">
                            <p><strong>Active Users:</strong> {userStatistics.activeUsers}</p>
                            <p><strong>New Sign-ups:</strong> {userStatistics.newSignups}</p>
                        </div>
                    </div>
                </div>
            <div className="fixed bottom-4 right-4">
                <CustomButton to="/" color="blue" bgColor="blue" btnText="Go to homepage" />
            </div>
            </div>

        </div>
    );
};

export default Dashboard;
