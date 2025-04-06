import React, { useState } from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import Sidebar from '../../Components/Student/Sidebar';
import ManageCVView from '../../Components/Student/ManageCVView';
import TrackCVView from '../../Components/Student/ManageCVTrack';
import ApplicationHeader from '../../Components/Student/ApplicationHeader';

const ApplicationPage = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Manage sidebar state
    const [activeTab, setActiveTab] = useState('manage');

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar open/close
    };

    return (
        <div className="flex flex-col min-h-screen">
            {/* Main Navigation Bar */}
            <Navbar />

            <div className="flex flex-1">
                {/* Sidebar */}
                <div className={`transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-20'} bg-[#45A29E]`}>
                    <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
                </div>


                {/* Main Content Area */}

                <div className="flex-1 mt-12">
                <ApplicationHeader activeTab={activeTab} setActiveTab={setActiveTab}/>

                {activeTab === 'manage' && <ManageCVView />}
                {activeTab === 'track' && <TrackCVView />}
                </div>
            </div>
        </div>
    );
};

export default ApplicationPage;